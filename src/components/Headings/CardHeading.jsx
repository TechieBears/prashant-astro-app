import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export default function CardHeading({ 
  titleBlack = 'Our', 
  titleGradient = 'Services', 
  onViewAllPress = () => {} 
}) {
  return (
    <View className="flex-row items-center justify-between w-full pt-2">
      {/* Left Heading */}
      <View className="flex-row items-center">
        <Text className="text-black text-xl font-semibold">{titleBlack} </Text>

        {/* Gradient Text */}
        <MaskedView
          maskElement={
            <Text className="text-xl font-semibold">{titleGradient}</Text>
          }
        >
          <LinearGradient
            colors={['#FFB703', '#FF4E4E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text className="text-xl font-semibold opacity-0">
              {titleGradient}
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>

      {/* Right “View All” button */}
      <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
        <Text className="text-slate-600 text-base font-medium">View All</Text>
      </TouchableOpacity>
    </View>
  );
}
