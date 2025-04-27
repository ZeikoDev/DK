import React, { useRef, useState } from 'react';
import { 
  View, 
  Dimensions, 
  StyleSheet,
  Animated,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { COLORS, SIZES } from '../styles/theme';
import ClubCard from './ClubCard';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.85;
const ITEM_HEIGHT = 280;

type Club = {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: string;
  distance: string;
  openTime: string;
  capacity: number;
  location?: string;
};

type ClubCarouselProps = {
  data: Club[];
  onSnapToItem?: (index: number) => void;
}

const ClubCarousel: React.FC<ClubCarouselProps> = ({ data, onSnapToItem }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }: { item: Club }) => {
    return (
      <ClubCard club={item} />
    );
  };

  const handleSnapToItem = (index: number) => {
    setActiveIndex(index);
    if (onSnapToItem) {
      onSnapToItem(index);
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={handleSnapToItem}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.7}
        activeSlideAlignment="center"
        containerCustomStyle={{paddingVertical: SIZES.padding}}
        loop={true}
        autoplay={true}
        autoplayInterval={5000}
        useScrollView={true}
      />
      
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={`dot-${index}`}
            style={[
              styles.paginationDot,
              activeIndex === index ? styles.paginationDotActive : {}
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.padding,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.padding,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 20,
    backgroundColor: COLORS.secondary,
  },
});

export default ClubCarousel; 