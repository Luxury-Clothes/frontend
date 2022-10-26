import { View, Text } from 'react-native';
import { FocusAwareStatusBar } from '../components';

export default function AllOrdersScreen() {
  return (
    <View>
      <FocusAwareStatusBar barStyle='dark-content' />
      <Text>AllOrdersScreen</Text>
    </View>
  );
}
