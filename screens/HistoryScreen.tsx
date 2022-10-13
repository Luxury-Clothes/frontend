import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useEffect } from 'react';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
  Feather,
  FontAwesome5,
  Foundation,
} from '@expo/vector-icons';
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useNavigation } from '@react-navigation/native';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getMessages, setSelectedMessage } from '../features/messages/messages';

const width = Dimensions.get('screen').width;

const HistoryScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  const navigation = useNavigation();

  const { messages, loading } = useAppSelector((state) => state.messages);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {messages.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
          keyExtractor={(item) => item.id}
          data={messages}
          ListFooterComponent={<View>{loading && <ActivityIndicator />}</View>}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SendMessage');
                dispatch(setSelectedMessage(item));
              }}
              style={{
                width,
              }}
              className={`py-4 px-6 border-gray-200 ${
                index === 0
                  ? 'border-t'
                  : index === messages.length - 1
                  ? 'border-b'
                  : 'border'
              }  ${!item.is_send && 'bg-gray-100/70'}`}
            >
              <View className='flex-row items-center  gap-4'>
                <View className='rounded-full p-3 flex items-center justify-center border border-gray-200'>
                  {item.subject === 'Вопрос по заказу' ? (
                    <MaterialCommunityIcons
                      name='file-document-outline'
                      size={32}
                      color='#333'
                    />
                  ) : item.subject === 'Доставка товара' ? (
                    <MaterialCommunityIcons
                      name='truck-delivery-outline'
                      size={32}
                      color='#333'
                    />
                  ) : item.subject === 'Возврат Товара и Средств' ? (
                    <MaterialIcons
                      name='assignment-return'
                      size={32}
                      color='#333'
                    />
                  ) : item.subject === 'Оплата & Промо-коды' ? (
                    <SimpleLineIcons
                      name='credit-card'
                      size={32}
                      color='#333'
                    />
                  ) : item.subject === 'Наличие товара' ? (
                    <Ionicons name='shirt-outline' size={32} color='#333' />
                  ) : item.subject === 'Аккаунт' ? (
                    <Feather name='user' size={32} color='#333' />
                  ) : item.subject === 'Юридическая информация' ? (
                    <FontAwesome5 name='user-tie' size={32} color='#333' />
                  ) : item.subject ===
                    'СМИ/Корпоративная социальная ответственность' ? (
                    <Foundation name='play-video' size={32} color='#333' />
                  ) : (
                    <MaterialCommunityIcons
                      name='dots-horizontal-circle-outline'
                      size={32}
                      color='#333'
                    />
                  )}
                </View>
                <View className='flex justify-evenly w-4/5 gap-1'>
                  <View className='flex-row justify-between'>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode='tail'
                      className='w-[60%] font-semibold text-[16px]'
                    >
                      {item.subject}
                    </Text>
                    <Text>
                      {formatRelative(new Date(item.updated_at), new Date(), {
                        locale: ru,
                      })}
                    </Text>
                  </View>
                  <View className='justify-between'>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode='tail'
                      style={{ fontFamily: 'Raleway-Light' }}
                      className='text-gray-600  font-light text-[18px]'
                    >
                      {item.message}
                    </Text>
                    {/* <Text className='text-sm inline float-left'>
                      {item.is_send ? 'Отправлено' : 'Черновик'}
                    </Text> */}
                  </View>
                </View>
              </View>
              {/* <View style={{ marginTop: 5 }} className='gap-2'>
                <Text
                  numberOfLines={3}
                  ellipsizeMode='tail'
                  style={{ fontFamily: 'Raleway-Light' }}
                  className='text-gray-500 font-light text-[18px]'
                >
                  {item.message}
                </Text>
                <View className='flex-row justify-between'>
                  <Text>{item.is_send ? 'Отправлено' : 'Черновик'}</Text>
                  <Text className='self-end'>
                    {formatRelative(new Date(item.updated_at), new Date(), {
                      locale: ru,
                    })}
                  </Text>
                </View>
              </View> */}
            </TouchableOpacity>
          )}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text className='text-[20px] font-semibold'>Пока что тут пусто</Text>
        </View>
      )}
    </View>
  );
};

export default HistoryScreen;
