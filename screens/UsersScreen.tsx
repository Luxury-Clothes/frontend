import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import TextAvatar from 'react-native-text-avatar';
import { FocusAwareStatusBar } from '../components';
import { LinearGradient } from 'expo-linear-gradient';
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  searchUsers,
  setSearchTerm,
  updateStatus,
  setPage,
  fetchMoreUsers,
} from '../features/admin/admin';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UsersScreen = () => {
  const dispatch = useAppDispatch();

  const { searchTerm, users, page, loading } = useAppSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(searchUsers());
  }, [searchTerm]);

  useEffect(() => {
    if (page !== 1) dispatch(fetchMoreUsers());
  }, [page]);

  const countries = ['Администратор', 'Покупатель'];
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FocusAwareStatusBar barStyle='dark-content' />
      <View
        style={{
          //   height: 50,
          paddingHorizontal: 20,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <View
          style={{ borderRadius: 4 }}
          className='flex-row w-full h-full pl-2 py-2 items-center bg-gray-100/90'
        >
          <AntDesign name='search1' size={20} color='gray' />
          <TextInput
            placeholder='Искать'
            value={searchTerm}
            onChangeText={(text) => {
              dispatch(setSearchTerm(text));
            }}
            className='ml-2 text-gray-600  text-[16px] flex-1'
          />
        </View>
      </View>

      {users.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            flexGrow: 1,
            padding: 20,
            backgroundColor: '#fafafa',
            marginBottom: 40,
          }}
          keyExtractor={(item) => item.id}
          data={users}
          onEndReachedThreshold={0}
          onEndReached={() => {
            if (!loading) {
              dispatch(setPage(page + 1));
            }
          }}
          ListFooterComponent={<View>{loading && <ActivityIndicator />}</View>}
          renderItem={({ item }) => (
            <View
              className='bg-white rounded-lg border border-gray-100  p-4 py-4 mb-4 w-full'
              style={{
                shadowColor: '#171717',
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <View className='flex flex-row items-center'>
                <LinearGradient
                  colors={['#f1f5f9', '#e2e8f0']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  className='rounded-full w-16 h-16 items-center justify-center'
                >
                  <Text className='text-[18px]'>{item?.username[0]}</Text>
                </LinearGradient>
                {/* <TextAvatar
                  backgroundColor={'#202639'}
                  textColor={'white'}
                  size={50}
                  type={'circle'} // optional
                >
                  {item.username}
                </TextAvatar> */}
                <View className='ml-4 justify-center mr-auto'>
                  <Text className='text-[18px] font-semibold text-[#333]'>
                    {item.username}
                  </Text>
                  <Text className='text-sm  text-gray-500'>{item.email}</Text>
                </View>

                <TouchableOpacity className='ml-auto w-14 h-14 rounded-full bg-slate-100 items-center justify-center'>
                  {item.is_admin ? (
                    <MaterialIcons
                      name='admin-panel-settings'
                      size={20}
                      color='#333'
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name='cart-outline'
                      size={20}
                      color='#333'
                    />
                  )}
                </TouchableOpacity>
              </View>
              {/* <LinearGradient
                colors={['#202639', '#3f4c77']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                className='w-full mt-4 flex-row items-center justify-center p-3 rounded  self-center'
              >
                <SelectDropdown
                  data={countries}
                  dropdownIconPosition={'left'}
                  renderDropdownIcon={() => {
                    return item.is_admin ? (
                      <MaterialIcons
                        name='admin-panel-settings'
                        size={20}
                        color='white'
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name='cart-outline'
                        size={20}
                        color='white'
                      />
                      // <Feather name='user' size={20} color='white' />
                    );
                  }}
                  defaultValue={item.is_admin ? 'Администратор' : 'Покупатель'}
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    height: 20,
                    width: 140,
                  }}
                  buttonTextStyle={{
                    color: 'white',
                    fontSize: 14,
                    fontWeight: '600',
                    marginLeft: 0,
                    paddingLeft: 0,
                  }}
                  dropdownStyle={{
                    width: 160,
                    borderRadius: 4,
                    marginTop: 16,
                    marginLeft: -10,
                  }}
                  onSelect={(selectedItem) => {
                    dispatch(
                      updateStatus({
                        id: item.id,
                        isAdmin: selectedItem === 'Покупатель' ? false : true,
                      })
                    );
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
              </LinearGradient> */}

              {/* <TouchableOpacity className='ml-4 flex-row items-center justify-center p-2 rounded bg-green-500 self-center '>
                {item.is_admin ? (
                  <MaterialIcons
                    name='admin-panel-settings'
                    size={20}
                    color='white'
                  />
                ) : (
                  <Feather name='user' size={20} color='white' />
                )}

                <Text className='ml-2 text-xs font-semibold text-white'>
                  {item.is_admin ? 'Администратор' : 'Покупатель'}
                </Text>
              </TouchableOpacity> */}
            </View>
          )}
        />
      ) : (
        <View className='flex-1 items-center justify-center'>
          <Text className='font-bold text-[20px] text-gray-500'>
            Пользователи не найдены
          </Text>
        </View>
      )}
    </View>
  );
};

export default UsersScreen;
