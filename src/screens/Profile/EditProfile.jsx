import { View, Text, SafeAreaView, StatusBar, ScrollView, Platform, Alert, PermissionsAndroid } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useForm } from 'react-hook-form';
import BackButton from '../../components/Buttons/BackButton';
import TextInput from '../../components/Inputs/TextInput';
import RadioButton from '../../components/Inputs/RadioInput';
import FileInput from '../../components/Inputs/FileInput';
import SelectDropdown from '../../components/Inputs/SelectDropdown';
import { useDispatch, useSelector } from 'react-redux';

export default function EditProfile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  console.log('user', user)
  const [gender, setGender] = useState('Male');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      title: user?.title || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName ||  '',
      email: '',
      mobileNo: user?.mobileNo || '',
      
    }
  });

    const titleOptions = [
    { label: 'Mr', value: 'Mr' },
    { label: 'Mrs', value: 'Mrs' },
    { label: 'Miss', value: 'Miss' },
    { label: 'Baby', value: 'Baby' },
    { label: 'Master', value: 'Master' }
  ];


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
          {/* Full Name Input */}
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


          {/* Phone Number Input */}
          <TextInput
            control={control}
            label="Phone Number *"
            name="mobileNo"
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
