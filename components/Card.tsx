import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { IProduct } from '../interfaces';
import { setSelectedProduct } from '../features/products/products';
import { useAppDispatch } from '../app/hooks';

const width = Dimensions.get('screen').width / 2;

interface CardProps {
  product: IProduct;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // @ts-ignore
        navigation.navigate('Details');
        dispatch(setSelectedProduct(product));
      }}
      activeOpacity={0.5}
      className="mb-5 mr-[2px]"
      style={{ width, borderRadius: 10 }}
    >
      <View className="items-center">
        <Image
          className="h-[270px]"
          style={{ resizeMode: 'contain', width }}
          source={{ uri: product.image }}
        />
      </View>
      <View className="p-2">
        <View className="flex-row justify-between">
          <Text className="uppercase font-semibold text-[#333]">New now</Text>
          <TouchableOpacity>
            <AntDesign name="hearto" size={16} color="gray" />
          </TouchableOpacity>
        </View>
        <Text
          numberOfLines={1}
          style={{
            color: '#666',
            marginTop: 4,
            fontFamily: 'Raleway-Regular',
            fontSize: 16,
          }}
        >
          {product.title}
        </Text>
        <Text style={{ marginTop: 4, color: '#777', fontSize: 16 }}>
          {product.price > 1000
            ? `${Math.floor(product.price / 1000)} ${product.price % 1000}`
            : product.price}{' '}
          руб.
        </Text>
        <Text style={{ marginTop: 4, color: '#777', fontSize: 12 }}>
          6 цвета
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
