import { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ImageSourcePropType,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 32; // Matches your screen margins
const AUTO_SCROLL_INTERVAL = 3500; // 3.5 seconds per slide

export interface BannerItem {
  header: string;
  subHeader?: string;
  img: ImageSourcePropType;
}

interface ImageBannerProps {
  banners: BannerItem[];
}

export function ImageBanner({ banners }: ImageBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<BannerItem>>(null);
  const isUserInteracting = useRef(false);

  // 1. Auto-scroll Timer Effect
  useEffect(() => {
    if (!banners || banners.length <= 1) return;

    const timer = setInterval(() => {
      // Do not auto-scroll while the user is actively dragging the slider
      if (isUserInteracting.current) return;

      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex >= banners.length - 1 ? 0 : prevIndex + 1;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(timer);
  }, [banners.length]);

  // 2. Track active index when user manually scrolls
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const computedIndex = Math.round(scrollPosition / BANNER_WIDTH);
    if (computedIndex >= 0 && computedIndex < banners.length) {
      setActiveIndex(computedIndex);
    }
  };

  if (!banners || banners.length === 0) return null;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        // Pause timer on touch, resume on release
        onScrollBeginDrag={() => {
          isUserInteracting.current = true;
        }}
        onScrollEndDrag={() => {
          isUserInteracting.current = false;
        }}
        getItemLayout={(_, index) => ({
          length: BANNER_WIDTH,
          offset: BANNER_WIDTH * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Left Content / Header */}
            <View style={styles.textContainer}>
              <Text style={styles.headerText} numberOfLines={2}>
                {item.header}
              </Text>
              {item.subHeader && (
                <Text style={styles.subHeaderText} numberOfLines={2}>
                  {item.subHeader}
                </Text>
              )}
            </View>

            {/* Right Graphic / Image */}
            <View style={styles.imageWrapper}>
              <Image
                source={item.img}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </View>
        )}
      />

      {/* 3. Pagination Dots */}
      {banners.length > 1 && (
        <View style={styles.paginationRow}>
          {banners.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                activeIndex === idx ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: '100%',
  },
  card: {
    width: BANNER_WIDTH,
    height: 140,
    borderRadius: 18,
    backgroundColor: '#FDF1EE', // Soft primary tint
    borderWidth: 1,
    borderColor: '#F8C8BD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1917',
    lineHeight: 24,
  },
  subHeaderText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#78716C',
    marginTop: 4,
  },
  imageWrapper: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 18,
    backgroundColor: '#DE3F1B', // Active brand coral
  },
  inactiveDot: {
    width: 6,
    backgroundColor: '#E7E5E4',
  },
});

export default ImageBanner;