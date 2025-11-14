import React from 'react';
import { View, Text, Image } from 'react-native';

const StatusBadge = ({ status }) => {
  const map = {
    PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    PAID: { bg: 'bg-green-100', text: 'text-green-600' },
    DELIVERED: { bg: 'bg-green-100', text: 'text-green-600' },
    CANCELLED: { bg: 'bg-red-100', text: 'text-red-600' },
  };

  const style = map[status] || { bg: 'bg-gray-100', text: 'text-gray-600' };

  return (
    <View className={`${style.bg} px-3 py-1 rounded-md`}>
      <Text className={`${style.text} text-xs font-poppins`}>{status}</Text>
    </View>
  );
};

const ProductOrderCard = ({ item }) => (
  <View className="bg-white rounded-2xl p-4 mb-3 shadow-xl">
    <View className="flex-row items-start justify-between mb-3">
      <View className="flex-row items-start flex-1">
        <View className="w-16 h-16 bg-pink-100 rounded-xl items-center justify-center mr-3">
          <Image
            source={{ uri: item.image }}
            className="w-16 h-16 rounded-xl bg-gray-200 mr-3"
          />
        </View>
        <View className="flex-1">
          <Text className="text-base font-poppinsSemiBold text-gray-900">
            {item.productName}
          </Text>
          <Text className="text-xs text-gray-500 font-poppins mt-1">
            Order ID: {item.orderId}
          </Text>
        </View>
      </View>
      <StatusBadge status={item.status} />
    </View>

    <View className="flex-row justify-between items-center pt-3">
      <View>
        <Text className="text-sm font-poppins text-slate-500">
          Qty: {item.quantity}
        </Text>
        <Text className="text-sm font-poppins text-slate-500 mt-1">
          {item.deliveryText}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-base font-poppinsSemiBold text-slate-800">
          ₹{item.price}
        </Text>
        <Text className="text-sm font-poppins text-slate-600 mt-1">
          {item.deliveryTime}
        </Text>
      </View>
    </View>
  </View>
);

export default ProductOrderCard;