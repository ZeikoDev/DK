import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ImageSourcePropType,
} from 'react-native';
import { COLORS, SIZES } from '../styles/theme';
import ClubCard from './ClubCard';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.85;
const ITEM_MARGIN = SIZES.padding / 2;
const OFFSET = (width - ITEM_WIDTH) / 2;

type Club = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  rating: number;
  price: string;
  distance: string;
  openTime: string;
  capacity: number;
  location?: string;
};

type SimpleCarouselProps = {
  data: Club[];
  onSnapToItem?: (index: number) => void;
  navigation?: any;
};

const SimpleCarousel: React.FC<SimpleCarouselProps> = ({ data, onSnapToItem, navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      if (newIndex !== undefined && newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        if (onSnapToItem) {
          onSnapToItem(newIndex);
        }
      }
    }
  }).current;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (ITEM_WIDTH + ITEM_MARGIN));
    if (index !== activeIndex) {
      setActiveIndex(index);
      if (onSnapToItem) {
        onSnapToItem(index);
      }
    }
  };

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: (ITEM_WIDTH + ITEM_MARGIN) * index,
    index,
  });

  const renderItem = ({ item }: { item: Club }) => {
    return (
      <View style={{ width: ITEM_WIDTH, marginHorizontal: ITEM_MARGIN / 2 }}>
        <ClubCard club={item} navigation={navigation} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + ITEM_MARGIN}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: OFFSET - ITEM_MARGIN / 2 }}
        onScroll={handleScroll}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={getItemLayout}
        initialScrollIndex={0}
        maxToRenderPerBatch={3}
        windowSize={5}
      />

      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={`dot-${index}`}
            style={[styles.paginationDot, activeIndex === index ? styles.paginationDotActive : {}]}
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

export default SimpleCarousel;
