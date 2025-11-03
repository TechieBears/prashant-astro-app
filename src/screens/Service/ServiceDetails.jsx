import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ServiceBackIcon,
  SessionDurationIcon,
  SessionModeIcon,
} from '../../utils/svgIcons';
import GradientButton from '../../components/Buttons/GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import ServiceCard from '../../components/Cards/Service';
import {getSingleServicesDetails} from '../../services';
import RenderHtml from 'react-native-render-html';

const DEFAULT_SERVICE_IMAGE = 'https://i.postimg.cc/CxhQnSxt/Astrology.png';

const ServiceDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {top, bottom} = useSafeAreaInsets();
  const {width: windowWidth} = useWindowDimensions();

  const initialService = route.params?.service;
  const providedServiceId = route.params?.serviceId || initialService?._id;

  const [serviceDetails, setServiceDetails] = useState(initialService ?? null);
  const [isLoading, setIsLoading] = useState(!initialService);
  const [error, setError] = useState(null);

  const imageSource = serviceDetails?.image
    ? {uri: serviceDetails.image}
    : {uri: DEFAULT_SERVICE_IMAGE};

  const title = serviceDetails?.title || serviceDetails?.name || 'Service';
  const subTitle =
    serviceDetails?.subTitle ||
    serviceDetails?.description ||
    'Discover deeper insights crafted just for you.';

  const htmlContent = useMemo(() => serviceDetails?.htmlContent?.trim(), [
    serviceDetails?.htmlContent,
  ]);

  const relatedServices = serviceDetails?.relatedServices || [];

  useEffect(() => {
    if (!providedServiceId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    getSingleServicesDetails(providedServiceId)
      .then(data => {
        const payload = data?.data || data;
        setServiceDetails(payload ?? null);
      })
      .catch(err => {
        console.log('Error fetching service details:', err);
        setError(err?.message || 'Unable to load service details.');
      })
      .finally(() => setIsLoading(false));
  }, [providedServiceId]);

  const handleCheckAvailability = () => {
    if (!serviceDetails) {
      return;
    }

    navigation.navigate('CheckAvailability', {
      service: serviceDetails,
      timeSlots: route.params?.timeSlots,
      serviceTypes: route.params?.serviceTypes,
      serviceModes: route.params?.serviceModes,
      pandits: route.params?.pandits,
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="py-20 items-center justify-center">
          <ActivityIndicator size="large" color="#FF8835" />
          <Text className="mt-4 text-base font-poppins text-[#4A5668]">
            Loading service details...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View className="px-5 py-10">
          <Text className="text-lg font-poppinsSemiBold text-[#1D293D]">
            Something went wrong
          </Text>
          <Text className="mt-2 text-base font-poppins text-[#62748E]">
            {error}
          </Text>
        </View>
      );
    }

    if (!serviceDetails) {
      return (
        <View className="px-5 py-10">
          <Text className="text-lg font-poppinsSemiBold text-[#1D293D]">
            Service unavailable
          </Text>
          <Text className="mt-2 text-base font-poppins text-[#62748E]">
            We could not find the service you are looking for right now.
          </Text>
        </View>
      );
    }

    return (
      <>
        <View>
          <ImageBackground
            source={imageSource}
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

                <View className="mt-auto pb-5">
                  <Text className="text-3xl font-prociono text-white mb-3">
                    {title}
                  </Text>
                  <Text className="text-white font-poppins leading-5 text-base">
                    {subTitle}
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
              <Text className="ml-3 text-[#1D293D] font-poppins text-base">
                Session Duration:{' '}
                <Text className="font-poppins text-base text-[#1D293D]">
                  {serviceDetails?.durationInMinutes}
                </Text>
              </Text>
            </View>
            <View className="flex-row items-center mt-4">
              <SessionModeIcon />
              <Text className="ml-3 text-[#1D293D] font-poppins text-base">
                Mode:{' '}
                <Text className="font-poppins text-base text-[#1D293D]">
                  {serviceDetails?.serviceType?.[0]}
                </Text>
              </Text>
            </View>
          </View>

          {htmlContent ? (
            <View className="mt-6">
              <Text className="text-[18px] font-poppinsMedium text-[#1D293D] leading-[28px]">
                About this service
              </Text>
              <View className="mt-2">
                <RenderHtml
                  contentWidth={windowWidth - 40}
                  source={{html: htmlContent}}
                  baseStyle={{
                    color: '#62748E',
                    fontFamily: 'Poppins',
                    fontSize: 16,
                    lineHeight: 24,
                  }}
                />
              </View>
            </View>
          ) : null}

          {relatedServices.length ? (
            <View className="mt-8">
              <Text className="text-[18px] font-poppinsMedium text-[#1D293D]">
                Related Services
              </Text>
              <View className="flex-row flex-wrap gap-y-5 gap-x-4 mt-4">
                {relatedServices.map(relatedService => {
                  const relatedImageSource = relatedService?.image
                    ? {uri: relatedService.image}
                    : {uri: DEFAULT_SERVICE_IMAGE};
                  const relatedTitle =
                    relatedService?.title || relatedService?.name;
                  const relatedDescription =
                    relatedService?.subTitle || relatedService?.description;

                  return (
                    <View key={relatedService._id} className="w-[48%]">
                      <ServiceCard
                        image={relatedImageSource}
                        title={relatedTitle}
                        description={relatedDescription}
                        onPress={() =>
                          navigation.push('ServiceDetails', {
                            serviceId: relatedService._id,
                          })
                        }
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          ) : null}
        </View>
      </>
    );
  };

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
        {renderContent()}
      </ScrollView>

      <View className="px-5 pb-6">
        <GradientButton
          title="Check Availability"
          showIcon={true}
          disabled={isLoading || !serviceDetails}
          onPress={handleCheckAvailability}
        />
      </View>
    </View>
  );
};

export default ServiceDetails;
