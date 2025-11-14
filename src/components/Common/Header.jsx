import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native'
import React from 'react'
import { ShoppingCart02Icon, Notification01Icon, UserIcon } from 'hugeicons-react-native'
import { useNavigation } from '@react-navigation/native'

export default function Header() {
  const navigation = useNavigation();
  return (
    <View className='bg-white p-2 pb-4'  >
      <StatusBar
        translucent
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <View className="flex flex-row justify-between items-center px-4">
        {/* Left side - Logo and Title */}
        <View className="flex flex-row gap-1">
          <Image
            source={require('../../assets/images/logo.png')}
            className="w-12 h-12"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-primary mt-2">
            AstroGuid
          </Text>
        </View>

        {/* Right side - Icons */}
        <View className="flex flex-row items-center gap-4">
          <TouchableOpacity className='bg-background p-2 rounded-md border-[#00000026] border-[1px]'>
            <Notification01Icon color="#314158" size={20} />
          </TouchableOpacity>
          <TouchableOpacity className='bg-background p-2 rounded-md border-[#00000026] border-[1px]'>
            <ShoppingCart02Icon color="#314158" size={20} />
          </TouchableOpacity>
          <TouchableOpacity 
            className='bg-background p-2 rounded-md border-[#00000026] border-[1px]'
            onPress={() => navigation.openDrawer()}
          >
            <UserIcon color="#314158" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
