import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
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
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SendMessage');
                dispatch(setSelectedMessage(item));
              }}
              className='w-full py-4 px-8'
            >
              <View className='flex-row gap-4 items-center'>
                <View className='p-2 rounded-full bg-[#333] items-center justify-center'>
                  {item.subject === 'Вопрос по заказу' ? (
                    <Ionicons
                      name='document-text-outline'
                      size={20}
                      color='white'
                    />
                  ) : item.subject === 'Доставка товара' ? (
                    <MaterialCommunityIcons
                      name='truck-delivery-outline'
                      size={20}
                      color='white'
                    />
                  ) : item.subject === 'Возврат Товара и Средств' ? (
                    <MaterialIcons
                      name='assignment-return'
                      size={20}
                      color='white'
                    />
                  ) : item.subject === 'Оплата & Промо-коды' ? (
                    <SimpleLineIcons
                      name='credit-card'
                      size={20}
                      color='white'
                    />
                  ) : item.subject === 'Наличие товара' ? (
                    <Ionicons name='shirt-outline' size={20} color='white' />
                  ) : item.subject === 'Аккаунт' ? (
                    <Feather name='user' size={20} color='white' />
                  ) : item.subject === 'Юридическая информация' ? (
                    <FontAwesome5 name='user-tie' size={20} color='white' />
                  ) : item.subject ===
                    'СМИ/Корпоративная социальная ответственность' ? (
                    <Foundation name='play-video' size={20} color='white' />
                  ) : (
                    <MaterialCommunityIcons
                      name='dots-horizontal-circle-outline'
                      size={32}
                      color='#333'
                    />
                  )}
                </View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  className='font-semibold text-[24px]'
                >
                  {item.subject}
                </Text>
              </View>
              <View style={{ marginTop: 5 }} className='gap-2'>
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
              </View>
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
