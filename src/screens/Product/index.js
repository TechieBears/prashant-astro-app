import React, {useMemo, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput as RNTextInput,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Search01Icon} from 'hugeicons-react-native';
import {MicOutlineIcon, ProductFilterIcon} from '../../utils/svgIcons';
import ProductCard from '../../components/Cards/Product';
import {HEADER_GRADIENT} from '../../utils/gradients';
import PriceRangeSlider from '../../components/Controls/PriceRangeSlider';

const PRODUCT_DATA = [
  {
    id: 'prod-1',
    title: 'Rudraksha',
    price: 3520,
    rating: 4.2,
    image:
      'https://images.unsplash.com/photo-1610036759763-31948feac89b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-2',
    title: 'James stone',
    price: 3520,
    rating: 4.1,
    image:
      'https://images.unsplash.com/photo-1617038698784-7c0b3f92d218?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-3',
    title: 'Bracelets',
    price: 3520,
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1605106702849-8a0b2b50f4b9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-4',
    title: 'Yantras',
    price: 3520,
    rating: 4.3,
    image:
      'https://images.unsplash.com/photo-1555967523-6e6a818f81aa?auto=format&fit=crop&w=600&q=80',
  },
];

const PRICE_MIN = 200;
const PRICE_MAX = 6800;
const CATEGORY_OPTIONS = [
  {id: 'cat-amulets', label: 'Amulets', count: 3},
  {id: 'cat-candles', label: 'Candles', count: 3},
  {id: 'cat-divination', label: 'Divination', count: 2},
  {id: 'cat-gemstone', label: 'Gemstone', count: 6},
  {id: 'cat-uncategorized', label: 'Uncategorized', count: 0},
];

const ProductScreen = () => {
  const {top, bottom} = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({min: 400, max: 950});
  const [selectedCategories, setSelectedCategories] = useState(
    new Set(['cat-amulets']),
  );
  const [range, setRange] = useState({low: 100, high: 800});
  const sheetRef = useRef(null);
  const handlePriceChange = useCallback((low, high) => {
    setPriceRange({min: low, max: high});
  }, []);

  const toggleCategory = useCallback(categoryId => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const handleFilterReset = useCallback(() => {
    setPriceRange({min: 400, max: 950});
    setSelectedCategories(new Set());
  }, []);

  const handleFilterApply = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return PRODUCT_DATA;
    }
    return PRODUCT_DATA.filter(product =>
      product.title.toLowerCase().includes(term),
    );
  }, [searchTerm]);

  const handleAddToCart = useCallback(product => {
    console.log('Add to cart tapped:', product?.title);
  }, []);

  const renderProduct = useCallback(
    ({item}) => (
      <View style={{width: '48%', marginBottom: 18}}>
        <ProductCard
          image={item.image}
          title={item.title}
          price={item.price}
          rating={item.rating}
          onPress={() => console.log('Product pressed:', item.title)}
          onAddToCart={() => handleAddToCart(item)}
        />
      </View>
    ),
    [handleAddToCart],
  );

  return (
    <View className="flex-1 bg-[#FEF8EF]">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LinearGradient
        colors={HEADER_GRADIENT.colors}
        start={HEADER_GRADIENT.start}
        end={HEADER_GRADIENT.end}>
        <View className="px-4 pb-5" style={{paddingTop: top + 12}}>
          <View className="flex-row items-center bg-white rounded-[14px] px-5 py-2">
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

      <View
        className="flex-1"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View className="flex-row items-center justify-between px-5 py-4">
          <Text className="text-[22px] font-prociono text-[#1D293D]">
            Our <Text className="text-[#FF8835]">Products</Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => sheetRef.current?.open()}
            className="w-10 h-10 items-center justify-center rounded-full border border-[#FF8835] bg-white">
            <ProductFilterIcon size={22} stroke="#FF8835" />
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={2}
          data={filteredProducts}
          keyExtractor={item => item.id}
          renderItem={renderProduct}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: bottom + 120,
          }}
        />
      </View>

      <RBSheet
        ref={sheetRef}
        closeOnDragDown
        closeOnPressMask
        dragFromTopOnly
        height={420}
        customStyles={{
          container: {
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingHorizontal: 20,
            paddingTop: 0,
            paddingBottom: 24,
            justifyContent: 'flex-end',
            backgroundColor: '#FFFFFF',
          },
          draggableIcon: {
            backgroundColor: '#CBD5E1',
            width: 60,
          },
        }}
        customModalProps={{animationType: 'fade'}}
        customStylesWrapper={{backgroundColor: 'rgba(15, 23, 42, 0.35)'}}>
        <View className="justify-end">
          <View className="mb-12">
            <Text className="font-poppinsSemiBold text-base text-[#1D293D]">
              Price
              <Text className="font-poppins text-base text-[#1D293D]">
                {' '}
                {PRICE_MIN}₹ - {PRICE_MAX}₹
              </Text>
            </Text>
            <PriceRangeSlider
              min={0}
              max={1000}
              low={range.low}
              high={range.high}
              step={10}
              minRange={50}
              onValueChange={(l, h) => setRange({low: l, high: h})}
            />
          </View>

          <Text className="font-poppinsSemiBold text-base text-[#1D293D] mb-3">
            Categories
          </Text>
          <View className="mb-6">
            {CATEGORY_OPTIONS.map(option => {
              const isSelected = selectedCategories.has(option.id);
              return (
                <TouchableOpacity
                  key={option.id}
                  activeOpacity={0.8}
                  onPress={() => toggleCategory(option.id)}
                  className="mb-3 flex-row items-center">
                  <View
                    className={`h-6 w-6 items-center justify-center rounded-md border ${
                      isSelected
                        ? 'border-[#FF8A00] bg-[#FF8A00]'
                        : 'border-[#CBD5E1] bg-white'
                    }`}>
                    {isSelected ? (
                      <Text className="font-poppinsSemiBold text-base text-white">
                        ✓
                      </Text>
                    ) : null}
                  </View>
                  <Text className="ml-3 font-poppins text-[15px] text-[#1D293D]">
                    {option.label}{' '}
                    <Text className="text-[#94A3B8]">({option.count})</Text>
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="flex-row items-center justify-between">
            <LinearGradient
              colors={['#FFBF12', '#FF8835', '#FF5858']}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={{
                width: '49%',
                borderRadius: 10,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleFilterApply}
                className="w-[49%] h-full items-center justify-center rounded-[10px]">
                <Text className="font-poppinsSemiBold text-base text-white text-center">
                  Filter
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleFilterReset}
              className="w-[49%] h-[40px] items-center justify-center rounded-[10px] border border-[#CBD5E1]">
              <Text className="font-poppinsSemiBold text-base text-[#64748B]">
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default ProductScreen;
