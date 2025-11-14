import { View, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackButton from '../../../components/Buttons/BackButton'
import { Edit02Icon, Delete02Icon } from 'hugeicons-react-native'
import { getMyAddress, deleteMyAddress } from '../../../services/api'

export default function Address({navigation}) {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            console.log('📍 Fetching addresses...');
            const response = await getMyAddress();
            console.log('📍 Address API Response:', JSON.stringify(response, null, 2));
            
            if (response?.success && response?.data) {
                console.log('📍 Address Data:', response.data);
                setAddresses(response.data);
            } else {
                console.log('📍 No addresses found or API failed');
                setAddresses([]);
            }
        } catch (error) {
            console.error('📍 Error fetching addresses:', error);
            setAddresses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchAddresses();
        });
        return unsubscribe;
    }, [navigation]);

    const handleAddNew = () => {
        console.log('Add new address')
        navigation.navigate('AddUpdateAddress')
    }

    const handleEdit = (id) => {
        const addressToEdit = addresses.find(addr => addr._id === id);
        console.log('Edit address:', addressToEdit);
        navigation.navigate('AddUpdateAddress', { 
            addressId: id,
            addressData: addressToEdit 
        });
    }

    const handleDelete = async (id) => {
        try {
            console.log('🗑️ Deleting address:', id);
            const response = await deleteMyAddress(id);
            console.log('🗑️ Delete response:', response);
            
            if (response?.success) {
                console.log('✅ Address deleted successfully');
                fetchAddresses(); // Refetch addresses
            }
        } catch (error) {
            console.error('❌ Error deleting address:', error);
        }
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
                {loading ? (
                    <View className='flex-1 justify-center items-center py-8'>
                        <ActivityIndicator size="large" color="#FF7A00" />
                        <Text className='text-gray-600 mt-2 font-poppins'>Loading addresses...</Text>
                    </View>
                ) : (
                    <View className='flex mt-6 gap-3'>
                        {addresses.length > 0 ? addresses.map((item) => (
                        <View 
                            key={item._id}
                            className='bg-white rounded-2xl shadow-xl p-4 border border-gray-200'
                        >
                            <View className='flex flex-row justify-between items-start mb-3'>
                                <Text className='text-lg font-poppins font-bold text-text3'>
                                    {item.firstName} {item.lastName}
                                </Text>
                                <View className='flex flex-row gap-2'>
                                    <TouchableOpacity 
                                        className='p-2 rounded-lg border border-gray-200'
                                        onPress={() => handleEdit(item._id)}
                                    >
                                        <Edit02Icon size={20} color="#374151" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        className='p-2 rounded-lg bg-red-500'
                                        onPress={() => handleDelete(item._id)}
                                    >
                                        <Delete02Icon size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <Text className='text-sm font-poppins text-text3 mb-1'>
                                {item.phoneNumber}
                            </Text>
                            
                            <Text className='text-sm font-poppins text-text3 mb-4 leading-5'>
                                {item.address}, {item.city}, {item.state} - {item.postalCode}
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
                                    <Text className='text-sm font-poppins text-text3 capitalize'>
                                        {item.addressType}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        )) : (
                            <View className='flex-1 justify-center items-center py-8'>
                                <Text className='text-gray-600 font-poppins'>No addresses found</Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}