import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

/**
 * CouponCard displays a title, subtitle and CTA button so it can be reused
 * across Booking summary, Checkout, Offers etc.
 */
const CouponCard = ({
  title = 'Apply Coupon',
  subtitle = 'Get ₹300 OFF on your First Order',
  ctaLabel = 'Check Available Coupons',
  onPress,
  className = '',
  containerStyle,
  ctaClassName = '',
  ctaStyle,
  icon = <DefaultCouponIcon />,
}) => {
  return (
    <View
      className={`bg-white rounded-[10px] p-4 border border-[#F2E6D9] ${className}`}
      style={containerStyle}>
      <View className="mb-3">
        <Text className="font-poppinsSemiBold text-[16px] text-[#1D293D] mb-1">
          {title}
        </Text>
        <Text className="font-poppins text-[14px] text-[#60708A]">
          {subtitle}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={!onPress}
        className={`flex-row items-center justify-center rounded-[10px] bg-[#FFEAD9] py-3 ${ctaClassName}`}
        style={ctaStyle}>
        <Text className="font-poppinsMedium text-[#FF8835] text-[15px] mr-2">
          {ctaLabel}
        </Text>
        {icon}
      </TouchableOpacity>
    </View>
  );
};

const DefaultCouponIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 3h12a2 2 0 0 1 2 2v4a1 1 0 0 1-.293.707L19 11l.707.293A1 1 0 0 1 20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a1 1 0 0 1 .293-.707L5 13l-.707-.293A1 1 0 0 1 4 12V5a2 2 0 0 1 2-2Z"
      stroke="#FF8835"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 7h2M7 9h6M7 12h6M7 15h4"
      stroke="#FF8835"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CouponCard;
