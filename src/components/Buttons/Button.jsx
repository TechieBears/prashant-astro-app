import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  textStyle = '',
  containerStyle = '',
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-secondary';
      case 'outline':
        return 'bg-transparent border-2 border-primary';
      case 'ghost':
        return 'bg-transparent';
      default:
        return 'bg-primary';
    }
  };

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

  const getTextColor = () => {
    if (variant === 'outline' || variant === 'ghost') {
      return 'text-primary';
    }
    return 'text-white';
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
      className={`rounded-lg items-center justify-center ${getVariantStyles()} ${getSizeStyles()} ${
        disabled ? 'opacity-50' : ''
      } ${containerStyle}`}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <Text
        className={`font-poppinsMedium ${getTextColor()} ${getTextSize()} ${textStyle}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;