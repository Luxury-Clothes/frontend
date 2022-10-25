import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
  Feather,
  FontAwesome5,
  Foundation,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch } from '../app/hooks';
import {
  setSelectedSubject,
  setIsEditable,
  resetMessage,
} from '../features/messages/messages';

const width = Dimensions.get('screen').width / 2 - 20;

const ContactUsScreen = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
        marginTop: -8,
      }}
    >
      <View className='flex-row bg-white pt-4'>
        <View
          style={{
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <LinearGradient
            // colors={['white', 'white']}
            colors={['#202639', '#3f4c77']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              width,
              margin: 10,
            }}
            className='h-[190px]  justify-center items-center rounded-lg'
          >
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SendMessage');
                dispatch(setSelectedSubject('Вопрос по заказу'));
                dispatch(setIsEditable(false));
                dispatch(resetMessage());
              }}
            >
              <View className='gap-2 items-center'>
                <MaterialCommunityIcons
                  name='file-document-outline'
                  size={60}
                  color='white'
                />
                <Text
                  style={{
                    color: 'white',

                    fontWeight: '600',
                  }}
                >
                  Вопросы по заказу
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View
          style={{
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <LinearGradient
            // colors={['white', 'white']}
            colors={['#202639', '#3f4c77']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              width,
              margin: 10,
            }}
            className='h-[190px]  justify-center items-center rounded-lg'
          >
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SendMessage');
                dispatch(setSelectedSubject('Доставка товара'));
                dispatch(setIsEditable(false));
                dispatch(resetMessage());
              }}
            >
              <View className='gap-2 items-center'>
                <MaterialCommunityIcons
                  name='truck-delivery-outline'
                  size={60}
                  color='white'
                />
                <Text style={{ color: 'white', fontWeight: '600' }}>
                  Доставка
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      <View className='flex-row bg-white'>
        <View
          style={{
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <LinearGradient
            // colors={['white', 'white']}
            colors={['#202639', '#3f4c77']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              width,
              margin: 10,
            }}
            className='h-[190px]  justify-center items-center rounded-lg'
          >
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SendMessage');
                dispatch(setSelectedSubject('Возврат Товара и Средств'));
                dispatch(setIsEditable(false));
                dispatch(resetMessage());
              }}
              style={{ padding: 10 }}
            >
              <View className='gap-2 items-center'>
                <MaterialIcons
                  name='assignment-return'
                  size={60}
                  color='white'
                />
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: '600',
                  }}
                >
                  Возврат товара и средств
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View
          style={{
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <LinearGradient
            // colors={['white', 'white']}
            colors={['#202639', '#3f4c77']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              width,
              margin: 10,
            }}
            className='h-[190px]  justify-center items-center rounded-lg'
          >
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SendMessage');
                dispatch(setSelectedSubject('Оплата & Промо-коды'));
                dispatch(setIsEditable(false));
                dispatch(resetMessage());
              }}
            >
              <View className='gap-2 items-center'>
                <SimpleLineIcons name='credit-card' size={60} color='white' />
                <Text style={{ color: 'white', fontWeight: '600' }}>
                  Оплата & Промо-коды
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      <View className='flex-row bg-white'>
        <View
          style={{
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <LinearGradient
            // colors={['white', 'white']}
            colors={['#202639', '#3f4c77']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              width,
              margin: 10,
            }}
            className='h-[190px]  justify-center items-center rounded-lg'
          >
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SendMessage');
                dispatch(setSelectedSubject('Наличие товара'));
                dispatch(setIsEditable(false));
                dispatch(resetMessage());
              }}
            >
              <View className='gap-2 items-center'>
                <Ionicons name='shirt-outline' size={60} color='white' />
                <Text style={{ color: 'white', fontWeight: '600' }}>
                  Наличие товара
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View
          style={{
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <LinearGradient
            // colors={['white', 'white']}
            colors={['#202639', '#3f4c77']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              width,
              margin: 10,
            }}
            className='h-[190px]  justify-center items-center rounded-lg'
          >
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SendMessage');
                dispatch(setSelectedSubject('Аккаунт'));
                dispatch(setIsEditable(false));
                dispatch(resetMessage());
              }}
            >
              <View className='gap-2 items-center'>
                <Feather name='user' size={60} color='white' />
                <Text style={{ color: 'white', fontWeight: '600' }}>
                  Аккаунт
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      <View className='flex-row bg-white'>
        <View
          style={{
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <LinearGradient
            // colors={['white', 'white']}
            colors={['#202639', '#3f4c77']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              width,
              margin: 10,
            }}
            className='h-[190px]  justify-center items-center rounded-lg'
          >
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SendMessage');
                dispatch(setSelectedSubject('Юридическая информация'));
                dispatch(setIsEditable(false));
                dispatch(resetMessage());
              }}
            >
              <View className='gap-2 items-center p-[10px]'>
                <FontAwesome5 name='user-tie' size={60} color='white' />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}
                >
                  Юридическая информация
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View
          style={{
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <LinearGradient
            // colors={['white', 'white']}
            colors={['#202639', '#3f4c77']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              width,
              margin: 10,
            }}
            className='h-[190px]  justify-center items-center rounded-lg'
          >
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SendMessage');
                dispatch(
                  setSelectedSubject(
                    'СМИ/Корпоративная социальная ответственность'
                  )
                );
                dispatch(setIsEditable(false));
                dispatch(resetMessage());
              }}
            >
              <View className='gap-2 items-center p-[10]'>
                <Foundation name='play-video' size={60} color='white' />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}
                >
                  СМИ/Корпоративная социальная ответственность
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      <View className='flex-row bg-white'>
        <View
          style={{
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <LinearGradient
            // colors={['white', 'white']}
            colors={['#202639', '#3f4c77']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              width,
              margin: 10,
            }}
            className='h-[190px]  justify-center items-center rounded-lg'
          >
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SendMessage');
                dispatch(setSelectedSubject('Другое'));
                dispatch(setIsEditable(true));
                dispatch(resetMessage());
              }}
            >
              <View className='gap-2 items-center p-[10px]'>
                <MaterialCommunityIcons
                  name='dots-horizontal-circle-outline'
                  size={60}
                  color='white'
                />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}
                >
                  Другое
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactUsScreen;
