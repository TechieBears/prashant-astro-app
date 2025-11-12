import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { 
  UserIcon, 
  Settings02Icon, 
  Logout01Icon, 
  CustomerSupportIcon,
  InformationCircleIcon 
} from 'hugeicons-react-native';

const DrawerContent = (props) => {
  const { navigation } = props;

  const menuItems = [
    {
      title: 'Edit Profile',
      icon: UserIcon,
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      title: 'Address',
      icon: Settings02Icon,
      onPress: () => navigation.navigate('Address'),
    },
    {
      title: 'About',
      icon: InformationCircleIcon,
      onPress: () => navigation.navigate('About'),
    },
    {
      title: 'Customer Support',
      icon: CustomerSupportIcon,
      onPress: () => navigation.navigate('CustomerSupport'),
    },
    {
      title: 'Logout',
      icon: Logout01Icon,
      onPress: () => {
        // Handle logout logic here
        console.log('Logout pressed');
      },
    },
  ];

  return (
    <DrawerContentScrollView {...props} className="flex-1 bg-white">
      {/* Header */}
      <View className="p-6 border-b border-gray-200">
        <View className="flex-row items-center">
          <Image
            source={require('../assets/images/logo.png')}
            className="w-12 h-12 mr-3"
            resizeMode="contain"
          />
          <View>
            <Text className="text-lg font-bold text-primary">AstroGuid</Text>
            <Text className="text-sm text-gray-600">Welcome back!</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View className="flex-1 pt-4">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center px-6 py-4 border-b border-gray-100"
            onPress={item.onPress}
          >
            <item.icon color="#314158" size={20} />
            <Text className="ml-4 text-base text-gray-800">{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;