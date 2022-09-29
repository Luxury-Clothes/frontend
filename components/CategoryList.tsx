import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedCategory } from '../features/products/products';

const CategoryList = () => {
  const { categories, selectedCategory } = useAppSelector(
    (state) => state.products
  );

  const dispatch = useAppDispatch();

  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        className="my-6 flex-row px-6"
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            activeOpacity={0.5}
            key={index}
            className={`mr-6 ${
              category.toLowerCase() === selectedCategory.toLowerCase() &&
              'border-b pb-1  border-blue-500'
            }`}
            onPress={() => dispatch(setSelectedCategory(category))}
          >
            <Text
              key={index}
              className={`text-gray-500 font-bold text-[16px] ${
                category.toLowerCase() === selectedCategory.toLowerCase() &&
                'text-blue-500'
              }`}
            >
              {category.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;
