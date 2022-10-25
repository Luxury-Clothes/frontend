import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
// import { View } from 'react-native';
// import { useEffect, useCallback } from 'react';
import { store } from './app/store';
import { StripeProvider } from '@stripe/stripe-react-native';
// import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Navigation from './routes/Navigation';

import { Loader, FilterModal } from './components';

import axios from 'axios';

axios.defaults.baseURL = 'https://project-landc.herokuapp.com/api';
axios.defaults.withCredentials = true;

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway: require('./assets/fonts/Raleway-VariableFont_wght.ttf'),
    'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
    'Raleway-Light': require('./assets/fonts/Raleway-Light.ttf'),
    'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
    // Nunito: require('./assets/fonts/Nunito-Regular.ttf'),
    // 'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });
  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey='pk_test_51LjHD8CTkCBdW01yDaOLjevZ6SH66rJBPOyHmAh3LNOAEte3OtOprNfwGG5J6qYUij0tNRMGYTfInHcQYX19nAUT006MRJMfHs'
        merchantIdentifier='L&C shop'
        threeDSecureParams={{
          backgroundColor: '#fff',
        }}
      >
        <FilterModal />

        <Navigation />
      </StripeProvider>
    </Provider>
  );
}
