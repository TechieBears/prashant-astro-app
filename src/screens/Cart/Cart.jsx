import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import moment from 'moment';
import {ArrowLeft02Icon, Delete02Icon} from 'hugeicons-react-native';
import DualToggleSwitch from '../../components/Toggle/DualToggleSwitch';
import GradientButton from '../../components/Buttons/GradientButton';
import {
  SessionDurationIcon,
  BookingDateIcon,
  SessionModeIcon,
  ZoomMeetingIcon,
  QuantityIncreaseIcon,
  QuantityDecreaseIcon,
} from '../../utils/svgIcons';
import {
  getCartData,
  getProductCartData,
  updateProductCartData,
  removeFromCartService,
  deleteProductFromCart,
} from '../../services/api';

const DEFAULT_SERVICE_DURATION = '30-60 minutes';
const DEFAULT_SERVICE_MODE = 'In-person / Online';
const FALLBACK_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80';

const parseAmount = raw => {
  if (typeof raw === 'number' && !Number.isNaN(raw)) {
    return raw;
  }
  if (typeof raw === 'string') {
    const cleaned = raw.replace(/[^\d.-]/g, '');
    const value = parseFloat(cleaned);
    if (!Number.isNaN(value)) {
      return value;
    }
  }
  return null;
};

const formatCompactPrice = amount => {
  const numeric = Number(amount ?? 0);
  if (!Number.isFinite(numeric)) {
    return '₹0';
  }

  const hasIntl =
    typeof Intl !== 'undefined' &&
    typeof Intl.NumberFormat === 'function';
  if (hasIntl) {
    return `₹${new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(numeric)}`;
  }

  return `₹${Math.round(numeric)}`;
};

const formatCartTimeWindow = (startTime, endTime) => {
  const start = startTime
    ? moment(startTime, ['HH:mm', 'HH:mm:ss', 'h:mm A'])
    : null;
  const end = endTime
    ? moment(endTime, ['HH:mm', 'HH:mm:ss', 'h:mm A'])
    : null;

  if (start && start.isValid() && end && end.isValid()) {
    return `${start.format('hh:mm A')} - ${end.format('hh:mm A')}`;
  }

  if (start && start.isValid()) {
    return start.format('hh:mm A');
  }

  return '';
};

const formatCartDateTimeLabel = (dateValue, startTime, endTime) => {
  const dateLabel = dateValue
    ? moment(dateValue, ['YYYY-MM-DD', moment.ISO_8601]).format(
        'Do MMM, YYYY',
      )
    : '';
  const timeWindow = formatCartTimeWindow(startTime, endTime);
  return [dateLabel, timeWindow].filter(Boolean).join(' / ');
};

const calculateDurationLabel = (startTime, endTime) => {
  const start = startTime
    ? moment(startTime, ['HH:mm', 'HH:mm:ss', 'h:mm A'])
    : null;
  const end = endTime
    ? moment(endTime, ['HH:mm', 'HH:mm:ss', 'h:mm A'])
    : null;

  if (start && start.isValid() && end && end.isValid()) {
    const diff = end.diff(start, 'minutes');
    if (Number.isFinite(diff) && diff > 0) {
      return `${diff} mins`;
    }
  }
  return '';
};

const CartInfoRow = ({icon, label, value}) => {
  if (!value) {
    return null;
  }

  return (
    <View className="flex-row items-center mb-3">
      <View className="mr-3">{icon}</View>
      <View className="flex-1">
        <Text className="font-poppins text-[15px] text-[#1D293D] leading-5">
          <Text className="text-[#62748E]">{label}</Text>
          <Text className="text-[#62748E]">{': '}</Text>
          <Text className="text-[#1D293D]">{value}</Text>
        </Text>
      </View>
    </View>
  );
};

const mergeItemsById = (previousItems, nextItems, getId) => {
  if (!Array.isArray(nextItems)) {
    return Array.isArray(previousItems) ? previousItems : [];
  }
  return nextItems.map(nextItem => {
    const identity = getId(nextItem);
    if (!identity || !Array.isArray(previousItems)) {
      return nextItem;
    }
    const existing =
      previousItems.find(item => getId(item) === identity) ?? null;
    if (!existing) {
      return nextItem;
    }
    return {
      ...existing,
      ...nextItem,
    };
  });
};

const Cart = () => {
  const navigation = useNavigation();
  const {top, bottom} = useSafeAreaInsets();
  const [activeSegment, setActiveSegment] = useState('service');

  const [serviceItems, setServiceItems] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [serviceError, setServiceError] = useState('');

  const [productItems, setProductItems] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState('');
  const [updatingProductQuantities, setUpdatingProductQuantities] = useState(
    {},
  );
  const [removingServiceItems, setRemovingServiceItems] = useState({});
  const [removingProductItems, setRemovingProductItems] = useState({});

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadServiceCart = async () => {
        setServiceLoading(true);
        setServiceError('');
        try {
          const response = await getCartData();
          if (!isActive) {
            return;
          }
          const payload = response?.data ?? response ?? {};
          const items = Array.isArray(payload?.items) ? payload.items : [];
          setServiceItems(items);
        } catch (error) {
          if (!isActive) {
            return;
          }
          setServiceItems([]);
          setServiceError('Unable to load service cart right now.');
        } finally {
          if (isActive) {
            setServiceLoading(false);
          }
        }
      };

      const loadProductCart = async () => {
        setProductLoading(true);
        setProductError('');
        try {
          const response = await getProductCartData();
          if (!isActive) {
            return;
          }
          const payload = response?.data ?? response ?? {};
          const items = Array.isArray(payload?.items) ? payload.items : [];
          setProductItems(items);
        } catch (error) {
          if (!isActive) {
            return;
          }
          setProductItems([]);
          setProductError('Unable to load product cart right now.');
        } finally {
          if (isActive) {
            setProductLoading(false);
          }
        }
      };

      loadServiceCart();
      loadProductCart();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const getServiceItemId = useCallback(item => {
    if (!item) {
      return null;
    }
    return (
      item?._id ??
      item?.serviceId ??
      item?.id ??
      (typeof item === 'string' ? item : null)
    );
  }, []);

  const getProductItemId = useCallback(item => {
    return (
      item?.cartItemId ??
      item?._id ??
      item?.id ??
      item?.itemId ??
      item?.productId ??
      null
    );
  }, []);

  const serviceSummaries = useMemo(() => {
    if (!Array.isArray(serviceItems) || serviceItems.length === 0) {
      return [];
    }
    return serviceItems.map((item, index) => {
      const identity = getServiceItemId(item) ?? `service-${index}`;
      const duration =
        item?.duration ??
        item?.sessionDuration ??
        calculateDurationLabel(item?.startTime, item?.endTime) ??
        DEFAULT_SERVICE_DURATION;
      const mode =
        item?.serviceMode ??
        item?.mode ??
        item?.bookingType ??
        DEFAULT_SERVICE_MODE;
      const meetingLink =
        item?.meetingLink ?? item?.zoom ?? item?.zoomLink ?? '';
      const dateTimeLabel = formatCartDateTimeLabel(
        item?.date,
        item?.startTime,
        item?.endTime,
      );
      return {
        key: identity,
        identity,
        title: item?.name ?? 'Service',
        duration,
        mode,
        meetingLink,
        dateTimeLabel: dateTimeLabel || 'Schedule pending',
        isRemoving: Boolean(removingServiceItems[identity]),
        raw: item,
      };
    });
  }, [getServiceItemId, removingServiceItems, serviceItems]);

  const productSummaries = useMemo(() => {
    if (!Array.isArray(productItems) || productItems.length === 0) {
      return [];
    }
    return productItems.map((item, index) => {
      const identity = getProductItemId(item) ?? `product-${index}`;
      const quantity = Number(item?.quantity ?? 1);
      const amount = parseAmount(
        item?.totalPrice ?? item?.price ?? item?.unitPrice,
      );
      const compareAt = parseAmount(item?.mrpPrice ?? item?.compareAt);
      return {
        key: identity,
        identity,
        title: item?.name ?? 'Product',
        quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
        priceLabel:
          amount != null ? formatCompactPrice(amount) : formatCompactPrice(0),
        compareAtLabel:
          compareAt && compareAt > amount
            ? formatCompactPrice(compareAt)
            : '',
        thumbnail: item?.images?.[0] ?? FALLBACK_PRODUCT_IMAGE,
        isUpdating: Boolean(updatingProductQuantities[identity]),
        isRemoving: Boolean(removingProductItems[identity]),
        raw: item,
      };
    });
  }, [
    getProductItemId,
    productItems,
    removingProductItems,
    updatingProductQuantities,
  ]);

  const isServiceActive = activeSegment === 'service';
  const activeSummaries = isServiceActive ? serviceSummaries : productSummaries;
  const isActiveLoading = isServiceActive ? serviceLoading : productLoading;
  const activeError = isServiceActive ? serviceError : productError;
  const canContinue = activeSummaries.length > 0;

  const handleToggleChange = useCallback(value => {
    setActiveSegment(value === 'left' ? 'service' : 'product');
  }, []);

  const handleNavigateBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('Home');
  }, [navigation]);

  const handleNavigateToSummary = useCallback(() => {
    if (!canContinue) {
      return;
    }
    if (isServiceActive) {
      navigation.navigate('BookingSummary');
      return;
    }
    navigation.navigate('ProductSummary');
  }, [canContinue, isServiceActive, navigation]);

  const renderEmptyState = (message, subMessage) => (
    <View
      className="bg-white rounded-[18px] border border-[#E6E9F2] px-5 py-6"
      style={styles.cardShadow}>
      <Text className="text-base font-poppinsSemiBold text-[#1B2333]">
        {message}
      </Text>
      {subMessage ? (
        <Text className="text-sm font-poppins text-[#6B7280] mt-1">
          {subMessage}
        </Text>
      ) : null}
    </View>
  );

  const renderServiceCard = () => {
    if (serviceSummaries.length === 0) {
      return renderEmptyState(
        'No services in cart',
        'Book a service to see it here.',
      );
    }
    return (
      <View className="space-y-4">
        {serviceSummaries.map(summary => (
          <View
            key={summary.key}
            className="bg-white rounded-[10px] border border-[#E6E9F2] px-5 py-5 mb-3"
            style={styles.cardShadow}>
            <View className="flex-row items-start justify-between mb-4">
              <Text className="font-poppinsSemiBold text-[18px] text-[#1B2333] flex-1 pr-3">
                Service Type:{' '}
                <Text className="text-[#FF8835]">{summary.title}</Text>
              </Text>
              {summary.isRemoving ? (
                <ActivityIndicator size="small" color="#EF4444" />
              ) : (
                <TouchableOpacity
                  onPress={() => handleRemoveServiceItem(summary.raw)}
                  activeOpacity={0.8}
                  disabled={summary.isRemoving}
                  hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
                  <Delete02Icon size={20} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>
            <CartInfoRow
              icon={<SessionDurationIcon size={24} stroke="#1D293D" />}
              label="Session Duration"
              value={summary.duration}
            />
            <CartInfoRow
              icon={<BookingDateIcon size={24} stroke="#1D293D" />}
              label="Date"
              value={summary.dateTimeLabel}
            />
            <CartInfoRow
              icon={<SessionModeIcon size={24} stroke="#1D293D" />}
              label="Mode"
              value={summary.mode}
            />
            <CartInfoRow
              icon={<ZoomMeetingIcon size={24} stroke="#1D293D" />}
              label="Zoom"
              value={summary.meetingLink || 'Not provided'}
            />
          </View>
        ))}
      </View>
    );
  };

  const handleRemoveServiceItem = useCallback(
    async item => {
      const itemId = getServiceItemId(item);
      if (!itemId || removingServiceItems[itemId]) {
        return;
      }
      setRemovingServiceItems(prev => ({...prev, [itemId]: true}));
      try {
        const response = await removeFromCartService({itemId});
        const payload = response?.data ?? response ?? {};
        const items = Array.isArray(payload?.items) ? payload.items : [];
        if (items.length > 0) {
          setServiceItems(prevItems =>
            mergeItemsById(prevItems, items, getServiceItemId),
          );
        } else {
          setServiceItems(prevItems =>
            prevItems.filter(
              prevItem => getServiceItemId(prevItem) !== itemId,
            ),
          );
        }
      } catch (error) {
        console.log('Failed to remove service cart item', error);
      } finally {
        setRemovingServiceItems(prev => {
          const next = {...prev};
          delete next[itemId];
          return next;
        });
      }
    },
    [getServiceItemId, removingServiceItems],
  );

  const updateProductQuantityLocally = useCallback(
    (itemId, nextQuantity) => {
      setProductItems(prevItems =>
        prevItems.map(item => {
          if (getProductItemId(item) === itemId) {
            return {...item, quantity: nextQuantity};
          }
          return item;
        }),
      );
    },
    [getProductItemId],
  );

  const handleChangeProductQuantity = useCallback(
    async (item, delta) => {
      const itemId = getProductItemId(item);
      if (!itemId) {
        return;
      }
      if (
        updatingProductQuantities[itemId] ||
        removingProductItems[itemId]
      ) {
        return;
      }
      const currentQty = Number(item?.quantity ?? 1);
      const nextQty = Math.max(1, currentQty + delta);
      if (nextQty === currentQty) {
        return;
      }

      setUpdatingProductQuantities(prev => ({...prev, [itemId]: true}));
      updateProductQuantityLocally(itemId, nextQty);
      try {
        await updateProductCartData({
          itemId,
          quantity: nextQty,
        });
      } catch (error) {
        console.log('Failed to update cart quantity', error);
        updateProductQuantityLocally(itemId, currentQty);
      } finally {
        setUpdatingProductQuantities(prev => {
          const next = {...prev};
          delete next[itemId];
          return next;
        });
      }
    },
    [
      getProductItemId,
      removingProductItems,
      updateProductQuantityLocally,
      updatingProductQuantities,
    ],
  );

  const handleIncreaseProductQuantity = useCallback(
    item => handleChangeProductQuantity(item, 1),
    [handleChangeProductQuantity],
  );

  const handleDecreaseProductQuantity = useCallback(
    item => handleChangeProductQuantity(item, -1),
    [handleChangeProductQuantity],
  );

  const handleRemoveProductItem = useCallback(
    async item => {
      const itemId = getProductItemId(item);
      if (!itemId || removingProductItems[itemId]) {
        return;
      }
      setRemovingProductItems(prev => ({...prev, [itemId]: true}));
      try {
        const response = await deleteProductFromCart({itemId});
        const payload = response?.data ?? response ?? {};
        const items = Array.isArray(payload?.items) ? payload.items : [];
        if (items.length > 0) {
          setProductItems(prevItems =>
            mergeItemsById(prevItems, items, getProductItemId),
          );
        } else {
          setProductItems(prevItems =>
            prevItems.filter(
              prevItem => getProductItemId(prevItem) !== itemId,
            ),
          );
        }
      } catch (error) {
        console.log('Failed to remove product cart item', error);
      } finally {
        setRemovingProductItems(prev => {
          const next = {...prev};
          delete next[itemId];
          return next;
        });
      }
    },
    [getProductItemId, removingProductItems],
  );

  const renderProductCard = () => {
    if (productSummaries.length === 0) {
      return renderEmptyState(
        'No products in cart',
        'Add products to review them here.',
      );
    }
    return (
      <View className="bg-white rounded-[10px] border border-[#E6E9F2]">
        {productSummaries.map((summary, index) => {
          const isActionDisabled =
            summary.isUpdating || summary.isRemoving;
          return (
            <View
              key={summary.key}
              className={`mx-5 py-5 ${index == 0 ? '' : 'border-t border-[#E6E9F2]'}`}
              style={styles.cardShadow}>
              <View className="flex-row items-center">
                <Image
                  source={{uri: summary.thumbnail}}
                  className="w-[70px] h-[70px] rounded-[10px] bg-[#F3F4F6]"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-base font-poppinsMedium text-[#1B2333]">
                    {summary.title}
                  </Text>
                  <View className="flex-row items-center mt-2">
                    <Text className="font-poppinsSemiBold text-[#1B2333]">
                      {summary.priceLabel}
                    </Text>
                    {summary.compareAtLabel ? (
                      <Text className="ml-2 font-poppins text-[#94A3B8] line-through">
                        {summary.compareAtLabel}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <View className="self-end">
                  <View className="flex-row items-center justify-end mb-2">
                    <Text className="font-poppins text-[#606980]">
                      Qty: {summary.quantity}
                    </Text>
                    {summary.isUpdating ? (
                      <ActivityIndicator
                        size="small"
                        color="#1B2333"
                        style={{marginLeft: 6}}
                      />
                    ) : null}
                    <View className="ml-3">
                      {summary.isRemoving ? (
                        <ActivityIndicator size="small" color="#EF4444" />
                      ) : (
                        <TouchableOpacity
                          onPress={() => handleRemoveProductItem(summary.raw)}
                          disabled={isActionDisabled}
                          activeOpacity={0.8}
                          hitSlop={{top: 6, bottom: 6, left: 6, right: 6}}
                          style={{opacity: isActionDisabled ? 0.4 : 1}}>
                          <Delete02Icon size={18} color="#EF4444" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View
                    className="flex-row items-center border border-[#1B2333] rounded-[10px] px-2 py-1 bg-white"
                    style={{opacity: isActionDisabled ? 0.5 : 1}}>
                    <TouchableOpacity
                      onPress={() => handleDecreaseProductQuantity(summary.raw)}
                      disabled={isActionDisabled || summary.quantity <= 1}
                      hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
                      className="px-1 py-1">
                      <QuantityDecreaseIcon size={18} stroke="#1B2333" />
                    </TouchableOpacity>
                    <View className="mx-2 w-8 h-8 rounded-[10px] bg-[#FF8835] items-center justify-center">
                      <Text className="text-white font-poppinsSemiBold">
                        {summary.quantity}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleIncreaseProductQuantity(summary.raw)}
                      disabled={isActionDisabled}
                      hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
                      className="px-1 py-1">
                      <QuantityIncreaseIcon size={18} stroke="#1B2333" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderActiveCard = () => {
    if (isActiveLoading) {
      return (
        <View
          className="bg-white rounded-[10px] border border-[#E6E9F2] px-5 py-6 items-center justify-center"
          style={styles.cardShadow}>
          <ActivityIndicator size="small" color="#FF8835" />
          <Text className="mt-3 text-sm font-poppins text-[#6B7280]">
            Fetching your cart...
          </Text>
        </View>
      );
    }

    if (activeError) {
      return renderEmptyState('Something went wrong', activeError);
    }

    return isServiceActive ? renderServiceCard() : renderProductCard();
  };

  return (
    <View
      className="flex-1"
      style={{backgroundColor: '#FFF6ED', paddingTop: top + 12}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View className="px-5">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={handleNavigateBack}
            activeOpacity={0.8}
            className="w-12 h-12 rounded-[10px] bg-white items-center justify-center border border-[#E6E9F2]"
            style={styles.cardShadow}>
            <ArrowLeft02Icon size={20} color="#1B2333" />
          </TouchableOpacity>
          <Text className="ml-4 text-[24px] font-poppinsSemiBold text-[#1B2333]">
            Cart
          </Text>
        </View>

        <DualToggleSwitch
          value={isServiceActive ? 'left' : 'right'}
          onChange={handleToggleChange}
          leftLabel="Services"
          rightLabel="Products"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 32,
        }}>
        {renderActiveCard()}
      </ScrollView>

      <View
        className="px-5 pt-2"
        style={{paddingBottom: Math.max(bottom + 8, 24)}}>
        <GradientButton
          title="Continue Applying"
          onPress={handleNavigateToSummary}
          disabled={!canContinue}
          containerStyle="w-full"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
  },
});

export default Cart;
