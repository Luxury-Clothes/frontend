import {
  StyleSheet,
  View,
  FlatList,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useState, useCallback } from 'react';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = useWindowDimensions().width;

  const onFlatlistUpdate = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);
  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth - 20}
        snapToAlignment="center"
        decelerationRate="fast"
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onFlatlistUpdate}
        renderItem={({ item }) => (
          <Image
            style={[styles.image, { width: windowWidth - 40 }]}
            source={{ uri: item }}
          />
        )}
      />
      <View style={styles.dots}>
        {images.map((image, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: activeIndex === index ? '#d1d1d1' : '#ededed',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 500,
  },
  image: {
    margin: 10,
    height: '100%',
    resizeMode: 'contain',
  },
  dot: {
    height: 10,
    width: 10,
    marginTop: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    backgroundColor: '#ededed',
    margin: 5,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
