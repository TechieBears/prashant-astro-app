import React from 'react';
import { View, SafeAreaView, ScrollView, StatusBar, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BannerSlider from '../../components/Sliders';
import ServiceCard from '../../components/Cards/Service';
import Header from '../../components/Common/Header';

const Home = ({ navigation }) => {
  const services = [
    {
      id: 1,
      image: { uri: 'https://i.postimg.cc/CxhQnSxt/Astrology.png' },
      title: 'Astrology',
      description: 'Your hands hold the story of your life.',
    },
    {
      id: 2,
      image: { uri: 'https://i.postimg.cc/CxhQnSxt/Palmistry.png' },
      title: 'Palmistry',
      description: 'Discover your destiny through palm reading.',
    },
    {
      id: 3,
      image: { uri: 'https://i.postimg.cc/CxhQnSxt/Tarot.png' },
      title: 'Tarot Reading',
      description: 'Unveil the mysteries of your future.',
    },
    {
      id: 4,
      image: { uri: 'https://i.postimg.cc/CxhQnSxt/Tarot.png' },
      title: 'Tarot Reading',
      description: 'Unveil the mysteries of your future.',
    },
  ];

  const handleServicePress = service => {
    navigation.navigate('ServiceDetails', { service });
  };

  return (
    <View className="flex-1">
      {/* StatusBar */}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <SafeAreaView
        className="flex-1"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        {/* Header */}
        <View className="z-10"> {/* Higher z-index to make sure the header is above the gradient */}
          <Header />
        </View>

        {/* Gradient Background */}
        <LinearGradient
          colors={['#FF8A3D', '#FFB27D', '#FFD4B3', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
          className="absolute top-[20px] left-0 right-0 h-[100%]"
        />

        {/* Scrollable Content */}
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 🔹 Main Content Section */}
          <View>
            <BannerSlider />

            <View className="flex-row flex-wrap gap-4 mt-4">
              {services.map(service => (
                <View key={service.id} style={{ width: '48%' }} className="flex justify-between items-center">
                  <ServiceCard
                    image={service.image}
                    title={service.title}
                    description={service.description}
                    onPress={() => handleServicePress(service)}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* 🔹 Spacer */}
          <View className="h-16" />
        </ScrollView>

        {/* 🔹 Floating Cart Button */}
        <View className="absolute bottom-10 left-1/2 -translate-x-1/2">
          {/* <FloatingCartButton /> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
