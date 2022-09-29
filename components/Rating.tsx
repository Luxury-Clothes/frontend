import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <View className="mt-2 flex-row ">
      {rating >= 1 ? (
        <FontAwesome name="star" size={24} style={{ color: '#ffc000' }} />
      ) : rating >= 0.5 ? (
        <FontAwesome
          name="star-half-empty"
          size={24}
          style={{ color: '#ffc000' }}
        />
      ) : (
        <FontAwesome name="star-o" size={24} style={{ color: '#ffc000' }} />
      )}
      {rating >= 2 ? (
        <FontAwesome name="star" size={24} style={{ color: '#ffc000' }} />
      ) : rating >= 1.5 ? (
        <FontAwesome
          name="star-half-empty"
          size={24}
          style={{ color: '#ffc000' }}
        />
      ) : (
        <FontAwesome name="star-o" size={24} style={{ color: '#ffc000' }} />
      )}
      {rating >= 3 ? (
        <FontAwesome name="star" size={24} style={{ color: '#ffc000' }} />
      ) : rating >= 2.5 ? (
        <FontAwesome
          name="star-half-empty"
          size={24}
          style={{ color: '#ffc000' }}
        />
      ) : (
        <FontAwesome name="star-o" size={24} style={{ color: '#ffc000' }} />
      )}
      {rating >= 4 ? (
        <FontAwesome name="star" size={24} style={{ color: '#ffc000' }} />
      ) : rating >= 3.5 ? (
        <FontAwesome
          name="star-half-empty"
          size={24}
          style={{ color: '#ffc000' }}
        />
      ) : (
        <FontAwesome name="star-o" size={24} style={{ color: '#ffc000' }} />
      )}
      {rating >= 5 ? (
        <FontAwesome name="star" size={24} style={{ color: '#ffc000' }} />
      ) : rating >= 4.5 ? (
        <FontAwesome
          name="star-half-empty"
          size={24}
          style={{ color: '#ffc000' }}
        />
      ) : (
        <FontAwesome name="star-o" size={24} style={{ color: '#ffc000' }} />
      )}
    </View>
  );
};

export default Rating;
