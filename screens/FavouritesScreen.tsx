import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { useEffect } from 'react';

import { Card } from '../components';
import { getFavourites } from '../features/products/products';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const FavouritesScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const { filteredFavourites: favourites } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getFavourites());
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {favourites.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          numColumns={2}
          keyExtractor={(item) => item.id}
          data={favourites}
          renderItem={({ item }) => (
            <Card navigation={navigation} product={item} />
          )}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="font-bold text-[20px] text-gray-500">
            You have no favourite product yet!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavouritesScreen;
