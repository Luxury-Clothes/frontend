import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const SendMessageScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View className='p-4 bg-[#333] w-full'>
        <Text className='text-white  text-[18px] font-medium'>
          Новое обращение
        </Text>
      </View>
      <View className='items-center px-4 w-full border-b border-gray-200 flex-row gap-2'>
        <Text className='text-[18px] '>Тема:</Text>
        <TextInput
          style={{ fontSize: 18 }}
          value='Доставка товара'
          className=' p-4 w-full'
        />
      </View>
      <View style={{ flex: 1 }} className=' px-4 py-2 '>
        <TextInput
          autoFocus
          placeholder='Ваше сообщение...'
          className='w-full h-full'
          style={{ fontSize: 20 }}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <View className='flex-row mb-8 px-4 items-center gap-4'>
        <TouchableOpacity className='bg-[#333] rounded-3xl py-3 px-10'>
          <Text className='text-white text-[18px]'>Отправить</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name='attach' size={28} color='#555' />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name='delete' size={28} color='#555' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendMessageScreen;
