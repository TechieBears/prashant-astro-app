import React from 'react';
import { View, Text } from 'react-native';

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-background justify-center items-center px-6">
      <Text className="text-text1 font-poppinsMedium text-2xl mb-4">
        Profile
      </Text>
      <Text className="text-text2 font-poppins text-base text-center">
        This is a restricted screen only accessible to authenticated users
      </Text>
    </View>
  );
};

export default ProfileScreen;