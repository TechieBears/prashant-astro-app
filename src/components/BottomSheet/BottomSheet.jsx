import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const BottomSheet = ({
  isVisible = false,
  onClose,
  title,
  children,
  height = '50%',
  showCloseButton = true,
  scrollable = true,
  containerStyle = '',
  contentStyle = '',
  titleStyle = '',
  ...props
}) => {
  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      {...props}
    >
      <View
        className={`bg-white rounded-t-3xl ${containerStyle}`}
        style={{ height }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          {title && (
            <Text className={`text-text1 font-poppinsMedium text-lg flex-1 ${titleStyle}`}>
              {title}
            </Text>
          )}
          {showCloseButton && (
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center"
            >
              <Text className="text-text2 text-xl">×</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Content */}
        <ContentWrapper
          className={`flex-1 ${contentStyle}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={scrollable ? { paddingBottom: 20 } : undefined}
        >
          <View className="p-4">
            {children}
          </View>
        </ContentWrapper>
      </View>
    </Modal>
  );
};

export default BottomSheet;