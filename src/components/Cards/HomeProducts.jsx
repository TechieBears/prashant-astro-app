import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeProductCard({
  image,
  title,
  price,
  buttonText = 'Add to Cart',
  onPress,
  onAddToCart,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="flex-row items-center border-[#00000026] border-[1px] bg-white rounded-2xl overflow-hidden "
      style={{
        
        shadowOpacity: 0.1,
        shadowRadius: 6,
        
      }}
    >
      {/* Left Side Image */}
      <View className="w-[45%] bg-[#F5F5F5]">
        <Image
          source={typeof image === 'string' ? { uri: image } : image}
          resizeMode="cover"
          className="w-full h-[120px]"
        />
      </View>

      {/* Right Side Content */}
      <View className="flex-1 px-4 py-3">
        <Text className="text-[15px] font-semibold text-[#1E293B]" numberOfLines={2}>
          {title}
        </Text>

        <Text className="text-[16px] font-semibold text-[#FF8835] mt-2">
          ₹{price}
        </Text>

       <TouchableOpacity
             activeOpacity={0.9}
             onPress={onAddToCart}
             className="  mt-3 overflow-hidden rounded-[10px]" style={{borderCurve: 'continuous'}}>
             <LinearGradient
               colors={['#FF5858', '#FF8835', '#FFBF12']}
               start={{x: 0, y: 0.5}}
               end={{x: 1, y: 1}}
               style={{borderRadius: 10, borderCurve: 'continuous'}}>
               <View className="items-center justify-center p-2 py-3 ">
                 <Text className="text-white font-poppinsSemiBold text-sm">
                   Add to Cart
                 </Text>
               </View>
             </LinearGradient>
           </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
