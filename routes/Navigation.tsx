import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../app/hooks';

import { Loader } from '../components';
import { RightDrawerScreen } from '../screens';

export default function Navigation() {
  const { initialRouteName } = useAppSelector((state) => state.auth);
  return (
    <NavigationContainer>
      {!initialRouteName ? <Loader visible={true} /> : <RightDrawerScreen />}
    </NavigationContainer>
  );
}
