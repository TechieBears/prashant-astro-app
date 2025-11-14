import { View, Text, SafeAreaView, StatusBar, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';

import BackButton from '../../components/Buttons/BackButton';

export default function CallHistory() {

  return (
    <SafeAreaView
      className="flex-1 bg-orange-50"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView className='px-6 py-4'>
        <BackButton heading={'Call History'} />
        <View className='flex mt-6 gap-3'>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
