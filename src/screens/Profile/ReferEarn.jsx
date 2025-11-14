import { View, Text, SafeAreaView, StatusBar, ScrollView, Platform, TouchableOpacity, Share, Linking } from 'react-native';
import React from 'react';

import BackButton from '../../components/Buttons/BackButton';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { WhatsappIcon } from 'hugeicons-react-native';

export default function ReferEarn() {
  const referralLink = 'https://yourapp.com/ref/USER123'; // Replace with your actual referral link
  
  const handleWhatsAppShare = async () => {
    const message = `🎉 Join me on this amazing app and earn rewards!\n\n💰 Get ₹200 on your first purchase\n\nUse my referral link: ${referralLink}`;
    
    try {
      if (Platform.OS === 'android') {
        const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
        const canOpen = await Linking.canOpenURL(whatsappUrl);
        
        if (canOpen) {
          await Linking.openURL(whatsappUrl);
        } else {
          // Fallback to native share if WhatsApp is not installed
          await Share.share({
            message: message,
          });
        }
      } else {
        // iOS
        const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
        const canOpen = await Linking.canOpenURL(whatsappUrl);
        
        if (canOpen) {
          await Linking.openURL(whatsappUrl);
        } else {
          // Fallback to native share
          await Share.share({
            message: message,
          });
        }
      }
    } catch (error) {
      console.log('Error sharing:', error);
      // Fallback to native share dialog
      try {
        await Share.share({
          message: message,
        });
      } catch (shareError) {
        console.log('Share error:', shareError);
      }
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-orange-50"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView className=''>
        <View className='bg-white px-6 py-4 shadow-xl rounded-b-2xl'>
          <BackButton heading={'Refer & Earn'} bg='white' />
          <View className='flex mt-6 gap-3'>
            <MaskedView
              maskElement={
                <Text className="text-7xl font-semibold">₹ 50</Text>
              }
            >
              <LinearGradient
                colors={['#FFBF12', '#FF8835', '#FF5858']}
                start={{ x: 0, y: 0.9 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="text-7xl font-semibold opacity-0">
                  ₹ 50
                </Text>
              </LinearGradient>
            </MaskedView>
            <Text className='text-slate-500 font-poppins text-md'>Total Rewards Earned</Text>
          </View>
        </View>

        {/* Referral Card */}
        <View className="mx-4 mt-6 bg-white rounded-2xl p-5 shadow-lg">
          <Text className="text-slate-800 text-lg  leading-6 mb-2">
            Earn Up to ₹200 in your Rewards Points For Every Referral
          </Text>
          
          <Text className="text-slate-500 text-sm leading-5 mb-4">
            Earn up to ₹200 in reward points for each friend you refer who joins and completes their first activity or purchase.
          </Text>
          
          <TouchableOpacity
            onPress={handleWhatsAppShare}
            className="bg-green-500 rounded-xl py-4 flex-row items-center justify-center active:bg-green-600"
            activeOpacity={0.8}
          >
            <View className="mr-2">
              <WhatsappIcon size={20} color='white' />
            </View>
            <Text className="text-white text-base font-semibold">
              Invite on Whatsapp
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}