import React, {useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {ArrowLeft02Icon} from 'hugeicons-react-native';
import GradientButton from '../../components/Buttons/GradientButton';
import {
  SessionDurationIcon,
  BookingDateIcon,
  SessionModeIcon,
  ZoomMeetingIcon,
  UserCircleIcon,
  MailOutlineIcon,
  PhoneOutlineIcon,
  RupeeCircleIcon,
} from '../../utils/svgIcons';

const DEFAULT_DURATION = '30-60 minutes';
const DEFAULT_MODE = 'Consult Online';

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
    const formatted = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numeric);
    return formatted;
  }

  const fixed = numeric.toFixed(2);
  const [whole, fractionalRaw] = fixed.split('.');
  const fractional = (fractionalRaw ?? '').padEnd(2, '0');
  const lastThree = whole.slice(-3);
  const otherNumbers = whole.slice(0, -3);
  const formattedWhole =
    otherNumbers !== ''
      ? `${otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${lastThree}`
      : lastThree;

  return `${formattedWhole}.${fractional}`;
};

const formatTimeRange = (slotDetail, fallback = '') => {
  const timeRange =
    slotDetail?.time ??
    (slotDetail?.display_time && slotDetail?.display_end_time
      ? `${slotDetail.display_time} - ${slotDetail.display_end_time}`
      : fallback);

  if (!timeRange) {
    return '';
  }

  const [start = '', end = ''] = timeRange.split('-').map(part => part.trim());
  if (!start || !end) {
    return timeRange;
  }

  const startFormatted = moment(start, ['HH:mm', 'h:mm A']).format('h:mm A');
  const endFormatted = moment(end, ['HH:mm', 'h:mm A']).format('h:mm A');

  if (startFormatted === 'Invalid date' || endFormatted === 'Invalid date') {
    return timeRange;
  }

  return `${startFormatted.replace(':00', '')} - ${endFormatted.replace(
    ':00',
    '',
  )}`;
};

const InfoRow = ({icon, label, value}) => {
  if (!value) {
    return null;
  }

  return (
    <View className="flex-row items-start mb-3.5">
      <View className="mr-3.5 items-center justify-center">{icon}</View>
      <View className="flex-1">
        <Text className="font-poppins text-[15px] text-[#1D293D]">
          <Text className="font-poppins text-[15px] text-[#62748E]">
            {label}
          </Text>
          <Text className="font-poppins text-[15px] text-[#62748E]">{': '}</Text>
          <Text className="font-poppins text-[15px] text-[#1D293D]">
            {value}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const BookingSummary = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {top, bottom} = useSafeAreaInsets();

  const bookingDetails = route.params?.bookingDetails ?? {};
  const service = bookingDetails.service ?? {};

  const serviceTypeName =
    bookingDetails?.serviceTypeDetail?.name ??
    bookingDetails?.serviceTypeDetail?.label ??
    service?.title ??
    '';

  const sessionDuration =
    service?.sessionDuration ?? bookingDetails?.sessionDuration ?? DEFAULT_DURATION;

  const modeLabel =
    bookingDetails?.modeDetail?.label ?? bookingDetails?.serviceModeLabel ?? DEFAULT_MODE;

  const formattedDate = useMemo(() => {
    if (!bookingDetails?.date) {
      return '';
    }

    return moment(bookingDetails.date, 'YYYY-MM-DD').format('Do MMM, YYYY');
  }, [bookingDetails?.date]);

  const formattedTime = useMemo(() => {
    return formatTimeRange(
      bookingDetails?.timeSlotDetail,
      bookingDetails?.timeSlot,
    );
  }, [bookingDetails?.timeSlot, bookingDetails?.timeSlotDetail]);

  const dateTimeLabel = [formattedDate, formattedTime]
    .filter(Boolean)
    .join(' / ');

  const meetingLink =
    bookingDetails?.meetingLink ??
    bookingDetails?.modeDetail?.meetingUrl ??
    service?.meetingUrl ??
    bookingDetails?.astrologerDetail?.meetingUrl ??
    '';

  const serviceFee = useMemo(() => {
    const primary =
      parseAmount(service?.price) ??
      parseAmount(service?.amount) ??
      parseAmount(bookingDetails?.serviceFee);
    return primary ?? 5999;
  }, [bookingDetails?.serviceFee, service?.amount, service?.price]);

  const gstRate = bookingDetails?.gstRate ?? 0.18;
  const gstAmount = useMemo(() => {
    return Number((serviceFee * gstRate).toFixed(2));
  }, [gstRate, serviceFee]);
  const totalAmount = useMemo(() => {
    return Number((serviceFee + gstAmount).toFixed(2));
  }, [serviceFee, gstAmount]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    navigation.navigate('BookingSuccess', {bookingDetails});
  };

  const userDetails = [
    {
      label: 'Name',
      value: bookingDetails?.fullName,
      icon: <UserCircleIcon size={21} stroke="#1D293D" />,
    },
    {
      label: 'Email Address',
      value: bookingDetails?.email,
      icon: <MailOutlineIcon size={22} stroke="#1D293D" />,
    },
    {
      label: 'Phone Number',
      value: bookingDetails?.phoneNumber,
      icon: <PhoneOutlineIcon size={21} stroke="#1D293D" />,
    },
  ];

  return (
    <View className="flex-1 bg-[#FEF8EF]">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={{paddingTop: top + 12, flex: 1}}>
        <View className="flex-row items-center px-5 mb-6">
          <TouchableOpacity
            onPress={handleGoBack}
            activeOpacity={0.85}
            className="w-12 h-12 rounded-[10px] border border-[#00000026] bg-white items-center justify-center mr-3">
            <ArrowLeft02Icon size={20} color="#1D293D" />
          </TouchableOpacity>
          <Text className="text-[#1D293D] font-poppinsMedium text-[18px]">
            Book a service
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: bottom + 24}}>
          <View className="px-5">
            <View
              className="bg-white rounded-[10px] px-5 py-[22px]"
              style={styles.cardShadow}>
              <Text className="font-poppinsSemiBold text-[18px] text-[#1D293D] mb-4">
                Service Type:{' '}
                <Text className="text-[#FF8835]">{serviceTypeName}</Text>
              </Text>

              <InfoRow
                icon={<SessionDurationIcon size={24} stroke="#1D293D" />}
                label="Session Duration"
                value={sessionDuration}
              />
              <InfoRow
                icon={<BookingDateIcon size={24} stroke="#1D293D" />}
                label="Date"
                value={dateTimeLabel}
              />
              <InfoRow
                icon={<SessionModeIcon size={24} stroke="#1D293D" />}
                label="Mode"
                value={modeLabel}
              />
              <InfoRow
                icon={<ZoomMeetingIcon size={24} stroke="#1D293D" />}
                label="zoommtg"
                value={meetingLink || 'Not provided'}
              />
            </View>

            <View className="mt-5">
              <Text className="font-poppinsSemiBold text-[16px] text-[#1D293D] mb-3">
                User Details:
              </Text>
              <View className="mt-1">
                {userDetails.map(detail => (
                  <View
                    key={detail.label}
                    className="flex-row items-center mb-2.5">
                    <View className="mr-3.5 items-center justify-center">
                      {detail.icon}
                    </View>
                    <View className="flex-1">
                      <Text className="font-poppins text-[14px] text-[#62748E]">
                        <Text className="font-poppins text-[14px] text-[#62748E]">
                          {detail.label}
                        </Text>
                        <Text className="font-poppins text-[14px] text-[#62748E]">
                          {': '}
                        </Text>
                        <Text className="font-poppins text-[14px] text-[#1D293D]">
                          {detail.value || 'Not provided'}
                        </Text>
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View
        className="bg-[#FFF4E0] px-5"
        style={{paddingBottom: bottom + 16}}>
        <View
          className="bg-white rounded-[10px] p-4 my-4"
          style={styles.cardShadow}>
          <View className="flex-row items-center justify-between mb-2">
            <Text className="font-poppins text-base text-[#1D293D]">
              Service Fee
            </Text>
            <View className="flex-row items-center">
              <RupeeCircleIcon size={17} fill="#62748E" />
              <Text className="font-poppins text-base text-[#1D293D] ml-1.5">
                {formatCurrency(serviceFee)}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between mb-2">
            <Text className="font-poppins text-base text-[#1D293D]">
              GST (18%)
            </Text>
            <View className="flex-row items-center">
              <RupeeCircleIcon size={17} fill="#62748E" />
              <Text className="font-poppins text-base text-[#1D293D] ml-1.5">
                {formatCurrency(gstAmount)}
              </Text>
            </View>
          </View>
          <View className="h-[1px] bg-[#F0DCC5] my-3" />
          <View className="flex-row items-center justify-between">
            <Text className="font-poppinsSemiBold text-base text-[#1D293D]">
              Total:
            </Text>
            <View className="flex-row items-center">
              <RupeeCircleIcon size={17} />
              <Text className="font-poppinsBold text-base text-[#1D293D] ml-1.5">
                {formatCurrency(totalAmount)}
              </Text>
            </View>
          </View>
        </View>
        <GradientButton
          title="Continue to Pay"
          onPress={handleContinue}
          showIcon={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8},
    elevation: 6,
  },
});

export default BookingSummary;
