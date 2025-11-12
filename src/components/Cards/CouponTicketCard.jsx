import React, {useState, useMemo, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const DEFAULT_DESCRIPTION = '25 % Off on minimum purchase of Rs. 500.';
const DEFAULT_EXPIRY = 'Expires on: 5th July 2025  |  12:00pm';

const CouponTicketCard = ({
  item,
  isSelected,
  onPress,
  getSavingsLabelFn,
  descriptionText,
  expiryText,
}) => {
  const [layout, setLayout] = useState({width: 0, height: 0});

  const handleLayout = useCallback(event => {
    const {width, height} = event.nativeEvent.layout;
    if (width && height) {
      setLayout({width, height});
    }
  }, []);

  const pathData = useMemo(() => {
    const width = layout.width || 360;
    const height = layout.height || 120;
    const radius = 20;
    const notchRadius = Math.min(18, height * 0.15);
    const centerY = height / 2;
    const notchTop = centerY - notchRadius;
    const notchBottom = centerY + notchRadius;
    const topStartX = radius;
    const topEndX = width - radius;

    const commands = [
      `M ${topStartX} 0`,
      `L ${topEndX} 0`,
      `A ${radius} ${radius} 0 0 1 ${width} ${radius}`,
      `L ${width} ${notchTop}`,
      `A ${notchRadius} ${notchRadius} 0 0 0 ${width} ${notchBottom}`,
      `L ${width} ${height - radius}`,
      `A ${radius} ${radius} 0 0 1 ${topEndX} ${height}`,
      `L ${radius} ${height}`,
      `A ${radius} ${radius} 0 0 1 0 ${height - radius}`,
      `L 0 ${notchBottom}`,
      `A ${notchRadius} ${notchRadius} 0 0 0 0 ${notchTop}`,
      `L 0 ${radius}`,
      `A ${radius} ${radius} 0 0 1 ${topStartX} 0`,
      'Z',
    ];

    return {
      d: commands.join(' '),
      width,
      height,
    };
  }, [layout.height, layout.width]);

  const strokeColor = isSelected ? '#FFD7B1' : 'transparent';
  const strokeWidth = isSelected ? 1.5 : 1;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} className="mb-4">
      <View onLayout={handleLayout} style={{minHeight: 130, justifyContent: 'center'}}>
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${pathData.width} ${pathData.height}`}
          style={{position: 'absolute', left: 0, top: 0}}
        >
          <Path d={pathData.d} fill="#FFFFFF" stroke={strokeColor} strokeWidth={strokeWidth} />
        </Svg>
        <View style={{paddingHorizontal: 20, paddingVertical: 16}}>
          <View className="flex-row items-center mb-3">
            <View
              className={`w-[22px] h-[22px] rounded-[6px] border-[1.6px] border-[#FF9E42] items-center justify-center ${
                isSelected ? 'bg-[#FF8A00]' : 'bg-transparent'
              }`}
            >
              {isSelected ? <Text className="text-white text-[12px]">✓</Text> : null}
            </View>
            <View className="ml-3 px-3 py-1.5 rounded-[8px] border border-dashed border-[#FF9E42] bg-[#FFF6EE]">
              <Text className="text-[#FF7A00] text-[13px] font-semibold">
                {item.couponCode ?? 'FLAT 300'}
              </Text>
            </View>
          </View>
          <Text className="text-[#16A34A] font-poppinsSemiBold text-[16px] mb-1">
            {getSavingsLabelFn(item)}
          </Text>
          <Text className="text-[#5B6E91] font-poppins text-[13px] leading-[20px]">
            {descriptionText || DEFAULT_DESCRIPTION}
          </Text>
          <Text className="text-[#5B6E91] font-poppins text-[13px] leading-[20px] mt-1">
            {expiryText || DEFAULT_EXPIRY}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CouponTicketCard;
