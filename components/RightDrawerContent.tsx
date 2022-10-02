import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  Ionicons,
  SimpleLineIcons,
  FontAwesome,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import { Avatar } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/auth/auth';

const LeftDrawerContent = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    // @ts-ignore
    navigation.navigate('Home');
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView style={{ marginTop: 20 }}>
        <View className="gap-4 pt-8 pl-8">
          {/* {user && (
            <TouchableOpacity className="flex-row items-center">
              <Avatar
                size={36}
                title={user?.username[0]}
                rounded
                containerStyle={{
                  backgroundColor: '#e2e8f0',
                  marginRight: 10,
                }}
              />
              <Text>{user.username}</Text>
            </TouchableOpacity>
          )} */}
          <TouchableOpacity
            className="flex-row items-center"
            // @ts-ignore
            onPress={() => navigation.navigate('ShoppingCart')}
          >
            <Ionicons name="cart-outline" size={16} color="gray" />
            <Text
              className="ml-2 text-gray-700 text-[16px]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Корзина
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <SimpleLineIcons name="bag" size={16} color="gray" />
            <Text
              className="ml-2 text-gray-700 text-[16px]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              История Заказов
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <FontAwesome name="heart-o" size={16} color="gray" />
            <Text
              className="ml-2 text-gray-700 text-[16px]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Избранное
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <AntDesign name="message1" size={16} color="gray" />
            <Text
              className="ml-2 text-gray-700 text-[16px]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Обратная связь
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onLogout}
            className="flex-row items-center"
          >
            <MaterialIcons name="logout" size={16} color="gray" />
            <Text
              className="ml-2 text-gray-700 text-[16px]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Выход
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default LeftDrawerContent;
