import * as React from 'react';
import { Text, StatusBar, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Donut, FocusAwareStatusBar } from '../components';
import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';

export default function StatsScreen() {
  return (
    <ScrollView style={styles.container}>
      <FocusAwareStatusBar barStyle='dark-content' />
      <LinearGradient
        colors={['#0ea5e9', '#7dd3fc']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          shadowColor: '#171717',
          shadowOffset: { width: -3, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          backgroundColor: 'skyblue',
        }}
        className='p-4 rounded-2xl flex flex-row items-center justify-between'
      >
        <View className=''>
          <Feather name='user-plus' size={36} color='white' />
          <Text className='font-bold text-[24px] my-2 text-white'>15</Text>
          <Text className='text-gray-100 text-[20px] font-[600]'>
            Новых покупателей
          </Text>
        </View>
        <Donut
          percentage={40}
          color={'white'}
          delay={500 + 100 * 1}
          max={100}
        />
      </LinearGradient>
      <LinearGradient
        colors={['#22c55e', '#86efac']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          shadowColor: '#171717',
          shadowOffset: { width: -3, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
        className='p-4 mt-8  rounded-2xl flex flex-row items-center justify-between'
      >
        <View className=''>
          <FontAwesome name='shopping-bag' size={36} color='white' />
          <Text className='font-bold text-[24px] my-2 text-white'>33</Text>
          <Text className='text-gray-100 text-[20px] font-[600]'>
            Оформленных заказов
          </Text>
        </View>
        <Donut
          percentage={60}
          color={'white'}
          delay={500 + 100 * 4}
          max={100}
        />
      </LinearGradient>
      <LinearGradient
        colors={['#1f2937', '#4b5563']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          shadowColor: '#171717',
          shadowOffset: { width: -3, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
        className='p-4 mt-8 bg-gray-800 rounded-2xl flex flex-row items-center justify-between'
      >
        <View className=''>
          <AntDesign name='message1' size={36} color='white' />
          <Text className='font-bold text-[24px] my-2 text-white'>113</Text>
          <Text className='text-gray-100 text-[20px] font-[600]'>
            Полученных сообщений
          </Text>
        </View>
        <Donut
          percentage={45}
          color={'white'}
          delay={500 + 100 * 6}
          max={100}
        />
      </LinearGradient>
      <LinearGradient
        colors={['#6366f1', '#c4b5fd']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          shadowColor: '#171717',
          shadowOffset: { width: -3, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
        className='p-4 mt-8  rounded-2xl  '
      >
        <View>
          <Text className='text-[20px] font-semibold text-white mb-2'>
            Компания
          </Text>
        </View>
        <Donut
          className='mx-auto'
          radius={70}
          percentage={70}
          strokeWidth={20}
          color={'white'}
          delay={500 + 100 * 10}
          max={100}
          textHidden={true}
        />
        <View className='items-center'>
          <Text className='text-[18px] font-semibold text-gray-100 my-4'>
            202, 350₽ получено дохода
          </Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight - 20,
    backgroundColor: '#fff',
    padding: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
