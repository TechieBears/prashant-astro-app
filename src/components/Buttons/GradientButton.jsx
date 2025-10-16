import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({
  title,
  onPress,
  colors = ['#FF8835', '#FF5858'],
  size = 'medium',
  disabled = false,
  textStyle = '',
  containerStyle = '',
  gradientStyle = '',
  ...props
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2';
      case 'medium':
        return 'px-6 py-3';
      case 'large':
        return 'px-8 py-4';
      default:
        return 'px-6 py-3';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  return (
    <TouchableOpacity
      className={`rounded-lg ${disabled ? 'opacity-50' : ''} ${containerStyle}`}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className={`rounded-lg items-center justify-center ${getSizeStyles()} ${gradientStyle}`}
      >
        <Text
          className={`font-poppinsMedium text-white ${getTextSize()} ${textStyle}`}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;