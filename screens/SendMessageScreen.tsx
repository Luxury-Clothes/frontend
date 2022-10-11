import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  setSelectedSubject,
  setMessage,
  sendMessage,
  updateMessage,
  deleteMessage,
} from '../features/messages/messages';

const SendMessageScreen = () => {
  const { selectedSubject, isEditable, message, selectedMessage } =
    useAppSelector((state) => state.messages);
  const dispatch = useAppDispatch();

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View className='p-4 bg-[#333] w-full'>
        <Text className='text-white  text-[18px] font-medium'>
          {selectedMessage ? 'Ваше обращение' : ' Новое обращение'}
        </Text>
      </View>
      <View className='items-center px-4 w-full border-b border-gray-200 flex-row gap-2'>
        <Text className='text-[18px] '>Тема:</Text>
        <TextInput
          style={{ fontSize: 18 }}
          value={selectedSubject}
          editable={isEditable}
          className=' p-4 w-full'
          onChangeText={(text) => dispatch(setSelectedSubject(text))}
        />
      </View>
      <View style={{ flex: 1 }} className=' px-4 py-2 '>
        <TextInput
          autoFocus
          placeholder='Ваше сообщение...'
          className='w-full h-full'
          style={{ fontSize: 20 }}
          editable={selectedMessage ? !selectedMessage.is_send : true}
          value={message}
          onChangeText={(text) => dispatch(setMessage(text))}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      {selectedMessage?.is_send ? null : (
        <View className='flex-row mb-8 px-4 items-center gap-4'>
          <TouchableOpacity
            disabled={
              selectedMessage?.is_send ? selectedMessage?.is_send : false
            }
            onPress={() => {
              if (!selectedMessage) {
                dispatch(
                  sendMessage({
                    message,
                    subject: selectedSubject,
                    is_send: true,
                  })
                );
                Alert.alert('Ваше сообщение отправлено.');
                dispatch(setMessage(''));
                dispatch(setSelectedSubject(''));
                navigation.goBack();
              } else {
                dispatch(
                  updateMessage({
                    message,
                    subject: selectedSubject,
                    is_send: true,
                    id: selectedMessage.id,
                  })
                );
                Alert.alert('Ваше сообщение отправлено.');
                dispatch(setMessage(''));
                dispatch(setSelectedSubject(''));
                navigation.goBack();
              }
            }}
            className='bg-[#333] rounded-3xl py-3 px-10'
          >
            <Text className='text-white text-[18px]'>Отправить</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='attach' size={28} color='#555' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (selectedMessage) {
                dispatch(deleteMessage(selectedMessage.id));
                dispatch(setMessage(''));
                dispatch(setSelectedSubject(''));
                navigation.goBack();
              } else {
                dispatch(setMessage(''));
                dispatch(setSelectedSubject(''));
                navigation.goBack();
              }
            }}
          >
            <AntDesign name='delete' size={28} color='#555' />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SendMessageScreen;
