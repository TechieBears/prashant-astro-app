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
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.95)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <View className="p-4 flex-1 justify-end">
            <Text className="text-white text-lg font-poppinsMedium text-center">
              {title}
            </Text>
            <Text className="text-white text-xs font-poppins opacity-90 text-center leading-4">
              {description}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ServiceCard;