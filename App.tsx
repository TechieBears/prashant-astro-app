import './global.css';
import React from 'react';
import 'react-native-gesture-handler';
import ReduxProvider from './src/components/ReduxProvider';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <ReduxProvider >
      <RootNavigator />
    </ReduxProvider>
  );
}
 