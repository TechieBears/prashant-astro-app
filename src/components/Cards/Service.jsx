import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ServiceCard = ({ 
  image, 
  title, 
  description, 
  // onPress,
  containerStyle = '' 
}) => {
  return (
    <TouchableOpacity
      // onPress={onPress}
      className={`rounded-2xl overflow-hidden ${containerStyle}`}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={image}
        className="w-full h-72"
        resizeMode="cover"
      >
        {/* Gradient Overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="flex-1 justify-end p-5"
        >
          <Text className="text-white text-2xl font-poppinsBold text-center mb-2">
            {title}
          </Text>
          <Text className="text-white text-sm font-poppins opacity-90 text-center leading-5">
            {description}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ServiceCard;