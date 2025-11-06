import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import GradientButton from '../../components/Buttons/GradientButton';
import TextInput from '../../components/Inputs/TextInput';
import { setUser } from '../../redux/slices/authSlice';
import { registerApi } from '../../services/api';
import SelectDropdown from '../../components/Inputs/SelectDropdown';
import RadioButton from '../../components/Inputs/RadioInput';

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      mobileNo: '',
      password: '',
      confirmPassword: '',
      referralCode: ''
    }
  });
  
  const [gender, setGender] = useState('Male');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      const response = await registerApi({...data, gender : gender, registerType : 'normal'});
      console.log('Registration response:', response);
      if (response.success) {
        dispatch(setUser({
          user: response?.data?.user,
          token: response?.data?.token
        }));
      } else {
        console.log('Registration error:', response.message);
      }
      console.log('API Response:', response);
    } catch (error) {
      console.log('Registration failed:', error);
    }
  };

  const titleOptions = [
    { label: 'Mr', value: 'Mr' },
    { label: 'Mrs', value: 'Mrs' },
    { label: 'Miss', value: 'Miss' },
    { label: 'Baby', value: 'Baby' },
    { label: 'Master', value: 'Master' }
  ];

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

          {/* Title Dropdown */}
          <View className="mb-4">
            <SelectDropdown
              label="Title *"
              placeholder="Select title"
              options={titleOptions}
              value={watch('title')}
              onSelect={(selectedTitle) => setValue('title', selectedTitle.value)}
              error={errors?.title?.message}
            />
          </View>

          {/* First Name Input */}
          <View className="mb-4">
            <TextInput
              control={control}
              label="First Name *"
              name="firstName"
              placeholder="Enter first name"
              containerStyle="mb-0"
              inputStyle="bg-white"
              rules={{
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters'
                }
              }}
            />
          </View>

          {/* Last Name Input */}
          <View className="mb-4">
            <TextInput
              control={control}
              label="Last Name *"
              name="lastName"
              placeholder="Enter last name"
              containerStyle="mb-0"
              inputStyle="bg-white"
              rules={{
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters'
                }
              }}
            />
          </View>
          {/* Gender Input */}
          <View className="mb-4">
            <Text className="text-text1 font-poppinsMedium text-sm mb-3">Gender *</Text>
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

          {/* Mobile Number Input */}
          <View className="mb-4">
            <TextInput
              control={control}
              label="Mobile Number *"
              name="mobileNo"
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              containerStyle="mb-0"
              inputStyle="bg-white"
              rules={{
                required: 'Mobile number is required',
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: 'Please enter a valid 10-digit mobile number'
                }
              }}
            />
          </View>

          {/* Password Input */}
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
                validate: (value) => value === password || 'Passwords do not match'
              }}
            />
          </View>

          {/* Referral Code Input */}
          <View className="mb-4">
            <TextInput
              control={control}
              label="Referral Code"
              name="referralCode"
              placeholder="Enter referral code"
              containerStyle="mb-0"
              inputStyle="bg-white"
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

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
