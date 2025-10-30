import React from 'react';
import {View, Text, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GradientButton from '../../components/Buttons/GradientButton';
import {BookingSuccessBadgeIcon, ClipboardCopyIcon} from '../../utils/svgIcons';

const paymentSummary = [
  {
    label: 'Transaction ID',
    value: '4587569851522',
    showCopy: true,
  },
  {
    label: 'Booked On',
    value: '10th Sep, 2025',
  },
  {
    label: 'Booked Date',
    value: '15th Sep, 2025',
  },
  {
    label: 'Type of Transaction',
    value: 'Razorpay',
  },
  {
    label: 'Total Price',
    value: '5999.00',
  },
  {
    label: 'GST',
    value: '1079.82',
  },
];

const BookingSuccess = () => {
  const navigation = useNavigation();
  const {top, bottom} = useSafeAreaInsets();

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1 bg-[#FEF8EF]" style={{paddingBottom: bottom + 40}}>
      <StatusBar barStyle="light-content" backgroundColor="#12B35D" />
      <View
        className="bg-[#00C950] justify-center items-center"
        style={{paddingTop: top, height: '50%'}}>
        <View className="items-center">
          <View className="mb-6">
            <BookingSuccessBadgeIcon />
          </View>
          <Text className="text-white text-[28px] font-prociono text-center">
            Booking Successful!
          </Text>
          <Text className="text-white/80 font-poppins text-base mt-2 text-center">
            Successfully paid ₹7078.82
          </Text>
        </View>
      </View>

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View className="px-3">
          <View>
            {paymentSummary.map(item => (
              <View
                key={item.label}
                className="flex-row items-center justify-between py-2">
                <Text className="text-[#62748E] font-poppins text-base">
                  {item.label}
                </Text>
                <View className="flex-row items-center">
                  {item.showCopy && (
                    <TouchableOpacity
                      onPress={() => {}}
                      activeOpacity={0.8}
                      className="mr-2 rounded-full p-1.5 bg-white/70">
                      <ClipboardCopyIcon />
                    </TouchableOpacity>
                  )}
                  <Text className="text-[#272B35] font-poppins text-base">
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}

            <View className="flex-row items-center justify-between">
              <Text className="text-[#1D293D] font-poppinsSemiBold text-base">
                Total Paid
              </Text>
              <Text className="text-[#1D293D] font-poppinsBold text-base mt-1">
                7078.82
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 bg-[#FEF8EF]">
        <GradientButton
          title="View My Orders"
          onPress={() => {}}
          containerStyle="mb-4"
          icon={false}
        />
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleGoHome}
          className="rounded-[10px] border border-[#62748E] py-4 items-center">
          <Text className="text-[#62748E] font-poppinsMedium text-base">
            Go Homepage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingSuccess;
