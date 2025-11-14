import React from 'react';
import { View, Text } from 'react-native';
import {
  CalendarLock01Icon,
  Link05Icon,
  OnlineLearning03Icon,
  TimeQuarterIcon,
} from 'hugeicons-react-native';

const ServiceOrderCard = ({ item }) => {
  const typeColor = item.type === 'Palmistry' ? 'text-orange-500' :
    item.type === 'Astrology Consultation' ? 'text-orange-500' :
      'text-orange-500';

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-xl">
      <Text className="text-base font-poppinsSemiBold text-gray-900 mb-3">
        Service Type: <Text className={`${typeColor} font-poppinsSemiBold`}>{item.type}</Text>
      </Text>

      <View className="space-y-3">
        {/* Duration */}
        <View className="flex-row items-center">
          <View className="w-8 h-8 items-center justify-center">
            <TimeQuarterIcon size={20} color='#272B35' />
          </View>
          <Text className="text-sm text-gray-400 ml-2 font-poppins">
            Session Duration: <Text className="text-gray-900 font-poppins">{item.duration}</Text>
          </Text>
        </View>

        {/* Date */}
        <View className="flex-row items-center">
          <View className="w-8 h-8 items-center justify-center">
            <CalendarLock01Icon size={20} color='#272B35' />
          </View>
          <Text className="text-sm text-gray-400 ml-2 font-poppins">
            Date: <Text className="text-gray-900 font-poppins">{item.date}</Text>
          </Text>
        </View>

        {/* Mode */}
        <View className="flex-row items-center">
          <View className="w-8 h-8 items-center justify-center">
            <OnlineLearning03Icon size={20} color='#272B35' />
          </View>
          <Text className="text-sm text-gray-400 ml-2 font-poppins">
            Mode: <Text className="text-gray-900 font-poppins">{item.mode}</Text>
          </Text>
        </View>

        {/* Zoom Link */}
        {item.zoomLink && (
          <View className="flex-row items-center">
            <View className="w-8 h-8 items-center justify-center">
              <Link05Icon size={20} color='#272B35' />
            </View>
            <Text className="text-sm ml-2 text-gray-400 font-poppins pl-6">
              zoommtg: <Text className="underline text-blue-600 font-poppins ">{item.zoomLink}</Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ServiceOrderCard;