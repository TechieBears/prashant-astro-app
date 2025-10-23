import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { Mail01Icon, ArrowLeft02Icon } from 'hugeicons-react-native';
import GradientButton from '../../components/Buttons/GradientButton';
import TextInput from '../../components/Inputs/TextInput';

const ForgotPassword = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
    }
  });
  
  const [step, setStep] = useState(1); // 1: Email Input, 2: Success Message
  const [isLoading, setIsLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmittedEmail(data.email);
    
    try {
      // Simulate API call to send reset link
      // Replace this with your actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // If successful, move to step 2
      setStep(2);
    } catch (error) {
      console.error('Error sending reset link:', error);
      // Handle error (show error message)
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 pt-12">
        {/* Back Button */}
        <TouchableOpacity 
          onPress={handleBackToLogin}
          className="flex-row items-center mb-8"
        >
          <ArrowLeft02Icon size={24} color="#1D293D" />
          <Text className="text-text1 font-poppinsMedium text-base ml-2">
            Back to Login
          </Text>
        </TouchableOpacity>

        {step === 1 ? (
          // Step 1: Email Input
          <>
            {/* Header */}
            <View className="items-center mb-12">
              <Text className="text-4xl font-poppinsMedium text-text1 mb-4">
                Forgot Password
              </Text>
              <Text className="text-base font-poppins text-text2 text-center px-4 leading-6">
                Please provide your email to get a link{'\n'}for resetting your password.
              </Text>
            </View>

            {/* Email Input */}
            <View className="mb-8">
              <Text className="text-text1 font-poppinsMedium text-sm mb-2">
                Email *
              </Text>
              <View className="border border-gray-300 rounded-lg px-4 py-3.5 bg-white flex-row items-center">
                <Mail01Icon size={20} color="#62748E" />
                <View className="flex-1 ml-3">
                  <TextInput
                    control={control}
                    name="email"
                    placeholder="Enter email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    containerStyle="mb-0"
                    inputStyle="border-0 px-0 py-0"
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    }}
                  />
                </View>
              </View>
              {errors.email && (
                <Text className="text-primary2 font-poppins text-xs mt-1">
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Continue Button */}
            <View>
              <GradientButton
                title={isLoading ? "Sending..." : "Continue"}
                onPress={handleSubmit(onSubmit)}
                colors={['#FF8835', '#FF5858']}
                size="large"
                containerStyle="w-full"
                disabled={isLoading}
              />
              {isLoading && (
                <View className="items-center mt-4">
                  <ActivityIndicator size="small" color="#FF8835" />
                </View>
              )}
            </View>
          </>
        ) : (
          // Step 2: Success Message
          <>
            {/* Success Icon/Illustration */}
            <View className="items-center mb-8">
              <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center mb-6">
                <Text className="text-5xl">✉️</Text>
              </View>
              
              <Text className="text-3xl font-poppinsMedium text-text1 mb-4 text-center">
                Check Your Email
              </Text>
              
              <Text className="text-base font-poppins text-text2 text-center px-4 leading-6 mb-2">
                We have sent a password reset link to
              </Text>
              
              <Text className="text-base font-poppinsMedium text-text1 text-center mb-4">
                {submittedEmail}
              </Text>
              
              <Text className="text-sm font-poppins text-text2 text-center px-6 leading-5">
                Please check your inbox and click on the link to reset your password.
              </Text>
            </View>

            {/* Additional Info */}
            <View className="mt-8 px-4">
              <Text className="text-sm font-poppins text-text2 text-center leading-5">
                Didn't receive the email? Check your spam folder or
              </Text>
              
              <TouchableOpacity 
                onPress={() => setStep(1)}
                className="mt-2"
              >
                <Text className="text-primary font-poppinsMedium text-sm text-center">
                  Try another email address
                </Text>
              </TouchableOpacity>
            </View>

            {/* Back to Login Button */}
            <View className="mt-12">
              <GradientButton
                title="Back to Login"
                onPress={handleBackToLogin}
                colors={['#FF8835', '#FF5858']}
                size="large"
                containerStyle="w-full"
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;