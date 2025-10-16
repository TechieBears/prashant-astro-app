import React from 'react';
import { View, ActivityIndicator, Text, Modal } from 'react-native';

const Loader = ({
  visible = false,
  text = 'Loading...',
  size = 'large',
  color = '#FF8835',
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
  textStyle = '',
  containerStyle = '',
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      statusBarTranslucent={true}
    >
      <View
        className={`flex-1 items-center justify-center ${containerStyle}`}
        style={{ backgroundColor }}
      >
        <View className="bg-white rounded-lg p-6 items-center min-w-32">
          <ActivityIndicator size={size} color={color} />
          {text && (
            <Text className={`text-text1 font-poppins text-base mt-3 text-center ${textStyle}`}>
              {text}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default Loader;