import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabNavigator from './Tabs';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={MainTabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;