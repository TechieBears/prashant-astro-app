import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowLeft02Icon, Location06Icon, Delete02Icon} from 'hugeicons-react-native';
import GradientButton from '../../components/Buttons/GradientButton';
import {
  SessionDurationIcon,
  PhoneOutlineIcon,
  QuantityDecreaseIcon,
  QuantityIncreaseIcon,
} from '../../utils/svgIcons';
import {
  getProductCartData,
  updateProductCartData,
  deleteProductFromCart,
  productOrderPlace,
  getCustomerAddresses,
} from '../../services';
import AddressCard from '../../components/AddressCard';
import {buildProductSuccessParams} from '../../utils/successMapper';

const FALLBACK_IMAGE =
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

  return 0;
};

const formatCurrency = amount => {
  const numeric = Number(amount ?? 0);
  if (Number.isNaN(numeric)) {
    return '0.00';
  }

  const hasIntlFormatter =
    typeof Intl !== 'undefined' &&
    Intl.NumberFormat &&
    typeof Intl.NumberFormat === 'function';

  if (hasIntlFormatter) {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numeric);
  }

  const fixed = numeric.toFixed(2);
  const [whole, fractionRaw] = fixed.split('.');
  const fraction = (fractionRaw ?? '').padEnd(2, '0');
  const lastThree = whole.slice(-3);
  const otherNumbers = whole.slice(0, -3);
  const formattedWhole =
    otherNumbers !== ''
      ? `${otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${lastThree}`
      : lastThree;

  return `${formattedWhole}.${fraction}`;
};

const formatCompactPrice = amount => {
  const numeric = Number(amount ?? 0);
  if (!Number.isFinite(numeric)) {
    return '₹0';
  }

  const hasIntlFormatter =
    typeof Intl !== 'undefined' &&
    Intl.NumberFormat &&
    typeof Intl.NumberFormat === 'function';

  if (hasIntlFormatter) {
    return `₹${new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(numeric)}`;
  }

  return `₹${Math.round(numeric)}`;
};

const getCartItemKey = (item, index) =>
  item?._id ?? item?.productId ?? item?.id ?? `cart-item-${index}`;

const getCartItemId = item => item?._id ?? item?.productId ?? item?.id ?? null;

const buildQuantityMap = items =>
  items.reduce((acc, item, index) => {
    const key = getCartItemKey(item, index);
    const qty = Number(item?.quantity);
    acc[key] = Number.isFinite(qty) && qty > 0 ? qty : 1;
    return acc;
  }, {});

const mergeCartItems = (previousItems, nextItems) => {
  if (!Array.isArray(nextItems)) {
    return previousItems;
  }
  return nextItems.map(nextItem => {
    const identity = getCartItemId(nextItem);
    if (!identity) {
      return nextItem;
    }
    const existingItem =
      previousItems?.find(item => getCartItemId(item) === identity) ?? null;
    if (!existingItem) {
      return nextItem;
    }
    return {
      ...existingItem,
      ...nextItem,
    };
  });
};

const ProductSummary = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {top, bottom} = useSafeAreaInsets();

  const deliveryWindow = route.params?.deliveryWindow ?? '4 to 5 days';
  const fallbackDeliveryAddress =
    route.params?.deliveryAddress ??
    'Please select a delivery address.';
  const contactNumber = route.params?.contactNumber ?? '+91-9652314568';
  const gstRate = Number(route.params?.gstRate ?? 0.18);

  const buyNowItem = route.params?.buyNowItem ?? null;
  const isBuyNowFlow = Boolean(buyNowItem);

  const initialBuyNowItems = useMemo(() => {
    if (!isBuyNowFlow || !buyNowItem) {
      return [];
    }
    return [buyNowItem];
  }, [buyNowItem, isBuyNowFlow]);

  const [cartItems, setCartItems] = useState(initialBuyNowItems);
  const [quantities, setQuantities] = useState(
    isBuyNowFlow ? buildQuantityMap(initialBuyNowItems) : {},
  );
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cartError, setCartError] = useState('');
  const [updatingItems, setUpdatingItems] = useState({});
  const [removingItems, setRemovingItems] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(
    route.params?.addressId ?? null,
  );

useEffect(() => {
  if (isBuyNowFlow && buyNowItem) {
    setCartItems([buyNowItem]);
    setQuantities(buildQuantityMap([buyNowItem]));
    setCartTotalAmount(0);
    setCartError('');
  }
}, [buyNowItem, isBuyNowFlow]);

useEffect(() => {
  let isMounted = true;
  const fetchAddresses = async () => {
    try {
      setIsAddressLoading(true);
      const response = await getCustomerAddresses();
      if (!isMounted) {
        return;
      }
      const payload = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
        ? response
        : [];
      const usable = payload.filter(item => item && item.isDeleted !== true);
      setAddresses(usable);
      if (!usable.length) {
        return;
      }
      const defaultAddress =
        usable.find(item => item?.isDefault) ?? usable[0];
      setSelectedAddressId(prev =>
        prev
          ? prev
          : defaultAddress?._id ??
            defaultAddress?.id ??
            defaultAddress?.addressId ??
            null,
      );
    } catch (error) {
      console.log('Failed to fetch customer addresses', error);
    } finally {
      if (isMounted) {
        setIsAddressLoading(false);
      }
    }
  };

  fetchAddresses();

  return () => {
    isMounted = false;
  };
}, []);

  useFocusEffect(
    useCallback(() => {
      if (isBuyNowFlow) {
        return undefined;
      }
      let isActive = true;

      const fetchCart = async () => {
        setIsCartLoading(true);
        setCartError('');
        try {
          const response = await getProductCartData();
          if (!isActive) {
            return;
          }
          const payload = response?.data ?? response ?? {};
          const items = Array.isArray(payload?.items) ? payload.items : [];
          setCartItems(items);
          setQuantities(buildQuantityMap(items));
          setCartTotalAmount(parseAmount(payload?.totalAmount));
        } catch (error) {
          if (!isActive) {
            return;
          }
          console.log('Get product cart data error:', error);
          setCartError(error?.message ?? 'Unable to fetch cart data.');
          setCartItems([]);
          setQuantities({});
          setCartTotalAmount(0);
        } finally {
          if (isActive) {
            setIsCartLoading(false);
          }
        }
      };

      fetchCart();

      return () => {
        isActive = false;
      };
    }, [isBuyNowFlow]),
  );

  const handleDecreaseQuantity = useCallback(
    itemKey => {
      if (updatingItems[itemKey] || removingItems[itemKey]) {
        return;
      }
      if (isBuyNowFlow) {
        setQuantities(prev => {
          const current = prev[itemKey] ?? 1;
          const nextValue = Math.max(1, current - 1);
          if (nextValue === current) {
            return prev;
          }
          return {...prev, [itemKey]: nextValue};
        });
        return;
      }
      setQuantities(prev => {
        const current = prev[itemKey] ?? 1;
        const nextValue = Math.max(1, current - 1);
        if (nextValue === current) {
          return prev;
        }
        return {...prev, [itemKey]: nextValue};
      });
    },
    [isBuyNowFlow, removingItems, updatingItems],
  );

  const handleIncreaseQuantity = useCallback(
    async (itemKey, item) => {
      if (removingItems[itemKey] || updatingItems[itemKey]) {
        return;
      }
      const currentQuantity =
        quantities[itemKey] ?? item?.quantity ?? 1;
      const nextQuantity = currentQuantity + 1;
      if (isBuyNowFlow) {
        setQuantities(prev => ({...prev, [itemKey]: nextQuantity}));
        return;
      }
      setQuantities(prev => ({...prev, [itemKey]: nextQuantity}));
      setUpdatingItems(prev => ({...prev, [itemKey]: true}));

      const itemId =
        item?.cartItemId ??
        item?._id ??
        item?.id ??
        item?.itemId ??
        item?.productId;

      if (!itemId) {
        console.log('Missing cart item identifier for update.');
        return;
      }

      try {
        await updateProductCartData({
          itemId,
          quantity: nextQuantity,
        });
      } catch (error) {
        console.log('Update product cart error:', error);
        setQuantities(prev => ({...prev, [itemKey]: currentQuantity}));
      } finally {
        setUpdatingItems(prev => {
          const next = {...prev};
          delete next[itemKey];
          return next;
        });
      }
    },
    [isBuyNowFlow, quantities, removingItems, updatingItems],
  );

  const handleRemoveCartItem = useCallback(
    async (itemKey, item) => {
      const itemId =
        item?.cartItemId ??
        item?._id ??
        item?.id ??
        item?.itemId ??
        item?.productId;

      if (isBuyNowFlow) {
        setCartItems([]);
        setQuantities({});
        navigation.goBack();
        return;
      }

      if (!itemId || removingItems[itemKey] || updatingItems[itemKey]) {
        return;
      }

      setRemovingItems(prev => ({...prev, [itemKey]: true}));
      try {
        const response = await deleteProductFromCart({itemId});
        const payload = response?.data ?? response ?? {};
        const items = Array.isArray(payload?.items) ? payload.items : [];
        if (items.length) {
          setCartItems(prevItems => {
            const mergedItems = mergeCartItems(prevItems, items);
            setQuantities(buildQuantityMap(mergedItems));
            setCartTotalAmount(parseAmount(payload?.totalAmount));
            return mergedItems;
          });
        } else {
          setCartItems(prevItems => {
            const filtered = prevItems.filter(prevItem => {
              const prevIdentity = getCartItemId(prevItem);
              if (!prevIdentity) {
                return true;
              }
              return prevIdentity !== itemId;
            });
            const nextQuantities = buildQuantityMap(filtered);
            setQuantities(nextQuantities);
            if (payload?.totalAmount) {
              setCartTotalAmount(parseAmount(payload.totalAmount));
            } else {
              const derivedTotal = filtered.reduce((sum, cartItem, idx) => {
                const key = getCartItemKey(cartItem, idx);
                const qty = nextQuantities[key] ?? cartItem?.quantity ?? 1;
                const price = parseAmount(
                  cartItem?.price ?? cartItem?.totalPrice ?? cartItem?.unitPrice,
                );
                if (!Number.isFinite(price) || !Number.isFinite(qty)) {
                  return sum;
                }
                return sum + price * qty;
              }, 0);
              setCartTotalAmount(derivedTotal);
            }
            return filtered;
          });
        }
      } catch (error) {
        console.log('Delete product cart item error:', error);
      } finally {
        setRemovingItems(prev => {
          const next = {...prev};
          delete next[itemKey];
          return next;
        });
      }
    },
    [isBuyNowFlow, navigation, removingItems, updatingItems],
  );

  const totalUnits = useMemo(() => {
    if (!cartItems.length) {
      return 0;
    }
    return cartItems.reduce((sum, item, index) => {
      const key = getCartItemKey(item, index);
      return sum + (quantities[key] ?? item?.quantity ?? 1);
    }, 0);
  }, [cartItems, quantities]);

  const subtotal = useMemo(() => {
    if (!cartItems.length) {
      return 0;
    }
    return cartItems.reduce((sum, item, index) => {
      const key = getCartItemKey(item, index);
      const qty = quantities[key] ?? item?.quantity ?? 1;
      const price = parseAmount(
        item?.price ?? item?.totalPrice ?? item?.unitPrice,
      );
      if (!Number.isFinite(price) || !Number.isFinite(qty)) {
        return sum;
      }
      return sum + price * qty;
    }, 0);
  }, [cartItems, quantities]);

  const baseAmount = cartTotalAmount || subtotal;
  const gstAmount = baseAmount * gstRate;
  const totalAmount = baseAmount + gstAmount;
  const isPayDisabled =
    isCartLoading || !cartItems.length || isPlacingOrder || !selectedAddressId;
  const selectedAddress = useMemo(() => {
    if (!selectedAddressId) {
      return null;
    }
    return (
      addresses.find(address => {
        const identifier =
          address?._id ?? address?.id ?? address?.addressId ?? null;
        if (!identifier) {
          return false;
        }
        return String(identifier) === String(selectedAddressId);
      }) ?? null
    );
  }, [addresses, selectedAddressId]);

  const deliveryAddressLine = useMemo(() => {
    if (!selectedAddress) {
      return fallbackDeliveryAddress;
    }
    const primaryLine =
      selectedAddress?.line1 ??
      selectedAddress?.addressLine1 ??
      selectedAddress?.address ??
      '';
    const cityState = [selectedAddress?.city, selectedAddress?.state]
      .filter(Boolean)
      .join(', ');
    const postal = selectedAddress?.pincode ?? selectedAddress?.zipCode ?? '';
    return [primaryLine, cityState, postal].filter(Boolean).join(', ');
  }, [fallbackDeliveryAddress, selectedAddress]);

  const handlePayNow = useCallback(async () => {
    if (isPayDisabled) {
      return;
    }

    const itemsPayload = cartItems
      .map((item, index) => {
        const productId = item?.productId ?? item?._id ?? item?.id;
        if (!productId) {
          return null;
        }
        const key = getCartItemKey(item, index);
        const qty = quantities[key] ?? item?.quantity ?? 1;
        const parsedQty = Number(qty);
        if (!Number.isFinite(parsedQty) || parsedQty <= 0) {
          return null;
        }
        return {
          product: productId,
          quantity: parsedQty,
        };
      })
      .filter(Boolean);

    if (!itemsPayload.length) {
      Alert.alert('Notice', 'Unable to identify products in your order.');
      return;
    }

    const addressId =
      selectedAddressId ??
      route.params?.addressId ??
      route.params?.address?._id ??
      route.params?.address ??
      route.params?.selectedAddress?._id ??
      route.params?.selectedAddressId ??
      null;

    if (!addressId) {
      Alert.alert(
        'Add Delivery Address',
        'Please choose a delivery address before placing the order.',
      );
      return;
    }

    const paymentMethod = route.params?.paymentMethod ?? 'UPI';
    const paymentDetails =
      route.params?.paymentDetails ?? {
        transactionId: `TXN${Date.now()}`,
        provider: 'PhonePe',
        status: 'SUCCESS',
        paidAt: new Date().toISOString(),
      };

    const orderPayload = {
      items: itemsPayload,
      address: addressId,
      paymentMethod,
      paymentDetails,
    };

    try {
      setIsPlacingOrder(true);
      const response = await productOrderPlace(orderPayload);
      const successParams = buildProductSuccessParams({
        orderResponse: response ?? {},
        orderRequest: orderPayload,
        summary: {
          baseAmount,
          gstAmount,
          totalAmount,
        },
        items: cartItems,
      });
      navigation.navigate('BookingSuccess', successParams);
    } catch (error) {
      console.log('Product order place error:', error);
      const message =
        error?.response?.data?.message ??
        error?.message ??
        'Unable to place your order right now.';
      Alert.alert('Order Failed', message);
    } finally {
      setIsPlacingOrder(false);
    }
  }, [
    baseAmount,
    cartItems,
    gstAmount,
    isBuyNowFlow,
    isPayDisabled,
    navigation,
    quantities,
    route.params,
    selectedAddressId,
    totalAmount,
  ]);

  const handleSelectAddress = useCallback(addressId => {
    if (!addressId) {
      return;
    }
    setSelectedAddressId(String(addressId));
  }, []);

  const handleManageAddresses = useCallback(() => {
    navigation.navigate('Address');
  }, [navigation]);

  const renderAddressSection = () => {
    if (isAddressLoading) {
      return (
        <AddressCard
          label="Delivery Address"
          address={null}
          emptyHint="Loading your addresses..."
        />
      );
    }

    if (!addresses.length) {
      return (
        <AddressCard
          label="Delivery Address"
          address={null}
          emptyHint="Add an address to proceed with your order."
          renderActions={() => (
            <TouchableOpacity
              onPress={handleManageAddresses}
              activeOpacity={0.85}
              className="rounded-[10px] border border-[#1F2937] py-3 items-center">
              <Text className="text-[#1F2937] font-poppinsMedium text-base">
                Add Address
              </Text>
            </TouchableOpacity>
          )}
        />
      );
    }

    return (
      <View className="bg-white rounded-[10px] p-4 shadow-sm shadow-[#E5E7EB] mb-4">
        <AddressCard label="Delivery Address" address={selectedAddress} />
        <View className="flex-row items-center justify-between mt-3">
          {addresses.length > 1 ? (
            <TouchableOpacity onPress={handleManageAddresses} activeOpacity={0.8}>
              <Text className="text-sm font-poppinsMedium text-[#FF8835]">
                Change Address
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <TouchableOpacity onPress={handleManageAddresses} activeOpacity={0.8}>
            <Text className="text-sm font-poppinsMedium text-[#1D293D]">
              + Add New
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCartItems = () => {
    if (isCartLoading) {
      return (
        <View className="bg-white rounded-3xl px-5 py-6 shadow-sm shadow-[#E5E7EB] mb-4">
          <Text className="text-base font-poppins text-[#4A5568]">
            Loading cart details...
          </Text>
        </View>
      );
    }

    if (cartError) {
      return (
        <View className="bg-white rounded-3xl px-5 py-6 shadow-sm shadow-[#E5E7EB] mb-4">
          <Text className="text-base font-poppinsSemiBold text-[#1B2333]">
            Unable to load cart
          </Text>
          <Text className="mt-1 text-sm font-poppins text-[#6B7280]">
            {cartError}
          </Text>
        </View>
      );
    }

    if (!cartItems.length) {
      return (
        <View className="bg-white rounded-3xl px-5 py-6 shadow-sm shadow-[#E5E7EB] mb-4">
          <Text className="text-base font-poppinsSemiBold text-[#1B2333]">
            Your cart looks empty
          </Text>
          <Text className="mt-1 text-sm font-poppins text-[#6B7280]">
            Add a product to see the summary here.
          </Text>
        </View>
      );
    }

    return (
      <View className="bg-white rounded-[10px] px-5 py-4 shadow-sm shadow-[#E5E7EB] mb-4">
        {cartItems.map((item, index) => {
          const itemKey = getCartItemKey(item, index);
          const quantity = quantities[itemKey] ?? item?.quantity ?? 1;
          const unitPrice = parseAmount(
            item?.price ?? item?.totalPrice ?? item?.unitPrice,
          );
          const compareAt = parseAmount(item?.mrpPrice ?? item?.compareAt);
          const thumbnail = item?.images?.[0] ?? FALLBACK_IMAGE;
          const isUpdating = Boolean(updatingItems[itemKey]);
          const isRemoving = Boolean(removingItems[itemKey]);
          const isActionDisabled = isUpdating || isRemoving;
          return (
            <View key={itemKey} className="py-3">
              {index > 0 ? (
                <View className="h-px bg-[#E5E7EB] mb-3 -mt-3" />
              ) : null}
              <View className="flex-row items-center">
                <Image
                  source={{uri: thumbnail}}
                  className="w-[60px] h-[60px] rounded-[10px] bg-[#F3F4F6]"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-lg font-poppins text-[#1B2333] capitalize">
                    {item?.name ?? 'Product'}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-lg font-poppinsMedium text-black">
                      {formatCompactPrice(unitPrice)}
                    </Text>
                    {compareAt && compareAt > unitPrice ? (
                      <Text className="ml-2 mt-2 text-sm font-poppins text-[#9CA3AF] line-through">
                        {formatCompactPrice(compareAt)}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <View className="items-center">
                  <View className="flex-row items-center justify-between self-end mb-2">
                    <View className="flex-row items-center">
                      <Text className="text-sm font-poppins text-[#6B7280] mr-2">
                        Qty: {quantity}
                      </Text>
                      {isUpdating ? (
                        <ActivityIndicator size="small" color="#1F2937" />
                      ) : null}
                    </View>
                    <View className="ml-3">
                      {isBuyNowFlow ? null : isRemoving ? (
                        <ActivityIndicator size="small" color="#1F2937" />
                      ) : (
                        <TouchableOpacity
                          onPress={() => handleRemoveCartItem(itemKey, item)}
                          activeOpacity={0.8}
                          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                          disabled={isActionDisabled}
                          style={{opacity: isActionDisabled ? 0.4 : 1}}>
                          <Delete02Icon size={18} color="#ef4444" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View
                    className="flex-row items-center rounded-[10px] border border-[#1F2937] px-2 py-1 bg-[#F9FAFB]"
                    style={{opacity: isActionDisabled ? 0.5 : 1}}>
                    <TouchableOpacity
                      onPress={() => handleDecreaseQuantity(itemKey)}
                      activeOpacity={0.8}
                      className="px-1 py-1"
                      disabled={isActionDisabled}>
                      <QuantityDecreaseIcon size={20} />
                    </TouchableOpacity>
                    <View className="mx-2 px-3 py-1 rounded-[10px] bg-[#1F2937]">
                      <Text className="text-sm font-poppinsSemiBold text-white">
                        {quantity}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleIncreaseQuantity(itemKey, item)}
                      activeOpacity={0.8}
                      className="px-1 py-1"
                      disabled={isActionDisabled}>
                      <QuantityIncreaseIcon size={20} />
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

  return (
    <View className="flex-1 bg-[#FEF8EF]">
      <StatusBar barStyle="dark-content" backgroundColor="#FEF8EF" />
      <View
        style={{paddingTop: top + 6}}
        className="px-5 pb-4 flex-row items-center space-x-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          className="w-12 h-12 rounded-[10px] bg-white shadow-sm shadow-[#E5E7EB] items-center justify-center mr-3">
          <ArrowLeft02Icon size={20} color="#1D293D" />
        </TouchableOpacity>
        <Text className="text-lg font-poppinsMedium text-[#1B2333]">
          Book a Product
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: bottom}}>
        <View className="px-5">
          {renderCartItems()}
          <View className="bg-white rounded-[10px] p-3 py-4 shadow-sm shadow-[#E5E7EB] mb-4">
            <InfoRow
              icon={<SessionDurationIcon size={20} stroke="#1D293D" />}
              title="Delivery in"
              subtitle={`${deliveryWindow}`}
            />
            <View className="h-[1px] bg-[#F1F5F9] my-2" />
            <InfoRow
              icon={<Location06Icon size={20} color="#1D293D" />}
              subtitle={deliveryAddressLine}
              textGray={true}
            />
            <View className="h-[1px] bg-[#F1F5F9] my-2" />
            <InfoRow
              icon={<PhoneOutlineIcon size={20} stroke="#1D293D" />}
              subtitle={contactNumber}
              textGray={true}
            />
          </View>
          {renderAddressSection()}

          <View className="bg-white rounded-[10px] p-3 py-4 shadow-sm shadow-[#E5E7EB] mb-4">
            <SummaryRow
              label={`Product ${totalUnits}x (incl. GST)`}
              value={`₹ ${formatCurrency(baseAmount)}`}
            />
            <SummaryRow
              label={`GST (${Math.round(gstRate * 100)}%)`}
              value={`₹ ${formatCurrency(gstAmount)}`}
            />
            <View className="h-[1px] bg-[#F1F5F9] my-3" />
            <SummaryRow
              label="Total"
              value={`₹ ${formatCurrency(totalAmount)}`}
              emphasize
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={{paddingBottom: bottom}}
        className="px-5 pt-3 pb-1 bg-[#FEF8EF] border-t border-[#E2E8F0]">
        <GradientButton
          title={
            isPlacingOrder
              ? 'Placing order...'
              : `Pay - ₹ ${formatCurrency(totalAmount)}`
          }
          onPress={handlePayNow}
          gradientStyle="rounded-2xl"
          containerStyle="w-full"
          disabled={isPayDisabled}
          icon={false}
        />
      </View>
    </View>
  );
};

const InfoRow = ({icon, title, subtitle, textGray = false}) => (
  <View className="flex-row items-center">
    <View className="w-10 h-10 items-center justify-center mr-3">
      {icon}
    </View>
    <View className="flex-1 flex-row items-center">
      {title && (
        <Text className="text-sm font-poppins text-[#6B7280] mr-1">
          {title}
        </Text>
      )}
      {subtitle && (
        <Text className={`text-base ${textGray ? 'text-[#6B7280] font-poppins' : 'text-[#1B2333] font-poppinsMedium'}`}>
          {subtitle}
        </Text>
      )}
    </View>
  </View>
);

const SummaryRow = ({label, value, emphasize = false}) => (
  <View className="flex-row items-center justify-between mb-3">
    <Text
      className={`text-base font-poppins ${
        emphasize ? 'text-[#1B2333] font-poppinsSemiBold' : 'text-[#475569]'
      }`}>
      {label}
    </Text>
    <Text
      className={`text-base font-poppins ${
        emphasize ? 'text-[#1B2333] font-poppinsSemiBold' : 'text-[#1B2333]'
      }`}>
      {value}
    </Text>
  </View>
);

export default ProductSummary;
