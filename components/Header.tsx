import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { Ionicons, Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSearchTerm, setIsFilterOpen } from "../features/products/products";

const Header = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const { searchTerm } = useAppSelector((state) => state.products);

  return (
    <View style={{ backgroundColor: 'white' }}>
      <View
        style={{
          height: 100,
          paddingTop: 50,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.getParent('LeftDrawer').openDrawer()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
          }}
        >
          <Ionicons name="menu-outline" size={28} color="gray" />
          <Text style={{ fontSize: 12, fontFamily: 'Raleway-Regular' }}>
            Меню
          </Text>
        </TouchableOpacity>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={{
              resizeMode: 'contain',
              height: 50,
              width: 100,
            }}
            source={require('./img/logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            user
              ? // @ts-ignore
                navigation.getParent('RightDrawer').openDrawer()
              : // @ts-ignore
                navigation.navigate('Login')
          }
          style={{ marginLeft: 'auto' }}
        >
          <Feather name="user" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View className="w-full h-[1px] bg-gray-200 my-2"></View>
      {route.name !== 'Login' &&
        route.name !== 'Register' &&
        route.name !== 'ShoppingCart' && (
          <View
            style={{
              height: 40,
              paddingHorizontal: 20,
              paddingBottom: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{ borderRadius: 4 }}
              className="flex-row w-[90%] h-full pl-2 items-center bg-gray-100/90"
            >
              <AntDesign name="search1" size={20} color="gray" />
              <TextInput
                placeholder="Искать"
                style={{ fontFamily: 'Raleway-Regular' }}
                value={searchTerm}
                onChangeText={(text) => dispatch(setSearchTerm(text))}
                className="ml-2 font-semibold text-[16px] flex-1"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                dispatch(setIsFilterOpen(true));
              }}
              style={{ marginLeft: 'auto' }}
            >
              <FontAwesome name="sort-alpha-asc" size={20} color="#666" />
              {/* <Ionicons name="filter-outline" size={24} color="gray" /> */}
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
};

export default Header;
