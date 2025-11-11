import React, {memo, useMemo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const STAR_SYMBOL = '★';
const STAR_PLACEHOLDER = '☆';

const CARD_SHADOW = {
  shadowColor: '#0F172A',
  shadowOpacity: 0.05,
  shadowRadius: 12,
  shadowOffset: {width: 0, height: 6},
  elevation: 3,
};

const formatPrice = value => {
  if (value == null) {
    return '';
  }
  const number = Number(value);
  if (Number.isNaN(number)) {
    return `₹${value}`;
  }
  return `₹${Math.round(number)}`;
};

const ProductCard = ({
  image,
  title,
  price,
  rating = 0,
  onAddToCart,
  onPress,
}) => {
  const displayRating = Number.isFinite(rating)
    ? Math.min(Math.max(rating, 0), 5)
    : 0;

  const stars = useMemo(() => {
    const fullStars = Math.floor(displayRating);
    const hasHalf = displayRating - fullStars >= 0.5;
    let starString = STAR_SYMBOL.repeat(fullStars);
    if (hasHalf) {
      starString += STAR_PLACEHOLDER;
    }
    starString = starString.padEnd(5, STAR_PLACEHOLDER);
    return starString.slice(0, 5);
  }, [displayRating]);

  const priceLabel = formatPrice(price);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="rounded-2xl border border-[#E2E8F0] bg-white pb-3"
      style={CARD_SHADOW}>
      <View className="px-3 pt-3">
        <Image
          source={typeof image === 'string' ? {uri: image} : image}
          resizeMode="cover"
          className="h-[140px] w-full rounded-xl bg-[#F3F3F3]"
        />
        <View className="mt-3">
          <Text
            numberOfLines={1}
            className="font-poppinsSemiBold text-[15px] text-[#1D293D]">
            {title}
          </Text>
          <View className="mt-1 flex-row items-center justify-between">
            <Text className="text-[14px] font-poppins text-[#FFA41D]">
              {stars}
            </Text>
            <Text className="text-[14px] font-poppinsSemiBold text-[#1D293D]">
              {priceLabel}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onAddToCart}
        className="mx-3 mt-3 overflow-hidden rounded-[10px]" style={{borderCurve: 'continuous'}}>
        <LinearGradient
          colors={['#FF8835', '#FF5858']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={{borderRadius: 10, borderCurve: 'continuous'}}>
          <View className="items-center justify-center h-[35px]">
            <Text className="text-white font-poppinsSemiBold text-[14px]">
              Add to Cart
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default memo(ProductCard);
