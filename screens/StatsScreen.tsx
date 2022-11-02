import { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Donut, FocusAwareStatusBar } from '../components';
import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';

import { fullMonths } from '../config/utils';
import { getStats } from '../features/admin/admin';
import { useAppSelector, useAppDispatch } from '../app/hooks';

const screenWidth = Dimensions.get('window').width - 40;

export default function StatsScreen() {
  const { categories } = useAppSelector((state) => state.products);

  const {
    loading,
    newUsers,
    oldUsers,
    newOrders,
    oldOrders,
    newMessages,
    oldMessages,
    totalEarnings,
    categoriesStats,
    monthlyEarnings,
  } = useAppSelector((state) => state.admin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStats());
  }, []);

  const formatter = Intl.NumberFormat('ru', { notation: 'standard' });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  const earningsArray = [
    ...categoriesStats.map((c) => {
      return +(parseInt(c.sum) / 1000).toFixed(2);
    }),
  ];
  const amountArray = [
    ...categoriesStats.map((c) => {
      return parseInt(c.amount);
    }),
  ];

  const labels = [...categoriesStats.map((c) => c.category.split(' ')[0])];

  const data = {
    labels,
    datasets: [
      {
        data: amountArray,
      },
    ],
  };

  const monthlyEarningsData = {
    labels: [
      'Сентябрь',
      ...monthlyEarnings.map((m) => fullMonths[+m.month - 1]),
    ],
    datasets: [
      {
        data: [
          53.6,
          ...monthlyEarnings.map((m) => +(+m.sum / 1000).toFixed(2)),
        ],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <FocusAwareStatusBar barStyle='dark-content' />

      <LinearGradient
        colors={['#2196f3', '#443fa2']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className='p-4 rounded-2xl flex  items-center justify-between'
      >
        <Donut
          percentage={(newUsers / oldUsers - 1) * 100}
          color={'white'}
          // delay={500 + 100 * 1}
          strokeWidth={5}
          radius={60}
          max={100}
        />
        <View className='items-center'>
          <Text className='font-[300] text-[20px] mt-4 text-white'>
            {newUsers}
          </Text>
          <Text className='text-gray-100 text-[16px] font-[300]'>
            Покупателей
          </Text>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={['#43a047', '#2196f3']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className='p-4 mt-8 rounded-2xl  items-center justify-between'
      >
        <Donut
          percentage={(newOrders / oldOrders - 1) * 100}
          color={'white'}
          radius={60}
          strokeWidth={5}
          // delay={500 + 100 * 4}
          max={100}
        />
        <View className='items-center'>
          <Text className='font-[300] text-[20px] mt-4 text-white'>
            {newOrders}
          </Text>
          <Text className='text-gray-100 text-[16px] font-[300]'>Заказов</Text>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={['#ff9800', '#ff6384']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className='p-4 mt-8 bg-gray-800 rounded-2xl  items-center justify-between'
      >
        <Donut
          percentage={(newMessages / oldMessages - 1) * 100}
          color={'white'}
          radius={60}
          // delay={500 + 100 * 6}
          strokeWidth={5}
          max={100}
        />
        <View className='items-center'>
          <Text className='font-[300] text-[20px] mt-4 text-white'>
            {newMessages}
          </Text>
          <Text className='text-gray-100 text-[16px] font-[300]'>
            Сообщений
          </Text>
        </View>
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
        className='p-4 mt-8 mb-4  rounded-2xl  '
      >
        <View>
          <Text className='text-[20px] font-semibold text-white mb-2'>
            Компания
          </Text>
        </View>
        <Donut
          className='mx-auto'
          radius={70}
          percentage={totalEarnings / 10000}
          strokeWidth={20}
          color={'white'}
          delay={500 + 100 * 10}
          max={100}
          textHidden={true}
        />
        <View className='items-center'>
          <Text className='text-[18px] font-semibold text-gray-100 my-4'>
            {formatter.format(totalEarnings)}₽ получено дохода
          </Text>
        </View>
      </LinearGradient>

      <LineChart
        data={{
          labels: [...categoriesStats.map((c) => c.category.split(' ')[0])],
          datasets: [
            {
              data:
                earningsArray.length > 0
                  ? earningsArray
                  : [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
            },
          ],
        }}
        width={screenWidth} // from react-native
        height={200}
        yAxisLabel='₽'
        yAxisSuffix='k'
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          propsForLabels: { scale: 0.9 },
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View className='mt-4'>
        <BarChart
          style={{ borderRadius: 16 }}
          data={data}
          width={screenWidth}
          yAxisLabel=''
          yAxisSuffix=' шт.'
          height={200}
          chartConfig={{
            propsForLabels: { scale: 0.9 },
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#10b981',
            backgroundGradientTo: '#34d399',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        />
      </View>
      <View className='mt-4'>
        <BarChart
          style={{ borderRadius: 16 }}
          data={monthlyEarningsData}
          yAxisLabel='₽'
          yAxisSuffix='k'
          width={screenWidth}
          height={200}
          chartConfig={{
            propsForLabels: { scale: 0.9 },
            decimalPlaces: 2,
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#0ea5e9',
            backgroundGradientTo: '#38bdf8',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        />
      </View>
      <View className='mt-20'></View>
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
