import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../../components/Buttons/GradientButton';
import ProductCard from '../../components/Cards/Product';
import {getProductDetails} from '../../services';
import {
  ProductCategoryIcon,
  ProductTagIcon,
  ProductIdIcon,
  QuantityDecreaseIcon,
  QuantityIncreaseIcon,
  ServiceBackIcon,
} from '../../utils/svgIcons';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80';

const formatCurrency = value => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return '₹0';
  }
  return `₹${amount.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  })}`;
};

const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {top, bottom} = useSafeAreaInsets();

  const initialProduct = route.params?.product || null;
  const providedId = route.params?.productId || initialProduct?._id;

  const [product, setProduct] = useState(initialProduct);
  const [isLoading, setIsLoading] = useState(!initialProduct);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [providedId]);

  useEffect(() => {
    if (!providedId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError('');
    getProductDetails(providedId)
      .then(data => {
        const payload = data?.data || data;
        if (payload) {
          setProduct(payload);
        }
      })
      .catch(err => {
        console.log('Fetch product detail error:', err);
        setError(err?.message || 'Unable to load product details.');
      })
      .finally(() => setIsLoading(false));
  }, [providedId]);

  const images = useMemo(() => {
    if (Array.isArray(product?.images) && product.images.length > 0) {
      return product.images;
    }
    return [FALLBACK_IMAGE];
  }, [product?.images]);

  const heroImage = images[0];

  const priceMeta = useMemo(() => {
    const selling = Number(product?.sellingPrice);
    const mrp = Number(product?.mrpPrice);
    const discountFromResponse = Number(product?.discountPercentage);

    let computedDiscount = Number.isFinite(discountFromResponse)
      ? discountFromResponse
      : 0;

    if (Number.isFinite(mrp) && Number.isFinite(selling) && mrp > selling) {
      computedDiscount = Math.round(((mrp - selling) / mrp) * 100);
    }

    return {
      sellingPrice: Number.isFinite(selling) ? selling : mrp,
      mrpPrice: Number.isFinite(mrp) ? mrp : selling,
      discount: computedDiscount,
    };
  }, [product?.discountPercentage, product?.mrpPrice, product?.sellingPrice]);

  const relatedProducts = product?.relatedProducts || [];

  const tagText = useMemo(() => {
    if (Array.isArray(product?.tags) && product.tags.length > 0) {
      return product.tags.filter(Boolean).join(', ');
    }
    if (product?.subcategory?.name) {
      return product.subcategory.name;
    }
    return '';
  }, [product?.subcategory?.name, product?.tags]);

  const handleDecrease = useCallback(() => {
    setQuantity(prev => Math.max(1, prev - 1));
  }, []);

  const handleIncrease = useCallback(() => {
    const stockCap = Number(product?.stock);
    setQuantity(prev => {
      if (Number.isFinite(stockCap) && stockCap > 0) {
        return Math.min(stockCap, prev + 1);
      }
      return prev + 1;
    });
  }, [product?.stock]);

  const handleViewRelated = useCallback(
    item => {
      if (!item) {
        return;
      }
      const nextId = item?._id || item?.id;
      if (!nextId) {
        return;
      }
      navigation.push('ProductDetails', {
        productId: nextId,
        product: item,
      });
    },
    [navigation],
  );

  const handleAddToCart = useCallback(() => {
    console.log('Add to cart', product?.name, quantity);
  }, [product?.name, quantity]);

  const handleBuyNow = useCallback(() => {
    console.log('Buy now', product?.name, quantity);
  }, [product?.name, quantity]);

  const showActions = !isLoading && !!product && !error;

  const renderBody = () => {
    if (isLoading) {
      return (
        <View className="py-20 items-center justify-center">
          <ActivityIndicator size="large" color="#FF8835" />
          <Text className="mt-4 text-base font-poppins text-[#4A5668]">
            Loading product details...
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

    if (!product) {
      return (
        <View className="px-5 py-10">
          <Text className="text-lg font-poppinsSemiBold text-[#1D293D]">
            Product unavailable
          </Text>
          <Text className="mt-2 text-base font-poppins text-[#62748E]">
            We could not find the product you are looking for right now.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: bottom}}>
        <View>
          <ImageBackground source={{uri: heroImage}} className="h-[420px]">
            <LinearGradient
              colors={['rgba(0,0,0,0.02)', 'rgba(0,0,0,0.75)']}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={{flex: 1}}>
              <View
                style={{paddingTop: top + 12}}
                className="px-5 flex-1 flex-col">
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => navigation.goBack()}
                  className="w-12 h-12 items-center justify-center">
                  <ServiceBackIcon />
                </TouchableOpacity>
                <View className="mt-auto pb-5">
                  <Text className="text-3xl font-prociono text-white mb-3 leading-[36px]">
                    {product?.name ?? 'Product'}
                  </Text>
                  {!!product?.description && (
                    <Text numberOfLines={2} className="text-white font-poppins leading-5 text-base">
                      {product.description}
                    </Text>
                  )}
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        <View className="px-5">
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="text-[28px] font-prociono text-[#FF8835]">
                {formatCurrency(priceMeta.sellingPrice)}
              </Text>
            </View>
          </View>

          <View className="mt-4 space-y-5">
            {product?.category?.name ? (
              <InfoRow
                title="Category"
                value={product.category.name}
                icon={<ProductCategoryIcon size={24} />}
              />
            ) : null}
            {tagText ? (
              <InfoRow
                title="Tags"
                value={tagText}
                icon={<ProductTagIcon size={24} />}
              />
            ) : null}
            {product?._id ? (
              <InfoRow
                title="Product ID"
                value={product._id}
                icon={<ProductIdIcon size={24} />}
              />
            ) : null}
          </View>

          <View className="mt-2">
            <Text className="text-base font-poppinsSemiBold text-[#1D293D] mb-3">
              Quantity
            </Text>
            <View className="flex-row items-center justify-between rounded-[10px] border border-[#1F2937] bg-[#FEF8EF] px-3 py-2 w-[150px]">
              <TouchableOpacity
                onPress={handleDecrease}
                activeOpacity={0.7}
                className="w-10 h-10 items-center justify-center">
                <QuantityDecreaseIcon />
              </TouchableOpacity>
              <View className="w-10 h-10 rounded-[7px] bg-[#272B35] items-center justify-center">
                <Text className="text-lg font-poppinsSemiBold text-white">
                  {quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleIncrease}
                activeOpacity={0.7}
                className="w-10 h-10 items-center justify-center">
                <QuantityIncreaseIcon />
              </TouchableOpacity>
            </View>
          </View>

          {product?.description ? (
            <Section
              title="Description"
              content={product.description}
            />
          ) : null}

          {product?.additionalInfo ? (
            <Section
              title="Additional Information"
              content={product.additionalInfo}
            />
          ) : null}

          {product?.highlights ? (
            <Section title="Highlights" content={product.highlights} />
          ) : null}

          {Array.isArray(product?.specification) &&
          product.specification.length > 0 ? (
            <View className="mt-8">
              <Text className="text-[18px] font-poppinsSemiBold text-[#1D293D]">
                Specifications
              </Text>
              <View className="mt-3 space-y-3">
                {product.specification.map((spec, index) => (
                  <View
                    key={`${spec?.key}-${index}`}
                    className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3">
                    <Text className="text-sm font-poppinsSemiBold text-[#1D293D]">
                      {spec?.key}
                    </Text>
                    {spec?.value ? (
                      <Text className="mt-1 text-sm font-poppins text-[#64748B]">
                        {spec.value}
                      </Text>
                    ) : null}
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {relatedProducts.length > 0 ? (
            <View className="mt-10">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-[18px] font-poppinsSemiBold text-[#1D293D]">
                  Related Products
                </Text>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text className="text-sm font-poppinsSemiBold text-[#FF8835]">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingRight: 20}}>
                {relatedProducts.map(item => (
                  <View
                    key={item?._id || item?.id}
                    style={{width: 200, marginRight: 16}}>
                    <ProductCard
                      image={item?.images?.[0]}
                      title={item?.name}
                      price={item?.sellingPrice ?? item?.mrpPrice}
                      rating={item?.rating ?? 4}
                      onPress={() => handleViewRelated(item)}
                      onAddToCart={() =>
                        console.log('Related add', item?.name)
                      }
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </View>
      </ScrollView>
    );
  };

  return (
    <View className="flex-1 bg-[#FEF8EF]">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {renderBody()}
      {showActions ? (
        <View
          style={{paddingBottom: bottom + 12}}
          className="px-5 pt-4 pb-5 border-t border-[#E2E8F0] bg-[#FEF8EF]">
          <View className="flex-row justify-between">
            <View className="w-[49%] h-[50px]">
              <GradientButton title="Buy Now" onPress={handleBuyNow} />
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleAddToCart}
              className="w-[49%] h-[50px] rounded-[14px] border border-[#FF8835] bg-white items-center justify-center">
              <Text className="text-base font-poppinsSemiBold text-[#FF8835]">
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const Section = ({title, content}) => (
  <View className="mt-4">
    <Text className="text-[18px] font-poppinsSemiBold text-[#1D293D]">
      {title}
    </Text>
    <Text className="mt-3 text-base font-poppins leading-6 text-[#4A5668] whitespace-pre-line">
      {content}
    </Text>
  </View>
);

const InfoRow = ({title, value, icon}) => (
  <View className="flex-row items-center mb-2">
    <View className="w-11 h-11 items-center justify-center mr-2">
      {icon}
    </View>
    <Text className="flex-1 text-[15px] font-poppins text-[#1D293D] leading-6">
      <Text className="font-poppins text-[#5B6B82]">{title}:</Text>{' '}
      <Text className="font-poppins text-[#1D293D]">{value}</Text>
    </Text>
  </View>
);

export default ProductDetails;
