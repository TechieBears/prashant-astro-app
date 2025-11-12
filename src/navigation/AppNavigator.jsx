// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import MainTabNavigator and other screens
import MainTabNavigator from './Tabs';
import ServiceDetails from '../screens/Service/ServiceDetails';
import ProductDetails from '../screens/Product/ProductDetails';
import ProductSummary from '../screens/Product/ProductSummary';
import CheckAvailability from '../screens/Service/CheckAvailability';
import BookingSummary from '../screens/Service/BookingSummary';
import BookingSuccess from '../screens/Service/BookingSuccess';
import EditProfile from '../screens/Profile/EditProfile';
import Address from '../screens/Profile/Address/index';
import AddUpdateAddress from '../screens/Profile/Address/AddUpdateAddress';
import About from '../screens/Profile/About';
import CustomerSupport from '../screens/Profile/CustomerSupport';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
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
