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
            padding: 10,
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
              className='bg-white rounded  p-4 py-8 mb-4 w-full flex flex-row'
              style={{
                shadowColor: '#171717',
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <TextAvatar
                backgroundColor={'#202639'}
                textColor={'white'}
                size={50}
                type={'circle'} // optional
              >
                {item.username}
              </TextAvatar>
              <View className='ml-4 w-[36%] justify-center'>
                <Text className='text-[16px] font-semibold'>
                  {item.username}
                </Text>
                <Text
                  ellipsizeMode='tail'
                  numberOfLines={1}
                  className='text-xs  text-gray-500'
                >
                  {item.email}
                </Text>
              </View>
              <LinearGradient
                colors={['#202639', '#3f4c77']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                className='ml-4 flex-row items-center justify-center p-2 rounded  self-center'
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
                    fontSize: 12,
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
              </LinearGradient>
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
