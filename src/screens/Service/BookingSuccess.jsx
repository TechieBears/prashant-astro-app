import React, {useMemo} from 'react';
import {View, Text, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GradientButton from '../../components/Buttons/GradientButton';
import {BookingSuccessBadgeIcon, ClipboardCopyIcon} from '../../utils/svgIcons';
import {buildSuccessScreenData} from '../../utils/successMapper';
import moment from 'moment';

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

  return numeric.toFixed(2);
};

const BookingSuccess = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {top, bottom} = useSafeAreaInsets();
  const successData = buildSuccessScreenData(route.params);
  const bookingDetails = successData.bookingDetails;
  const bookingResponse = successData.bookingResponse;
  const bookedServiceItem = successData.bookedServiceItem;
  const pricingSummary = successData.pricingSummary;
  const orderResponse = successData.orderResponse;
  const orderRequest = successData.orderRequest;
  const orderDetails = successData.orderDetails ?? {};
  const transactionId = successData.transactionId;
  const transactionIdCopySource = successData.transactionIdCopySource;
  const orderServices = Array.isArray(orderDetails?.services)
    ? orderDetails.services
    : [];
  const primaryOrderService =
    orderServices.length > 0
      ? orderServices[orderServices.length - 1]
      : null;

  const totalPaidAmount =
    successData.totalPaidAmount ??
    orderDetails?.payingAmount ??
    orderDetails?.finalAmount ??
    orderDetails?.totalAmount ??
    pricingSummary?.totalAmount ??
    bookingResponse?.grandtotal ??
    bookingResponse?.grandTotal ??
    0;

  const bookingCreatedOn = orderDetails?.createdAt
    ? moment(orderDetails.createdAt).format('Do MMM, YYYY')
    : bookingResponse?.createdAt
    ? moment(bookingResponse.createdAt).format('Do MMM, YYYY')
    : moment().format('Do MMM, YYYY');

  const bookedServiceDate = primaryOrderService?.bookingDate
    ? moment(primaryOrderService.bookingDate, 'YYYY-MM-DD').format(
        'Do MMM, YYYY',
      )
    : bookingDetails?.date
    ? moment(bookingDetails.date, 'YYYY-MM-DD').format('Do MMM, YYYY')
    : moment().format('Do MMM, YYYY');

  const paymentMethod =
    orderRequest?.paymentType ??
    orderDetails?.paymentMethod ??
    bookingResponse?.paymentGateway ??
    bookingResponse?.paymentMethod ??
    'Razorpay';

  const paymentStatus =
    primaryOrderService?.paymentStatus ??
    orderDetails?.paymentStatus ??
    'pending';

  const paymentStatusLabel =
    typeof paymentStatus === 'string' && paymentStatus.trim()
      ? paymentStatus.trim().charAt(0).toUpperCase() +
        paymentStatus.trim().slice(1)
      : 'Pending';

  const totalPriceAmount =
    primaryOrderService?.total ??
    pricingSummary?.serviceFee ??
    bookedServiceItem?.originalPrice ??
    bookedServiceItem?.totalPrice ??
    0;

  const gstAmount =
    (() => {
      const numericTotal = Number(totalPaidAmount);
      const numericService = Number(totalPriceAmount);
      if (
        !Number.isNaN(numericTotal) &&
        !Number.isNaN(numericService) &&
        numericTotal > numericService
      ) {
        return Number((numericTotal - numericService).toFixed(2));
      }
      return pricingSummary?.gstAmount ?? 0;
    })() ?? 0;

  const summaryItems = useMemo(
    () => [
      {
        label: 'Transaction ID',
        value: transactionId || 'N/A',
        showCopy: Boolean(transactionIdCopySource),
      },
      {
        label: 'Booked On',
        value: bookingCreatedOn,
      },
      {
        label: 'Booked Date',
        value: bookedServiceDate,
      },
      {
        label: 'Payment Status',
        value: paymentStatusLabel,
      },
      {
        label: 'Type of Transaction',
        value: paymentMethod,
      },
      {
        label: 'Total Price',
        value: `₹${formatCurrency(totalPriceAmount)}`,
      },
      {
        label: 'GST',
        value: `₹${formatCurrency(gstAmount)}`,
      },
    ],
    [
      bookingCreatedOn,
      bookedServiceDate,
      gstAmount,
      paymentMethod,
      paymentStatusLabel,
      totalPriceAmount,
      transactionId,
    ],
  );

  const handleGoHome = () => {
    if (!navigation?.dispatch) {
      return;
    }
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'MainTabs'}],
      }),
    );
  };

  return (
    <View className="flex-1 bg-[#FEF8EF]" style={{paddingBottom: bottom}}>
      <StatusBar barStyle="light-content" backgroundColor="#12B35D" />
      <View
        className="bg-[#00C950] justify-center items-center"
        style={{paddingTop: top, height: '50%'}}>
        <View className="items-center">
          <View className="mb-6">
            <BookingSuccessBadgeIcon />
          </View>
          <Text className="text-white text-[28px] font-prociono text-center">
            Booking Successful!
          </Text>
          <Text className="text-white/80 font-poppins text-base mt-2 text-center">
            Successfully paid ₹{formatCurrency(totalPaidAmount)}
          </Text>
          {orderResponse?.message ? (
            <Text className="text-white/70 font-poppins text-sm mt-2 text-center px-6">
              {orderResponse.message}
            </Text>
          ) : null}
        </View>
      </View>

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View className="px-3">
          <View>
            {summaryItems.map(item => (
              <View
                key={item.label}
                className="flex-row items-center justify-between py-2">
                <Text className="text-[#62748E] font-poppins text-base">
                  {item.label}
                </Text>
                <View className="flex-row items-center">
                  {item.showCopy && (
                    <TouchableOpacity
                      onPress={() => {}}
                      activeOpacity={0.8}
                      className="mr-2 rounded-full p-1.5 bg-white/70">
                      <ClipboardCopyIcon />
                    </TouchableOpacity>
                  )}
                  <Text className="text-[#272B35] font-poppins text-base">
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}

            <View className="flex-row items-center justify-between">
              <Text className="text-[#1D293D] font-poppinsSemiBold text-base">
                Total Paid
              </Text>
              <Text className="text-[#1D293D] font-poppinsBold text-base mt-1">
                ₹{formatCurrency(totalPaidAmount)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 bg-[#FEF8EF]">
        <GradientButton
          title="View My Orders"
          onPress={() => {}}
          containerStyle="mb-4"
          icon={false}
        />
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleGoHome}
          className="rounded-[10px] border border-[#62748E] py-4 items-center">
          <Text className="text-[#62748E] font-poppinsMedium text-base">
            Go Homepage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingSuccess;
