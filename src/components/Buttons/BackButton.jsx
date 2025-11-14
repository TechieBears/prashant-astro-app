import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeft02Icon, Add01Icon } from 'hugeicons-react-native'
import { useNavigation } from '@react-navigation/native'

export default function BackButton({ heading, showAddButton, onAddPress, bg='background'}) {
    const navigation = useNavigation();
    return (
            <View className={`bg-${bg} flex flex-row items-center justify-between`}>
            <View className='flex flex-row items-center'>
                <TouchableOpacity onPress={() => navigation.goBack()} className='p-3 rounded-lg bg-white mr-4 border border-[#00000026]'>
                    <ArrowLeft02Icon size={25} />
                </TouchableOpacity>
                <Text className='text-lg font-poppins font-semibold text-slate-800'>{heading}</Text>
            </View>
            {showAddButton && (
                <TouchableOpacity 

                    className='bg-orange-500 px-4 py-3 rounded-lg flex flex-row items-center'
                    onPress={onAddPress}
                >
                    <Add01Icon size={20} color="white" />
                    <Text className='text-white font-poppins font-medium ml-2'>Add New</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}