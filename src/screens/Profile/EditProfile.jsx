import { View, Text, SafeAreaView, StatusBar, ScrollView, Platform, Alert, PermissionsAndroid } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useForm } from 'react-hook-form';
import BackButton from '../../components/Buttons/BackButton';
import TextInput from '../../components/Inputs/TextInput';
import RadioButton from '../../components/Inputs/RadioInput';
import FileInput from '../../components/Inputs/FileInput';

export default function EditProfile() {
  const [gender, setGender] = useState('Male');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    }
  });

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleFileSelect = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Please grant storage permission to select files.');
      return;
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const file = response.assets[0];
        setSelectedFile(file.fileName || 'Selected file');
        setError('');
      }
    });
  };

  // You can define a handleSubmit function here if needed.
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-orange-50"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView className='px-6 py-4'>
        <BackButton heading={'Edit Basic Details'} />
        <View className='flex mt-6 gap-3'> 
          {/* Full Name Input */}
          <TextInput
            control={control}
            label="Full Name *"
            name="fullName"
            placeholder="Enter full name"
            containerStyle="mb-0"
            inputStyle="bg-white"
            rules={{
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            }}
          />

          {/* Email Input */}
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
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
            }}
          />

          {/* Phone Number Input */}
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
              pattern: { value: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' },
            }}
          />

          {/* Gender Selection */}
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
          <View>
             <FileInput
                    label="Upload Profile Picture"
                    placeholder="Choose file"
                    onPress={handleFileSelect}
                    selectedFile={selectedFile}
                    error={error}
                  />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
