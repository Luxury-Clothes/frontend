import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useEffect } from 'react';

import { Card, Loader } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getProducts,
  getCategories,
  searchProducts,
  fetchMoreProducts,
  setPage,
} from '../features/products/products';

const ProductsScreen = () => {
  const dispatch = useAppDispatch();

  const { products, selectedCategory, searchTerm, page, loading } =
    useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(searchProducts());
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    if (page !== 1) dispatch(fetchMoreProducts());
  }, [page]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      {loading ? (
        <Loader />
      ) : products.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          numColumns={2}
          keyExtractor={(item) => item.id}
          data={products}
          onEndReachedThreshold={0}
          onEndReached={() => {
            if (!loading) {
              dispatch(setPage(page + 1));
            }
          }}
          ListFooterComponent={<View>{loading && <ActivityIndicator />}</View>}
          renderItem={({ item }) => <Card product={item} />}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="font-bold text-[20px] text-gray-500">
            No products found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductsScreen;
