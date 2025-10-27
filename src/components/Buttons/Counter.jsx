import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <View className="flex-row items-center justify-center">
      <TouchableOpacity 
        onPress={decrement}
        className="w-12 h-12 border-2 border-black items-center justify-center"
      >
        <Text className="text-black text-xl font-bold">-</Text>
      </TouchableOpacity>
      
      <View className="w-16 h-12 bg-black items-center justify-center mx-2">
        <Text className="text-white text-lg font-bold">{count}</Text>
      </View>
      
      <TouchableOpacity 
        onPress={increment}
        className="w-12 h-12 border-2 border-black items-center justify-center"
      >
        <Text className="text-black text-xl font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;