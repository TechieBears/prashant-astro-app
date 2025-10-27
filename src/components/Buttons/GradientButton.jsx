import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({
  title,
  onPress,
  colors = ['#FFBF12', '#FF8835','#FF5858'],
  disabled = false,
  textStyle = '',
  containerStyle = '',
  gradientStyle = '',
  ...props
}) => {
 

  return (
    <TouchableOpacity
      className={`rounded-xl ${disabled ? 'opacity-50' : ''} ${containerStyle}`}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        positions={[0, 0.5, 1]}
        className={`rounded-xl items-center justify-center `}
        style={{ borderRadius: 12 }}
      >
        <Text
          className={`font-poppins text-xl text-white p-4 font-bold `}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;