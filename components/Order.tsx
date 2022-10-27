import { IOrder } from '../types';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch } from '../app/hooks';
import { setSelectedOrder } from '../features/orders/orders';
import { months } from '../config/utils';

export interface OrderProps {
  item: IOrder;
}

const Order: React.FC<OrderProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        dispatch(setSelectedOrder(item));
        // @ts-ignore
        navigation.navigate('Order');
      }}
    >
      <View
        style={{
          padding: 20,
          borderWidth: 2,
          borderColor: '#f0f9ff',
          // backgroundColor: '#f0f9ff',
          backgroundColor: '#f1f5f9',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '700' }}>
          Заказ от {new Date(item.created_at).getUTCDate()}{' '}
          {months[new Date(item.created_at).getMonth()]}
        </Text>
        <Text>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>
            {item.total_price} Р
          </Text>
          , оплачено
        </Text>
      </View>
      <View className='p-5 rounded-bl-[10px] border-b-2 border-r-2 border-l-2 border-gray-100  rounded-br-[10px]'>
        <View
          style={{ alignItems: 'center' }}
          className='flex-row gap-2 item-center mb-2'
        >
          <Text className='font-bold text-[16px] '>
            Доставка в пункт выдачи
          </Text>
          <View
            className={`text-[16px] flex-row items-center rounded-[20px] py-1 px-2 text-sm bg-blue-500
            ${item?.status === 'В обработке' && 'bg-gray-700'} ${
              item?.status === 'Принято' && 'bg-indigo-500'
            } ${item?.status === 'Доставлен' && 'bg-green-500'} `}
          >
            <Text className='text-white'>{item.status}</Text>
          </View>
        </View>
        <Text className='text-gray-600'>
          Адресс доставки: {item.address}, {item.city}.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Order;
