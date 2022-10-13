import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
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

const width = Dimensions.get('screen').width / 2;

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
      <View className='flex-row bg-white h-[200px]'>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.navigate('SendMessage');
            dispatch(setSelectedSubject('Вопрос по заказу'));
            dispatch(setIsEditable(false));
            dispatch(resetMessage());
          }}
          style={{ width }}
          className='h-[200px] border border-gray-200 justify-center items-center'
        >
          <View className='gap-4 items-center'>
            <MaterialCommunityIcons
              name='file-document-outline'
              size={32}
              color='#333'
            />
            <Text style={{ fontFamily: 'Raleway-Light' }}>
              Вопросы по заказу
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width }}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('SendMessage');
            dispatch(setSelectedSubject('Доставка товара'));
            dispatch(setIsEditable(false));
            dispatch(resetMessage());
          }}
          className='h-[200px] border border-gray-200 justify-center items-center'
        >
          <View className='gap-4 items-center'>
            <MaterialCommunityIcons
              name='truck-delivery-outline'
              size={32}
              color='#333'
            />
            <Text style={{ fontFamily: 'Raleway-Light' }}>Доставка</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className='flex-row justify-center gap-[0px]  bg-white  h-[200px]'>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.navigate('SendMessage');
            dispatch(setSelectedSubject('Возврат Товара и Средств'));
            dispatch(setIsEditable(false));
            dispatch(resetMessage());
          }}
          style={{ width }}
          className='h-[200px] border border-gray-200 justify-center items-center'
        >
          <View className='gap-4 items-center'>
            <MaterialIcons name='assignment-return' size={32} color='#333' />
            <Text style={{ fontFamily: 'Raleway-Light' }}>
              Возврат Товара и Средств
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width }}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('SendMessage');
            dispatch(setSelectedSubject('Оплата & Промо-коды'));
            dispatch(setIsEditable(false));
            dispatch(resetMessage());
          }}
          className='h-[200px] border border-gray-200 justify-center items-center'
        >
          <View className='gap-4 items-center'>
            <SimpleLineIcons name='credit-card' size={32} color='#333' />
            <Text style={{ fontFamily: 'Raleway-Light' }}>
              Оплата & Промо-коды
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className='flex-row justify-center gap-[0px]  bg-white  h-[200px]'>
        <TouchableOpacity
          style={{ width }}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('SendMessage');
            dispatch(setSelectedSubject('Наличие товара'));
            dispatch(setIsEditable(false));
            dispatch(resetMessage());
          }}
          className='h-[200px] border border-gray-200 justify-center items-center'
        >
          <View className='gap-4 items-center'>
            <Ionicons name='shirt-outline' size={32} color='#333' />
            <Text style={{ fontFamily: 'Raleway-Light' }}>Наличие товара</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width }}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('SendMessage');
            dispatch(setSelectedSubject('Аккаунт'));
            dispatch(setIsEditable(false));
            dispatch(resetMessage());
          }}
          className='h-[200px] border border-gray-200 justify-center items-center'
        >
          <View className='gap-4 items-center'>
            <Feather name='user' size={32} color='#333' />
            <Text style={{ fontFamily: 'Raleway-Light' }}>Аккаунт</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className='flex-row justify-center gap-[0px]  bg-white  h-[200px]'>
        <TouchableOpacity
          style={{ width }}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('SendMessage');
            dispatch(setSelectedSubject('Юридическая информация'));
            dispatch(setIsEditable(false));
            dispatch(resetMessage());
          }}
          className='h-[200px] border border-gray-200 justify-center items-center'
        >
          <View className='gap-4 items-center'>
            <FontAwesome5 name='user-tie' size={32} color='#333' />
            <Text style={{ fontFamily: 'Raleway-Light' }}>
              Юридическая информация
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width }}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('SendMessage');
            dispatch(
              setSelectedSubject('СМИ/Корпоративная социальная ответственность')
            );
            dispatch(setIsEditable(false));
            dispatch(resetMessage());
          }}
          className='h-[200px] border border-gray-200 justify-center items-center'
        >
          <View className='gap-4 items-center px-5'>
            <Foundation name='play-video' size={32} color='#333' />
            <Text
              ellipsizeMode='tail'
              numberOfLines={1}
              style={{ fontFamily: 'Raleway-Light', textAlign: 'center' }}
            >
              СМИ/Корпоративная социальная ответственность
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className='flex-row mb-10 bg-white  h-[200px]'>
        <TouchableOpacity
          style={{ width }}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('SendMessage');
            dispatch(setSelectedSubject('Другое'));
            dispatch(setIsEditable(true));
            dispatch(resetMessage());
          }}
          className='h-[200px] border border-gray-200 justify-center items-center'
        >
          <View className='gap-4 items-center'>
            <MaterialCommunityIcons
              name='dots-horizontal-circle-outline'
              size={32}
              color='#333'
            />
            <Text style={{ fontFamily: 'Raleway-Light' }}>Другое</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ContactUsScreen;
