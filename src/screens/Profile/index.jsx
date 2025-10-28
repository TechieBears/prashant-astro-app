import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import {
  PencilEdit01Icon,
  CalendarCheckIn01Icon,
  Location06Icon,
  PolicyIcon,
  HeadsetIcon,
  InformationDiamondIcon,
  ArrowRight01Icon,
  Mail01Icon,
} from 'hugeicons-react-native';

export default function Profile({navigation}) {
  const menuItems = [
    { icon: PencilEdit01Icon, label: 'Edit Basic Details', color: '#F97316', redirect: 'EditProfile' },
    { icon: CalendarCheckIn01Icon, label: 'My Orders', color: '#00786F', redirect: 'MyOrders' },
    { icon: Location06Icon, label: 'My Address', color: '#00786F', redirect: 'Address' },
    { icon: PolicyIcon, label: 'Privacy Policy', color: '#62748E', redirect: 'PrivacyPolicy' },
    { icon: HeadsetIcon, label: 'Customer Support', color: '#246DF2', redirect: 'CustomerSupport' },
    { icon: InformationDiamondIcon, label: 'About Us', color: '#00B8DB', redirect: 'AboutUs' },
  ];

  return (
    <SafeAreaView
      className="flex-1 bg-orange-50"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 flex-row items-center justify-between">
          <Text className="text-2xl font-medium">
            Our <Text className="text-orange-500">Profile</Text>
          </Text>
          <TouchableOpacity className="p-2">
            <PencilEdit01Icon color="#374151" size={25} />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View className="px-6 mt-2">
          <View className="flex-row items-center space-x-4 border-b border-[#E2E8F0] pb-6">
            <View className="w-14 h-14 rounded-full overflow-hidden">
              <Image
                source={{ uri: 'https://via.placeholder.com/56' }}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
            <View className="ml-6">
              <Text className="text-2xl font-semibold text-gray-900">
                Sid Sriram
              </Text>
              <View className="flex-row items-center space-x-2 mt-1">
                <Mail01Icon size={20} color="#62748E" />
                <Text className="text-lg text-slate-500 ml-2">
                  sidsriram@gmail.com
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mt-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={index}
                className="w-full mx-6 py-4 flex-row items-center justify-between border-b border-[#E2E8F0] active:bg-gray-50"
                onPress={() => navigation.navigate(item.redirect)}
              >
                <View className="flex-row items-center space-x-4">
                  <View className="mr-6">
                    <Icon size={25} color={item.color} />
                  </View>
                  <Text className="text-base text-slate-800">{item.label}</Text>
                </View>
                <ArrowRight01Icon size={20} color="#62748E" />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
