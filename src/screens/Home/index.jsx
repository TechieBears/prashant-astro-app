import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View className="flex-1 bg-background justify-center items-center px-6">
      <Text className="text-text1 font-poppinsMedium text-2xl mb-4">
        Welcome to AstroGuid
      </Text>
      <Text className="text-text2 font-poppins text-base text-center mb-8">
        You are now authenticated and can access all features
      </Text>
      
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-primary2 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-poppinsMedium text-base">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;