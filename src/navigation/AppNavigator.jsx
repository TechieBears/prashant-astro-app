// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import DrawerNavigator and other screens
import DrawerNavigator from './DrawerNavigator';
import ServiceDetails from '../screens/Service/ServiceDetails';
import ProductDetails from '../screens/Product/ProductDetails';
import ProductSummary from '../screens/Product/ProductSummary';
import CheckAvailability from '../screens/Service/CheckAvailability';
import BookingSummary from '../screens/Service/BookingSummary';
import BookingSuccess from '../screens/Service/BookingSuccess';
import EditProfile from '../screens/Profile/EditProfile';
import MyOrders from '../screens/Profile/MyOrders';
import Address from '../screens/Profile/Address/index';
import AddUpdateAddress from '../screens/Profile/Address/AddUpdateAddress';
import PrivacyPolicy from '../screens/Profile/PrivacyPolicy';
import ReferEarn from '../screens/Profile/ReferEarn';
import CallHistory from '../screens/Profile/CallHistory';
import About from '../screens/Profile/About';
import CustomerSupport from '../screens/Profile/CustomerSupport';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerTabs" component={DrawerNavigator} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="ProductSummary" component={ProductSummary} />
      <Stack.Screen name="CheckAvailability" component={CheckAvailability} />
      <Stack.Screen name="BookingSummary" component={BookingSummary} />
      <Stack.Screen name="BookingSuccess" component={BookingSuccess} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="AddUpdateAddress" component={AddUpdateAddress} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="ReferEarn" component={ReferEarn} />
      <Stack.Screen name="CallHistory" component={CallHistory} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="CustomerSupport" component={CustomerSupport} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
