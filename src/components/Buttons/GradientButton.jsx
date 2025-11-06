import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AvailabilityCalendarIcon} from '../../utils/svgIcons';

const GradientButton = ({
  title,
  onPress,
  colors = ['#FFBF12', '#FF8835', '#FF5858'],
  disabled = false,
  textStyle = '',
  containerStyle = '',
  gradientStyle = '',
  start = {x: 0.5, y: 0},
  end = {x: 0.5, y: 1},
  locations = [0, 0.5, 1],
  icon,
  iconSpacing = 8,
  showIcon = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={`${disabled ? 'opacity-50' : ''} ${containerStyle}`}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        locations={locations}
        className={` ${gradientStyle}`}
        style={{ borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}
      >
        <View className="flex-row items-center justify-center px-6 py-4">
          <Text
            className={`font-poppinsSemiBold text-base text-white ${textStyle} ${
              icon !== null ? 'mr-2' : ''
            }`}
          >
            {title}
          </Text>
          {(icon !== null && showIcon) &&
            (icon ? (
              <View style={{marginLeft: iconSpacing}}>{icon}</View>
            ) : (
              <View style={{marginLeft: iconSpacing}}>
                <AvailabilityCalendarIcon />
              </View>
            ))}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
