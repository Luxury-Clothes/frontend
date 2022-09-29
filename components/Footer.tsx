import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Footer = () => {
  return (
    <>
      <View
        className="px-4 flex-row flex-wrap gap-4 justify-evenly"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Обслуживание клиентов
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Контактная информация
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Регистрация
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Магазины
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Партнеры
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Работайте в Mango
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Mango Outlet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Site map
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Особые дни
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Устойчивое развитие
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center py-4">
        <TouchableOpacity className="mr-4">
          <FontAwesome name="vk" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity className="mr-4">
          <FontAwesome name="facebook" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <FontAwesome name="twitter" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <FontAwesome name="instagram" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <FontAwesome name="pinterest-p" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <FontAwesome name="spotify" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <FontAwesome name="youtube-play" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <FontAwesome name="foursquare" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View className="mt-8 mb-8 items-center">
        <Text className="text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} MANGO Все права защищены
        </Text>
      </View>
    </>
  );
};

export default Footer;
