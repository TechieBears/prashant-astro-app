import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const formatAddressText = address => {
  if (!address) {
    return '';
  }
  const line1 =
    address?.line1 ??
    address?.addressLine1 ??
    address?.address ??
    '';
  const line2 = address?.line2 ?? address?.addressLine2 ?? '';
  const locality = address?.landmark ?? address?.locality ?? '';
  const cityState = [address?.city, address?.state, address?.country]
    .filter(Boolean)
    .join(', ');
  const postal = address?.pincode ?? address?.zipCode ?? address?.postalCode ?? '';
  const cityLine = [cityState, postal].filter(Boolean).join(' - ');
  return [line1, line2, locality, cityLine]
    .map(part => (part || '').trim())
    .filter(Boolean)
    .join('\n');
};

const AddressCard = ({
  address,
  label = 'Address',
  onPress,
  renderActions,
  emptyHint = 'Add a new address to continue.',
}) => {
  const addressText = formatAddressText(address);
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <View className="mb-4">
      {label ? (
        <Text className="text-[#1D293D] font-poppinsMedium text-sm mb-3">
          {label}
        </Text>
      ) : null}
      <Wrapper
        activeOpacity={0.85}
        onPress={onPress}
        className={`rounded-[10px] border ${
          address
            ? 'border-[#EFF3F9] bg-[#F9FAFB]'
            : 'border-dashed border-[#FF8835] bg-[#FFF5EE]'
        } px-5 py-4`}>
        {address ? (() => {
          const primaryName =
            address?.fullName ??
            address?.name ??
            [address?.firstName, address?.lastName]
              .filter(Boolean)
              .join(' ')
              .trim();
          const resolvedName = primaryName && primaryName.length > 0 ? primaryName : 'Recipient';
          return (
            <>
            <Text className="font-poppinsSemiBold text-base text-[#1D293D] mb-1">
              {resolvedName}
            </Text>
            {address?.phone || address?.phoneNumber ? (
              <Text className="text-[#475569] font-poppins text-sm mb-1">
                {address?.phone ?? address?.phoneNumber}
              </Text>
            ) : null}
            <Text className="text-[#475569] font-poppins text-sm leading-5 whitespace-pre-line">
              {addressText}
            </Text>
            </>
          );
        })() : (
          <Text className="text-center text-[#FF8835] font-poppins text-sm">
            {emptyHint}
          </Text>
        )}
      </Wrapper>
      {renderActions ? renderActions() : null}
    </View>
  );
};

export default AddressCard;
