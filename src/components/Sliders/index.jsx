import React, { useRef, useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import { ArrowLeft01Icon, ArrowRight01Icon } from 'hugeicons-react-native';

const { width } = Dimensions.get('window');

const dummyImages = [
  { id: 1, image: 'https://i.postimg.cc/nhR4Lt5x/slider.png' },
  { id: 2, image: 'https://i.postimg.cc/nhR4Lt5x/slider.png' },
  { id: 3, image: 'https://i.postimg.cc/nhR4Lt5x/slider.png' },
  { id: 4, image: 'https://i.postimg.cc/nhR4Lt5x/slider.png' },
];

const BannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const itemWidth = width - 45;

  const handlePrevious = () => {
    if (carouselRef.current) {
      const newIndex = activeIndex === 0 ? dummyImages.length - 1 : activeIndex - 1;
      carouselRef.current.scrollTo({ index: newIndex, animated: true });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const newIndex = activeIndex === dummyImages.length - 1 ? 0 : activeIndex + 1;
      carouselRef.current.scrollTo({ index: newIndex, animated: true });
    }
  };

  return (
    <View style={{ marginTop: 16, position: 'relative' }}>
      <Carousel
        ref={carouselRef}
        width={itemWidth}
        height={205}
        data={dummyImages}
        loop
        autoPlay={false}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <FastImage
            source={{ uri: item.image }}
            style={{ width: '100%', height: 205, borderRadius: 12 }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
      />

      {/* Navigation buttons */}
      <View
        style={{
          position: 'absolute',
          top: '50%',
          transform: [{ translateY: -20 }],
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={handlePrevious}
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.4)', 
            padding: 8, 
            borderRadius: 999,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ArrowLeft01Icon color="white" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.4)', 
            padding: 8, 
            borderRadius: 999,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ArrowRight01Icon color="white" size={20} />
        </TouchableOpacity>
      </View>

      {/* Pagination */}
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: 'rgba(0,0,0,0.6)',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 16,
        }}
      >
        <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
          {activeIndex + 1}/{dummyImages.length}
        </Text>
      </View>

      {/* Dot indicators */}
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {dummyImages.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === activeIndex ? 'white' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default BannerSlider;