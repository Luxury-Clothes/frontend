import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { months } from './OrdersScreen';
import { setSelectedProduct } from '../features/products/products';

const OrderScreen = () => {
  const { selectedOrder } = useAppSelector((state) => state.orders);

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const renderProducts = (product) => {
    return (
      <TouchableOpacity
        key={product.id}
        onPress={() => {
          // @ts-ignore
          navigation.navigate('Details');
          dispatch(setSelectedProduct(product));
        }}
        style={{
          width: '100%',
          height: 200,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 10,
            marginRight: 22,
          }}
          className='bg-gray-200/60'
        >
          <Image
            source={{ uri: product.image }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: '#000',
                fontWeight: '600',
                letterSpacing: 1,
              }}
            >
              {product.title}
            </Text>
            <View
              style={{
                marginTop: 4,
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                opacity: 0.6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '100%',
                  marginRight: 4,
                }}
              >
                {product.price > 1000
                  ? `${Math.floor(product.price / 1000)} ${
                      product.price % 1000
                    }`
                  : product.price}{' '}
                руб.
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text>Количество: {product.quantity}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            fontWeight: '700',
            letterSpacing: 1,
            paddingTop: 16,
            paddingLeft: 16,
            marginBottom: 10,
          }}
        >
          Заказ от {new Date(selectedOrder.created_at).getUTCDate()}{' '}
          {months[new Date(selectedOrder.created_at).getMonth()]}
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          {selectedOrder.products
            ? selectedOrder.products.map(renderProducts)
            : null}
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Адрес доставки
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                    borderRadius: 10,
                    marginRight: 18,
                  }}
                >
                  <MaterialCommunityIcons
                    name='truck-delivery-outline'
                    style={{
                      fontSize: 18,
                      color: '#333',
                    }}
                  />
                </View>
                <View style={{ flex: 1 }} className='justify-center '>
                  <Text
                    style={{
                      fontFamily: 'Raleway-Regular',
                      fontSize: 14,
                      color: '#000',
                      fontWeight: '500',
                    }}
                  >
                    {selectedOrder.address}
                  </Text>
                  <View className='flex-row items-center gap-1'>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#000',
                        fontWeight: '400',
                        lineHeight: 20,
                        opacity: 0.5,
                      }}
                    >
                      {selectedOrder.postal_code}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Raleway-Regular',
                        fontSize: 12,
                        color: '#000',
                        fontWeight: '400',
                        lineHeight: 20,
                        opacity: 0.5,
                      }}
                    >
                      {selectedOrder.city}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <View className='flex-row justify-between items-center mb-5 '>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  fontWeight: '500',
                  letterSpacing: 1,
                }}
              >
                Информация о заказе
              </Text>
              <View className='text-[16px] flex-row items-center text-sm bg-blue-500 py-1 px-2 rounded-[30px] text-white'>
                <Text className='text-white'>Оплачено</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: '#000',
                  opacity: 0.5,
                }}
              >
                Всего
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: '#000',
                }}
              >
                {selectedOrder.total_price} руб.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderScreen;
