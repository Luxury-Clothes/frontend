import { createDrawerNavigator } from '@react-navigation/drawer';

import LeftDrawerScreen from './LeftDrawerScreen';
import { useAppSelector } from '../app/hooks';
import { RightDrawerContent } from '../components';

const RightDrawer = createDrawerNavigator();

const RightDrawerScreen = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <RightDrawer.Navigator
      id="RightDrawer"
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        swipeEdgeWidth: user ? 50 : 0,
      }}
      drawerContent={() => <RightDrawerContent />}
      initialRouteName={'HomeStack'}
    >
      <RightDrawer.Screen name="HomeStack" component={LeftDrawerScreen} />
    </RightDrawer.Navigator>
  );
};

export default RightDrawerScreen;
