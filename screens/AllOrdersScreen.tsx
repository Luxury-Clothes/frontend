import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { FocusAwareStatusBar, Order } from '../components';
import {
  setPage,
  getAllOrders,
  setOrder,
  fetchMoreOrders,
} from '../features/orders/orders';

export default function AllOrdersScreen() {
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();

  const {
    allOrders: orders,
    order,
    loading,
    page,
  } = useAppSelector((state) => state.orders);

  useEffect(() => {
    isFocused && dispatch(getAllOrders());
  }, [isFocused, order]);

  useEffect(() => {
    if (page !== 1) dispatch(fetchMoreOrders());
  }, [page]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 20,
      }}
    >
      <FocusAwareStatusBar barStyle='dark-content' />

      <View className='flex-row justify-end mb-4'>
        <SelectDropdown
          data={['Сегодня', 'За неделю', 'Месяц', 'Все']}
          defaultValueByIndex={0}
          defaultValue={'Сегодня'}
          onSelect={(selectedItem, index) => {
            switch (index) {
              case 0: {
                dispatch(setOrder('today'));
                break;
              }
              case 1: {
                dispatch(setOrder('week'));

                break;
              }
              case 2: {
                dispatch(setOrder('month'));

                break;
              }
              default: {
                dispatch(setOrder('all'));
              }
            }
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <Entypo
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                size={18}
                color='gray'
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>
      {orders.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
          keyExtractor={(item) => item.id}
          data={orders}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          onEndReachedThreshold={0}
          onEndReached={() => {
            if (!loading) {
              dispatch(setPage(page + 1));
            }
          }}
          ListFooterComponent={<View>{loading && <ActivityIndicator />}</View>}
          renderItem={({ item }) => (
            <Order item={item} />
            // <TouchableOpacity
            //   activeOpacity={0.5}
            //   onPress={() => {
            //     dispatch(setSelectedOrder(item));
            //     // @ts-ignore
            //     navigation.navigate('Order');
            //   }}
            // >
            //   <View
            //     style={{
            //       padding: 20,
            //       borderWidth: 2,
            //       borderColor: '#f0f9ff',
            //       // backgroundColor: '#f0f9ff',
            //       backgroundColor: '#f1f5f9',
            //       borderTopLeftRadius: 10,
            //       borderTopRightRadius: 10,
            //       flexDirection: 'row',
            //       justifyContent: 'space-between',
            //     }}
            //   >
            //     <Text style={{ fontSize: 18, fontWeight: '700' }}>
            //       Заказ от {new Date(item.created_at).getUTCDate()}{' '}
            //       {months[new Date(item.created_at).getMonth()]}
            //     </Text>
            //     <Text>
            //       <Text style={{ fontSize: 18, fontWeight: '700' }}>
            //         {item.total_price} Р
            //       </Text>
            //       , оплачено
            //     </Text>
            //   </View>
            //   <View className='p-5 rounded-bl-[10px] border-b-2 border-r-2 border-l-2 border-gray-100  rounded-br-[10px]'>
            //     <View
            //       style={{ alignItems: 'center' }}
            //       className='flex-row gap-2 item-center mb-2'
            //     >
            //       <Text className='font-bold text-[16px] '>
            //         Доставка в пункт выдачи
            //       </Text>
            //       <View className='text-[16px] flex-row items-center text-sm bg-blue-500 py-1 px-2 rounded-[30px] text-white'>
            //         <Text className='text-white'>{item.status}</Text>
            //       </View>
            //     </View>
            //     <Text className='text-gray-600'>
            //       Адресс доставки: {item.address}, {item.city}.
            //     </Text>
            //   </View>
            // </TouchableOpacity>
          )}
        />
      ) : (
        <View className='items-center justify-center'>
          <Text className='font-bold text-[20px] text-gray-700'>
            Страница пуста
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#777',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
});
