import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput as RNTextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Dimensions,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Search01Icon} from 'hugeicons-react-native';
import {MicOutlineIcon, ProductFilterIcon} from '../../utils/svgIcons';
import ProductCard from '../../components/Cards/Product';
import {HEADER_GRADIENT} from '../../utils/gradients';
import PriceRangeSlider from '../../components/Controls/PriceRangeSlider';
import {getProducts, getProductsCategories} from '../../services/api';

const ProductScreen = () => {
  const {top, bottom} = useSafeAreaInsets();
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({min: 0, max: 0});
  const [pendingPriceRange, setPendingPriceRange] = useState({
    min: 0,
    max: 0,
  });
  const [priceBounds, setPriceBounds] = useState({min: 0, max: 0});
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [pendingCategories, setPendingCategories] = useState(new Set());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [hasProductPrices, setHasProductPrices] = useState(false);
  const sheetRef = useRef(null);
  const isMountedRef = useRef(true);
  const windowHeight = useMemo(() => Dimensions.get('window').height, []);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const response = await getProducts();
      const items = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.results)
        ? response.results
        : Array.isArray(response)
        ? response
        : [];
      if (isMountedRef.current) {
        setProducts(items);
        if (items.length) {
          const prices = items
            .map(product =>
              Number(
                product?.sellingPrice ??
                  product?.price ??
                  product?.mrpPrice ??
                  product?.amount,
              ),
            )
            .filter(value => Number.isFinite(value));
          if (prices.length) {
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const bounds = {min: minPrice, max: maxPrice};
            setPriceBounds(bounds);
            setPriceRange(bounds);
            setPendingPriceRange(bounds);
            setHasProductPrices(true);
          } else {
            setPriceBounds({min: 0, max: 0});
            setPriceRange({min: 0, max: 0});
            setPendingPriceRange({min: 0, max: 0});
            setHasProductPrices(false);
          }
        } else {
          setPriceBounds({min: 0, max: 0});
          setPriceRange({min: 0, max: 0});
          setPendingPriceRange({min: 0, max: 0});
          setHasProductPrices(false);
        }
      }
    } catch (error) {
      console.log('Fetch products error:', error);
      if (isMountedRef.current) {
        setFetchError('Unable to load products right now.');
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getProductsCategories();
      const options = (() => {
        if (Array.isArray(response?.category)) {
          return response.category;
        }
        if (Array.isArray(response?.data?.category)) {
          return response.data.category;
        }
        if (Array.isArray(response?.data?.items)) {
          return response.data.items;
        }
        if (Array.isArray(response?.data)) {
          return response.data;
        }
        if (Array.isArray(response?.results)) {
          return response.results;
        }
        if (Array.isArray(response?.payload)) {
          return response.payload;
        }
        if (Array.isArray(response)) {
          return response;
        }
        return [];
      })();
      if (isMountedRef.current) {
        setCategoryData(options);
      }
    } catch (error) {
      console.log('Fetch product categories error:', error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handlePriceChange = useCallback(
    (low, high) => {
      const nextMin = Number(low);
      const nextMax = Number(high);
      setPendingPriceRange({
        min: Number.isFinite(nextMin) ? nextMin : priceBounds.min,
        max: Number.isFinite(nextMax) ? nextMax : priceBounds.max,
      });
    },
    [priceBounds],
  );

  const toggleCategory = useCallback(categoryId => {
    if (categoryId == null) {
      return;
    }
    const normalizedId = String(categoryId);
    setPendingCategories(prev => {
      const next = new Set(prev);
      if (next.has(normalizedId)) {
        next.delete(normalizedId);
      } else {
        next.add(normalizedId);
      }
      return next;
    });
  }, []);

  const handleFilterReset = useCallback(() => {
    const resetRange = {min: priceBounds.min, max: priceBounds.max};
    setPriceRange(resetRange);
    setPendingPriceRange(resetRange);
    setSelectedCategories(new Set());
    setPendingCategories(new Set());
  }, [priceBounds.max, priceBounds.min]);

  const handleFilterApply = useCallback(() => {
    const clampedMin = Math.max(
      priceBounds.min,
      Math.min(pendingPriceRange.min, priceBounds.max),
    );
    const clampedMax = Math.max(
      clampedMin,
      Math.min(pendingPriceRange.max, priceBounds.max),
    );
    setPriceRange({min: clampedMin, max: clampedMax});
    setPendingPriceRange({min: clampedMin, max: clampedMax});
    setSelectedCategories(new Set(pendingCategories));
    sheetRef.current?.close();
  }, [
    pendingCategories,
    pendingPriceRange.max,
    pendingPriceRange.min,
    priceBounds.max,
    priceBounds.min,
  ]);

  const handleOpenFilter = useCallback(() => {
    setPendingPriceRange(priceRange);
    setPendingCategories(new Set(selectedCategories));
    sheetRef.current?.open();
  }, [priceRange, selectedCategories]);

  const filteredProducts = useMemo(() => {
    const source = Array.isArray(products) ? products : [];
    const term = searchTerm.trim().toLowerCase();
    const fallbackMin = Number.isFinite(priceBounds.min)
      ? priceBounds.min
      : 0;
    const fallbackMax = Number.isFinite(priceBounds.max)
      ? priceBounds.max
      : fallbackMin;
    const priceMin = Number.isFinite(priceRange.min)
      ? priceRange.min
      : fallbackMin;
    const priceMax = Number.isFinite(priceRange.max)
      ? priceRange.max
      : fallbackMax;
    const hasPriceFilter = hasProductPrices;
    const hasCategoryFilter = selectedCategories.size > 0;

    return source.filter(product => {
      const name = (product?.name || '').toLowerCase();
      const matchesTerm = term ? name.includes(term) : true;
      const rawPrice =
        product?.sellingPrice ??
        product?.price ??
        product?.mrpPrice ??
        product?.amount;
      const numericPrice = Number(rawPrice);
      const inPrice =
        !hasPriceFilter ||
        (!Number.isFinite(numericPrice)
          ? true
          : numericPrice >= priceMin && numericPrice <= priceMax);
      const categoryId = product?.category?._id
        ? String(product.category._id)
        : product?.categoryId
        ? String(product.categoryId)
        : '';
      const inCategory =
        !hasCategoryFilter ||
        (categoryId && selectedCategories.has(categoryId));
      return matchesTerm && inPrice && inCategory;
    });
  }, [
    hasProductPrices,
    priceBounds,
    priceRange,
    products,
    searchTerm,
    selectedCategories,
  ]);

  const categoryOptions = useMemo(() => {
    const productCounts = products.reduce((acc, product) => {
      const categoryId = product?.category?._id
        ? String(product.category._id)
        : product?.categoryId
        ? String(product.categoryId)
        : null;
      if (categoryId) {
        acc[categoryId] = (acc[categoryId] || 0) + 1;
      }
      return acc;
    }, {});

    return categoryData
      .map(option => {
        const id = option?._id
          ? String(option._id)
          : option?.id
          ? String(option.id)
          : null;
        if (!id) {
          return null;
        }
        return {
          id,
          label: option?.name ?? 'Unnamed',
          count: productCounts[id] ?? 0,
        };
      })
      .filter(Boolean);
  }, [categoryData, products]);

  const sliderBounds = useMemo(() => {
    const minBound = Number.isFinite(priceBounds.min) ? priceBounds.min : 0;
    let maxBound = Number.isFinite(priceBounds.max)
      ? priceBounds.max
      : minBound;
    if (maxBound <= minBound) {
      maxBound = minBound + 1;
    }
    return {min: minBound, max: maxBound};
  }, [priceBounds]);

  const activeLow = Number.isFinite(pendingPriceRange.min)
    ? pendingPriceRange.min
    : sliderBounds.min;
  const activeHigh = Number.isFinite(pendingPriceRange.max)
    ? pendingPriceRange.max
    : sliderBounds.max;

  const sliderSpan = sliderBounds.max - sliderBounds.min;
  const sliderStep = Math.max(1, Math.round(sliderSpan / 20)) || 1;
  const sliderMinGap = Math.max(1, Math.round(sliderSpan / 10)) || 1;
  const hasPriceData = hasProductPrices;
  const formattedPriceRange = hasPriceData
    ? `${Math.round(activeLow)}₹ - ${Math.round(activeHigh)}₹`
    : '--';
  const categoryItemHeight = 52;
  const categoryListMaxHeight = Math.max(160, windowHeight * 0.28);
  const priceSectionHeight = hasPriceData ? 180 : 160;
  const categoryListHeight = categoryOptions.length * categoryItemHeight;
  const categorySectionHeight =
    categoryOptions.length > 0
      ? Math.min(categoryListHeight, categoryListMaxHeight)
      : 72;
  const actionsHeight = 90;
  const sheetHeight = useMemo(() => {
    const estimatedHeight =
      priceSectionHeight + categorySectionHeight + actionsHeight;
    const maxHeight = windowHeight * 0.6;
    const minHeight = 260;
    return Math.min(maxHeight, Math.max(minHeight, estimatedHeight));
  }, [
    actionsHeight,
    categorySectionHeight,
    priceSectionHeight,
    windowHeight,
  ]);

  const handleAddToCart = useCallback(product => {
    console.log('Add to cart tapped:', product?.name);
  }, []);

  const handleProductPress = useCallback(
    product => {
      if (!product) {
        return;
      }
      const productId = product?._id || product?.id;
      navigation.navigate('ProductDetails', {
        productId,
        product,
      });
    },
    [navigation],
  );

  const renderProduct = useCallback(
    ({item}) => (
      <View style={{width: '48%', marginBottom: 18}}>
        <ProductCard
          image={item?.images?.[0]}
          title={item?.name}
          price={item?.sellingPrice ?? item?.mrpPrice}
          rating={
            item?.rating ??
            item?.averageRating ??
            item?.avgRating ??
            item?.ratingValue ??
            4
          }
          onPress={() => handleProductPress(item)}
          onAddToCart={() => handleAddToCart(item)}
        />
      </View>
    ),
    [handleAddToCart, handleProductPress],
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
            onPress={handleOpenFilter}
            className="w-10 h-10 items-center justify-center rounded-full border border-[#FF8835] bg-white">
            <ProductFilterIcon size={22} stroke="#FF8835" />
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={2}
          data={filteredProducts}
          keyExtractor={(item, index) =>
            item?._id
              ? String(item._id)
              : item?.id
              ? String(item.id)
              : `product-${index}`
          }
          renderItem={renderProduct}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: bottom + 120,
            paddingTop: filteredProducts.length === 0 ? 40 : 0,
          }}
          refreshControl={
            products.length > 0 ? (
              <RefreshControl
                refreshing={loading}
                onRefresh={fetchProducts}
                tintColor="#FF8835"
                colors={['#FF8835']}
              />
            ) : null
          }
          ListEmptyComponent={
            <View className="items-center justify-center py-20">
              {loading ? (
                <ActivityIndicator size="large" color="#FF8835" />
              ) : (
                <Text className="text-base font-poppins text-[#64748B]">
                  {fetchError || 'No products match your filters.'}
                </Text>
              )}
            </View>
          }
        />
      </View>

      <RBSheet
        ref={sheetRef}
        closeOnDragDown
        closeOnPressMask
        dragFromTopOnly
        height={sheetHeight}
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
                {formattedPriceRange}
              </Text>
            </Text>
            <PriceRangeSlider
              min={sliderBounds.min}
              max={sliderBounds.max}
              low={activeLow}
              high={activeHigh}
              step={sliderStep}
              minRange={sliderMinGap}
              onValueChange={handlePriceChange}
            />
          </View>

          <Text className="font-poppinsSemiBold text-base text-[#1D293D] mb-3">
            Categories
          </Text>
          <View className="mb-6">
            {categoryOptions.length === 0 ? (
              <Text className="font-poppins text-[15px] text-[#94A3B8]">
                No categories available.
              </Text>
            ) : (
              <ScrollView
                style={{maxHeight: categoryListMaxHeight}}
                contentContainerStyle={{paddingBottom: 4}}
                showsVerticalScrollIndicator={false}>
                {categoryOptions.map(option => {
                  const isSelected = pendingCategories.has(option.id);
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
                        <Text className="text-[#94A3B8]">
                          ({option.count ?? 0})
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
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
