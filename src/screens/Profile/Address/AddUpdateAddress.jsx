import { View, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import BackButton from '../../../components/Buttons/BackButton'
import TextInput from '../../../components/Inputs/TextInput'
import SelectDropdown from '../../../components/Inputs/SelectDropdown'
import GradientButton from '../../../components/Buttons/GradientButton'
import Button from '../../../components/Buttons/Button'
import { Tick02Icon } from 'hugeicons-react-native'

export default function AddUpdateAddress() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            zipCode: ''
        }
    })

    const [addressType, setAddressType] = useState('Home')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [isDefaultAddress, setIsDefaultAddress] = useState(false)

    const addressTypes = ['Home', 'Office', 'Friend', 'Other']

    const countries = [
        { label: 'India', value: 'india' },
        { label: 'United States', value: 'usa' },
        { label: 'United Kingdom', value: 'uk' },
    ]

    const states = [
        { label: 'Maharashtra', value: 'maharashtra' },
        { label: 'Karnataka', value: 'karnataka' },
        { label: 'Tamil Nadu', value: 'tamilnadu' },
    ]

    const cities = [
        { label: 'Mumbai', value: 'mumbai' },
        { label: 'Pune', value: 'pune' },
        { label: 'Bangalore', value: 'bangalore' },
    ]

    const onSubmit = (data) => {
        const formData = {
            ...data,
            addressType,
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
            isDefaultAddress
        }
        console.log('Form Data:', formData)
    }

    const handleCancel = () => {
        console.log('Cancel pressed')
    }

    return (
        <SafeAreaView
            className="flex-1 bg-orange-50"
            style={{
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}
        >
            <ScrollView className='px-6 py-4'>
                <BackButton heading={'My Address'} />

                <View className='mt-6'>
                    {/* First Name */}
                    <TextInput
                        control={control}
                        name="firstName"
                        label="First Name*"
                        placeholder="Enter first name"
                        rules={{ required: 'First name is required' }}
                    />

                    {/* Last Name */}
                    <TextInput
                        control={control}
                        name="lastName"
                        label="Last Name*"
                        placeholder="Enter last name"
                        rules={{ required: 'Last name is required' }}
                    />

                    {/* Phone Number */}
                    <TextInput
                        control={control}
                        name="phoneNumber"
                        label="Phone Number *"
                        placeholder="Enter phone number"
                        keyboardType="phone-pad"
                        rules={{ 
                            required: 'Phone number is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Please enter a valid 10-digit phone number'
                            }
                        }}
                    />

                    {/* Address Type */}
                    <View className="mb-4">
                        <Text className="text-text1 font-poppinsMedium text-sm mb-2">
                            Address Type *
                        </Text>
                        <View className="flex flex-row gap-3">
                            {addressTypes.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => setAddressType(type)}
                                    className={`flex-1 px-4 py-3 rounded-lg border ${
                                        addressType === type
                                            ? 'bg-gradient-to-r from-orange-500 to-pink-500'
                                            : 'bg-white border-gray-300'
                                    }`}
                                    style={
                                        addressType === type
                                            ? {
                                                backgroundColor: '#FF8835',
                                                borderWidth: 0,
                                            }
                                            : {}
                                    }
                                >
                                    <Text
                                        className={`text-center font-poppinsMedium text-sm ${
                                            addressType === type ? 'text-white' : 'text-text1'
                                        }`}
                                    >
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Address */}
                    <TextInput
                        control={control}
                        name="address"
                        label="Address *"
                        placeholder="Enter address"
                        multiline
                        numberOfLines={3}
                        rules={{ required: 'Address is required' }}
                    />

                    {/* Country */}
                    <SelectDropdown
                        label="Country *"
                        placeholder="Select country"
                        options={countries}
                        value={selectedCountry}
                        onSelect={(item) => setSelectedCountry(item.value)}
                    />

                    {/* State */}
                    <SelectDropdown
                        label="State *"
                        placeholder="Select state"
                        options={states}
                        value={selectedState}
                        onSelect={(item) => setSelectedState(item.value)}
                    />

                    {/* City */}
                    <SelectDropdown
                        label="City *"
                        placeholder="Select city"
                        options={cities}
                        value={selectedCity}
                        onSelect={(item) => setSelectedCity(item.value)}
                    />

                    {/* Zip Code */}
                    <TextInput
                        control={control}
                        name="zipCode"
                        label="Zip Code / Postal Code *"
                        placeholder="Enter zip code"
                        keyboardType="numeric"
                        rules={{ 
                            required: 'Zip code is required',
                            pattern: {
                                value: /^[0-9]{6}$/,
                                message: 'Please enter a valid 6-digit zip code'
                            }
                        }}
                    />

                    {/* Set as Default Address Checkbox */}
                    <TouchableOpacity
                        onPress={() => setIsDefaultAddress(!isDefaultAddress)}
                        className="flex flex-row items-center mb-6"
                    >
                        <View
                            className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
                                isDefaultAddress
                                    ? 'bg-slate-800 border-slate-800'
                                    : 'bg-white border-gray-400'
                            }`}
                        >
                            {isDefaultAddress && (
                                <Tick02Icon size={16} color="white" strokeWidth={3} />
                            )}
                        </View>
                        <Text className="text-text1 font-poppins text-sm">
                            Set as default address
                        </Text>
                    </TouchableOpacity>

                    {/* Buttons */}
                    <View className="flex flex-row gap-3 mb-6">
                        <View className="flex-1">
                            <GradientButton
                                title="Save Address"
                                onPress={handleSubmit(onSubmit)}
                            />
                        </View>
                        <View className="flex-1">
                            <Button
                                title="Cancel"
                                variant="outline"
                                onPress={handleCancel}
                                containerStyle="border-2 border-gray-800"
                                textStyle="text-gray-800 text-xl font-bold"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}