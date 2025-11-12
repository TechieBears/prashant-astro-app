import React, {useMemo, useEffect, useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CouponTicketCard from '../Cards/CouponTicketCard';

const SHEET_HEIGHT = Math.round(Dimensions.get('window').height * 0.8);

const getSavingsLabel = coupon => {
  if (!coupon) {
    return '';
  }
  const {discount, discountIn} = coupon;
  if (discountIn === 'percent') {
    return `Save ${discount ?? 0}%`;
  }
  return `Save ₹${discount ?? 0}`;
};


const CouponSelectionSheet = ({
  isVisible,
  onClose,
  coupons = [],
  selectedCouponId,
  onSelectCoupon,
  onApply,
  couponCode,
  onCouponCodeChange,
  onCheckCoupon,
  applyLabel = 'Apply',
  maxSavingsLabel,
  isApplyDisabled = false,
  isChecking = false,
  isApplying = false,
}) => {
  const {bottom} = useSafeAreaInsets();
  const highestSavingsLabel = useMemo(() => {
    if (maxSavingsLabel) {
      return maxSavingsLabel;
    }
    const bestCoupon = coupons.reduce((best, current) => {
      if (!current) {
        return best;
      }
      if (!best) {
        return current;
      }
      const currentValue = Number(current.discount ?? 0);
      const bestValue = Number(best.discount ?? 0);
      return currentValue > bestValue ? current : best;
    }, null);
    if (!bestCoupon) {
      return '₹0';
    }
    return bestCoupon.discountIn === 'percent'
      ? `${bestCoupon.discount ?? 0}%`
      : `₹${bestCoupon.discount ?? 0}`;
  }, [coupons, maxSavingsLabel]);

  const renderCoupon = ({item}) => {
    const isSelected =
      selectedCouponId &&
      (item._id === selectedCouponId || item.id === selectedCouponId);
    const descriptionText =
      item.description ||
      '25 % Off on minimum purchase of Rs. 500.';
    const expiryText =
      item.expiryText || 'Expires on: 5th July 2025  |  12:00pm';

    return (
      <CouponTicketCard
        item={item}
        isSelected={Boolean(isSelected)}
        onPress={() => onSelectCoupon?.(item)}
        getSavingsLabelFn={getSavingsLabel}
        descriptionText={descriptionText}
        expiryText={expiryText}
      />
    );
  };

  const sheetRef = useRef(null);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) {
      return;
    }
    if (isVisible) {
      sheet.open();
    } else {
      sheet.close();
    }
  }, [isVisible]);

  const handleSheetClose = () => {
    onClose?.();
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={SHEET_HEIGHT}
      openDuration={250}
      closeDuration={200}
      closeOnDragDown
      closeOnPressMask
      dragFromTopOnly={false}
      onClose={handleSheetClose}
      customStyles={{
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingTop: 12,
          paddingBottom: 0,
          backgroundColor: '#FFFFFF',
        },
        draggableIcon: {
          backgroundColor: '#CBD5E1',
          width: 64,
        },
        wrapper: {
          backgroundColor: 'rgba(15,23,42,0.35)',
        },
      }}
    >
      <View className="flex-1">
        <View className='px-5 pb-3'>
          <Text className="text-[#0F172A] font-poppinsSemiBold text-[18px] mb-1">Available Coupons</Text>
        </View>
        <View className="flex-1 bg-[#F2F6FF] px-5 pt-4">
          <View className="flex-row items-center bg-white border border-[#DEE7F4] rounded-[10px] px-4 mb-5 h-[56px]">
            <TextInput
              value={couponCode}
              onChangeText={onCouponCodeChange}
              placeholder="Enter coupon code"
              placeholderTextColor="#94A3B8"
              className="flex-1 font-poppinsMedium text-[15px] text-[#0F172A]"
              style={{height: 44, paddingVertical: 0}}
            />
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onCheckCoupon}
              disabled={!onCheckCoupon || !couponCode || isChecking}
              className={`ml-3 px-4 py-2`}
            >
              <Text
                className={`font-poppinsSemiBold text-[13px] ${
                  !couponCode || isChecking ? 'text-[#A0AEC0]' : 'text-[#FF8A00]'
                }`}
              >
                {isChecking ? 'Checking...' : 'Check'}
              </Text>
            </TouchableOpacity>
          </View>

          {coupons && coupons.length > 0 ? (
            <FlatList
              data={coupons}
              keyExtractor={(item, index) =>
                item._id ?? item.id ?? item.couponCode ?? `coupon-${index}`
              }
              renderItem={renderCoupon}
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}
              contentContainerStyle={{paddingBottom: 32}}
            />
          ) : (
            <View className="flex-1 items-center justify-center my-6">
              <Text className="text-[#94A3B8] font-poppins text-[14px]">
                No coupons available right now.
              </Text>
            </View>
          )}
        </View>

        <View className="px-5 py-4 border-t border-[#E2E8F0] bg-white" style={{paddingBottom: bottom}}>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-[#97A6C2] font-poppins text-[13px]">
                Maximum Savings:
              </Text>
              <Text className="text-[#0F172A] font-poppinsSemiBold text-[18px]">
                {highestSavingsLabel || '₹0'}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onApply}
              disabled={isApplyDisabled || isApplying}
              className={`px-8 py-3 rounded-[16px] ${
                isApplyDisabled || isApplying ? 'bg-[#E2E8F0]' : 'bg-[#FFC529]'
              }`}
            >
              <Text
                className={`font-poppinsSemiBold text-[15px] ${
                  isApplyDisabled || isApplying ? 'text-[#94A3B8]' : 'text-white'
                }`}
              >
                {isApplying ? 'Applying...' : applyLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RBSheet>
  );
};

export default CouponSelectionSheet;
