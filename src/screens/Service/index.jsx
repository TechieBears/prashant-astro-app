import React, {useMemo, useState} from 'react';
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

const categories = [
  {id: 'astrology', label: 'Astrology'},
  {id: 'vastu', label: 'Vastu Remedy'},
  {id: 'pooja', label: 'Pooja Vidhi'},
  {id: 'kundli', label: 'Kundli Dosh'},
];

const baseServiceDetails = {
  sessionDuration: '30-60 minutes',
  mode: 'In-person / Online',
  narrative:
    'Your hands are more than just tools - they are maps of your life. Our sessions dive deep to reveal insights about your past, present, and future with compassionate guidance.',
};

const services = [
  {
    id: 'astro-1',
    title: 'Astrology',
    description: 'Your hands hold the story of your life.',
    image: { uri: 'https://i.postimg.cc/CxhQnSxt/Astrology.png' },
    category: 'astrology',
    ...baseServiceDetails,
  },
  {
    id: 'astro-2',
    title: 'Crystal Therapy',
    description: 'Your hands hold the story of your life.',
    image: { uri: 'https://i.postimg.cc/CxhQnSxt/Palmistry.png' },
    category: 'astrology',
    ...baseServiceDetails,
  },
  {
    id: 'astro-3',
    title: 'Pitru Dosh',
    description: 'The cards have a message to share for you.',
    image: { uri: 'https://i.postimg.cc/CxhQnSxt/Tarot.png' },
    category: 'astrology',
    ...baseServiceDetails,
  },
  {
    id: 'astro-4',
    title: 'Vastushanti',
    description: 'Your hands hold the story of your life.',
    image: { uri: 'https://i.postimg.cc/CxhQnSxt/Tarot.png' },
    category: 'astrology',
    ...baseServiceDetails,
  },
  {
    id: 'vastu-1',
    title: 'Vastu Consultation',
    description: 'Balance your space with sacred rituals.',
    image: { uri: 'https://i.postimg.cc/CxhQnSxt/Astrology.png' },
    category: 'vastu',
    ...baseServiceDetails,
  },
  {
    id: 'pooja-1',
    title: 'Pooja Vidhi',
    description: 'The cards have a message to share for you.',
    image: { uri: 'https://i.postimg.cc/CxhQnSxt/Palmistry.png' },
    category: 'pooja',
    ...baseServiceDetails,
  },
  {
    id: 'kundli-1',
    title: 'Kundli Matching',
    description: 'Discover harmony through kundli insights.',
    image: { uri: 'https://i.postimg.cc/CxhQnSxt/Tarot.png' },
    category: 'kundli',
    ...baseServiceDetails,
  },
];

const ServiceScreen = ({navigation}) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory = service.category === activeCategory;
      const matchesSearch = service.title
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const {top} = useSafeAreaInsets();

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
            className="bg-[#F8FAFC] border-t border-b border-[#00000026] mb-"
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
              {categories.map((category, index) => {
                const isActive = category.id === activeCategory;
                const marginRight = index === categories.length - 1 ? 0 : 12;

                if (isActive) {
                  return (
                    <TouchableOpacity
                      key={category.id}
                      activeOpacity={0.85}
                      onPress={() => setActiveCategory(category.id)}
                      style={{marginRight}}
                      className="rounded-[10px]">
                      <LinearGradient
                        colors={CATEGORY_ACTIVE_GRADIENT.colors}
                        start={CATEGORY_ACTIVE_GRADIENT.start}
                        end={CATEGORY_ACTIVE_GRADIENT.end}
                        style={{borderRadius: 10}}>
                        <View className="px-6 py-2.5">
                          <Text className="text-white text-sm font-poppinsSemiBold">
                            {category.label}
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                }

                return (
                  <TouchableOpacity
                    key={category.id}
                    activeOpacity={0.85}
                    onPress={() => setActiveCategory(category.id)}
                    style={{marginRight}}
                    className="px-6 py-2.5 rounded-[10px] bg-white border border-[#D5DBE8]">
                    <Text className="text-[#62748E] text-sm font-poppins">
                      {category.label}
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
                  filteredServices.map(service => (
                    <View key={service.id} className="w-[48%]">
                      <ServiceCard
                        image={service.image}
                        title={service.title}
                        description={service.description}
                        onPress={() =>
                          navigation.navigate('ServiceDetails', {service})
                        }
                      />
                    </View>
                  ))
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
