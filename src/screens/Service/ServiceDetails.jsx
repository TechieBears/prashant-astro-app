import React, {useMemo} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  SessionDurationIcon,
  SessionModeIcon,
  ServiceBackIcon,
} from '../../utils/svgIcons';
import GradientButton from '../../components/Buttons/GradientButton';
import LinearGradient from 'react-native-linear-gradient';

const defaultService = {
  title: 'Astrology',
  description: 'Book your reading today and take a step closer to clarity.',
  image: {uri: 'https://i.postimg.cc/CxhQnSxt/Astrology.png'},
};

const defaultNarrative =
  'Your hands are more than just tools - they are maps of your life. Our sessions dive deep to reveal insights about your past, present, and future with compassionate guidance.';

const headlineFor = (title = '') =>
  `${title.trim() ? title : 'Astrology'} Services - What We Offer`;

const discoverySections = [
  {
    title: 'Love & Relationships',
    points: [
      'When will you meet your life partner?',
      'Will your current relationship last?',
      'Is love truly in your destiny?',
    ],
  },
  {
    title: 'Career & Business',
    points: [
      'What field suits your personality?',
      'Will your efforts bring success?',
      'Is it the right time to start a business?',
    ],
  },
  {
    title: 'Health & Emotional Balance',
    points: [
      'What do your signs reveal about stress and resilience?',
      'Learn to navigate emotional highs and lows with clarity.',
    ],
  },
  {
    title: 'Life Path & Purpose',
    points: [
      'What is your soul\'s true calling?',
      'Are you on the right path, or is a shift needed?',
    ],
  },
];

const whyChooseList = [
  'Based on authentic Vedic and modern practices',
  'Personalized readings tailored to your unique journey',
  'Confidential, compassionate guidance every step',
  'Available via in-person or online sessions',
];

const ServiceDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {top, bottom} = useSafeAreaInsets();

  const service = route.params?.service ?? defaultService;

  const narrative = useMemo(
    () => route.params?.service?.narrative ?? defaultNarrative,
    [route.params?.service],
  );

  const sessionDuration =
    route.params?.service?.sessionDuration ?? '30-60 minutes';
  const mode = route.params?.service?.mode ?? 'In-person / Online';

  return (
    <View className="flex-1 bg-[#FEF8EF]">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: bottom}}>
        <View className="">
          <ImageBackground
            source={service.image}
            resizeMode="cover"
            className="h-[420px]">
            <LinearGradient
              colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.75)']}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={{flex: 1}}>
              <View style={{paddingTop: top + 16}} className="px-5 flex-1">
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.85}
                  className="justify-center items-center"
                  style={{
                    width: 52,
                    height: 52,
                  }}>
                  <ServiceBackIcon />
                </TouchableOpacity>

                <View className="mt-auto pb-10">
                  <Text className="text-3xl font-prociono text-white mb-3">
                    {service.title}
                  </Text>
                  <Text className="text-white font-poppins leading-4 text-base">
                    {service.description}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        <View className="px-5">
          <View className="mt-6">
            <View className="flex-row items-center">
              <SessionDurationIcon />
              <Text className="ml-3 text-[#1D293D] font-poppinsSemiBold text-base">
                Session Duration:{' '}
                <Text className="font-poppins text-base text-[#1D293D]">
                  {sessionDuration}
                </Text>
              </Text>
            </View>
            <View className="flex-row items-center mt-4">
              <SessionModeIcon />
              <Text className="ml-3 text-[#1D293D] font-poppinsSemiBold text-base">
                Mode:{' '}
                <Text className="font-poppins text-base text-[#1D293D]">
                  {mode}
                </Text>
              </Text>
            </View>
          </View>

          <View className="mt-5">
            <Text className="text-[18px] font-poppinsMedium text-[#1D293D] leading-[28px]">
              {headlineFor(service.title)}
            </Text>
            <Text className="mt-2 text-[#62748E] font-poppins leading-6 text-base">
              {narrative}
            </Text>
          </View>

          <View className="mt-3">
            <Text className="text-[18px] font-poppinsMedium text-[#1D293D]">
              What Can You Discover?
            </Text>

            <View className="mt-3">
              {discoverySections.map(section => (
                <View key={section.title} className="mb-4">
                  <Text className="text-[#4A5668] font-poppins text-base mb-2">
                    {section.title}
                  </Text>
                  {section.points.map(point => (
                    <View
                      key={point}
                      className="flex-row items-start ml-2 mb-2">
                      <Text className="text-[#4A5668] font-poppins text-base mr-2">
                        {'\u2022'}
                      </Text>
                      <Text className="flex-1 text-[#4A5668] font-poppins text-base leading-6">
                        {point}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>

          <View className="mt-1">
            <Text className="text-[18px] font-poppinsMedium text-[#1D293D] mb-4">
              Why Choose Our {service.title ?? 'Astrology'} Reading?
            </Text>
            {whyChooseList.map(item => (
              <View
                key={item}
                className="flex-row items-start ml-2 mb-2">
                <Text className="text-[#1D293D] font-poppins text-base mr-2">
                  {'\u2022'}
                </Text>
                <Text className="flex-1 text-[#4A5668] font-poppins text-sm leading-6">
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="px-5 pb-6">
        <GradientButton title="Check Availability" showIcon={true} />
      </View>
    </View>
  );
};

export default ServiceDetails;
