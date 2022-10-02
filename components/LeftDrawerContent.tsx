import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Feather, FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  setSelectedCategory,
  getCategories,
} from '../features/products/products';
import { useNavigation } from '@react-navigation/native';

const LeftDrawerContent = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const { categories } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView style={{ marginTop: 20 }}>
        <View className="gap-4 p-6">
          {/* @ts-ignore */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text
              style={{ fontFamily: 'Raleway-Regular' }}
              className=" text-[16px] tracking-[1px]"
            >
              Home
            </Text>
          </TouchableOpacity>
          {categories.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => {
                dispatch(setSelectedCategory(c.toLowerCase()));
                /* @ts-ignore */
                navigation.navigate('Products');
              }}
            >
              <Text
                style={{ fontFamily: 'Raleway-Regular' }}
                className=" text-[16px] tracking-[1px]"
              >
                {c === 'All' ? 'Все товары' : c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{ marginTop: 10 }}
          className="gap-4 border-t pt-8 pl-8 border-gray-200 "
        >
          {!user && (
            <TouchableOpacity
              className="flex-row items-center"
              // @ts-ignore
              onPress={() => navigation.navigate('Login')}
            >
              <Feather name="user" size={16} color="gray" />
              <Text
                className="ml-2 text-gray-700 text-[16px]"
                style={{ fontFamily: 'Raleway-Regular' }}
              >
                Войти | Создать аккаунт
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity className="flex-row items-center">
            <FontAwesome name="building-o" size={16} color="gray" />
            <Text
              className="ml-2 text-gray-700 text-[16px]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Поиск магазинов
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <AntDesign name="questioncircleo" size={16} color="black" />
            <Text
              className="ml-2 text-gray-700 text-[16px]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Помощь
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="ios-globe-outline" size={16} color="gray" />
            <Text
              className="ml-2 text-gray-700 text-[16px]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Россия
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default LeftDrawerContent;
