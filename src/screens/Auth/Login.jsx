import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import { Mail01Icon, LockPasswordIcon, GoogleIcon, Facebook01Icon, AppleIcon, ViewIcon, ViewOffSlashIcon } from 'hugeicons-react-native';
import GradientButton from '../../components/Buttons/GradientButton';
import TextInput from '../../components/Inputs/TextInput';

const Checkbox = ({ checked, onPress, label }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center">
      <View className={`w-5 h-5 rounded border-2 ${checked ? 'bg-text1 border-text1' : 'border-gray-300'} items-center justify-center mr-2`}>
        {checked && (
          <Text className="text-white text-xs font-bold">✓</Text>
        )}
      </View>
      <Text className="text-text1 font-poppins text-sm">{label}</Text>
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

const Login = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });
  
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log('Login data:', data);
    // Handle login logic here
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login');
  };

  const handleAppleLogin = () => {
    console.log('Apple login');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-16">
          {/* Header */}
          <View className="items-center mb-10">
            <Text className="text-4xl font-poppinsMedium text-text1 mb-3">
              Login
            </Text>
            <Text className="text-base font-poppins text-text2 text-center px-4 leading-6">
              Enter your email and password to the{'\n'}securely access your account
            </Text>
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-text1 font-poppinsMedium text-sm mb-2">
              Email *
            </Text>
            <View className="border border-gray-300 rounded-lg px-4 py-3.5 bg-white flex-row items-center">
              <Mail01Icon size={20} color="#62748E" />
              <TextInput
                control={control}
                name="email"
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle="mb-0 flex-1"
                inputStyle="border-0 px-3 py-0"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                }}
              />
            </View>
            {errors.email && (
              <Text className="text-primary2 font-poppins text-xs mt-1">
                {errors.email.message}
              </Text>
            )}
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <Text className="text-text1 font-poppinsMedium text-sm mb-2">
              Password *
            </Text>
            <View className="border border-gray-300 rounded-lg px-4 py-3.5 bg-white flex-row items-center">
              <LockPasswordIcon size={20} color="#62748E" />
              <View className="flex-1 ml-3">
                <TextInput
                  control={control}
                  name="password"
                  placeholder="Enter password"
                  secureTextEntry={!showPassword}
                  containerStyle="mb-0"
                  inputStyle="border-0 px-0 py-0"
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  }}
                />
              </View>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <ViewIcon size={20} color="#62748E" />
                ) : (
                  <ViewOffSlashIcon size={20} color="#62748E" />
                )}
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text className="text-primary2 font-poppins text-xs mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>

          {/* Remember Me & Forgot Password */}
          <View className="flex-row justify-between items-center mb-8">
            <Checkbox 
              checked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              label="Remember me"
            />
            
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text className="text-text1 font-poppins text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <View className="mb-6">
            <GradientButton
              title="Login"
              onPress={handleSubmit(onSubmit)}
              colors={['#FF8835', '#FF5858']}
              size="large"
              containerStyle="w-full"
            />
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mb-8">
            <Text className="text-text2 font-poppins text-base">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text className="text-primary font-poppinsMedium text-base">
                Sign Up
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

export default Login;