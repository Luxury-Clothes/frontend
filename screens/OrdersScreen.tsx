import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { FocusAwareStatusBar, Order } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getOrders } from '../features/orders/orders';

const OrdersScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const navigation = useNavigation();

  const { orders } = useAppSelector((state) => state.orders);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
      <FocusAwareStatusBar barStyle='dark-content' />
      {orders.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
          keyExtractor={(item) => item.id}
          data={orders}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
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
        <View className='flex-1 items-center justify-center'>
          <Text className='font-bold text-[20px] text-gray-700'>
            Страница пуста
          </Text>
          {/* @ts-ignore */}
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text className='text-[16px] mt-2 text-blue-500 underline'>
              Начать покупки
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default OrdersScreen;
