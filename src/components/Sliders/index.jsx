import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import { ArrowLeft01Icon, ArrowRight01Icon } from 'hugeicons-react-native';

const { width } = Dimensions.get('window');

const dummyImages = [
  { id: 1, image: 'https://picsum.photos/800/400?random=1' },
  { id: 2, image: 'https://picsum.photos/800/400?random=2' },
  { id: 3, image: 'https://picsum.photos/800/400?random=3' },
  { id: 4, image: 'https://picsum.photos/800/400?random=4' },
];

const BannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemWidth = width - 40;

  return (
    <View style={{ marginTop: 16, position: 'relative' }}>
      <Carousel
        width={itemWidth}
        height={200}
        data={dummyImages}
        loop
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <FastImage
            source={{ uri: item.image }}
            style={{ width: '100%', height: 200, borderRadius: 12 }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
      />

      {/* Navigation buttons */}
      <View
        style={{
          position: 'absolute',
          top: '50%',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            setActiveIndex((prev) => (prev === 0 ? dummyImages.length - 1 : prev - 1))
          }
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: 8, borderRadius: 999 }}
        >
          <ArrowLeft01Icon color="white" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setActiveIndex((prev) => (prev === dummyImages.length - 1 ? 0 : prev + 1))
          }
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: 8, borderRadius: 999 }}
        >
          <ArrowRight01Icon color="white" size={20} />
        </TouchableOpacity>
      </View>

      {/* Pagination text */}
      <View
        style={{
          position: 'absolute',
          bottom: 8,
          right: 16,
          backgroundColor: 'rgba(0,0,0,0.4)',
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 999,
        }}
      >
        <Text style={{ color: 'white', fontSize: 12 }}>
          {activeIndex + 1}/{dummyImages.length}
        </Text>
      </View>
    </View>
  );
};

export default BannerSlider;
