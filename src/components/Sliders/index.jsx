import React, { useRef, useState } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import { ArrowLeft, ArrowRight } from 'lucide-react-native'; // optional icons
import { Text } from 'react-native';

const { width } = Dimensions.get('window');

const dummyImages = [
  { id: 1, image: 'https://picsum.photos/800/400?random=1' },
  { id: 2, image: 'https://picsum.photos/800/400?random=2' },
  { id: 3, image: 'https://picsum.photos/800/400?random=3' },
  { id: 4, image: 'https://picsum.photos/800/400?random=4' },
];

const BannerSlider = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }) => (
    <FastImage
      source={{ uri: item.image }}
      style={{ width: '100%', height: 200, borderRadius: 12 }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? dummyImages.length - 1 : activeIndex - 1;
    carouselRef.current?.snapToItem(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === dummyImages.length - 1 ? 0 : activeIndex + 1;
    carouselRef.current?.snapToItem(newIndex);
  };

  return (
    <View className="relative mt-4">
      <Carousel
        ref={carouselRef}
        data={dummyImages}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width - 40}
        loop
        onSnapToItem={(index) => setActiveIndex(index)}
      />

      {/* Navigation buttons */}
      <View className="absolute top-1/2 w-full flex-row justify-between px-4">
        <TouchableOpacity
          onPress={handlePrev}
          className="bg-black/40 p-2 rounded-full"
        >
          <ArrowLeft color="white" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          className="bg-black/40 p-2 rounded-full"
        >
          <ArrowRight color="white" size={20} />
        </TouchableOpacity>
      </View>

      {/* Pagination text */}
      <View className="absolute bottom-2 right-4 bg-black/40 px-3 py-1 rounded-full">
        <Text className="text-white text-xs">
          {activeIndex + 1}/{dummyImages.length}
        </Text>
      </View>
    </View>
  );
};

export default BannerSlider;
