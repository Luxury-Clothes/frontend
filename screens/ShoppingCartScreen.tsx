import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  removeProduct,
  incrementProduct,
  decrementProduct,
  createPaymentIntent,
  clearCart,
} from '../features/cart/cart';

const MyCart = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const { cartItems, total, subtotal, tax, clientSecret } = useAppSelector(
    (state) => state.cart
  );

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const initializePaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });
    // console.log('success');
    if (error) {
      Alert.alert('error');
    }
  };

  useEffect(() => {
    if (clientSecret) {
      initializePaymentSheet();
      openPaymentSheet();
    }
  }, [clientSecret]);

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your payment is confirmed!', [], {
        onDismiss: () => console.warn('later'),
      });
      dispatch(clearCart());
      // @ts-ignore
      navigation.navigate('Products');
    }
  };

  const checkOut = () => {
    dispatch(createPaymentIntent(total));
  };

  const renderProducts = (product) => {
    return (
      <TouchableOpacity
        key={product.id}
        // @ts-ignore
        onPress={() => navigation.navigate('Details', { product })}
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
          className="bg-gray-200/90"
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
              <Text>
                (~
                {product.price + 50 > 1000
                  ? `${Math.floor((product.price + 50) / 1000)} ${
                      (product.price + 50) % 1000 < 100
                        ? `0${(product.price + 50) % 1000}`
                        : (product.price + 50) % 1000
                    }`
                  : product.price}{' '}
                руб.)
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
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => dispatch(decrementProduct(product))}
                style={{
                  borderRadius: 100,
                  marginRight: 10,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: '#b9b9b9',
                  opacity: 0.5,
                }}
              >
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: '#777',
                  }}
                />
              </TouchableOpacity>
              <Text>{product.quantity}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => dispatch(incrementProduct(product))}
                style={{
                  borderRadius: 100,
                  marginLeft: 10,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: '#b9b9b9',
                  opacity: 0.5,
                }}
              >
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: '#777',
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => dispatch(removeProduct(product))}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: '#777',
                  backgroundColor: '#f0f0f3',
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
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
        {/* <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: 'center',
            position: 'relative',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, left: 20 }}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,

                color: '#777',
                padding: 8,
                backgroundColor: '#f0f0f3',
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
              fontWeight: '600',
            }}
          >
            Order Details
          </Text>
          <View></View>
        </View> */}
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            fontWeight: '500',
            letterSpacing: 1,
            paddingTop: 16,
            paddingLeft: 16,
            marginBottom: 10,
          }}
        >
          Моя Корзина
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          {cartItems ? cartItems.map(renderProducts) : null}
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
                    name="truck-delivery-outline"
                    style={{
                      fontSize: 18,
                      color: '#0043f9',
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontWeight: '500',
                    }}
                  >
                    2 Petre Melikishvili St.
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#000',
                      fontWeight: '400',
                      lineHeight: 20,
                      opacity: 0.5,
                    }}
                  >
                    0162, Tbilisi
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{ fontSize: 22, color: '#000' }}
              />
            </View>
          </View>
          {/* <View
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
              Payment Method
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
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '900',
                      color: '#0043f9',
                      letterSpacing: 1,
                    }}
                  >
                    VISA
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontWeight: '500',
                    }}
                  >
                    Visa Classic
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#000',
                      fontWeight: '400',
                      lineHeight: 20,
                      opacity: 0.5,
                    }}
                  >
                    ****-9092
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{ fontSize: 22, color: '#000' }}
              />
            </View>
          </View> */}
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 40,
              marginBottom: 20,
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
              Информация о заказе
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
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
                Промежуточный итог
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: '#000',
                  opacity: 0.8,
                }}
              >
                {subtotal}.00 руб.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 22,
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
                Доставка
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: '#000',
                  opacity: 0.8,
                }}
              >
                {tax} руб.
              </Text>
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
                {total} руб.
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => (total != 0 ? checkOut() : null)}
          className="mx-4 bg-[#333] justify-center items-center  mb-10 p-4 mt-4"
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Raleway-Bold',
              color: '#fff',
            }}
          >
            Оплатить
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => (total != 0 ? checkOut() : null)}
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
            CHECKOUT (${total} )
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default MyCart;
