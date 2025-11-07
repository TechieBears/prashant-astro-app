import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput as RNTextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import moment from 'moment';
import {ArrowLeft02Icon} from 'hugeicons-react-native';
import {Dropdown} from 'react-native-element-dropdown';
import GradientButton from '../../components/Buttons/GradientButton';
import AddressCard from '../../components/AddressCard';
import {
  CalendarPillIcon,
  NavArrowLeftIcon,
  NavArrowRightIcon,
} from '../../utils/svgIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  getAvailabilityServicesType,
  getAvailabilityAstrologers,
  getAvailabilityTimeSlot,
  getCustomerAddresses,
  addToCartService,
} from '../../services/api';
import DualToggleSwitch from '../../components/Toggle/DualToggleSwitch';

const DAYS_TO_RENDER = 6;

const SERVICE_MODE_OPTIONS = Object.freeze([
  {label: 'Consult Online', value: 'consult_online'},
  {label: 'Consult at Astrologer location', value: 'consult_location'},
  {label: 'Pooja at Home', value: 'pooja_home'},
]);

const SERVICE_MODE_REQUEST_MAP = {
  consult_online: 'online',
  consult_location: 'pandit_center',
  pooja_home: 'home_pooja',
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

const formatFullName = (firstName, lastName) =>
  [firstName, lastName].filter(Boolean).join(' ').trim();

const formatAddressLine = address => {
  if (!address) {
    return '';
  }

  const locationParts = [
    address?.city,
    address?.state,
    address?.country,
  ]
    .map(part => (part ? String(part).trim() : ''))
    .filter(Boolean);

  const baseParts = [
    address?.address ? String(address.address).trim() : '',
    locationParts.join(', '),
  ].filter(Boolean);

  const baseLine = baseParts.join(', ');

  if (!address?.postalCode) {
    return baseLine;
  }

  if (!baseLine) {
    return String(address.postalCode);
  }

  return `${baseLine} - ${address.postalCode}`;
};


const normalizeOptions = (options, fallback = []) => {
  if (Array.isArray(options) && options.length > 0) {
    return options.map((item, index) => {
      if (typeof item === 'string') {
        return {label: item, value: item};
      }

      return {
        label:
          item?.label ?? item?.name ?? item?.title ?? `Option ${index + 1}`,
        value: item?.value ?? item?.id ?? item?.slug ?? `${index}`,
      };
    });
  }

  return fallback;
};

const buildServiceTypeOptions = rawOptions => {
  if (!Array.isArray(rawOptions) || rawOptions.length === 0) {
    return [];
  }

  const serviceSet = new Map();

  rawOptions.forEach(item => {
    const list = Array.isArray(item?.services) ? item.services : [];
    list.forEach(service => {
      if (service?.name && service?._id && !serviceSet.has(service._id)) {
        serviceSet.set(service._id, {
          label: service.name,
          value: service._id,
          meta: {...service, category: item?.name},
        });
      }
    });
  });

  return Array.from(serviceSet.values());
};

const buildAstrologerOptions = rawOptions => {
  if (!Array.isArray(rawOptions) || rawOptions.length === 0) {
    return [
      {
        label: 'Any available astrologer',
        value: 'any',
      },
    ];
  }

  return rawOptions.map((item, index) => {
    const fullName = [item?.profile?.firstName, item?.profile?.lastName]
      .filter(Boolean)
      .join(' ');

    return {
      label: fullName || `Astrologer ${index + 1}`,
      value: item?._id ?? `${index}`,
      meta: item,
    };
  });
};

const normalizeTimeSlots = rawSlots => {
  if (!Array.isArray(rawSlots) || rawSlots.length === 0) {
    return [];
  }

  return rawSlots
    .map((slot, index) => {
      const displayStart =
        slot?.display_time ??
        slot?.startTime ??
        slot?.start ??
        slot?.from ??
        '';
      const displayEnd =
        slot?.display_end_time ??
        slot?.endTime ??
        slot?.end ??
        slot?.to ??
        '';
      const combinedTime = slot?.time
        ? slot.time
        : [displayStart, displayEnd].filter(Boolean).join(' - ');
      const derivedStatus = slot?.status ?? (slot?.booked ? 'unavailable' : 'available');
      const isUnavailable =
        slot?.disabled ?? slot?.booked ?? derivedStatus !== 'available';

      return {
        id: slot?._id ?? `${index}`,
        display_time: displayStart,
        display_end_time: displayEnd,
        service_end_time: slot?.service_end_time ?? displayEnd,
        time: combinedTime,
        booked: slot?.booked ?? false,
        status: derivedStatus,
        disabled: Boolean(isUnavailable),
        raw: slot,
      };
    })
    .filter(slot => slot.time && !slot.disabled);
};

const FormModeDropdown = ({
  control,
  name,
  label,
  placeholder,
  options,
  rules,
  isDisabled = false,
}) => {
  const dropdownRef = useRef(null);
  const hasEnabledOptions = Array.isArray(options)
    ? options.some(option => !option.disabled)
    : false;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange: onFieldChange}, fieldState: {error}}) => (
        <View className="mb-5">
          {label ? (
            <Text className="text-[#1D293D] font-poppinsMedium text-sm mb-2">
              {label}
            </Text>
          ) : null}
          {!hasEnabledOptions ? (
            <Text className="text-[#94A3B8] font-poppins text-xs mb-2">
              No available modes for this service
            </Text>
          ) : null}
          <Dropdown
            ref={dropdownRef}
            data={options}
            labelField="label"
            valueField="value"
            value={value}
            placeholder={
              hasEnabledOptions ? placeholder : 'No modes available'
            }
            disable={isDisabled || !hasEnabledOptions}
            onChange={() => {}}
            confirmSelectItem
            onConfirmSelectItem={item => {
              const isItemDisabled = item?.disabled || item?.disable;
              if (isItemDisabled) {
                return;
              }
              onFieldChange(item.value);
              if (dropdownRef.current?.close) {
                dropdownRef.current.close();
              }
            }}
            style={styles.dropdown}
            selectedTextStyle={styles.selectedText}
            placeholderStyle={styles.placeholderText}
            itemTextStyle={styles.itemText}
            renderItem={item => {
              const isItemDisabled = item?.disabled || item?.disable;
              const pointerSetting = isItemDisabled ? 'none' : 'auto';
              return (
                <View
                  pointerEvents={pointerSetting}
                  className={`px-4 py-[10px] border-b border-[#F2F4F7]${
                    isItemDisabled ? ' bg-[#F9FAFB]' : ''
                  }`}>
                  <Text
                    className={`font-poppins text-base text-[#1D293D]${
                      isItemDisabled ? ' text-[#94A3B8]' : ''
                    }`}>
                    {item.label}
                  </Text>
                  {isItemDisabled ? (
                    <Text className="font-poppins text-xs text-[#CBD5E1] mt-1">
                      Not available
                    </Text>
                  ) : null}
                </View>
              );
            }}
            containerStyle={styles.dropdownContainer}
            activeColor="#F3F4F6"
          />
          {error ? (
            <Text className="text-primary2 font-poppins text-xs mt-1">
              {error.message}
            </Text>
          ) : null}
        </View>
      )}
    />
  );
};

const FormServiceTypeDropdown = ({
  control,
  name,
  label,
  placeholder,
  options,
  rules,
  isLoading = false,
}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {value, onChange}, fieldState: {error}}) => (
      <View className="mb-5">
        {label ? (
          <Text className="text-[#1D293D] font-poppinsMedium text-sm mb-2">
            {label}
          </Text>
        ) : null}
        <Dropdown
          data={options}
          labelField="label"
          valueField="value"
          value={value}
          placeholder={isLoading ? 'Loading service types...' : placeholder}
          disable={isLoading}
          onChange={item => onChange(item.value)}
          style={styles.dropdown}
          selectedTextStyle={styles.selectedText}
          placeholderStyle={styles.placeholderText}
          itemTextStyle={styles.itemText}
          renderItem={item => (
            <View className="px-4 py-[10px] border-b border-[#F2F4F7]">
              <Text className="font-poppins text-base text-[#1D293D]">
                {item.label}
              </Text>
            </View>
          )}
          containerStyle={styles.dropdownContainer}
          activeColor="#F3F4F6"
        />
        {error ? (
          <Text className="text-primary2 font-poppins text-xs mt-1">
            {error.message}
          </Text>
        ) : null}
      </View>
    )}
  />
);

const FormAstrologerDropdown = ({
  control,
  name,
  label,
  placeholder,
  options,
  rules,
  isLoading = false,
}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {value, onChange}, fieldState: {error, isTouched, isDirty}}) => (
      <View className="mb-5">
        {label ? (
          <Text className="text-[#1D293D] font-poppinsMedium text-sm mb-2">
            {label}
          </Text>
        ) : null}
        <Dropdown
          data={options}
          labelField="label"
          valueField="value"
          value={value}
          placeholder={
            isLoading ? 'Loading astrologers...' : placeholder
          }
          disable={isLoading}
          onChange={item => onChange(item.value)}
          style={styles.dropdown}
          selectedTextStyle={styles.selectedText}
          placeholderStyle={styles.placeholderText}
          itemTextStyle={styles.itemText}
          renderItem={item => (
            <View className="px-4 py-[10px] border-b border-[#F2F4F7]">
              <Text className="font-poppins text-base text-[#1D293D]">
                {item.label}
              </Text>
            </View>
          )}
          containerStyle={styles.dropdownContainer}
          activeColor="#F3F4F6"
        />
        {error && (isTouched || isDirty) ? (
          <Text className="text-primary2 font-poppins text-xs mt-1">
            {error.message}
          </Text>
        ) : null}
      </View>
    )}
  />
);

const TimeSlotDropdown = ({
  value,
  onChange,
  options = [],
  error,
  isLoading = false,
}) => {
  const data = options.map(slot => ({
    label: `${slot.display_time} - ${slot.display_end_time}`,
    value: slot.time,
    status: slot.booked || slot.status !== 'available' ? 'Booked' : 'Available',
    disabled: slot.booked || slot.status !== 'available' || slot.disabled,
  }));

  return (
    <View className="mt-6">
      <Text className="text-[#1D293D] font-poppinsMedium text-sm mb-3">
        Time Slots *
      </Text>
      {isLoading ? (
        <Text className="text-[#94A3B8] font-poppins text-xs mb-2">
          Loading time slots...
        </Text>
      ) : null}
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        value={value}
            placeholder={
              isLoading
                ? 'Loading time slots...'
                : data.length > 0
                ? 'Select suitable time slot'
                : 'No slots available'
            }
        disable={isLoading || data.length === 0}
        onChange={item => {
          if (!item.disabled) {
            onChange(item.value);
          }
        }}
        style={styles.dropdown}
        selectedTextStyle={styles.selectedText}
        placeholderStyle={styles.placeholderText}
        itemTextStyle={styles.timeItemText}
        containerStyle={styles.timeDropdownContainer}
        renderItem={item => (
          <View
            className={`flex-row items-center justify-between px-[18px] py-4 border-b border-[#F1F5F9]${
              item.disabled ? ' bg-[#F9FAFB]' : ''
            }`}>
            <Text
              className={`font-poppinsSemiBold text-[15px] text-[#1D293D]${
                item.disabled ? ' text-[#CBD5E1]' : ''
              }`}>
              {item.label}
            </Text>
            <Text
              className={`font-poppinsMedium text-[13px] text-[#1D293D]${
                item.status !== 'Available' ? ' text-[#CBD5E1]' : ''
              }`}>
              {item.status}
            </Text>
          </View>
        )}
      />
      {!isLoading && data.length === 0 ? (
        <Text className="text-[#94A3B8] font-poppins text-xs mt-1">
          No available slots for the selected filters
        </Text>
      ) : null}
      {error ? (
        <Text className="text-primary2 font-poppins text-xs mt-1">{error}</Text>
      ) : null}
    </View>
  );
};

const FormTextField = ({
  control,
  name,
  label,
  placeholder,
  rules,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
      <View className="mb-5">
        {label ? (
          <Text className="text-[#1D293D] font-poppinsMedium text-sm mb-2">
            {label}
          </Text>
        ) : null}
        <View className="rounded-[10px] border border-[#E2E8F0] bg-[#FFFFFF] px-4">
          <RNTextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor="#E2E8F0"
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            className="py-3 font-poppinsMedium text-base text-[#62748E]"
          />
        </View>
        {error ? (
          <Text className="text-primary2 font-poppins text-xs mt-1">
            {error.message}
          </Text>
        ) : null}
      </View>
    )}
  />
);

const CheckAvailability = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {bottom} = useSafeAreaInsets();
  const service = route.params?.service ?? {};
  const [serviceCategories, setServiceCategories] = useState([]);
  const [isServiceTypeLoading, setIsServiceTypeLoading] = useState(false);
  const [astrologers, setAstrologers] = useState([]);
  const [isAstrologerLoading, setIsAstrologerLoading] = useState(false);
  const [serviceModes, setServiceModes] = useState(
    SERVICE_MODE_OPTIONS.map(mode => ({
      ...mode,
      disabled: true,
      disable: true,
    })),
  );
  const [timeSlots, setTimeSlots] = useState([]);
  const [isTimeSlotLoading, setIsTimeSlotLoading] = useState(false);
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [isAddressPickerVisible, setIsAddressPickerVisible] = useState(false);

  // Synchronise dropdown modes with available values by normalising
  // service/mode aliases (e.g. "online", "pandit_center") to the three
  // supported options and disabling everything else by default.
  useEffect(() => {
    let isMounted = true;

    const fetchServiceTypes = async () => {
      try {
        setIsServiceTypeLoading(true);
        const response = await getAvailabilityServicesType();
        const categories = response?.data;

        if (isMounted && Array.isArray(categories)) {
          setServiceCategories(categories);
        }
      } catch (error) {
        console.log('Failed to fetch service types', error);
      } finally {
        if (isMounted) {
          setIsServiceTypeLoading(false);
        }
      }
    };

    fetchServiceTypes();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchAstrologers = async () => {
      try {
        setIsAstrologerLoading(true);
        const response = await getAvailabilityAstrologers('astrologer');
        const list = response?.data ?? response;

        if (isMounted && Array.isArray(list)) {
          setAstrologers(list);
        }
      } catch (error) {
        console.log('Failed to fetch astrologers', error);
      } finally {
        if (isMounted) {
          setIsAstrologerLoading(false);
        }
      }
    };

    fetchAstrologers();

    return () => {
      isMounted = false;
    };
  }, []);

  const serviceTypePayload = useMemo(() => {
    if (
      Array.isArray(route.params?.serviceTypes) &&
      route.params?.serviceTypes?.length
    ) {
      return route.params.serviceTypes;
    }
    if (Array.isArray(serviceCategories)) {
      return serviceCategories;
    }
    return [];
  }, [route.params?.serviceTypes, serviceCategories]);

  const serviceTypeOptions = useMemo(
    () => buildServiceTypeOptions(serviceTypePayload),
    [serviceTypePayload],
  );

  const astrologerPayload = useMemo(() => {
    const fromParams =
      route.params?.astrologers ??
      route.params?.pandits ??
      route.params?.serviceTypes;
    if (Array.isArray(fromParams) && fromParams.length) {
      return fromParams;
    }
    if (Array.isArray(astrologers)) {
      return astrologers;
    }
    return [];
  }, [
    route.params?.astrologers,
    route.params?.pandits,
    route.params?.serviceTypes,
    astrologers,
  ]);

  const astrologerOptions = useMemo(
    () => buildAstrologerOptions(astrologerPayload),
    [astrologerPayload],
  );

  // Synchronize dropdown modes with available values by normalizing
  // service/mode aliases (e.g. "online", "pandit_center") to the three
  // supported options and disabling everything else by default.
  useEffect(() => {
    const incoming = normalizeOptions(
      route.params?.serviceModes ?? route.params?.modes,
      [],
    );

    const serviceTypes = Array.isArray(service?.serviceType)
      ? service.serviceType
      : [];

    const allowedValues = new Set();

    const registerIfSupported = rawValue => {
      if (typeof rawValue !== 'string') {
        return;
      }
      let normalized = rawValue.trim().toLowerCase();
      if (!normalized) {
        return;
      }
      if (
        normalized === 'online' ||
        normalized === 'online_consultation' ||
        normalized === 'virtual'
      ) {
        normalized = 'consult_online';
      } else if (
        normalized === 'consult_location' ||
        normalized === 'astrologer_location' ||
        normalized === 'in_person' ||
        normalized === 'office' ||
        normalized === 'pandit_center'
      ) {
        normalized = 'consult_location';
      } else if (
        normalized === 'home_pooja' ||
        normalized === 'pandit_home'
      ) {
        normalized = 'pooja_home';
      }
      const supported = SERVICE_MODE_OPTIONS.find(
        option => option.value === normalized,
      );
      if (supported) {
        allowedValues.add(supported.value);
      }
    };

    serviceTypes.forEach(registerIfSupported);
    incoming.forEach(mode => registerIfSupported(mode?.value));

    const hasAllowed = allowedValues.size > 0;

    const updatedModes = SERVICE_MODE_OPTIONS.map(option => {
      const isEnabled = hasAllowed && allowedValues.has(option.value);
      return {
        ...option,
        disabled: !isEnabled,
        disable: !isEnabled,
      };
    });

    setServiceModes(updatedModes);
  }, [route.params?.modes, route.params?.serviceModes, service?.serviceType, service]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: {isValid},
  } = useForm({
    mode: 'onChange',
  defaultValues: {
    serviceType:
      serviceTypeOptions.length === 1 ? serviceTypeOptions[0].value : '',
    serviceMode: '',
    pandit: astrologerOptions.length === 1 ? astrologerOptions[0].value : '',
    date: moment().format('YYYY-MM-DD'),
    timeSlot: '',
    recipient: 'self',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    addressId: '',
  },
});

  const selectedServiceType = watch('serviceType');
  const selectedMode = watch('serviceMode');
  const selectedPandit = watch('pandit');
  const selectedDate = watch('date');
  const selectedAddressId = watch('addressId');

  const selectedAddress = useMemo(() => {
    if (!selectedAddressId) {
      return null;
    }

    return (
      customerAddresses.find(address => {
        const idValue =
          address?._id ?? (address?.id != null ? String(address.id) : '');
        return idValue === selectedAddressId;
      }) ?? null
    );
  }, [customerAddresses, selectedAddressId]);

  const selectedAddressName = useMemo(() => {
    if (!selectedAddress) {
      return '';
    }

    const fullName = formatFullName(
      selectedAddress?.firstName,
      selectedAddress?.lastName,
    );

    if (fullName) {
      return fullName;
    }

    if (selectedAddress?.addressType) {
      const type = String(selectedAddress.addressType);
      return type.charAt(0).toUpperCase() + type.slice(1);
    }

    return 'Saved Address';
  }, [selectedAddress]);

  const hasAddresses = customerAddresses.length > 0;
  const hasMultipleAddresses = customerAddresses.length > 1;

  useEffect(() => {
    if (!hasMultipleAddresses && isAddressPickerVisible) {
      setIsAddressPickerVisible(false);
    }
  }, [hasMultipleAddresses, isAddressPickerVisible]);

  const handleAddressSelect = useCallback(
    addressId => {
      if (!addressId) {
        return;
      }

      setValue('addressId', addressId, {
        shouldDirty: true,
        shouldValidate: false,
      });
      setIsAddressPickerVisible(false);
    },
    [setValue],
  );

  const handleToggleAddressPicker = useCallback(() => {
    if (!hasAddresses) {
      return;
    }
    setIsAddressPickerVisible(prev => !prev);
  }, [hasAddresses]);

  const handleAddNewAddress = useCallback(() => {
    if (navigation?.navigate) {
      navigation.navigate('AddUpdateAddress');
    }
  }, [navigation]);

  useEffect(() => {
    let isMounted = true;

    const fetchAddresses = async () => {
      try {
        setIsAddressLoading(true);
        const response = await getCustomerAddresses();
        if (!isMounted) {
          return;
        }

        const rawAddresses = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];

        const usableAddresses = rawAddresses.filter(
          item => item && item.isDeleted !== true,
        );

        setCustomerAddresses(usableAddresses);

        const defaultAddress =
          usableAddresses.find(item => item?.isDefault) ?? usableAddresses[0];

        const existingAddressId = getValues('addressId');
        const defaultAddressId =
          defaultAddress?._id ??
          (defaultAddress?.id != null ? String(defaultAddress.id) : '');

        if (!existingAddressId && defaultAddressId) {
          setValue('addressId', defaultAddressId, {
            shouldDirty: false,
            shouldValidate: false,
          });
        }
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
  }, [getValues, setValue]);

  useEffect(() => {
    if (
      selectedMode &&
      !serviceModes.some(
        mode => mode.value === selectedMode && !mode.disabled,
      )
    ) {
      setValue('serviceMode', '', {shouldValidate: true});
    }
  }, [selectedMode, serviceModes, setValue]);

  useEffect(() => {
    const enabledOptions = serviceModes.filter(option => !option.disabled);
    if (enabledOptions.length === 0) {
      if (selectedMode) {
        setValue('serviceMode', '', {shouldValidate: true});
      }
      return;
    }

    const hasSelected = enabledOptions.some(
      option => option.value === selectedMode,
    );

    if (!hasSelected) {
      setValue('serviceMode', enabledOptions[0].value, {shouldValidate: true});
    }
  }, [serviceModes, selectedMode, setValue]);

  useEffect(() => {
    if (!selectedServiceType && serviceTypeOptions.length === 1) {
      setValue('serviceType', serviceTypeOptions[0].value, {
        shouldValidate: true,
      });
    }
  }, [selectedServiceType, serviceTypeOptions, setValue]);

  useEffect(() => {
    if (
      selectedPandit &&
      !astrologerOptions.some(option => option.value === selectedPandit)
    ) {
      setValue('pandit', '', {shouldValidate: true, shouldDirty: false});
    }
  }, [selectedPandit, astrologerOptions, setValue]);

  useEffect(() => {
    if (!selectedPandit && astrologerOptions.length === 1) {
      setValue('pandit', astrologerOptions[0].value, {shouldValidate: true});
    }
  }, [selectedPandit, astrologerOptions, setValue]);

  useEffect(() => {
    if (isTimeSlotLoading) {
      return;
    }

    if (timeSlots.length === 1) {
      const soleSlot = timeSlots[0];
      if (soleSlot?.time) {
        setValue('timeSlot', soleSlot.time, {shouldValidate: true});
      }
      return;
    }

    if (timeSlots.length === 0) {
      setValue('timeSlot', '', {shouldValidate: false, shouldDirty: false});
    }
  }, [isTimeSlotLoading, timeSlots, setValue]);

  useEffect(() => {
    const duration = Number(service?.durationInMinutes);
    const modeForRequest = SERVICE_MODE_REQUEST_MAP[selectedMode];
    const astrologerDetail = astrologerOptions.find(
      option => option.value === selectedPandit,
    );
    const astrologerId = astrologerDetail?.meta?._id ?? astrologerDetail?.value;

    const shouldFetch =
      Boolean(selectedDate) &&
      Boolean(modeForRequest) &&
      Boolean(astrologerId && astrologerId !== 'any') &&
      Number.isFinite(duration) &&
      duration > 0;

    if (!shouldFetch) {
      setTimeSlots([]);
      setIsTimeSlotLoading(false);
      setValue('timeSlot', '', {shouldValidate: false, shouldDirty: false});
      return;
    }

    let isMounted = true;
    setIsTimeSlotLoading(true);
    setTimeSlots([]);
    setValue('timeSlot', '', {shouldValidate: false, shouldDirty: false});

    const payload = {
      date: selectedDate,
      astrologer_id: astrologerId,
      service_type: modeForRequest,
      service_duration: duration,
    };

    getAvailabilityTimeSlot(payload)
      .then(response => {
        if (!isMounted) {
          return;
        }
        const rawSlots = Array.isArray(response?.data?.timeSlots)
          ? response.data.timeSlots
          : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.timeSlots)
          ? response.timeSlots
          : Array.isArray(response?.slots)
          ? response.slots
          : Array.isArray(response)
          ? response
          : [];
        const normalisedSlots = normalizeTimeSlots(rawSlots);
        setTimeSlots(normalisedSlots);
      })
      .catch(error => {
        console.log('Failed to fetch time slots', error);
        if (isMounted) {
          setTimeSlots([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsTimeSlotLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [
    selectedDate,
    selectedMode,
    selectedPandit,
    service?.durationInMinutes,
    astrologerOptions,
    setValue,
  ]);

  const [dayOffset, setDayOffset] = useState(0);

  const displayedDays = useMemo(() => {
    return Array.from({length: DAYS_TO_RENDER}, (_, index) => {
      const date = moment()
        .startOf('day')
        .add(dayOffset + index, 'days');
      const isToday = date.isSame(moment(), 'day');
      return {
        key: date.format('YYYY-MM-DD'),
        label: isToday ? 'TODAY' : date.format('ddd').toUpperCase(),
        dateNumber: date.format('DD'),
        isToday,
      };
    });
  }, [dayOffset]);

  useEffect(() => {
    const isDateInRange = displayedDays.some(day => day.key === selectedDate);
    if (!isDateInRange && displayedDays.length > 0) {
      setValue('date', displayedDays[0].key, {shouldValidate: true});
      setValue('timeSlot', '', {shouldValidate: true});
    }
  }, [displayedDays, selectedDate, setValue]);

  const handleDayPress = useCallback(
    dayKey => {
      setValue('date', dayKey, {shouldValidate: true});
      setValue('timeSlot', '', {shouldValidate: true});
    },
    [setValue],
  );

  const handlePrev = useCallback(() => {
    setDayOffset(prev => Math.max(0, prev - DAYS_TO_RENDER));
  }, []);

  const handleNext = useCallback(() => {
    setDayOffset(prev => prev + DAYS_TO_RENDER);
  }, []);

  const monthLabel = useMemo(() => {
    return moment(selectedDate, 'YYYY-MM-DD').format('MMMM YYYY');
  }, [selectedDate]);

  const onSubmit = useCallback(
    async data => {
      if (isBooking) {
        return;
      }

      const serviceTypeDetail = serviceTypeOptions.find(
        option => option.value === data.serviceType,
      );
      const astrologerDetail = astrologerOptions.find(
        option => option.value === data.pandit,
      );
      const modeDetail = serviceModes.find(
        option => option.value === data.serviceMode,
      );
      const timeSlotDetail = timeSlots.find(
        slot => slot.time === data.timeSlot,
      );
      const addressDetail =
        selectedAddress ??
        customerAddresses.find(address => {
          const idValue =
            address?._id ?? (address?.id != null ? String(address.id) : '');
          return idValue === data.addressId;
        }) ??
        null;

      const modeLabel =
        modeDetail?.label ??
        SERVICE_MODE_OPTIONS.find(option => option.value === data.serviceMode)
          ?.label ??
        '';

      const serviceTypeLabel =
        serviceTypeDetail?.meta?.name ??
        serviceTypeDetail?.label ??
        serviceTypeDetail?.name ??
        '';

      const astrologerName = astrologerDetail
        ? formatFullName(
            astrologerDetail?.profile?.firstName ?? astrologerDetail?.firstName,
            astrologerDetail?.profile?.lastName ?? astrologerDetail?.lastName,
          ) || astrologerDetail?.label
        : '';

      const firstName =
        typeof data.firstName === 'string' ? data.firstName.trim() : '';
      const lastName =
        typeof data.lastName === 'string' ? data.lastName.trim() : '';
      const composedFullName = formatFullName(firstName, lastName);

      const payload = {
        ...data,
        firstName,
        lastName,
        fullName: composedFullName,
        service,
        serviceTypeDetail: serviceTypeDetail?.meta ?? serviceTypeDetail,
        astrologerDetail: astrologerDetail?.meta ?? astrologerDetail,
        modeDetail,
        timeSlotDetail,
        addressDetail,
        serviceModeLabel: modeLabel,
        serviceTypeLabel,
        astrologerName,
      };

      const selectedAstrologerId =
        astrologerDetail?.meta?._id ??
        astrologerDetail?._id ??
        astrologerDetail?.value ??
        '';

      const serviceIdentifier =
        service?._id ??
        service?.id ??
        serviceTypeDetail?.value ??
        serviceTypeDetail?.meta?._id ??
        '';

      const modeForRequest =
        SERVICE_MODE_REQUEST_MAP[data.serviceMode] ?? data.serviceMode ?? '';

      const extractTime = (rawTime, position) => {
        if (!rawTime) {
          return null;
        }
        const parts = rawTime.split('-').map(part => part.trim());
        if (position === 'start') {
          return parts[0] ?? null;
        }
        if (position === 'end') {
          return parts[1] ?? null;
        }
        return null;
      };

      const slotLabel =
        timeSlotDetail?.time ??
        (timeSlotDetail?.display_time && timeSlotDetail?.display_end_time
          ? `${timeSlotDetail.display_time} - ${timeSlotDetail.display_end_time}`
          : data.timeSlot);

      const startTime =
        timeSlotDetail?.display_time ??
        timeSlotDetail?.raw?.startTime ??
        timeSlotDetail?.raw?.from ??
        extractTime(slotLabel, 'start') ??
        '';

      const endTime =
        timeSlotDetail?.display_end_time ??
        timeSlotDetail?.raw?.endTime ??
        timeSlotDetail?.raw?.to ??
        extractTime(slotLabel, 'end') ??
        '';

      const sanitizeId = candidate => {
        const text =
          candidate !== undefined && candidate !== null
            ? String(candidate).trim()
            : '';
        return text !== '' ? text : null;
      };

      const resolvedAddress =
        sanitizeId(selectedAddress?._id) ??
        sanitizeId(selectedAddress?.id) ??
        sanitizeId(data.addressId);

      const bookingPayload = {
        serviceId: serviceIdentifier,
        serviceMode: modeForRequest,
        astrologer: selectedAstrologerId,
        startTime,
        endTime,
        date: data.date,
        firstName,
        lastName,
        email: data.email,
        phone: data.phoneNumber,
        address: resolvedAddress,
      };

      const validations = [
        {value: bookingPayload.serviceId, message: 'Service ID is missing.'},
        {value: bookingPayload.serviceMode, message: 'Service mode is missing.'},
        {value: bookingPayload.astrologer, message: 'Astrologer selection is missing.'},
        {value: bookingPayload.date, message: 'Booking date is missing.'},
        {value: bookingPayload.startTime, message: 'Start time is missing.'},
        {value: bookingPayload.endTime, message: 'End time is missing.'},
        {value: bookingPayload.firstName, message: 'First name is missing.'},
        {value: bookingPayload.lastName, message: 'Last name is missing.'},
        {value: bookingPayload.email, message: 'Email address is missing.'},
        {value: bookingPayload.phone, message: 'Phone number is missing.'},
        {value: bookingPayload.address, message: 'Address selection is missing.'},
      ];

      const missingValidation = validations.find(item => {
        if (typeof item.value === 'string') {
          return item.value.trim() === '';
        }
        return !item.value;
      });

      if (missingValidation) {
        setBookingError('');
        showToastMessage(missingValidation.message);
        return;
      }

      setBookingError('');
      setIsBooking(true);

      try {
        const bookingResponse = await addToCartService(bookingPayload);
        if (navigation?.navigate) {
          navigation.navigate('BookingSummary', {
            bookingDetails: payload,
            bookingResponse,
            bookingRequest: bookingPayload,
          });
        }
      } catch (error) {
        console.log('Booking submission failed', error);
        setBookingError('Unable to complete booking. Please try again.');
      } finally {
        setIsBooking(false);
      }
    },
    [
      navigation,
      service,
      serviceTypeOptions,
      astrologerOptions,
      serviceModes,
      timeSlots,
      selectedAddress,
      customerAddresses,
      isBooking,
    ],
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FEF8EF]">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View className="flex-1">
        <View className="flex-row items-center mt-3 mb-8 px-5">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
          contentContainerStyle={{paddingBottom: bottom}}
          keyboardShouldPersistTaps="handled">
          <View className="px-5">
            <FormServiceTypeDropdown
              control={control}
              name="serviceType"
              label="Service Type *"
              placeholder="Select service type"
              options={serviceTypeOptions}
              rules={{required: 'Please choose a service type'}}
              isLoading={isServiceTypeLoading}
            />

            <FormModeDropdown
              control={control}
              name="serviceMode"
              label="Select Mode *"
              placeholder="Select mode"
              options={serviceModes}
              rules={{required: 'Please choose a mode'}}
            />

            <FormAstrologerDropdown
              control={control}
              name="pandit"
              label="Select Astrologer *"
              placeholder="Select astrologer"
              options={astrologerOptions}
              rules={{required: 'Please choose an astrologer'}}
              isLoading={isAstrologerLoading}
            />

            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center bg-white px-4 py-[10px] rounded-[10px] border border-[#E2E8F0]">
                <CalendarPillIcon />
                <Text className="ml-[10px] font-poppinsSemiBold text-base text-[#1D293D]">
                  {monthLabel}
                </Text>
              </View>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={handlePrev}
                  activeOpacity={0.85}
                  className={`w-10 h-10 rounded-[12px] bg-white border border-[#E2E8F0] justify-center items-center ml-3${
                    dayOffset === 0 ? ' opacity-40' : ''
                  }`}
                  disabled={dayOffset === 0}>
                  <NavArrowLeftIcon size={36} stroke="#1D293D" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNext}
                  activeOpacity={0.85}
                  className="w-10 h-10 rounded-[12px] bg-white border border-[#E2E8F0] justify-center items-center ml-3">
                  <NavArrowRightIcon size={36} stroke="#1D293D" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 6}}>
              {displayedDays.map(day => {
                const isSelected = day.key === selectedDate;
                const content = (
                  <View className="items-center">
                    <Text
                      className={`font-poppinsSemiBold text-xs text-[#1D293D]${
                        isSelected ? ' text-white' : ''
                      }`}>
                      {day.label}
                    </Text>
                    <Text
                      className={`mt-1 font-poppinsSemiBold text-[18px] text-[#1D293D]${
                        isSelected ? ' text-white' : ''
                      }`}>
                      {day.dateNumber}
                    </Text>
                  </View>
                );

                if (isSelected) {
                  return (
                    <TouchableOpacity
                      key={day.key}
                      onPress={() => handleDayPress(day.key)}
                      activeOpacity={0.9}
                      className="mr-2">
                      <LinearGradient
                        colors={['#FFBF12', '#FF8835', '#FF5858']}
                        locations={[0, 0.5, 1]}
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 1}}
                        style={[styles.dateChipBase]}>
                        {content}
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                }

                return (
                  <TouchableOpacity
                    key={day.key}
                    onPress={() => handleDayPress(day.key)}
                    activeOpacity={0.85}
                    className="mr-2">
                    <View
                      className="w-[60px] h-[76px] rounded-[18px] items-center justify-center bg-white border border-[#E2E8F0]">
                      {content}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Controller
              control={control}
              name="timeSlot"
              rules={{required: 'Please select a time slot'}}
              render={({
                field: {value, onChange},
                fieldState: {error, isTouched, isDirty},
              }) => (
                <TimeSlotDropdown
                  value={value}
                  onChange={onChange}
                  options={timeSlots}
                  error={error && (isTouched || isDirty) ? error.message : null}
                  isLoading={isTimeSlotLoading}
                />
              )}
            />

            <Controller
              control={control}
              name="recipient"
              render={({field: {value, onChange}}) => {
                const toggleValue = value === 'others' ? 'right' : 'left';
                const handleToggle = side =>
                  onChange(side === 'right' ? 'others' : 'self');

                return (
                  <View className="mt-6">
                    <Text className="text-[#1D293D] font-poppinsMedium text-sm mb-3">
                      Booking For
                    </Text>
                    <DualToggleSwitch
                      value={toggleValue}
                      onChange={handleToggle}
                      leftLabel="For self"
                      rightLabel="For Others"
                    />
                  </View>
                );
              }}
            />

            <View className="mt-3">
              <FormTextField
                control={control}
                name="firstName"
                label="First Name *"
                placeholder="Enter first name"
                rules={{required: 'First name is required'}}
              />
            </View>
            <View className="mt-3">
              <FormTextField
                control={control}
                name="lastName"
                label="Last Name *"
                placeholder="Enter last name"
                rules={{required: 'Last name is required'}}
              />
            </View>
            <FormTextField
              control={control}
              name="phoneNumber"
              label="Phone Number *"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              autoCapitalize="none"
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Enter a valid 10-digit phone number',
                },
              }}
            />

            <FormTextField
              control={control}
              name="email"
              label="Email *"
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
              rules={{
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid email address',
                },
              }}
            />

            <View className="">
              {isAddressLoading ? (
                <AddressCard
                  label="Address"
                  address={null}
                  emptyHint="Loading addresses..."
                />
              ) : hasAddresses && selectedAddress ? (
                <>
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-[#1D293D] font-poppinsMedium text-sm">
                      Address
                    </Text>
                    {hasMultipleAddresses ? (
                      <TouchableOpacity
                        onPress={handleToggleAddressPicker}
                        className="px-4 py-2 rounded-[16px] border border-[#FF7A00] bg-white"
                        activeOpacity={0.7}>
                        <Text className="font-poppinsMedium text-sm text-[#FF7A00]">
                          Change
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <AddressCard label={null} address={selectedAddress} />

                  {isAddressPickerVisible ? (
                    <View
                      className="mt-4 rounded-3xl border border-[#FFE4CC] bg-white"
                      style={styles.savedAddressContainer}>
                      <TouchableOpacity
                        onPress={handleAddNewAddress}
                        activeOpacity={0.85}
                        className="mx-4 mt-4 rounded-2xl bg-[#FF7A00] py-3">
                        <Text className="text-center font-poppinsSemiBold text-base text-white">
                          +  Add New Address
                        </Text>
                      </TouchableOpacity>

                      <View className="mt-4">
                        {customerAddresses.map((address, index) => {
                          const idValue =
                            address?._id ??
                            (address?.id != null ? String(address.id) : '');
                          const isActive = idValue === selectedAddressId;
                          const fullName = formatFullName(
                            address?.firstName,
                            address?.lastName,
                          );
                          const typeLabel = address?.addressType
                            ? String(address.addressType)
                            : '';
                          const fallbackName = typeLabel
                            ? `${typeLabel.charAt(0).toUpperCase()}${typeLabel.slice(
                                1,
                              )}`
                            : 'Saved Address';
                          const candidateName = fullName || fallbackName;
                          return (
                            <TouchableOpacity
                              key={idValue || `${index}`}
                              onPress={() => handleAddressSelect(idValue)}
                              activeOpacity={0.85}
                              className={`relative px-5 py-4${
                                index > 0 ? ' border-t border-[#F1F5F9]' : ''
                              }`}>
                              {isActive ? (
                                <View
                                  className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF7A00]"
                                  style={styles.activeIndicator}
                                />
                              ) : null}
                              <Text className="font-poppinsSemiBold text-base text-[#1D293D]">
                                {candidateName}
                              </Text>
                              {address?.phoneNumber ? (
                                <Text className="mt-1 font-poppins text-sm text-[#475569]">
                                  {address.phoneNumber}
                                </Text>
                              ) : null}
                              <Text className="mt-1 font-poppins text-sm leading-5 text-[#475569]">
                                {formatAddressLine(address)}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  ) : null}
                </>
              ) : (
                <AddressCard
                  label="Address"
                  address={null}
                  emptyHint="+ Add New Address"
                  onPress={handleAddNewAddress}
                />
              )}
            </View>
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          className="mx-5 pt-3"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? bottom + 20 : 0}>
          <View className="pb-0">
            {bookingError ? (
              <Text className="text-primary2 font-poppins text-xs text-center mb-3">
                {bookingError}
              </Text>
            ) : null}
            <GradientButton
              title={isBooking ? 'Processing...' : 'Check Summary'}
              showIcon={false}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isBooking}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default CheckAvailability;

const styles = StyleSheet.create({
  dropdown: {
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000026',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  dropdownContainer: {
    borderRadius: 20,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },
  selectedText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1D293D',
  },
  placeholderText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#A0AEC0',
  },
  itemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1D293D',
  },
  timeDropdownContainer: {
    borderRadius: 20,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  timeItemText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#1D293D',
  },
  dateChipBase: {
    borderRadius: 18,
    width: 60,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedAddressContainer: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  activeIndicator: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
});
