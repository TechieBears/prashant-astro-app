import React from 'react';
import { View, SafeAreaView, ScrollView, StatusBar, Platform, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BannerSlider from '../../components/Sliders';
import ServiceCard from '../../components/Cards/Service';
import Header from '../../components/Common/Header';
import TalkToAstrologerCard from '../../components/Cards/TalkToAstrologerCard';
import CardHeading from '../../components/Headings/CardHeading';
import HomeProductCard from '../../components/Cards/HomeProducts';

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

        <View className="z-10">
          <Header />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={['#FF8A3D', '#FFB27D', '#FFD4B3', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.3 }}
            className="absolute  left-0 right-0 h-[100%]"
          />
          <View className="flex-1 px-6 flex flex-col gap-y-4">
            <BannerSlider />

            <TalkToAstrologerCard />
            <View>
              <CardHeading
                titleBlack="Our"
                titleGradient="Services"
                onViewAllPress={() => navigation.navigate('AstrologersList')}
              />
              <View className="flex-row flex-wrap gap-4  ">
                {services.map(service => (
                  <View key={service.id} style={{ width: '47%' }} className="flex justify-between items-center">
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
            <View>
              <CardHeading
                titleBlack="Our"
                titleGradient="Products"
                onViewAllPress={() => navigation.navigate('AstrologersList')}
              />
              <HomeProductCard
                image={{ uri: 'https://via.placeholder.com/300x300' }}
                title="Sacred Rudraksha Bead"
                price={3520}
                onButtonPress={() => console.log('Add to Cart')}
                onAddToCart={() => console.log('Card Pressed')}
              />
            </View>
          </View>
          <View className="h-16" />
        </ScrollView>

      </SafeAreaView>
    </View>
  );
};

export default Home;
