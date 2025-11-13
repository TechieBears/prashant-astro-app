import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  PencilEdit01Icon,
  CalendarCheckIn01Icon,
  Location06Icon,
  PolicyIcon,
  HeadsetIcon,
  InformationDiamondIcon,
  ArrowRight01Icon,
  Mail01Icon,
  Delete02Icon,
  Logout05Icon,
  CallIcon,
  GiftIcon,
  Settings01Icon,
} from 'hugeicons-react-native';
import { useDispatch } from 'react-redux';
import { moderateScale, scale } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DrawerContent = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const menuItems = [
    { icon: PencilEdit01Icon, label: 'Edit Basic Details', color: '#F97316', redirect: 'EditProfile' },
    { icon: CalendarCheckIn01Icon, label: 'My Orders', color: '#00786F', redirect: 'MyOrders' },
    { icon: Location06Icon, label: 'My Address', color: '#00786F', redirect: 'Address' },
    { icon: PolicyIcon, label: 'Privacy Policy', color: '#62748E', redirect: 'PrivacyPolicy' },
    { icon: GiftIcon, label: 'Refer & Earn', color: '#FB2C36', redirect: 'CustomerSupport' },
    { icon: CallIcon, label: 'Call History', color: '#E60076', redirect: 'CustomerSupport' },
    { icon: HeadsetIcon, label: 'Customer Support', color: '#246DF2', redirect: 'CustomerSupport' },
    { icon: InformationDiamondIcon, label: 'About Us', color: '#00B8DB', redirect: 'About' },
    { icon: Settings01Icon, label: 'Setting', color: '#7C86FF', redirect: 'About' },
  ];

  const handleLogout = () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteApi();
      if (response?.success) {
        dispatch(logout());
      } else {
        console.error('Account deletion failed:', response?.message);
      }
    } catch (error) {
      console.error('Account deletion failed:', error);
    }
  };

  return (
    <DrawerContentScrollView {...props} style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, paddingHorizontal: wp('2%') }}>

        {/* Header */}
        <View style={{ paddingVertical: hp('2%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: moderateScale(22), fontWeight: '400' }}>
            Our <Text style={{ color: '#F97316' }}>Profile</Text>
          </Text>
          <TouchableOpacity style={{ padding: scale(6) }}>
            <PencilEdit01Icon color="#374151" size={moderateScale(24)} />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={{ marginTop: hp('1%') }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#E2E8F0', paddingBottom: hp('2%') }}>
            <View style={{ width: wp('12%'), height: wp('12%'), borderRadius: wp('8%'), overflow: 'hidden' }}>
              <Image
                source={{ uri: 'https://picsum.photos/400/400?random=1' }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>
            <View style={{ marginLeft: wp('4%'), flex: 1 }}>
              <Text style={{ fontSize: moderateScale(15), fontWeight: '600', color: '#111827' }}>
                Sid Srirams
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                <Mail01Icon size={moderateScale(14)} color="#62748E" />
                <Text style={{ fontSize: moderateScale(10), color: '#64748B', marginLeft: wp('1%'), flexShrink: 1 }}>
                  sidsriramssss@gmail.com
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ marginTop: hp('2%') }}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderColor: '#E2E8F0',
                  paddingVertical: hp('1.8%'),
                }}
                onPress={() => navigation.navigate(item.redirect)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon size={moderateScale(14)} color={item.color} />
                  <Text style={{ fontSize: moderateScale(14), color: '#1E293B', marginLeft: wp('4%') }}>
                    {item.label}
                  </Text>
                </View>
                <ArrowRight01Icon size={moderateScale(18)} color="#64748B" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout & Delete Buttons */}
        <View
          style={{
            marginTop: hp('4%'),
            gap: hp('1%'),
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems : 'flex-start'
          }}
        >
          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              borderWidth: 1,
              borderColor: '#1E293B',
              borderRadius: moderateScale(10),
              paddingVertical: hp('1.2%'),
              paddingHorizontal: wp('5%'), // add horizontal padding instead of flex
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: wp('2%'),
              alignSelf: 'center', // ensure it doesn't stretch
            }}
          >
            <Text style={{ fontSize: moderateScale(12), color: '#1E293B' }}>Logout</Text>
            <Logout05Icon size={moderateScale(14)} color="#1D293D" />
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity
            onPress={handleDelete}
            style={{
              backgroundColor: '#FB2C36',
              borderRadius: moderateScale(10),
              paddingVertical: hp('1.2%'),
              paddingHorizontal: wp('5%'), 
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: wp('2%'),
              alignSelf: 'center',
            }}
          >
            <Text style={{ fontSize: moderateScale(12), color: '#fff' }}>Delete Account</Text>
            <Delete02Icon size={moderateScale(14)} color="#fff" />
          </TouchableOpacity>
        </View>

      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
