import React from 'react';
import { View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import BannerSlider from '../../components/Sliders';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-background">
-
      {/* Scrollable Content */}
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        
        {/* 🔹 Header Section */}
        <View className="mt-4">
          {/* <Header /> */}
        </View>

        {/* 🔹 Main Content Section */}
        <View className="mt-6">
          <BannerSlider />
        </View>

        {/* 🔹 Spacer */}
        <View className="h-16" />
      </ScrollView>

      {/* 🔹 Floating Cart Button */}
      <View className="absolute bottom-10 left-1/2 -translate-x-1/2">
        {/* <FloatingCartButton /> */}
      </View>
    </SafeAreaView>
  );
};

export default Home;
