import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import moment from 'moment';
import {ArrowLeft02Icon} from 'hugeicons-react-native';
import {Dropdown} from 'react-native-element-dropdown';
import GradientButton from '../../components/Buttons/GradientButton';
import {
  CalendarPillIcon,
  NavArrowLeftIcon,
  NavArrowRightIcon,
} from '../../utils/svgIcons';
import LinearGradient from 'react-native-linear-gradient';

const DAYS_TO_RENDER = 6;

const defaultService = {
  title: 'Astrology Consultation',
  description: 'Book your reading today and take a step closer to clarity.',
};

const STATIC_SERVICE_CATEGORIES = [
  {
    _id: '68df88f70a820201dc769eb3',
    name: 'Astrology',
    services: [
      {_id: '68df8b994e18aa3ca4cb02d5', name: 'Daily Horoscope'},
      {_id: '68ecad82400bffe5fadce940', name: 'Vastu Shastra'},
    ],
  },
  {
    _id: '68df89310a820201dc769ed7',
    name: 'Kundali Dosh',
    services: [
      {_id: '68e61af0a548fb579773e2fb', name: 'Pitru Dosh'},
      {_id: '68e660e16ef4b3db068caa9d', name: 'Test Service'},
    ],
  },
  {
    _id: '68df896c65fbe60f36f26909',
    name: 'Pooja Vidhi',
    services: [{_id: '68e3658e1761b31df636c280', name: 'Ganesh Puja'}],
  },
  {
    _id: '68df898a65fbe60f36f26926',
    name: 'Vastu remedy',
    services: [],
  },
  {
    _id: '68e76e67643457b48fb56761',
    name: 'Test',
    services: [{_id: '68df961b6e54a57f02e112ed', name: 'Kundali test'}],
  },
  {
    _id: '68e76eb2a84191bc3c33d0eb',
    name: 'Dummy Cate',
    services: [],
  },
  {
    _id: '68e8d517f50426f0c6d6e76a',
    name: 'New testing one',
    services: [],
  },
];

const STATIC_DROPDOWN_DATA = [
  {
    _id: '68fb745837f16daa02c3edaa',
    email: 'xevehi7153@ametitas.com',
    mobileNo: '8789065789',
    profileImage:
      'https://res.cloudinary.com/astroguid/image/upload/v1761309686/dev_uploads/astrologer1_i3dyao.jpg',
    profile: {
      _id: '68fb745837f16daa02c3eda8',
      employeeType: 'astrologer',
      firstName: 'astrologerone',
      lastName: 'test',
      skills: ['Pitru Dosh', 'Vastu Shastra'],
      languages: ['maithili', 'kashmiri', 'assamese'],
      experience: 50,
    },
  },
  {
    _id: '68fb2e6a5bdd901b256f6627',
    email: 'myfisy@fxzig.com',
    mobileNo: '8768768766',
    profileImage:
      'https://res.cloudinary.com/astroguid/image/upload/v1761291806/dev_uploads/7687b6bf01763fc31f1c612a92670e9b55e5076e_td8zfz.png',
    profile: {
      _id: '68fb2e6a5bdd901b256f6625',
      employeeType: 'astrologer',
      firstName: 'Astrologer',
      lastName: 'Prashant',
      skills: ['Daily Horoscope', 'Ganesh Puja', 'Kundali', 'Pitru Dosh'],
      languages: ['hindi', 'bengali', 'marathi', 'telugu'],
      experience: 4,
    },
  },
  {
    _id: '68e4f7fb6d23ccc0924304e6',
    email: 'dudekunal_2012@yahoo.in',
    mobileNo: '8459520112',
    profileImage:
      'https://res.cloudinary.com/astroguid/image/upload/v1760084017/dev_uploads/Pitru_dosha_ik0yzh.jpg',
    profile: {
      _id: '68e4f7fb6d23ccc0924304e4',
      employeeType: 'astrologer',
      firstName: 'Pandit',
      lastName: 'One',
      skills: [
        'Daily Horoscope',
        'Ganesh Puja at Home or Office by Expert Hindu Pujari',
        'Kundali',
        'Pitru Dosh',
      ],
      languages: ['hindi', 'marathi', 'telugu', 'gujarati', 'english'],
      experience: 30,
    },
  },
  {
    _id: '68e4dbcfa33189f9582815a6',
    email: 'vasanth.basani@techiebears.com',
    mobileNo: '8459520112',
    profileImage:
      'https://res.cloudinary.com/astroguid/image/upload/v1759835182/dev_uploads/service_2_qlovrg.png',
    profile: {
      _id: '68e4dbcfa33189f9582815a4',
      employeeType: 'astrologer',
      firstName: 'wepaloaw',
      lastName: 'bitnami',
      skills: ['vastu', 'havan', 'marriage'],
      languages: ['English', 'Hindi', 'kerla'],
      experience: 3,
    },
  },
  {
    _id: '68e3b4b959c9767b95d9d2bd',
    email: 'xofipoki@denipl.net',
    mobileNo: '8768768766',
    profileImage:
      'https://res.cloudinary.com/astroguid/image/upload/v1760356892/dev_uploads/4eb1722930a4d31c8fdf4d3eeb49087141112c8f_rkmojj.png',
    profile: {
      _id: '68e3b4b959c9767b95d9d2bb',
      employeeType: 'astrologer',
      firstName: 'Pandit',
      lastName: 'Astrologer',
      skills: [
        'Ganesh Puja at Home or Office by Expert Hindu Pujari',
        'Kundali',
        'Daily Horoscope',
      ],
      languages: ['bengali', 'hindi'],
      experience: 3,
    },
  },
  {
    _id: '68e3b0e9c0141a6a9362d2fa',
    email: 'qipemire@cyclelove.cc',
    mobileNo: '8768768766',
    profileImage:
      'https://res.cloudinary.com/astroguid/image/upload/v1759752420/dev_uploads/service_3_tymvxo.png',
    profile: {
      _id: '68e3b0e9c0141a6a9362d2f8',
      employeeType: 'astrologer',
      firstName: 'Pandit',
      lastName: 'Kumar',
      skills: [
        'Daily Horoscope',
        'Ganesh Puja at Home or Office by Expert Hindu Pujari',
        'Kundali',
      ],
      languages: ['hindi', 'bengali'],
      experience: 3,
    },
  },
  {
    _id: '68e365801761b31df636c277',
    email: 'naruto123@gmail.com',
    mobileNo: '9988776654',
    profileImage:
      'https://res.cloudinary.com/astroguid/image/upload/v1759732991/dev_uploads/Naruto_hjrmgv.jpg',
    profile: {
      _id: '68e365801761b31df636c275',
      employeeType: 'astrologer',
      firstName: 'Narutoo',
      lastName: 'Uzamakii',
      skills: [
        'Ganesh Puja at Home or Office by Expert Hindu Pujari',
        'Kundali',
      ],
      languages: ['hindi', 'marathi', 'tamil', 'english', 'urdu'],
      experience: 9,
    },
  },
  {
    _id: '68dfa2b12fa8ec20cfc209a6',
    email: 'rohitmiryala@techiebears.com',
    mobileNo: '8459520811',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    profile: {
      _id: '68dfa2b12fa8ec20cfc209a4',
      employeeType: 'astrologer',
      firstName: 'wepalo1',
      lastName: 'bitfami1',
      skills: ['marriage'],
      languages: ['English', 'Hindi', 'kerla'],
      experience: 3,
    },
  },
  {
    _id: '68df9f7936511501a73a46f5',
    email: 'prashantpandit@gmail.com',
    mobileNo: '8768768766',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    profile: {
      _id: '68df9f7936511501a73a46f3',
      employeeType: 'astrologer',
      firstName: 'Prashant',
      lastName: 'Pandit',
      skills: ['marriage'],
      languages: ['English', 'Hindi', 'kerla'],
      experience: 3,
    },
  },
];

const defaultTimeSlots = [
  {
    display_time: '06:00',
    display_end_time: '06:30',
    service_end_time: '07:00',
    time: '06:00 - 07:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '06:30',
    display_end_time: '07:00',
    service_end_time: '07:30',
    time: '06:30 - 07:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '07:00',
    display_end_time: '07:30',
    service_end_time: '08:00',
    time: '07:00 - 08:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '07:30',
    display_end_time: '08:00',
    service_end_time: '08:30',
    time: '07:30 - 08:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '08:00',
    display_end_time: '08:30',
    service_end_time: '09:00',
    time: '08:00 - 09:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '08:30',
    display_end_time: '09:00',
    service_end_time: '09:30',
    time: '08:30 - 09:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '09:00',
    display_end_time: '09:30',
    service_end_time: '10:00',
    time: '09:00 - 10:00',
    booked: true,
    status: 'unavailable',
    disabled: false,
  },
  {
    display_time: '09:30',
    display_end_time: '10:00',
    service_end_time: '10:30',
    time: '09:30 - 10:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '10:00',
    display_end_time: '10:30',
    service_end_time: '11:00',
    time: '10:00 - 11:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '10:30',
    display_end_time: '11:00',
    service_end_time: '11:30',
    time: '10:30 - 11:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '11:00',
    display_end_time: '11:30',
    service_end_time: '12:00',
    time: '11:00 - 12:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '11:30',
    display_end_time: '12:00',
    service_end_time: '12:30',
    time: '11:30 - 12:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '12:00',
    display_end_time: '12:30',
    service_end_time: '13:00',
    time: '12:00 - 13:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '12:30',
    display_end_time: '13:00',
    service_end_time: '13:30',
    time: '12:30 - 13:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '13:00',
    display_end_time: '13:30',
    service_end_time: '14:00',
    time: '13:00 - 14:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '13:30',
    display_end_time: '14:00',
    service_end_time: '14:30',
    time: '13:30 - 14:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '14:00',
    display_end_time: '14:30',
    service_end_time: '15:00',
    time: '14:00 - 15:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '14:30',
    display_end_time: '15:00',
    service_end_time: '15:30',
    time: '14:30 - 15:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '15:00',
    display_end_time: '15:30',
    service_end_time: '16:00',
    time: '15:00 - 16:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '15:30',
    display_end_time: '16:00',
    service_end_time: '16:30',
    time: '15:30 - 16:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '16:00',
    display_end_time: '16:30',
    service_end_time: '17:00',
    time: '16:00 - 17:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '16:30',
    display_end_time: '17:00',
    service_end_time: '17:30',
    time: '16:30 - 17:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '17:00',
    display_end_time: '17:30',
    service_end_time: '18:00',
    time: '17:00 - 18:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '17:30',
    display_end_time: '18:00',
    service_end_time: '18:30',
    time: '17:30 - 18:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '18:00',
    display_end_time: '18:30',
    service_end_time: '19:00',
    time: '18:00 - 19:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '18:30',
    display_end_time: '19:00',
    service_end_time: '19:30',
    time: '18:30 - 19:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '19:00',
    display_end_time: '19:30',
    service_end_time: '20:00',
    time: '19:00 - 20:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '19:30',
    display_end_time: '20:00',
    service_end_time: '20:30',
    time: '19:30 - 20:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '20:00',
    display_end_time: '20:30',
    service_end_time: '21:00',
    time: '20:00 - 21:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '20:30',
    display_end_time: '21:00',
    service_end_time: '21:30',
    time: '20:30 - 21:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '21:00',
    display_end_time: '21:30',
    service_end_time: '22:00',
    time: '21:00 - 22:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '21:30',
    display_end_time: '22:00',
    service_end_time: '22:30',
    time: '21:30 - 22:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '22:00',
    display_end_time: '22:30',
    service_end_time: '23:00',
    time: '22:00 - 23:00',
    booked: false,
    status: 'available',
    disabled: false,
  },
  {
    display_time: '22:30',
    display_end_time: '23:00',
    service_end_time: '23:30',
    time: '22:30 - 23:30',
    booked: false,
    status: 'available',
    disabled: false,
  },
];

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
    return STATIC_SERVICE_CATEGORIES.flatMap(category =>
      Array.isArray(category.services)
        ? category.services.map(service => ({
            label: service.name,
            value: service._id,
            meta: service,
          }))
        : [],
    );
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

  if (serviceSet.size === 0) {
    return STATIC_SERVICE_CATEGORIES.flatMap(category =>
      category.services.map(service => ({
        label: service.name,
        value: service._id,
        meta: service,
      })),
    );
  }

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

const FormModeDropdown = ({
  control,
  name,
  label,
  placeholder,
  options,
  rules,
}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {value, onChange}, fieldState: {error}}) => (
      <View style={styles.dropdownWrapper}>
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
          placeholder={placeholder}
          onChange={item => onChange(item.value)}
          style={styles.dropdown}
          selectedTextStyle={styles.selectedText}
          placeholderStyle={styles.placeholderText}
          itemTextStyle={styles.itemText}
          renderItem={item => (
            <View style={styles.dropdownItem}>
              <Text style={styles.itemText}>{item.label}</Text>
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

const FormServiceTypeDropdown = ({
  control,
  name,
  label,
  placeholder,
  options,
  rules,
}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {value, onChange}, fieldState: {error}}) => (
      <View style={styles.dropdownWrapper}>
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
          placeholder={placeholder}
          onChange={item => onChange(item.value)}
          style={styles.dropdown}
          selectedTextStyle={styles.selectedText}
          placeholderStyle={styles.placeholderText}
          itemTextStyle={styles.itemText}
          renderItem={item => (
            <View style={styles.dropdownItem}>
              <Text style={styles.itemText}>{item.label}</Text>
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
}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {value, onChange}, fieldState: {error}}) => (
      <View style={styles.dropdownWrapper}>
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
          placeholder={placeholder}
          onChange={item => onChange(item.value)}
          style={styles.dropdown}
          selectedTextStyle={styles.selectedText}
          placeholderStyle={styles.placeholderText}
          itemTextStyle={styles.itemText}
          renderItem={item => (
            <View style={styles.dropdownItem}>
              <Text style={styles.itemText}>{item.label}</Text>
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

const TimeSlotDropdown = ({value, onChange, options = [], error}) => {
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
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        placeholder="Select suitable time slot"
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
            style={[
              styles.timeDropdownItem,
              item.disabled && styles.timeDropdownItemDisabled,
            ]}>
            <Text
              style={[
                styles.timeDropdownLabel,
                item.disabled && styles.timeDropdownLabelDisabled,
              ]}>
              {item.label}
            </Text>
            <Text
              style={[
                styles.timeDropdownStatus,
                item.status !== 'Available' &&
                  styles.timeDropdownStatusDisabled,
              ]}>
              {item.status}
            </Text>
          </View>
        )}
      />
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
  const service = route.params?.service ?? defaultService;

  const serviceTypePayload = useMemo(() => {
    if (
      Array.isArray(route.params?.serviceTypes) &&
      route.params?.serviceTypes?.length
    ) {
      return route.params.serviceTypes;
    }
    return STATIC_DROPDOWN_DATA;
  }, [route.params?.serviceTypes]);

  const serviceTypeOptions = useMemo(
    () => buildServiceTypeOptions(serviceTypePayload),
    [serviceTypePayload],
  );

  const serviceModes = useMemo(() => {
    const baseModes = [
      {label: 'Consult Online', value: 'consult_online'},
      {label: 'Consult at Astrologer location', value: 'consult_location'},
      {label: 'Pooja at Home', value: 'pooja_home'},
    ];

    const incoming = normalizeOptions(
      route.params?.serviceModes ?? route.params?.modes,
      baseModes,
    );

    const merged = new Map();
    baseModes.forEach(mode => merged.set(mode.value, mode));
    incoming.forEach(mode => merged.set(mode.value, mode));

    return Array.from(merged.values());
  }, [route.params?.serviceModes, route.params?.modes]);

  const astrologerPayload = useMemo(() => {
    const fromParams =
      route.params?.astrologers ??
      route.params?.pandits ??
      route.params?.serviceTypes;
    if (Array.isArray(fromParams) && fromParams.length) {
      return fromParams;
    }
    return STATIC_DROPDOWN_DATA;
  }, [
    route.params?.astrologers,
    route.params?.pandits,
    route.params?.serviceTypes,
  ]);

  const astrologerOptions = useMemo(
    () => buildAstrologerOptions(astrologerPayload),
    [astrologerPayload],
  );

  const timeSlots = useMemo(() => {
    if (
      Array.isArray(route.params?.timeSlots) &&
      route.params?.timeSlots.length
    ) {
      return route.params.timeSlots;
    }
    return defaultTimeSlots;
  }, [route.params?.timeSlots]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      serviceType:
        serviceTypeOptions.length === 1 ? serviceTypeOptions[0].value : '',
      serviceMode: serviceModes.length === 1 ? serviceModes[0].value : '',
      pandit: astrologerOptions.length === 1 ? astrologerOptions[0].value : '',
      date: moment().format('YYYY-MM-DD'),
      timeSlot: '',
      fullName: '',
      phoneNumber: '',
      email: '',
    },
  });

  const selectedServiceType = watch('serviceType');
  const selectedMode = watch('serviceMode');
  const selectedPandit = watch('pandit');
  const selectedDate = watch('date');

  useEffect(() => {
    if (!selectedServiceType && serviceTypeOptions.length === 1) {
      setValue('serviceType', serviceTypeOptions[0].value, {
        shouldValidate: true,
      });
    }
  }, [selectedServiceType, serviceTypeOptions, setValue]);

  useEffect(() => {
    if (!selectedMode && serviceModes.length === 1) {
      setValue('serviceMode', serviceModes[0].value, {shouldValidate: true});
    }
  }, [selectedMode, serviceModes, setValue]);

  useEffect(() => {
    if (!selectedPandit && astrologerOptions.length === 1) {
      setValue('pandit', astrologerOptions[0].value, {shouldValidate: true});
    }
  }, [selectedPandit, astrologerOptions, setValue]);

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
    data => {
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

      const payload = {
        ...data,
        service,
        serviceTypeDetail: serviceTypeDetail?.meta ?? serviceTypeDetail,
        astrologerDetail: astrologerDetail?.meta ?? astrologerDetail,
        modeDetail,
        timeSlotDetail,
      };

      console.log('Booking form submission', payload);
      if (navigation?.navigate) {
        navigation.navigate('BookingSummary', {bookingDetails: payload});
      }
    },
    [
      navigation,
      service,
      serviceTypeOptions,
      astrologerOptions,
      serviceModes,
      timeSlots,
    ],
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FEF8EF'}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={{flex: 1}}>
        <View className="flex-row items-center mt-3 mb-8 px-5">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
            className="w-12 h-12 rounded-[10px] border items-center justify-center mr-3"
            style={{backgroundColor: '#FFFFFF', borderColor: '#00000026'}}>
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
            />

            <View style={styles.dateHeaderStandalone}>
              <View style={styles.monthPill}>
                <CalendarPillIcon />
                <Text style={styles.monthText}>{monthLabel}</Text>
              </View>
              <View style={styles.navGroup}>
                <TouchableOpacity
                  onPress={handlePrev}
                  activeOpacity={0.85}
                  style={[
                    styles.navButton,
                    dayOffset === 0 && styles.navDisabled,
                  ]}
                  disabled={dayOffset === 0}>
                  <NavArrowLeftIcon size={36} stroke="#1D293D" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNext}
                  activeOpacity={0.85}
                  style={styles.navButton}>
                  <NavArrowRightIcon size={36} stroke="#1D293D" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateScrollContent}>
              {displayedDays.map(day => {
                const isSelected = day.key === selectedDate;
                const content = (
                  <View style={styles.dateContent}>
                    <Text
                      style={[
                        styles.dateLabelText,
                        isSelected && styles.dateLabelTextSelected,
                      ]}>
                      {day.label}
                    </Text>
                    <Text
                      style={[
                        styles.dateNumberText,
                        isSelected && styles.dateNumberTextSelected,
                      ]}>
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
                      style={styles.dateChipWrapper}>
                      <LinearGradient
                        colors={['#FFBF12', '#FF8835', '#FF5858']}
                        locations={[0, 0.5, 1]}
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 1}}
                        style={[styles.dateChipBase, styles.dateChipSelected]}>
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
                    style={styles.dateChipWrapper}>
                    <View style={[styles.dateChipBase, styles.dateChip]}>
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
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <TimeSlotDropdown
                  value={value}
                  onChange={onChange}
                  options={timeSlots}
                  error={error?.message}
                />
              )}
            />

            <View style={{marginTop: 12}}>
              <FormTextField
                control={control}
                name="fullName"
                label="Full Name *"
                placeholder="Enter full name"
                rules={{required: 'Full name is required'}}
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
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          className="mx-5 pt-3"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? bottom + 20 : 0}>
          <View style={[styles.footerContainer, {paddingBottom: 0}]}>
            <GradientButton
              title="Check Summary"
              showIcon={false}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default CheckAvailability;

const styles = StyleSheet.create({
  dropdownWrapper: {
    marginBottom: 20,
  },
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
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
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
  timeDropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  timeDropdownItemDisabled: {
    backgroundColor: '#F9FAFB',
  },
  timeDropdownLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#1D293D',
  },
  timeDropdownLabelDisabled: {
    color: '#CBD5E1',
  },
  timeDropdownStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#1D293D',
  },
  timeDropdownStatusDisabled: {
    color: '#CBD5E1',
  },
  timeItemText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#1D293D',
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  monthText: {
    marginLeft: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1D293D',
  },
  navGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  navDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1D293D',
  },
  dateHeaderStandalone: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateScrollContent: {
    paddingHorizontal: 6,
  },
  dateChipWrapper: {
    marginRight: 8,
  },
  dateChipBase: {
    borderRadius: 18,
    width: 60,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dateChipSelected: {},
  dateContent: {
    alignItems: 'center',
  },
  dateLabelText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#1D293D',
  },
  dateLabelTextSelected: {
    color: '#FFFFFF',
  },
  dateNumberText: {
    marginTop: 4,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1D293D',
  },
  dateNumberTextSelected: {
    color: '#FFFFFF',
  },
  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeChipWrapper: {
    marginRight: 12,
    marginBottom: 12,
  },
  timeChip: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  timeChipDisabled: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  timeChipSelected: {
    borderRadius: 10,
    // paddingHorizontal: 18,
    // paddingVertical: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#1D293D',
  },
  timeTextDisabled: {
    color: '#A0AEC0',
  },
  timeTextSelected: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  timeSubTextDisabled: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#A0AEC0',
    marginTop: 4,
  },
});
