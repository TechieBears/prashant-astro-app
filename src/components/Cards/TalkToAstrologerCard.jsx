import React from 'react';
import { View, Text, Image } from 'react-native';
import { ArrowRight02Icon } from 'hugeicons-react-native';

export default function TalkToAstrologerCard() {
  return (
    <View className="overflow-hidden rounded-xl self-center h-[90px] flex-row bg-[#FFF4E0]">
      {/* Yellow background (left) */}
      <Image
        source={require('../../assets/icons/yellowEffect.png')}
        className="absolute left-0 w-[70%] h-full opacity-90"
        resizeMode="cover"
      />

      {/* Red background (right) */}
      <Image
        source={require('../../assets/icons/redEffect.png')}
        className="absolute right-0 w-[70%] h-full opacity-90"
        resizeMode="cover"
      />

      {/* Foreground content */}
      <View className="flex-1 flex-row items-center justify-between px-4">
        {/* Left icon */}
        <View className="bg-white p-3 rounded-full">
          <Image
            source={require('../../assets/icons/call.png')}
            className="w-8 h-8"
            resizeMode="contain"
          />
        </View>

        {/* Center text section */}
        <View className="flex-1 mx-6">
          <Text className="text-[#1E293B] text-lg font-[Prociono-Regular]">
            Talk to Astrologer
          </Text>
          <Text className="text-[#64748B] text-sm font-[Prociono-Regular]">
            By adding balance in your wallet
          </Text>
        </View>

        {/* Right arrow */}
        <View className="w-8 items-end">
          <ArrowRight02Icon size={30} color="#314158" />
        </View>
      </View>
    </View>
  );
}
