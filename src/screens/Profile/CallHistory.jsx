import { View, Text, SafeAreaView, StatusBar, ScrollView, Platform, TouchableOpacity, Image } from 'react-native';
import React from 'react';

import BackButton from '../../components/Buttons/BackButton';
import { LinearGradient } from 'react-native-linear-gradient';

// Dummy data
const callHistoryData = [
  {
    id: 1,
    name: 'Kalidas',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    specialization: 'Vedic, Nadi, Vastu, Prashana, Life Coach',
    languages: 'English, Tamil',
    experience: '10 Years',
    calls: [
      { date: '08/10/2025', status: 'request', label: 'Request' },
      { date: '05/10/2025', duration: '10 min', status: 'completed', label: '10 min call done' },
      { date: '02/10/2025', status: 'rejected', label: 'Call Reject' },
    ],
    buttonType: 'requested',
  },
  {
    id: 2,
    name: 'Kalidas',
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
    specialization: 'Vedic, Nadi, Vastu, Prashana, Life Coach',
    languages: 'English, Tamil',
    experience: '10 Years',
    calls: [
      { date: '03/10/2025', duration: '8 min', status: 'completed', label: '8 min call done' },
      { date: '02/10/2025', duration: '20 min', status: 'completed', label: '20 min call done' },
      { date: '12/10/2025', status: 'rejected', label: 'Call Reject' },
    ],
    buttonType: 'callAgain',
  },
  {
    id: 3,
    name: 'Kalidas',
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
    specialization: 'Vedic, Nadi, Vastu, Prashana, Life Coach',
    languages: 'English, Tamil',
    experience: '10 Years',
    calls: [
      { date: '19/10/2025', duration: '5 min', status: 'completed', label: '5 min call done' },
      { date: '24/10/2025', duration: '12 min', status: 'completed', label: '12 min call done' },
      { date: '25/10/2025', status: 'rejected', label: 'Call Reject' },
    ],
    buttonType: 'callAgain',
  },
  {
    id: 4,
    name: 'Kalidas',
    image: 'https://randomuser.me/api/portraits/men/35.jpg',
    specialization: 'Vedic, Nadi, Vastu, Prashana, Life Coach',
    languages: 'English, Tamil',
    experience: '10 Years',
    calls: [
      { date: '14/10/2025', duration: '2 min', status: 'completed', label: '2 min call done' },
    ],
    buttonType: 'callAgain',
  },
];

const CallHistoryCard = ({ item }) => {
  return (
    <View className="bg-slate-50 rounded-2xl p-4 mb-4 shadow-sm">
      {/* Profile Section */}
      <View className="flex-row mb-3">
        <Image
          source={{ uri: item.image }}
          className="w-20 h-20 rounded-full"
        />
        <View className="flex-1 ml-3">
          <Text className="text-slate-700 text-lg font-semibold mb-1">{item.name}</Text>
          <Text className="text-slate-700 text-xs leading-4 mb-1">{item.specialization}</Text>
          <Text className="text-slate-700 text-xs mb-1">{item.languages}</Text>
          <Text className="text-slate-700 text-xs">Exp: {item.experience}</Text>
        </View>
      </View>

      <View className='flex flex-row items-center justify-between'>
        {/* Call History */}
        <View className="mb-3">
          {item.calls.map((call, index) => (
            <View key={index} className="flex-row items-center mb-1">
              <Text className="text-slate-700 text-xs w-24">{call.date}-</Text>
              <Text
                className={`text-xs font-medium ${call.status === 'completed' ? 'text-green-600' :
                  call.status === 'rejected' ? 'text-red-500' :
                    'text-blue-600'
                  }`}
              >
                {call.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={item.buttonType === 'requested'}
        >
          {item.buttonType === 'callAgain' ? (
            <LinearGradient
              colors={['#FFBF12', '#FF8835', '#FF5858']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-3 rounded-xl"
              style={{paddingVertical : 3, borderRadius : 10}}
            >
              <Text className="text-white px-6 text-center font-semibold text-base">
                Call Again
              </Text>
            </LinearGradient>
          ) : (
            <View className="py-3 rounded-xl bg-blue-500">
              <Text className="text-white px-6 text-center font-semibold text-base">
                Requested
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function CallHistory() {
  return (
    <SafeAreaView
      className="flex-1 bg-orange-50"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView className='px-6 py-4 '>
        <BackButton heading={'Call History'} />
        <View className='flex mt-6 gap-3 mb-6'>
          {callHistoryData.map((item) => (
            <CallHistoryCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}