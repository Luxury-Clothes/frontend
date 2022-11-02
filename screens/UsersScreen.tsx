import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { FocusAwareStatusBar } from '../components';
import { LinearGradient } from 'expo-linear-gradient';
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  searchUsers,
  setSearchTerm,
  updateStatus,
  setPage,
  fetchMoreUsers,
} from '../features/admin/admin';
import { useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';

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

  const roles = ['Администратор', 'Покупатель'];
  const [selected, setSelected] = useState(undefined);
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

                <View className='ml-4 justify-center mr-auto'>
                  <Text className='text-[18px] font-semibold text-[#333]'>
                    {item.username}
                  </Text>
                  <Text className='text-sm  text-gray-500'>{item.email}</Text>
                </View>

                <SelectDropdown
                  data={roles}
                  dropdownIconPosition={'left'}
                  renderDropdownIcon={() => {
                    return item.is_admin ? (
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
                    );
                  }}
                  defaultValue={item.is_admin ? 'Администратор' : 'Покупатель'}
                  buttonStyle={{
                    backgroundColor: '#f1f5f9',
                    padding: 16,
                    width: 60,
                    height: 60,
                    borderRadius: 5000,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  buttonTextStyle={{
                    display: 'none',
                  }}
                  dropdownStyle={{
                    width: 160,
                    borderRadius: 4,
                    marginTop: 10,
                    marginLeft: -70,
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
                {/* </TouchableOpacity> */}
              </View>
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
