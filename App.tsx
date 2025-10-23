import './global.css';
import { View, Text } from 'react-native'
import React from 'react'
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/Onboarding/index';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import ForgotPassword from './src/screens/Auth/ForgotPassword';


export default function App() {
  return (
    <View className='flex-1'>
      <ForgotPassword />
    </View>
  )
}


// redux usecase n all 
// // Wrap your app
// import ReduxProvider from './src/components/ReduxProvider';

// <ReduxProvider>
//   <App />
// </ReduxProvider>

// // In components
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser, logout } from '../redux';

// const dispatch = useDispatch();
// const { user, isAuthenticated } = useSelector(state => state.auth);

// // After successful API call
// dispatch(setUser({ user: userData, token: authToken }));

// // Logout
// dispatch(logout());



// example of colors and fonts 
{/* <View className="bg-background">
  <Text className="text-text1 font-prociono text-2xl">Heading</Text>
  <Text className="text-text2 font-poppins text-base">Body text</Text>
  <Text className="text-text1 font-poppinsMedium text-lg">Medium text</Text>
</View> */}


// TextInput useCase 
// import React from 'react';
// import { View } from 'react-native';
// import { useForm } from 'react-hook-form';
// import { TextInput } from '../components/Inputs';

// const LoginForm = () => {
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       email: '',
//       password: '',
//     }
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <View className="p-4">
//       <TextInput
//         control={control}
//         name="email"
//         label="Email Address"
//         placeholder="Enter your email"
//         keyboardType="email-address"
//         rules={{
//           required: 'Email is required',
//           pattern: {
//             value: /^\S+@\S+$/i,
//             message: 'Invalid email address'
//           }
//         }}
//       />

//       <TextInput
//         control={control}
//         name="password"
//         label="Password"
//         placeholder="Enter your password"
//         secureTextEntry={true}
//         rules={{
//           required: 'Password is required',
//           minLength: {
//             value: 6,
//             message: 'Password must be at least 6 characters'
//           }
//         }}
//       />
//     </View>
//   );
// };
