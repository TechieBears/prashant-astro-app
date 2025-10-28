import { View, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import BackButton from '../../../components/Buttons/BackButton'
import { Edit02Icon, Delete02Icon } from 'hugeicons-react-native'

export default function Address({navigation}) {
    // Dummy data
    const addresses = [
        {
            id: 1,
            name: 'Sid Sriram',
            phone: '9584523665',
            address: '8520 Varaladevi road near darshan hotel Bhiwandi - 421305',
            isDefault: true,
            type: 'Home'
        }
    ]

    const handleAddNew = () => {
        console.log('Add new address')
        navigation.navigate('AddUpdateAddress')
    }

    const handleEdit = (id) => {
        console.log('Edit address:', id)
        navigation.navigate('AddUpdateAddress', { addressId: id })
    }

    const handleDelete = (id) => {
        console.log('Delete address:', id)
    }

    return (
        <SafeAreaView
            className="flex-1 bg-orange-50"
            style={{
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}
        >
            <ScrollView className='px-6 py-4'>
                <BackButton 
                    heading={'My Address'} 
                    showAddButton={true}
                    onAddPress={handleAddNew}
                />
                <View className='flex mt-6 gap-3'>
                    {addresses.map((item) => (
                        <View 
                            key={item.id}
                            className='bg-white rounded-2xl shadow-lg p-4 border border-gray-200'
                        >
                            <View className='flex flex-row justify-between items-start mb-3'>
                                <Text className='text-lg font-poppins font-bold text-text3'>
                                    {item.name}
                                </Text>
                                <View className='flex flex-row gap-2'>
                                    <TouchableOpacity 
                                        className='p-2 rounded-lg border border-gray-200'
                                        onPress={() => handleEdit(item.id)}
                                    >
                                        <Edit02Icon size={20} color="#374151" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        className='p-2 rounded-lg bg-red-500'
                                        onPress={() => handleDelete(item.id)}
                                    >
                                        <Delete02Icon size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <Text className='text-sm font-poppins text-text3 mb-1'>
                                {item.phone}
                            </Text>
                            
                            <Text className='text-sm font-poppins text-text3 mb-4 leading-5'>
                                {item.address}
                            </Text>
                            
                            <View className='flex flex-row items-center justify-between'>
                                <View className='flex flex-row items-center mr-6'>
                                    <View className='w-1.5 h-1.5 rounded-full bg-slate-800 mr-2' />
                                    <Text className='text-sm font-poppins text-text3'>
                                        {item.isDefault ? 'Default Address' : 'Address'}
                                    </Text>
                                </View>
                                <View className='flex flex-row items-center'>
                                    <View className='w-1.5 h-1.5 rounded-full bg-slate-800 mr-2' />
                                    <Text className='text-sm font-poppins text-text3'>
                                        {item.type}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}