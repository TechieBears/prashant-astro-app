import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeft02Icon } from 'hugeicons-react-native'

export default function BackButton({ heading }) {
    return (
        <View className='bg-background flex flex-row items-center'>
            <TouchableOpacity className='p-3 rounded-lg bg-white mr-4 border border-[#00000026]'>
                <ArrowLeft02Icon size={25}  />
            </TouchableOpacity>
            <Text className='text-lg font-poppins font-semibold text-slate-800'>{heading}</Text>
        </View>
    )
}