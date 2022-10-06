import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setCity,
  setPostalCode,
  setStreet,
  setStreetNumber,
} from '../features/cart/cart';

const ShippingAddressScreen = () => {
  const { country, street, street_number, city, postal_code } = useAppSelector(
    (state) => state.cart
  );

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 20 }} className="bg-white">
      <Text className=" text-center text-[#444] text-[14px] mb-4">
        Ваш адрес
      </Text>
      <View className="py-2  border-b border-gray-400">
        <Text className="text-[#444] text-[14px]">{country}</Text>
      </View>
      <TextInput
        style={{ marginTop: 32 }}
        value={street}
        onChangeText={(text) => dispatch(setStreet(text))}
        placeholder="Улица *"
        className="py-2 border-b border-gray-400 text-[#444] text-[14px]"
      />
      <TextInput
        style={{ marginTop: 32 }}
        value={street_number as string}
        keyboardType="numeric"
        onChangeText={(text) => dispatch(setStreetNumber(text))}
        placeholder="Дом *"
        className="py-2  border-b border-gray-400 text-[#444] text-[14px]"
      />
      <TextInput
        style={{ marginTop: 32 }}
        placeholder="Квартира"
        className="py-2 border-b border-gray-400 text-[#444] text-[14px]"
      />
      <TextInput
        style={{ marginTop: 32 }}
        keyboardType="numeric"
        value={postal_code as string}
        onChangeText={(text) => dispatch(setPostalCode(+text))}
        placeholder="Почтовый индекс *"
        className="py-2  border-b border-gray-400 text-[#444] text-[14px]"
      />
      <TextInput
        style={{ marginTop: 32 }}
        value={city}
        onChangeText={(text) => dispatch(setCity(text))}
        placeholder="Город *"
        className="py-2 border-b border-gray-400 text-[#444] text-[14px]"
      />
      <TouchableOpacity
        style={{ marginTop: 32 }}
        className="w-full bg-[#333]  p-4"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-white text-center">Завершить</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShippingAddressScreen;
