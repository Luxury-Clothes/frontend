import { View, Image, Text, TouchableOpacity } from 'react-native';

interface HomeScreenCartProps {
  title: string;
  image: string;
}

const HomeScreenCard: React.FC<HomeScreenCartProps> = ({ title, image }) => {
  return (
    <View className="relative mt-1">
      <View className="absolute w-full h-full z-[10] bg-black/30"></View>
      <Image
        style={{ resizeMode: 'cover', width: '100%', height: 500 }}
        source={{
          uri: image,
        }}
      />
      <Text
        style={{
          position: 'absolute',
          zIndex: 20,
          fontWeight: '600',
          letterSpacing: 1,
          fontSize: 28,
          bottom: '20%',
          width: '60%',
          left: '15%',
          color: 'white',
          fontFamily: 'Raleway-Bold',
        }}
      >
        {title}
      </Text>
      <TouchableOpacity className="text-white border-b border-b-white z-[20] absolute bottom-[12%] left-[15%]">
        <Text style={{ fontFamily: 'Raleway-Regular' }} className="text-white">
          Узнать больше
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreenCard;
