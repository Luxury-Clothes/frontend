import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect } from 'react';

import { useAppDispatch } from '../app/hooks';
import { useAppSelector } from '../app/hooks';

import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ShoppingCartScreen from './ShoppingCartScreen';
import ProductsScreen from './ProductsScreen';
import FavouritesScreen from './FavouritesScreen';
import ShippingAddressScreen from './ShippingAddressScreen';
import OrdersScreen from './OrdersScreen';
import ContactUsScreen from './ContactUsScreen';
import SendMessageScreen from './SendMessageScreen';
import HistoryScreen from './HistoryScreen';
import OrderScreen from './OrderScreen';

import { LeftDrawerContent, Header } from '../components';
import { init } from '../features/auth/auth';

const LeftDrawer = createDrawerNavigator();

const LeftDrawerScreen = () => {
  const { initialRouteName } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <LeftDrawer.Navigator
      backBehavior='history'
      id='LeftDrawer'
      screenOptions={{
        drawerStyle: {
          width: '100%',
        },
        drawerPosition: 'left',
      }}
      drawerContent={() => <LeftDrawerContent />}
      initialRouteName={initialRouteName}
    >
      <LeftDrawer.Screen
        name='Login'
        options={{
          header: () => <Header />,
        }}
        component={LoginScreen}
      />
      <LeftDrawer.Screen
        name='Register'
        options={{
          header: () => <Header />,
        }}
        component={RegistrationScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name='Home'
        component={HomeScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name='Products'
        component={ProductsScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name='Details'
        component={DetailsScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name='ShoppingCart'
        component={ShoppingCartScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name='Favourites'
        component={FavouritesScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name='Shipping'
        component={ShippingAddressScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name='Orders'
        component={OrdersScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name='ContactUs'
        component={ContactUsScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name='SendMessage'
        component={SendMessageScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name='History'
        component={HistoryScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name='Order'
        component={OrderScreen}
      />
    </LeftDrawer.Navigator>
  );
};

export default LeftDrawerScreen;
