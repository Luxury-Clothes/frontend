import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Footer } from '../components';
import { addProduct } from '../features/cart/cart';

const DetailsScreen = () => {
  const width = Dimensions.get('window').width;

  const { selectedProduct: product } = useAppSelector(
    (state) => state.products
  );

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  const addToCart = async () => {
    Alert.alert('Успешно', `${product.title} успешно добавлена в корзину.`);
    dispatch(addProduct(product));
    // @ts-ignore
    // navigation.navigate('Home');
  };

  //product horizontal scroll product card
  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: '100%',
        }}
      >
        <Image
          source={{ uri: item }}
          style={{
            width: width,
            height: 600,
            resizeMode: 'cover',
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
      }}
    >
      <ScrollView>
        <View
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <FlatList
            data={
              product.images.length !== 0 ? product.images : [product.image]
            }
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />
          <View className="bg-gray-200 text-[#333] p-2 absolute top-5 right-5">
            <Text>
              {product.price > 1000
                ? `${Math.floor(product.price / 1000)} ${product.price % 1000}`
                : product.price}{' '}
              руб.
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              position: 'absolute',
              top: 20,
              left: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {product.images
              ? product.images.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: 6,
                        height: 6,
                        backgroundColor: '#333',
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}
                    ></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
        <View className="w-full p-4 gap-4 flex-row justify-center items-center">
          <TouchableOpacity className="w-4 h-4 bg-purple-200"></TouchableOpacity>
          <TouchableOpacity className="relative">
            <View className="w-4 h-4 bg-orange-100 outline-2 outline-offset-1"></View>
            <View className="absolute w-6 h-6 border-gray-200 border-2 -top-1 -left-1 ]"></View>
          </TouchableOpacity>
          <TouchableOpacity className="w-4 h-4 bg-gray-500"></TouchableOpacity>
          <TouchableOpacity className="w-4 h-4 bg-blue-200"></TouchableOpacity>
        </View>
        <TouchableOpacity className="flex-row items-center justify-between mx-4 p-4 border border-gray-300">
          <Text style={{ fontFamily: 'Raleway-Regular' }}>Выберите размер</Text>
          <Entypo name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity className="mt-4 bg-[#333] p-2 ml-4 justify-center items-center w-12">
          <AntDesign name="hearto" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-center mx-4 p-4 border border-gray-300 mt-4">
          <Text style={{ fontFamily: 'Raleway-Regular' }}>
            Наличие в магазине
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addToCart}
          disabled={!user}
          className="mx-4 bg-[#333] justify-center items-center p-4 mt-4"
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Raleway-Bold',
              color: '#fff',
            }}
          >
            Купить
          </Text>
        </TouchableOpacity>
        <View className="mt-6 mx-4">
          <Text className="uppercase tracking-[1px]  text-[#333]">New Now</Text>
          <Text className="mt-4 text-black text-[16px]">{product.title}</Text>
          <Text
            className="mt-4"
            style={{
              fontSize: 14,
              lineHeight: 22,
              fontFamily: 'Raleway-Regular',
            }}
          >
            {product.tags}
          </Text>
          <Text
            className="mt-4"
            style={{
              fontSize: 14,
              lineHeight: 22,
              fontFamily: 'Raleway-Regular',
            }}
          >
            {product.description}
          </Text>
        </View>
        <View
          style={{ marginLeft: 0, marginTop: 1 }}
          className="flex-row gap-4 items-center"
        >
          <View className="p-2 bg-gray-200">
            <Text
              className="text-[#333]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Женская
            </Text>
          </View>
          <View className="p-2 bg-gray-200">
            <Text
              className="text-[#333]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Рубашки
            </Text>
          </View>
        </View>
        <Footer />
        {/* <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 14,
            }}
          >
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: '#0043f9',
                marginRight: 6,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: '#000',
              }}
            >
              Shopping
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 4,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                letterSpacing: 0.5,
                marginVertical: 4,
                color: '#000',
                maxWidth: '84%',
              }}
            >
              {product.title}
            </Text>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: '#0043f9',
                backgroundColor: '#0043f9' + 10,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              color: '#000',
              fontWeight: '400',
              letterSpacing: 1,
              opacity: 0.5,
              lineHeight: 20,
              maxWidth: '85%',
              maxHeight: 44,
              marginBottom: 18,
            }}
          >
            {product.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 14,
              borderBottomColor: '#f0f0f3',
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: '#f0f0f3',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  borderRadius: 100,
                  marginRight: 10,
                }}
              >
                <Entypo
                  name="location-pin"
                  style={{
                    fontSize: 16,
                    color: '#0043f9',
                  }}
                />
              </View>
              <Text> Rustaveli Ave 57,{'\n'}17-001, Batume</Text>
            </View>
            <Entypo
              name="chevron-right"
              style={{
                fontSize: 22,
                color: '#777',
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                maxWidth: '85%',
                color: '#000',
                marginBottom: 4,
              }}
            >
              $ {product.price}.00
            </Text>
            <Text>
              Tax Rate 2%~ ${product.price / 50} ($
              {product.price + product.price / 50})
            </Text>
          </View>
        </View> */}
      </ScrollView>
      {/* <View
        style={{
          position: 'absolute',
          bottom: 20,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={addToCart}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: '#0043f9',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: '#fff',
              textTransform: 'uppercase',
            }}
          >
            Add to cart
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default DetailsScreen;
