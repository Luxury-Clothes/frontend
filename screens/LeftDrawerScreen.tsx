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
      id="LeftDrawer"
      screenOptions={{
        // drawerStyle: {
        //   width: '100%',
        // },
        drawerPosition: 'left',
      }}
      drawerContent={() => <LeftDrawerContent />}
      initialRouteName={initialRouteName}
    >
      <LeftDrawer.Screen
        name="Login"
        options={{
          header: () => <Header />,
        }}
        component={LoginScreen}
      />
      <LeftDrawer.Screen
        name="Register"
        options={{
          header: () => <Header />,
        }}
        component={RegistrationScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name="Home"
        component={HomeScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name="Products"
        component={ProductsScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name="Details"
        component={DetailsScreen}
      />
      <LeftDrawer.Screen
        options={{
          header: () => <Header />,
        }}
        name="ShoppingCart"
        component={ShoppingCartScreen}
      />
    </LeftDrawer.Navigator>
  );
};

export default LeftDrawerScreen;
