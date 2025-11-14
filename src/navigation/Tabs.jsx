// src/navigation/MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home11Icon, HandPrayerIcon, ShoppingBag02Icon, Wallet01Icon, CallIcon } from 'hugeicons-react-native';
import { View, Text, TouchableOpacity } from 'react-native';

// Import existing screens
import Home from '../screens/Home/index';
import Service from '../screens/Service/index';
import Product from '../screens/Product/index';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-transparent">
      {/* Main tab bar container with proper border */}
      <View className="flex-row bg-white h-20 border-t border-gray-300 items-center justify-between px-4 pt-2 pb-3 relative">
        
        {/* Home Tab */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="items-center justify-center flex-1"
          activeOpacity={0.7}
        >
          <View className="w-7 h-7 items-center justify-center">
            <Home11Icon 
              color={state.index === 0 ? '#FF8835' : '#6B7280'} 
              size={24}
            />
          </View>
          {state.index === 0 && (
            <Text className="text-xs text-orange-500 mt-1 font-medium">Home</Text>
          )}
        </TouchableOpacity>

        {/* Service Tab */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Service')}
          className="items-center justify-center flex-1"
          activeOpacity={0.7}
        >
          <View className="w-7 h-7 items-center justify-center">
            <HandPrayerIcon 
              color={state.index === 1 ? '#FF8835' : '#6B7280'} 
              size={24}
            />
          </View>
          {state.index === 1 && (
            <Text className="text-xs text-orange-500 mt-1 font-medium">Service</Text>
          )}
        </TouchableOpacity>

        {/* Call Tab */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Call')}
          className="items-center justify-center flex-1"
          activeOpacity={0.7}
        >
          <View className="w-7 h-7 items-center justify-center">
            <CallIcon 
              color={state.index === 1 ? '#FF8835' : '#6B7280'} 
              size={24}
            />
          </View>
          {state.index === 1 && (
            <Text className="text-xs text-orange-500 mt-1 font-medium">Call</Text>
          )}
        </TouchableOpacity>

        {/* Product Tab */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Product')}
          className="items-center justify-center flex-1"
          activeOpacity={0.7}
        >
          <View className="w-7 h-7 items-center justify-center">
            <ShoppingBag02Icon 
              color={state.index === 2 ? '#FF8835' : '#6B7280'} 
              size={24}
            />
          </View>
          {state.index === 2 && (
            <Text className="text-xs text-orange-500 mt-1 font-medium">Product</Text>
          )}
        </TouchableOpacity>

        {/* Wallet Tab */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Wallet')}
          className="items-center justify-center flex-1"
          activeOpacity={0.7}
        >
          <View className="w-7 h-7 items-center justify-center">
            <Wallet01Icon 
              color={state.index === 3 ? '#FF8835' : '#6B7280'} 
              size={24}
            />
          </View>
          {state.index === 3 && (
            <Text className="text-xs text-orange-500 mt-1 font-medium">Profile</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Home'
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Service" component={Service} />
      <Tab.Screen name="Product" component={Product} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
