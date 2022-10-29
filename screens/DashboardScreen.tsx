import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import {
  MaterialIcons,
  FontAwesome5,
  AntDesign,
  Ionicons,
} from '@expo/vector-icons';
import React from 'react';

const DashboardScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style='light' />
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#202639', '#3f4c77']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View className='mt-24 px-6 flex-row justify-between'>
          <View>
            <Text className='text-white font-[800] text-[24px]'>
              Luxury Clothes
            </Text>
            <Text className='text-gray-400 text-[16px]'>
              Интернет магазин одежды
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='bg-transparent/10 p-3 items-center justify-center rounded'
          >
            <AntDesign name='arrowright' size={24} color='white' />
          </TouchableOpacity>
        </View>
        <View className='px-6 mt-10'>
          <TouchableOpacity className='flex-row items-center'>
            <MaterialIcons name='house' size={28} color='white' />
            <Text className='text-white ml-4 text-[14px] font-bold'>
              Панель администратора
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            //   @ts-ignore
            onPress={() => navigation.navigate('Users')}
            className='flex-row items-center mt-6'
          >
            <FontAwesome5 name='users' size={24} color='white' />
            <Text className='text-gray-400 ml-4 text-[14px] font-bold'>
              Пользователи
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            //   @ts-ignore
            onPress={() => navigation.navigate('AllOrders')}
            className='flex-row items-center mt-6'
          >
            <Ionicons name='documents-sharp' size={24} color='white' />
            <Text className='text-gray-400 ml-4 text-[14px] font-bold'>
              Заказы
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center mt-6'>
            <AntDesign name='message1' size={24} color='white' />
            <Text className='text-gray-400 ml-4 text-[14px] font-bold'>
              Сообщения
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // @ts-ignore
            onPress={() => navigation.navigate('Stats')}
            className='flex-row items-center mt-6'
          >
            <AntDesign name='piechart' size={24} color='white' />
            <Text className='text-gray-400 ml-4 text-[14px] font-bold'>
              Статистика
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default DashboardScreen;
