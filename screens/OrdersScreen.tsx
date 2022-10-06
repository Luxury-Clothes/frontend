import { Text, View } from 'react-native';
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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>OrdersScreen</Text>
    </View>
  );
};

export default OrdersScreen;
