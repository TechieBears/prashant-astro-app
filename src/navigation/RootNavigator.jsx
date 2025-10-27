import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/Onboarding';

const RootNavigator = () => {
  // const { isAuthenticated, skip } = useSelector(state => state.auth);
  const [showSplash, setShowSplash] = useState(true);
  const isAuthenticated = false;
  const skip = true;
  // Show splash screen first
   // Show the splash screen for 2 seconds
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);  // Hide splash screen after 2 seconds
    }, 2000);  // 2 seconds timeout
  }, []);

  if (showSplash) {
    return (
      <NavigationContainer>
        <SplashScreen />
      </NavigationContainer>
    );
  }

  // Show onboarding if skip is false
  if (!skip) {
    return (
      <NavigationContainer>
        <OnboardingScreen />
      </NavigationContainer>
    );
  }

  // Show main app flow based on authentication
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;