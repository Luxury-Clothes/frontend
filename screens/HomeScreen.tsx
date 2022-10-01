import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";

import { HomeScreenCard, Footer } from "../components";

const HomeScreen = () => {
  return (
    <ScrollView className="bg-white" style={{ flex: 1 }}>
      <View className="relative">
        <View className="absolute w-full h-full z-[10] bg-black/30"></View>
        <Image
          style={{ resizeMode: 'cover', width: '100%', height: 500 }}
          source={{
            uri: 'https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_newnow_0109.jpg?imwidth=1440&imdensity=2',
          }}
        />
        <View className="absolute w-full h-full z-[20] items-center justify-center ">
          <Text
            style={{
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: 1,
              fontSize: 32,
              color: 'white',
              fontFamily: 'Raleway-Bold',
            }}
          >
            The Office
          </Text>
          <Text
            style={{
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: 1,
              fontSize: 32,
              color: 'white',
              fontFamily: 'Raleway-Bold',
            }}
          >
            Etiquette
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          className="bg-white p-3 px-5 z-[20] absolute bottom-10 left-[35%]"
        >
          <Text style={{ fontFamily: 'Raleway-Regular' }}>Узнать больше</Text>
        </TouchableOpacity>
      </View>

      <HomeScreenCard
        title="Coat Time"
        image="https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_coattime_1909.jpg?imwidth=479&imdensity=2&impolicy=set_13"
      />
      <HomeScreenCard
        title="Key Trends"
        image="https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_keytrends_1909.jpg?imwidth=479&imdensity=2&impolicy=set_13"
      />

      <HomeScreenCard
        title="Базовые вещи"
        image="https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_basicos_1909.jpg?imwidth=479&imdensity=2&impolicy=set_13"
      />
      <HomeScreenCard
        title="Платья и комбинезоны"
        image="https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_vestidos_1909.jpg?imwidth=479&imdensity=2&impolicy=set_13"
      />
      <HomeScreenCard
        title="Брюки"
        image="https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_pantalones_1909.jpg?imwidth=479&imdensity=2&impolicy=set_13"
      />
      <HomeScreenCard
        title="Сумки"
        image="https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_bolsos_1909.jpg?imwidth=479&imdensity=2&impolicy=set_13"
      />

      <Footer />
    </ScrollView>
  );
};

export default HomeScreen;
