import { View, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, Platform, Image } from 'react-native'
import React from 'react'
import BackButton from '../../components/Buttons/BackButton'
import {
    CustomerSupportIcon,
    Mail01Icon,
    Call02Icon,
} from 'hugeicons-react-native'

export default function Support() {
    const handleSupportOption = (option) => {
        console.log('Selected support option:', option)
    }

    const supportOptions = [
        {
            id: 1,
            title: 'PHONE SUPPORT',
            description: 'Our customer service team is available 24/7',
            icon: require('../../assets/images/call.png'),
            action: 'customer-service'
        },
        {
            id: 2,
            title: 'WHATSAPP SUPPORT',
            description: 'Send us your queries via WhatsApp',
            icon: require('../../assets/images/whatsapp.png'),
            action: 'email'
        },
        {
            id: 3,
            title: 'E-MAIL SUPPORT',
            description: 'Talk to our support team directly',
            icon: require('../../assets/images/email.png'),
            action: 'call'
        },

    ]

    return (
        <SafeAreaView
            className="flex-1 bg-orange-50"
            style={{
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}
        >
            <ScrollView className='px-6 py-4'>
                <BackButton heading={'Support'} />

                {/* Hero Image Section */}
                <View className='mt-6 mb-5 items-center'>
                    <View className=''>
                        {/* Replace this View with your local image */}
                        <Image
                            source={require('../../assets/images/support.png')}
                            className='w-96 h-96'
                            resizeMode='contain'
                        />
                        {/* If you haven't added the image yet, you can use this placeholder */}
                        {/* <View className='w-72 h-72 bg-gray-100 rounded-2xl items-center justify-center'>
                            <CustomerSupportIcon size={100} color="#FF8835" />
                        </View> */}
                    </View>
                </View>

                {/* Support Options */}
                <View className='flex gap-4 mb-6'>
                    {supportOptions.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            onPress={() => handleSupportOption(option.action)}
                            className='bg-white rounded-2xl p-5 flex flex-row items-center justify-between shadow-lg'
                        >
                            <View className='flex flex-row items-center flex-1'>
                                <View className='w-14 h-14  rounded-full items-center justify-center mr-4'>
                                    <Image
                                        source={option.icon} className='w-14 h-14' />
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-base font-poppins font-semibold text-[#051B2C] mb-1'>
                                        {option.title}
                                    </Text>
                                    <Text className='text-sm font-poppins text-[#051B2C]'>
                                        {option.description}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}