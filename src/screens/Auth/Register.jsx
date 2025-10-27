import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { GoogleIcon, Facebook01Icon, AppleIcon, ViewIcon, ViewOffSlashIcon } from 'hugeicons-react-native';
import GradientButton from '../../components/Buttons/GradientButton';
import TextInput from '../../components/Inputs/TextInput';
import { setUser } from '../../redux/slices/authSlice';

const RadioButton = ({ selected, onPress, label }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center mr-6">
      <View className={`w-5 h-5 rounded-full border-2 ${selected ? 'border-text1' : 'border-gray-300'} items-center justify-center mr-2`}>
        {selected && (
          <View className="w-3 h-3 rounded-full bg-text1" />
        )}
      </View>
      <Text className="text-text2 font-poppins text-base">{label}</Text>
    </TouchableOpacity>
  );
};

const SocialButton = ({ icon, bgColor = 'bg-white', onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-16 h-16 rounded-full ${bgColor} items-center justify-center shadow-sm`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {icon}
    </TouchableOpacity>
  );
};

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    }
  });

  const [gender, setGender] = useState('Male');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');

  const onSubmit = (data) => {
    console.log('Register data:', { ...data, gender });
    // Simulate successful registration
    dispatch(setUser({
      user: { email: data.email, name: data.fullName, phone: data.phoneNumber, gender },
      token: 'mock-token-123'
    }));
  };

  const handleGoogleLogin = () => {
    console.log('Google signup');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook signup');
  };

  const handleAppleLogin = () => {
    console.log('Apple signup');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 pt-16 justify-center">
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-4xl font-poppinsMedium text-text1 font-bold mb-3">
              Create Account
            </Text>
            <Text className="text-base font-poppins text-text2 text-center px-2 leading-6">
              Join us today to explore personalized astrology{'\n'}insights and unlock the secrets of your stars!
            </Text>
          </View>

          {/* Full Name Input */}
          <View className="mb-4">

            <TextInput
              control={control}
              label="Full Name *"
              name="fullName"
              placeholder="Enter full name"
              containerStyle="mb-0"
              inputStyle="bg-white"
              rules={{
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              }}
            />
          </View>

          {/* Email Input */}
          <View className="mb-4">

            <TextInput
              control={control}
              label="Email *"
              name="email"
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle="mb-0"
              inputStyle="bg-white"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
            />
          </View>

          {/* Phone Number Input */}
          <View className="mb-4">

            <TextInput
              control={control}
              label="Phone Number *"
              name="phoneNumber"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              containerStyle="mb-0"
              inputStyle="bg-white"
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number'
                }
              }}
            />
          </View>

          {/* Gender Selection */}
          <View className="mb-4">
            <Text className="text-text1 font-poppinsMedium text-sm mb-3">
              Gender *
            </Text>
            <View className="flex-row items-center">
              <RadioButton
                selected={gender === 'Male'}
                onPress={() => setGender('Male')}
                label="Male"
              />
              <RadioButton
                selected={gender === 'Female'}
                onPress={() => setGender('Female')}
                label="Female"
              />
              <RadioButton
                selected={gender === 'Other'}
                onPress={() => setGender('Other')}
                label="Other"
              />
            </View>
          </View>

          {/* Create Password Input */}
          <View className="mb-4">
            <TextInput
              control={control}
              label="Password *"
              name="password"
              placeholder="Enter password"
              secureTextEntry={!showPassword}
              containerStyle="mb-0"
              inputStyle="border-0 px-0 py-0"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              }}
            />
          </View>

          {/* Confirm Password Input */}
          <View className="mb-6">
            <TextInput
              control={control}
              label="Confirm Password *"
              name="confirmPassword"
              placeholder="Enter password"
              secureTextEntry={!showConfirmPassword}
              containerStyle="mb-0"
              inputStyle="border-0 px-0 py-0"
              rules={{
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match'
              }}
            />
          </View>

          {/* Create Account Button */}
          <View className="mb-6">
            <GradientButton
              title="Create Account"
              onPress={handleSubmit(onSubmit)}
              colors={['#FF8835', '#FF5858']}
              size="large"
              containerStyle="w-full"
            />
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center mb-8">
            <Text className="text-text2 font-poppins text-base">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-primary font-poppinsMedium text-base">
                Login Here
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="text-text2 font-poppins text-sm mx-4">
              Or Continue with
            </Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row justify-center items-center mb-12" style={{ gap: 24 }}>
            <SocialButton
              icon={<GoogleIcon size={28} color="#DB4437" />}
              bgColor="bg-white"
              onPress={handleGoogleLogin}
            />

            <SocialButton
              icon={<Facebook01Icon size={28} color="#FFFFFF" />}
              bgColor="bg-[#1877F2]"
              onPress={handleFacebookLogin}
            />

            <SocialButton
              icon={<AppleIcon size={28} color="#FFFFFF" />}
              bgColor="bg-black"
              onPress={handleAppleLogin}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;