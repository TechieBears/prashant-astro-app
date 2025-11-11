import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  TextInput as RNTextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Search01Icon} from 'hugeicons-react-native';
import {MicOutlineIcon} from '../../utils/svgIcons';
import ServiceCard from '../../components/Cards/Service';
import {CATEGORY_ACTIVE_GRADIENT, HEADER_GRADIENT} from '../../utils/gradients';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { getServiceCategories, getServices } from '../../services/api';

const DEFAULT_SERVICE_IMAGE = 'https://i.postimg.cc/CxhQnSxt/Astrology.png';

const ServiceScreen = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const [allCategories, setAllCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = useMemo(() => {
    const activeCategoryData = services.find(
      category => category?._id === activeCategory,
    );

    if (!activeCategoryData) {
      return [];
    }

    const search = searchTerm.trim().toLowerCase();

    return (activeCategoryData.services || []).filter(service => {
      const title = (service?.title || service?.name || '').toLowerCase();
      return title.includes(search);
    });
  }, [activeCategory, searchTerm, services]);

  useEffect(() => {
    getServiceCategories()
      .then(data => {
        const fetchedCategories = data?.data || [];
        setAllCategories(fetchedCategories);
        if (
          fetchedCategories.length &&
          !fetchedCategories.some(category => category._id === activeCategory)
        ) {
          setActiveCategory(fetchedCategories[0]._id);
        }
      })
      .catch(error => {
        console.log('Error fetching service categories:', error);
      });
    getServices()
      .then(data => {
        const fetchedServices = data?.data || [];
        setServices(fetchedServices);
        if (!activeCategory && fetchedServices.length) {
          setActiveCategory(fetchedServices[0]._id);
        }
      })
      .catch(error => {
        console.log('Error fetching services:', error);
      });
  },[]);

  return (
    <View className="flex-1">
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <LinearGradient
        colors={HEADER_GRADIENT.colors}
        start={HEADER_GRADIENT.start}
        end={HEADER_GRADIENT.end}>
        <View className="px-3 py-3" style={{paddingTop: top + 10}}>
          <View className="flex-row items-center bg-white rounded-[10px] px-5 py-2">
            <Search01Icon size={24} color="#1D293D" strokeWidth={1.1} />
            <RNTextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search"
              placeholderTextColor="#1D293D"
              className="flex-1 text-lg text-text1 font-prociono px-3"
              returnKeyType="search"
            />
            <TouchableOpacity activeOpacity={0.8}>
              <View className="w-10 h-10 items-center justify-center">
                <MicOutlineIcon size={22} stroke="#1D293D" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <SafeAreaView
        className="flex-1 bg-[#FEF8EF]"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View className="flex-1">
          <View
            className="bg-[#F8FAFC] border-t border-b border-[#00000026] h-min-[20px]"
            style={{
              shadowColor: 'rgba(0,0,0,0.1)',
              shadowOffset: {width: 6, height: 6},
              shadowOpacity: 1,
              shadowRadius: 25,
              elevation: 8,
            }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 12}}
              className="py-4">
              {allCategories.map((category, index) => {
                const isActive = category._id === activeCategory;
                const marginRight = index === allCategories.length - 1 ? 0 : 12;

                if (isActive) {
                  return (
                    <TouchableOpacity
                      key={category._id}
                      activeOpacity={0.85}
                      onPress={() => setActiveCategory(category._id)}
                      style={{marginRight}}
                      className="rounded-[10px]">
                      <LinearGradient
                        colors={CATEGORY_ACTIVE_GRADIENT.colors}
                        start={CATEGORY_ACTIVE_GRADIENT.start}
                        end={CATEGORY_ACTIVE_GRADIENT.end}
                        style={{borderRadius: 10}}>
                        <View className="px-6 py-2.5">
                          <Text className="text-white text-sm font-poppinsSemiBold">
                            {category.name}
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                }

                return (
                  <TouchableOpacity
                    key={category._id}
                    activeOpacity={0.85}
                    onPress={() => setActiveCategory(category._id)}
                    style={{marginRight}}
                    className="px-6 py-2.5 rounded-[10px] bg-white border border-[#D5DBE8]">
                    <Text className="text-[#62748E] text-sm font-poppins">
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{paddingBottom: 120}}
            showsVerticalScrollIndicator={false}>
            <View className="px-4">
              <Text className="my-4 text-3xl font-prociono text-text1 text-[20px]">
                Our <Text className="text-primary">Services</Text>
              </Text>

              <View className="flex-row flex-wrap gap-y-5 gap-x-4">
                {filteredServices.length ? (
                  filteredServices.map(service => {
                    const imageSource = service?.image
                      ? {uri: service.image}
                      : {uri: DEFAULT_SERVICE_IMAGE};
                    const serviceTitle = service?.title || service?.name;
                    const serviceDescription =
                      service?.subTitle || service?.description;

                    return (
                      <View key={service._id} className="w-[48%]">
                        <ServiceCard
                          image={imageSource}
                          title={serviceTitle}
                          description={serviceDescription}
                          onPress={() =>
                            navigation.navigate('ServiceDetails', {
                              serviceId: service._id,
                              service,
                            })
                          }
                        />
                      </View>
                    );
                  })
                ) : (
                  <View className="w-full py-10 items-center">
                    <Text className="text-base text-text2 font-poppins">
                      No services found.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ServiceScreen;
