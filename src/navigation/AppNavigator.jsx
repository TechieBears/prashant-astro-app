import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home07Icon, HandPrayerIcon, ShoppingCart02Icon, ShoppingBag02Icon, UserIcon } from 'hugeicons-react-native'

// Import existing screens
import Home from '../screens/Home/index';
import Service from '../screens/Service/index';
import ServiceDetails from '../screens/Service/ServiceDetails';
import CheckAvailability from '../screens/Service/CheckAvailability';
import BookingSummary from '../screens/Service/BookingSummary';
import BookingSuccess from '../screens/Service/BookingSuccess';
import Product from '../screens/Product/index';
import ProductDetails from '../screens/Product/ProductDetails';
import ProductSummary from '../screens/Product/ProductSummary';
import Profile from '../screens/Profile';
import EditProfile from '../screens/Profile/EditProfile';
import Address from '../screens/Profile/Address/index';
import AddUpdateAddress from '../screens/Profile/Address/AddUpdateAddress';
import About from '../screens/Profile/About';
import CustomerSupport from '../screens/Profile/CustomerSupport';
import Cart from '../screens/Cart/Cart';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const handleCartPress = () => {
    const parentNavigation = navigation.getParent() ?? navigation;
    if (parentNavigation?.navigate) {
      parentNavigation.navigate('Cart');
    }
  };

  return (
    <>
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
              <Home07Icon 
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

          {/* Cart Button - Elevated with proper border */}
          <TouchableOpacity
            onPress={handleCartPress}
            className="items-center justify-center"
            activeOpacity={0.8}
          >
            <View className="w-16 h-16 rounded-full bg-white justify-center items-center border-4 border-gray-200 shadow-lg">
              <ShoppingCart02Icon color={'#6B7280'} size={26} />
            </View>
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

          {/* Profile Tab */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            className="items-center justify-center flex-1"
            activeOpacity={0.7}
          >
            <View className="w-7 h-7 items-center justify-center">
              <UserIcon 
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

    </>
  );
};

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

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="ProductSummary" component={ProductSummary} />
      <Stack.Screen name="CheckAvailability" component={CheckAvailability} />
      <Stack.Screen name="BookingSummary" component={BookingSummary} />
      <Stack.Screen name="BookingSuccess" component={BookingSuccess} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="AddUpdateAddress" component={AddUpdateAddress} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="CustomerSupport" component={CustomerSupport} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
