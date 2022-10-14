import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getOrders } from '../features/orders/orders';

const OrdersScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const { orders } = useAppSelector((state) => state.orders);

  // console.log(orders);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flexGrow: 1 }}
        keyExtractor={(item) => item.id}
        data={orders}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.5}
            className='border border-gray-100 rounded-[10px]'
            // onPress={() => console.log('hello')}
          >
            <View
              style={{
                padding: 20,
                backgroundColor: '#f0f9ff',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '700' }}>
                Заказ от 14 октября
              </Text>
              <Text>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                  {item.total_price} Р
                </Text>
                , оплачено
              </Text>
            </View>
            <View className='p-5 rounded-bl-[10px]  rounded-br-[10px]'>
              <View
                style={{ alignItems: 'center' }}
                className='flex-row gap-2 item-center mb-2'
              >
                <Text className='font-bold text-[16px] '>
                  Доставка в пункт выдачи
                </Text>
                <View className='text-[16px] flex-row items-center text-sm bg-blue-500 py-1 px-2 rounded-[30px] text-white'>
                  <Text className='text-white'>Принято</Text>
                </View>
              </View>
              <Text className='text-gray-600'>
                Адресс доставки: {item.address}, {item.city}.
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default OrdersScreen;
