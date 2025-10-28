import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

 const RadioButton = ({ selected, onPress, label }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center mr-6">
      <View className={`w-5 h-5 rounded-full border-2 ${selected ? 'border-text1' : 'border-gray-300'} items-center justify-center mr-2`}>
        {selected && (
          <View className="w-3 h-3 rounded-full bg-text1" />
        )}
      </View>
      <Text className="text-text2 font-poppins text-base">{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;