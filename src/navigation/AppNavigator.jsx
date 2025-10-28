import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, Dimensions, PanResponder } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {Home07Icon, HandPrayerIcon, ShoppingCart02Icon, ShoppingBag02Icon, UserIcon} from 'hugeicons-react-native'

// Import existing screens
import Home from '../screens/Home/index';
import Service from '../screens/Service/index';
import Product from '../screens/Product/index';
import Profile from '../screens/Profile';
import EditProfile from '../screens/Profile/EditProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { height } = Dimensions.get('window');

// Cart Bottom Sheet Modal Component
const CartBottomSheet = ({ visible, onClose }) => {
  const translateY = useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <TouchableOpacity 
          className="flex-1 bg-black opacity-50"
          activeOpacity={1} 
          onPress={onClose}
        />
        <Animated.View 
          className="bg-white rounded-t-3xl max-h-[90%] min-h-[50%] shadow-lg"
          style={[{ transform: [{ translateY }] }]}
          {...panResponder.panHandlers}
        >
          <View className="w-10 h-1 bg-gray-300 rounded-full self-center my-3" />
          <View className="p-5">
            <Text className="text-2xl font-bold text-gray-800">Shopping Cart</Text>
            <Text className="text-base text-gray-600 mt-2">Your cart items will appear here</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const [cartVisible, setCartVisible] = useState(false);

  return (
    <>
      <View className="absolute bottom-0 left-0 right-0 bg-transparent">
        <View className="flex-row bg-white h-20 border-t border-gray-300 items-center justify-around pt-2 pb-3">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                className="flex-1 items-center justify-center"
              >
                <View className="w-7 h-7 items-center justify-center">
                  <Text className="text-lg opacity-60">
                    {route.name === 'Home' && <Home07Icon color={isFocused ? '#FF8835' : 'gray'} />}
                    {route.name === 'Service' && <HandPrayerIcon color={isFocused ? '#FF8835' : 'gray'} />}
                    {route.name === 'Product' && <ShoppingBag02Icon color={isFocused ? '#FF8835' : 'gray'} />}
                    {route.name === 'Profile' && <UserIcon color={isFocused ? '#FF8835' : 'gray'} />}
                  </Text>
                </View>
                {isFocused && (
                  <Text className="text-sm text-orange-500 mt-1 font-medium">{route.name}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Elevated Cart Button */}
        <TouchableOpacity
          onPress={() => setCartVisible(true)}
          className="absolute top-[-30px]  left-1/2 transform -translate-x-1/2 items-center justify-center"
        >
          <View style={{ borderRadius : 100 }} className="w-16 h-16 rounded-full bg-background justify-center items-center border-6 border-t border-gray-300">
            <ShoppingCart02Icon color={'gray'} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Cart Bottom Sheet Modal */}
      <CartBottomSheet 
        visible={cartVisible} 
        onClose={() => setCartVisible(false)} 
      />
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
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
