import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg';
import {ArrowLeft02Icon} from 'hugeicons-react-native';
import GradientButton from '../../components/Buttons/GradientButton';
import CouponCard from '../../components/Cards/CouponCard';
import CouponSelectionSheet from '../../components/BottomSheet/CouponSelectionSheet';
import {
  bookService,
  getCartData,
  removeFromCartService,
  getCoupons,
  applyCoupons,
} from '../../services/api';
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

const getCouponSavingLabel = coupon => {
  if (!coupon) {
    return '';
  }
  if (coupon.discountIn === 'percent') {
    return `${coupon.discount ?? 0}%`;
  }
  return `₹${coupon.discount ?? 0}`;
};
const showToastMessage = message => {
  if (!message) {
    return;
  }
  if (Platform.OS === 'android' && ToastAndroid?.show) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
    return;
  }
  Alert.alert('Notice', message);
};

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

const formatFullName = (firstName, lastName) =>
  [firstName, lastName].filter(Boolean).join(' ').trim();

const formatAddressLine = address => {
  if (!address) {
    return '';
  }

  const parts = [
    address?.address,
    address?.city,
    address?.state,
    address?.country,
  ]
    .map(part => (part ? String(part).trim() : ''))
    .filter(Boolean);

  const base = parts.join(', ');
  if (!address?.postalCode) {
    return base;
  }

  if (!base) {
    return String(address.postalCode);
  }

  return `${base} - ${address.postalCode}`;
};

const splitFullName = fullName => {
  const trimmed =
    typeof fullName === 'string'
      ? fullName.trim().replace(/\s+/g, ' ')
      : '';

  if (!trimmed) {
    return {firstName: '', lastName: ''};
  }

  const parts = trimmed.split(' ');
  if (parts.length === 1) {
    return {firstName: parts[0], lastName: ''};
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
};

const normaliseStartTime = value => {
  if (typeof value !== 'string') {
    return '';
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }
  if (trimmed.includes('-')) {
    const [startPart] = trimmed.split('-');
    const candidate = startPart ? startPart.trim() : '';
    return candidate || '';
  }
  return trimmed;
};

const normaliseEndTime = value => {
  if (typeof value !== 'string') {
    return '';
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }
  if (trimmed.includes('-')) {
    const parts = trimmed.split('-');
    const endPart = parts[1] ? parts[1].trim() : '';
    return endPart || '';
  }
  return trimmed;
};

const DeleteIcon = ({size = 20, color = '#FF4D4F'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 6h14"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Path
      d="M10 10v6"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Path
      d="M14 10v6"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Path
      d="M7 6v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Path
      d="M9 6V4h6v2"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const formatCartTimeWindow = (startTime, endTime) => {
  const start = startTime
    ? moment(startTime, ['HH:mm', 'HH:mm:ss', 'h:mm A'])
    : null;
  const end = endTime
    ? moment(endTime, ['HH:mm', 'HH:mm:ss', 'h:mm A'])
    : null;

  if (start && start.isValid() && end && end.isValid()) {
    return `${start.format('HH:mm')} - ${end.format('HH:mm')}`;
  }

  if (start && start.isValid()) {
    return start.format('HH:mm');
  }

  return '';
};

const formatCartDateTimeLabel = (dateValue, startTime, endTime) => {
  const dateLabel = dateValue
    ? moment(dateValue, ['YYYY-MM-DD', moment.ISO_8601]).format('YYYY-MM-DD')
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

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartGrandTotal, setCartGrandTotal] = useState(null);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cartError, setCartError] = useState('');
  const [cartActionLoading, setCartActionLoading] = useState(false);
  const [isCouponSheetVisible, setCouponSheetVisible] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState('');
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponList, setCouponList] = useState([]);
  const [couponError, setCouponError] = useState('');
  const [couponApplySummary, setCouponApplySummary] = useState(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const bookingDetails = route.params?.bookingDetails ?? {};
  const bookingResponse = route.params?.bookingResponse ?? {};
  const bookingRequest = route.params?.bookingRequest ?? {};
  const service = bookingDetails.service ?? {};
  const addressDetail = bookingDetails?.addressDetail ?? null;
  const bookingFullName = formatFullName(
    bookingDetails?.firstName,
    bookingDetails?.lastName,
  ) || bookingDetails?.fullName || '';

  const availableCoupons = useMemo(() => {
    if (couponList.length > 0) {
      return couponList;
    }
    return [];
  }, [couponList]);

  const selectedCoupon = useMemo(() => {
    if (!selectedCouponId) {
      return null;
    }
    return (
      availableCoupons.find(coupon => {
        const couponIdentifier =
          coupon?._id ?? coupon?.id ?? coupon?.couponCode ?? '';
        return couponIdentifier === selectedCouponId;
      }) ?? null
    );
  }, [availableCoupons, selectedCouponId]);

  const appliedCouponSavingsLabel = useMemo(() => {
    if (couponApplySummary?.discountAmount) {
      return `₹${couponApplySummary.discountAmount}`;
    }
    if (couponApplySummary?.discountValue) {
      return `${couponApplySummary.discountValue}${
        couponApplySummary.discountIn === 'percent' ? '%' : ''
      }`;
    }
    return getCouponSavingLabel(appliedCoupon);
  }, [appliedCoupon, couponApplySummary]);

  const couponCardSubtitle = useMemo(() => {
    if (appliedCoupon && appliedCouponSavingsLabel) {
      return `${appliedCoupon.couponCode ?? 'Coupon'} applied • Save ${appliedCouponSavingsLabel}`;
    }
    if (couponList.length === 0) {
      return 'No coupons available right now';
    }
    return 'Apply a coupon to save more on this booking';
  }, [appliedCoupon, appliedCouponSavingsLabel, couponList.length]);

  useEffect(() => {
    if (isCouponSheetVisible && appliedCoupon) {
      const appliedId =
        appliedCoupon._id ??
        appliedCoupon.id ??
        appliedCoupon.couponCode ??
        '';
      setSelectedCouponId(appliedId);
      setCouponCodeInput(appliedCoupon.couponCode ?? '');
    }
  }, [appliedCoupon, isCouponSheetVisible]);

  useEffect(() => {
    let isMounted = true;
    setIsCartLoading(true);
    setCartError('');
    getCartData()
      .then(response => {
        if (!isMounted) {
          return;
        }
        console.log("response: ", response);
        
        const payload = response?.data ?? {};
        const items = Array.isArray(payload?.items) ? payload.items : [];
        setCartItems(items);
        setCartGrandTotal(
          payload?.grandtotal != null ? Number(payload.grandtotal) : null,
        );
      })
      .catch(error => {
        console.log('Failed to fetch cart data', error);
        if (isMounted) {
          setCartError('Unable to load cart details. Please try again.');
          setCartItems([]);
          setCartGrandTotal(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsCartLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    setCouponError('');
    getCoupons('services')
      .then(response => {
        if (!isActive) {
          return;
        }
        const payload = response?.data ?? response;
        const couponsArray = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
          ? payload.data
          : [];
        setCouponList(couponsArray);
      })
      .catch(error => {
        console.log('Failed to fetch coupons', error);
        if (isActive) {
          setCouponError('Unable to load coupons.');
          setCouponList([]);
        }
      });
    return () => {
      isActive = false;
    };
  }, []);

  const responseItems = cartItems.length > 0
    ? cartItems
    : Array.isArray(bookingResponse?.items)
    ? bookingResponse.items
    : [];

  const serviceTypeName =
    responseItems[responseItems.length - 1]?.name ??
    bookingDetails?.serviceTypeDetail?.name ??
    bookingDetails?.serviceTypeDetail?.label ??
    bookingDetails?.serviceTypeLabel ??
    service?.title ??
    '';

  const sessionDuration =
    service?.sessionDuration ?? bookingDetails?.sessionDuration ?? DEFAULT_DURATION;

  const modeLabel =
    bookingDetails?.modeDetail?.label ??
    bookingDetails?.serviceModeLabel ??
    DEFAULT_MODE;

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

  const bookedServiceItem = useMemo(() => {
    if (responseItems.length === 0) {
      return null;
    }

    const normalise = value => {
      if (value === undefined || value === null) {
        return '';
      }
      return String(value).trim();
    };

    const candidateIds = [
      bookingRequest?.serviceId,
      service?._id ?? service?.id,
      bookingDetails?.serviceTypeDetail?._id ??
        bookingDetails?.serviceTypeDetail?.id,
    ]
      .map(normalise)
      .filter(Boolean);

    if (candidateIds.length > 0) {
      const foundItem = responseItems.find(item =>
        candidateIds.includes(normalise(item?.serviceId)),
      );
      if (foundItem) {
        return foundItem;
      }
    }

    return responseItems[responseItems.length - 1] ?? null;
  }, [bookingRequest?.serviceId, bookingDetails?.serviceTypeDetail, responseItems, service?._id, service?.id]);

  const meetingLink =
    bookingDetails?.meetingLink ??
    bookingDetails?.modeDetail?.meetingUrl ??
    service?.meetingUrl ??
    bookingDetails?.astrologerDetail?.meetingUrl ??
    '';

  const cartDisplayItems = useMemo(() => {
    return responseItems.map((item, index) => {
      const durationLabel =
        calculateDurationLabel(item?.startTime, item?.endTime) ||
        bookingDetails?.service?.sessionDuration ||
        bookingDetails?.sessionDuration ||
        '';

      const modeLabel =
        item?.serviceMode ??
        bookingDetails?.modeDetail?.label ??
        bookingDetails?.serviceModeLabel ??
        '';

      const astrologerName =
        item?.astrologer?.fullName ??
        bookingDetails?.astrologerName ??
        bookingDetails?.astrologerDetail?.name ??
        bookingDetails?.astrologerDetail?.label ??
        '';

      return {
        key: item?._id ?? `${index}`,
        name: item?.name ?? service?.title ?? 'Service',
        durationLabel,
        dateTimeLabel: formatCartDateTimeLabel(
          item?.date,
          item?.startTime,
          item?.endTime,
        ),
        modeLabel,
        astrologerName,
        raw: item,
      };
    });
  }, [
    bookingDetails?.astrologerDetail,
    bookingDetails?.astrologerName,
    bookingDetails?.modeDetail?.label,
    bookingDetails?.service,
    bookingDetails?.serviceModeLabel,
    bookingDetails?.sessionDuration,
    responseItems,
    service?.title,
  ]);

  const serviceFee = useMemo(() => {
    if (responseItems.length > 0) {
      const sum = responseItems.reduce((acc, item) => {
        const amount =
          parseAmount(item?.totalPrice) ??
          parseAmount(item?.originalPrice);
        return acc + (amount ?? 0);
      }, 0);
      if (sum > 0) {
        return Number(sum.toFixed(2));
      }
    }
    const primary =
      parseAmount(bookedServiceItem?.totalPrice) ??
      parseAmount(bookedServiceItem?.originalPrice) ??
      parseAmount(service?.price) ??
      parseAmount(service?.amount) ??
      parseAmount(bookingDetails?.serviceFee);
    return primary ?? 0;
  }, [
    bookedServiceItem?.originalPrice,
    bookedServiceItem?.totalPrice,
    bookingDetails?.serviceFee,
    responseItems,
    service?.amount,
    service?.price,
  ]);

  const gstRate = bookingDetails?.gstRate ?? 0.18;
  const responseGrandTotal = useMemo(() => {
    if (cartGrandTotal != null) {
      return Number(cartGrandTotal);
    }
    return parseAmount(
      bookingResponse?.grandtotal ?? bookingResponse?.grandTotal,
    );
  }, [cartGrandTotal, bookingResponse?.grandTotal, bookingResponse?.grandtotal]);

  const gstAmount = useMemo(() => {
    if (responseGrandTotal !== null) {
      const diff = Number((responseGrandTotal - serviceFee).toFixed(2));
      return diff > 0 ? diff : 0;
    }
    return Number((serviceFee * gstRate).toFixed(2));
  }, [gstRate, responseGrandTotal, serviceFee]);

  const totalAmount = useMemo(() => {
    if (responseGrandTotal !== null) {
      return responseGrandTotal;
    }
    return Number((serviceFee + gstAmount).toFixed(2));
  }, [gstAmount, responseGrandTotal, serviceFee]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleRemoveItem = useCallback(
    async itemId => {
      const trimmedId =
        typeof itemId === 'string' ? itemId.trim() : String(itemId || '');
      if (!trimmedId) {
        showToastMessage('Unable to identify cart item.');
        return;
      }
      if (cartActionLoading) {
        return;
      }

      setCartActionLoading(true);
      try {
        const removalResponse = await removeFromCartService({itemId: trimmedId});
        setCartError('');
        const updatedPayload = removalResponse?.data ?? removalResponse ?? {};
        const updatedItems = Array.isArray(updatedPayload?.items)
          ? updatedPayload.items
          : [];
        if (updatedItems.length > 0) {
          setCartItems(updatedItems);
          setCartGrandTotal(
            updatedPayload?.grandtotal != null
              ? Number(updatedPayload.grandtotal)
              : cartGrandTotal,
          );
        } else {
          setCartItems(prev => prev.filter(item => item?._id !== trimmedId));
          if (updatedPayload?.grandtotal != null) {
            setCartGrandTotal(Number(updatedPayload.grandtotal));
          }
        }
        showToastMessage('Item removed from cart.');
      } catch (error) {
        console.log('Failed to remove cart item', error);
        showToastMessage('Unable to remove item. Please try again.');
      } finally {
        setCartActionLoading(false);
      }
    },
    [cartActionLoading, cartGrandTotal],
  );

  const handleContinue = useCallback(async () => {
    if (isPlacingOrder) {
      return;
    }
    console.log("cartData : ");
    

    const sanitize = value =>
      value !== undefined && value !== null ? String(value).trim() : '';

    const firstCartItem = responseItems.length > 0 ? responseItems[0] : null;
    const namesFromFullName = splitFullName(bookingDetails?.fullName);
    const fallbackFirstName =
      sanitize(bookingRequest?.firstName) ||
      sanitize(bookingDetails?.firstName) ||
      sanitize(firstCartItem?.cust?.firstName) ||
      sanitize(namesFromFullName.firstName);
    const fallbackLastName =
      sanitize(bookingRequest?.lastName) ||
      sanitize(bookingDetails?.lastName) ||
      sanitize(firstCartItem?.cust?.lastName) ||
      sanitize(namesFromFullName.lastName);
    const fallbackEmail =
      sanitize(bookingDetails?.email) ||
      sanitize(bookingRequest?.email) ||
      sanitize(firstCartItem?.cust?.email);
    const fallbackPhone =
      sanitize(bookingDetails?.phoneNumber) ||
      sanitize(bookingRequest?.phone) ||
      sanitize(firstCartItem?.cust?.phone);
    const fallbackAddress =
      sanitize(bookingRequest?.address) ||
      (bookingDetails?.addressDetail?._id != null
        ? sanitize(bookingDetails.addressDetail._id)
        : '') ||
      sanitize(firstCartItem?.address);
    const fallbackServiceId =
      sanitize(bookingRequest?.serviceId) ||
      sanitize(bookedServiceItem?.serviceId) ||
      sanitize(firstCartItem?.serviceId ?? firstCartItem?.service);
    const fallbackServiceType =
      sanitize(bookingRequest?.serviceMode) ||
      sanitize(bookedServiceItem?.serviceMode) ||
      sanitize(firstCartItem?.serviceMode);
    const fallbackAstrologer =
      sanitize(bookingRequest?.astrologer) ||
      sanitize(bookedServiceItem?.astrologer?._id) ||
      sanitize(firstCartItem?.astrologer?._id ?? firstCartItem?.astrologer);
    const fallbackDate =
      sanitize(bookingRequest?.date) ||
      sanitize(bookingDetails?.date) ||
      sanitize(firstCartItem?.date);
    const fallbackStartTime = normaliseStartTime(
      bookingRequest?.startTime ??
        bookingDetails?.timeSlotDetail?.display_time ??
        bookingDetails?.timeSlot ??
        firstCartItem?.startTime ??
        '',
    );
    const fallbackEndTime = normaliseEndTime(
      bookingRequest?.endTime ??
        bookingDetails?.timeSlotDetail?.display_end_time ??
        bookingDetails?.timeSlotDetail?.service_end_time ??
        bookingDetails?.timeSlot ??
        firstCartItem?.endTime ??
        '',
    );
    const fallbackBookingType =
      sanitize(bookingRequest?.bookingType) ||
      sanitize(firstCartItem?.bookingType) ||
      fallbackServiceType;

    const paymentType = 'UPI' ||
      sanitize(bookingDetails?.paymentType) ||
      sanitize(bookingRequest?.paymentType) ||
      sanitize(firstCartItem?.paymentType) ||
      sanitize(firstCartItem?.serviceMode);
    let paymentId =
      sanitize(bookingDetails?.paymentId) ||
      sanitize(bookingRequest?.paymentId) ||
      sanitize(firstCartItem?.paymentId);
    if (!paymentId) {
      paymentId = `COD-${moment().format('YYYYMMDDHHmmss')}`;
    }
    const paymentNote = 'Cash will be collected at time of service';

    const normalizedServiceItems =
      responseItems.length > 0
        ? responseItems.map(item => {
            const customer = item?.cust ?? {};
            return {
      serviceId:
        sanitize(item?.serviceId ?? item?.service) || fallbackServiceId,
      serviceType:
        sanitize(item?.serviceMode) || fallbackServiceType,
      astrologerId:
        sanitize(item?.astrologer?._id ?? item?.astrologer) ||
        fallbackAstrologer,
              bookingDate: sanitize(item?.date) || fallbackDate,
              startTime: normaliseStartTime(
                item?.startTime ?? fallbackStartTime,
              ),
              endTime: normaliseEndTime(item?.endTime ?? fallbackEndTime),
              firstName:
                sanitize(customer?.firstName) || fallbackFirstName,
              lastName: sanitize(customer?.lastName) || fallbackLastName,
              email: sanitize(customer?.email) || fallbackEmail,
              phone: sanitize(customer?.phone) || fallbackPhone,
              address: sanitize(item?.address) || fallbackAddress,
              bookingType:
                sanitize(item?.bookingType ?? item?.serviceMode) ||
                fallbackBookingType,
              quantity:
                Number(item?.quantity) > 0 ? Number(item.quantity) : 1,
            };
          })
        : [
            {
              serviceId: fallbackServiceId,
              serviceType: fallbackServiceType,
              astrologerId: fallbackAstrologer,
              bookingDate: fallbackDate,
              startTime: fallbackStartTime,
              endTime: fallbackEndTime,
              firstName: fallbackFirstName,
              lastName: fallbackLastName,
              email: fallbackEmail,
              phone: fallbackPhone,
              address: fallbackAddress,
              bookingType: fallbackBookingType,
              quantity: 1,
            },
          ];

    const validations = [
      {value: paymentType, message: 'Payment type is missing.'},
      {value: paymentId, message: 'Payment ID is missing.'},
      {value: paymentNote, message: 'Payment note is missing.'},
    ];

    const missingValidation = validations.find(item => item.value === '');
    if (missingValidation) {
      setOrderError('');
      showToastMessage(missingValidation.message);
      return;
    }

    const hasInvalidService = normalizedServiceItems.some(item => {
      return (
        !item.serviceId ||
        !item.serviceType ||
        !item.astrologerId ||
        !item.bookingDate ||
        !item.startTime ||
        !item.endTime ||
        !item.firstName ||
        !item.lastName ||
        !item.email ||
        !item.phone ||
        !item.address ||
        !item.bookingType
      );
    });

    if (hasInvalidService) {
      setOrderError('');
      showToastMessage(
        'Cart item details are incomplete. Please review your selections.',
      );
      return;
    }

    const serviceItems = normalizedServiceItems;

    const orderPayload = {
      paymentType,
      paymentId,
      paymentDetails: {
        note: paymentNote,
      },
      serviceItems,
    };
    if (appliedCoupon) {
      const couponId =
        appliedCoupon._id ?? appliedCoupon.id ?? appliedCoupon.couponId;
      if (couponId) {
        orderPayload.couponId = couponId;
      }
    }

    setOrderError('');
    setIsPlacingOrder(true);
    console.log("KLKLKL : ", orderPayload);
    

    try {
      const orderResponse = await bookService(orderPayload);
      console.log("order",orderResponse);
      
      navigation.navigate('BookingSuccess', {
        bookingDetails,
        bookingResponse,
        bookingRequest,
        bookedServiceItem,
        pricingSummary: {
          serviceFee,
          gstAmount,
          totalAmount,
        },
        orderResponse,
        orderRequest: orderPayload,
      });
    } catch (error) {
      console.log('Order placement failed', error);
      const apiMessage =
        error?.response?.data?.message ??
        error?.response?.data?.error ??
        error?.message;
      setOrderError(apiMessage);
      showToastMessage(apiMessage);
    } finally {
      setIsPlacingOrder(false);
    }
  }, [
    bookedServiceItem,
    bookingDetails,
    bookingRequest,
    bookingResponse,
    gstAmount,
    isPlacingOrder,
    navigation,
    responseItems,
    serviceFee,
    totalAmount,
  ]);

  const userDetails = [
    {
      label: 'Name',
      value: bookingFullName,
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

  const addressName = useMemo(() => {
    if (!addressDetail) {
      return '';
    }
    const composed = formatFullName(
      addressDetail?.firstName,
      addressDetail?.lastName,
    );
    if (composed) {
      return composed;
    }
    if (addressDetail?.addressType) {
      const raw = String(addressDetail.addressType);
      return raw.charAt(0).toUpperCase() + raw.slice(1);
    }
    return 'Saved Address';
  }, [addressDetail]);

  const formattedAddress = useMemo(
    () => formatAddressLine(addressDetail),
    [addressDetail],
  );

  const handleCouponPress = useCallback(() => {
    setCouponSheetVisible(true);
  }, []);

  const handleCouponSheetClose = useCallback(() => {
    setCouponSheetVisible(false);
  }, []);

  const handleCouponCodeChange = useCallback(value => {
    setCouponCodeInput((value ?? '').toUpperCase());
  }, []);

  const handleSelectCoupon = useCallback(coupon => {
    if (!coupon) {
      return;
    }
    const identifier = coupon._id ?? coupon.id ?? coupon.couponCode ?? '';
    setSelectedCouponId(identifier);
    setCouponCodeInput(coupon.couponCode ? coupon.couponCode.toUpperCase() : '');
  }, []);

  const handleCheckCouponCode = useCallback(() => {
    const trimmedCode = (couponCodeInput || '').trim();
    if (!trimmedCode) {
      showToastMessage('Enter a coupon code to check.');
      return;
    }
    const normalized = trimmedCode.toUpperCase();
    const matchedCoupon =
      availableCoupons.find(coupon => {
        const code = (coupon?.couponCode || '').toUpperCase();
        return code === normalized;
      }) ?? null;
    if (matchedCoupon) {
      const identifier =
        matchedCoupon._id ??
        matchedCoupon.id ??
        matchedCoupon.couponCode ??
        normalized;
      setSelectedCouponId(identifier);
      showToastMessage('Coupon found. Tap apply to continue.');
      return;
    }
    showToastMessage('Coupon not found for this booking.');
  }, [availableCoupons, couponCodeInput]);

  const handleApplyCoupon = useCallback(() => {
    if (!selectedCoupon) {
      showToastMessage('Please select a coupon to apply.');
      return;
    }
    const servicesPayload = cartItems.length
      ? cartItems
          .map(item => item?.serviceId ?? item?.raw?.serviceId)
          .filter(Boolean)
      : bookingRequest?.serviceId
      ? [bookingRequest.serviceId]
      : bookedServiceItem?.serviceId
      ? [bookedServiceItem.serviceId]
      : [];
    if (servicesPayload.length === 0) {
      showToastMessage('Unable to identify services for applying coupon.');
      return;
    }
    setIsApplyingCoupon(true);
    const payload = {
      couponCode: selectedCoupon.couponCode ?? selectedCoupon.code ?? '',
      services: servicesPayload,
    };
    applyCoupons(payload)
      .then(response => {
        const summary =
          response?.data ??
          response?.couponInfo ??
          response ?? {};
        setCouponApplySummary(summary);
        setAppliedCoupon(selectedCoupon);
        setCouponSheetVisible(false);
        showToastMessage(
          response?.message ??
            `${selectedCoupon.couponCode ?? 'Coupon'} applied successfully.`,
        );
      })
      .catch(error => {
        console.log('Failed to apply coupon', error);
        const message =
          error?.response?.data?.message ??
          error?.response?.data?.error ??
          'Unable to apply coupon.';
        showToastMessage(message);
      })
      .finally(() => {
        setIsApplyingCoupon(false);
      });
  }, [
    bookedServiceItem?.serviceId,
    bookingRequest?.serviceId,
    cartItems,
    selectedCoupon,
  ]);

  const handleRemoveAppliedCoupon = useCallback(() => {
    if (!appliedCoupon) {
      return;
    }
    setAppliedCoupon(null);
    setCouponApplySummary(null);
    setSelectedCouponId('');
    setCouponCodeInput('');
    showToastMessage('Coupon removed.');
  }, [appliedCoupon]);

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
            <View>
              {isCartLoading ? (
                <Text className="font-poppins text-sm text-[#64748B] mb-4">
                  Loading cart items...
                </Text>
              ) : null}
              {cartError ? (
                <Text className="font-poppins text-sm text-primary2 mb-4">
                  {cartError}
                </Text>
              ) : null}

              {cartDisplayItems.length > 0 ? (
                cartDisplayItems.map(item => (
                  <View
                    key={item.key}
                    className="bg-[#FFFFFF] rounded-[14px] px-5 py-5 mb-4"
                    style={styles.cartCardShadow}>
                    <View className="flex-row items-start justify-between mb-3">
                      <Text className="font-poppinsSemiBold text-[16px] text-[#1D293D]">
                        Service Type:{' '}
                        <Text className="text-[#FF8835]">{item.name}</Text>
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleRemoveItem(item.raw?._id ?? item.key)}
                        activeOpacity={cartActionLoading ? 1 : 0.7}
                        disabled={cartActionLoading}>
                        <DeleteIcon
                          size={20}
                          color={cartActionLoading ? '#CBD5E1' : '#FF4D4F'}
                        />
                      </TouchableOpacity>
                    </View>

                    <InfoRow
                      icon={<SessionDurationIcon size={22} stroke="#1D293D" />}
                      label="Session"
                      value={item.durationLabel}
                    />
                    <InfoRow
                      icon={<BookingDateIcon size={22} stroke="#1D293D" />}
                      label="Date"
                      value={item.dateTimeLabel}
                    />
                    <InfoRow
                      icon={<SessionModeIcon size={22} stroke="#1D293D" />}
                      label="Mode"
                      value={item.modeLabel}
                    />
                    <InfoRow
                      icon={<UserCircleIcon size={22} stroke="#1D293D" />}
                      label="Astrologer"
                      value={
                        item.astrologerName
                          ? `${item.astrologerName} (Astrologer)`
                          : ''
                      }
                    />
                  </View>
                ))
              ) : (
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
              )}
            </View>

            <View className="mt-2">
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

            {appliedCoupon ? (
              <View className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-[10px] px-4 py-4 mt-1">
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center">
                    <View className="w-5 h-5 rounded-[5px] bg-[#22C55E] items-center justify-center mr-3">
                      <Text className="text-white text-xs font-poppinsSemiBold">
                        ✓
                      </Text>
                    </View>
                    <Text className="font-poppinsSemiBold text-[15px] text-[#065F46]">
                      {appliedCoupon.couponCode ?? 'Coupon'} Applied
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={handleRemoveAppliedCoupon}
                    hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
                    <Text className="text-[#0F172A] text-base font-poppinsSemiBold">
                      ×
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text className="font-poppins text-[13px] text-[#047857]">
                  Enjoy {appliedCouponSavingsLabel || 'extra savings'} on this booking.
                </Text>
                <TouchableOpacity
                  onPress={handleCouponPress}
                  className="mt-3"
                  activeOpacity={0.85}>
                  <Text className="font-poppinsSemiBold text-[13px] text-[#065F46] underline">
                    Change Coupon
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <CouponCard
                className="mt-1"
                subtitle={couponCardSubtitle}
                ctaLabel="Check Available Coupons"
                onPress={handleCouponPress}
              />
            )}
            {couponError ? (
              <Text className="text-primary2 font-poppins text-xs mt-2">
                {couponError}
              </Text>
            ) : null}

            {addressDetail ? (
              <View className="mt-5">
                <Text className="font-poppinsSemiBold text-[16px] text-[#1D293D] mb-3">
                  Address:
                </Text>
                <View
                  className="bg-white rounded-[10px] border border-[#E4E9F5] px-4 py-3"
                  style={styles.cardShadowLight}>
                  <Text className="font-poppinsSemiBold text-[15px] text-[#1D293D]">
                    {addressName}
                  </Text>
                  {addressDetail?.phoneNumber ? (
                    <Text className="mt-1 font-poppins text-[14px] text-[#475569]">
                      {addressDetail.phoneNumber}
                    </Text>
                  ) : null}
                  {formattedAddress ? (
                    <Text className="mt-1 font-poppins text-[14px] text-[#475569] leading-[20px]">
                      {formattedAddress}
                    </Text>
                  ) : null}
                </View>
              </View>
            ) : null}
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
          title={isPlacingOrder ? 'Processing...' : 'Continue to Pay'}
          onPress={handleContinue}
          showIcon={false}
          disabled={isPlacingOrder}
        />
        {orderError ? (
          <Text className="text-primary2 font-poppins text-xs text-center mt-3">
            {orderError}
          </Text>
        ) : null}
      </View>
      <CouponSelectionSheet
        isVisible={isCouponSheetVisible}
        onClose={handleCouponSheetClose}
        coupons={availableCoupons}
        selectedCouponId={selectedCouponId}
        onSelectCoupon={handleSelectCoupon}
        onApply={handleApplyCoupon}
        couponCode={couponCodeInput}
        onCouponCodeChange={handleCouponCodeChange}
        onCheckCoupon={handleCheckCouponCode}
        isApplyDisabled={!selectedCoupon || isApplyingCoupon}
        isApplying={isApplyingCoupon}
        maxSavingsLabel={appliedCouponSavingsLabel}
      />
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
  cardShadowLight: {
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  cartCardShadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
    elevation: 3,
  },
});

export default BookingSummary;
