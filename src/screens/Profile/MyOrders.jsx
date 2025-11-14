import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import BackButton from '../../components/Buttons/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import ProductOrderCard from '../../components/Cards/orders/ProductOrderCard';
import ServiceOrderCard from '../../components/Cards/orders/ServiceOrderCard';
import {
  getMyProductsOrders,
  getMyServicesOrders,
} from '../../services/api';



export default function MyOrders() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const normalizeProducts = (list) => {
    const result = [];

    list.forEach(order => {
      order.items?.forEach(item => {
        const product = item.product;

        result.push({
          orderId: order._id,
          productName: product?.name,
          image: product?.images?.[0],
          quantity: product?.quantity,
          price: product.subtotal,
          status: order.orderStatus,
          deliveryText: order.paymentStatus,
          deliveryTime: order.paymentMethod,
        });
      });
    });

    return result;
  };

  const normalizeServices = (list) => {
    const result = [];

    list.forEach(order => {
      order.services?.forEach(s => {
        result.push({
          orderId: order.orderId,
          type: s.serviceName,
          duration: `${s.durationInMinutes} minutes`,
          date: s.bookingDate,
          mode: s.serviceType,
          zoomLink: s.zoomLink,
        });
      });
    });

    return result;
  };


  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response =
        activeTab === 'products'
          ? await getMyProductsOrders()
          : await getMyServicesOrders();

      const list = response?.data || [];
      console.log('list', list)
      const mapped =
        activeTab === 'products'
          ? normalizeProducts(list)
          : normalizeServices(list);

      setOrders(mapped);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  return (
    <SafeAreaView
      className="flex-1 bg-orange-50"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="px-5 pt-4 pb-2">
        <BackButton heading="My Orders" />

        {/* Tabs */}
        <View className="bg-white rounded-full border mt-5 border-black/10 flex-row mb-6">

          {/* Services Tab */}
          <TouchableOpacity
            className="flex-1 rounded-full overflow-hidden"
            onPress={() => setActiveTab('services')}
          >
            {activeTab === 'services' ? (
              <LinearGradient
                colors={['#FFBF12', '#FF8835', '#FF5858']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-3"
              >
                <Text className="text-center text-white font-poppinsSemiBold">
                  Services
                </Text>
              </LinearGradient>
            ) : (
              <View className="py-3">
                <Text className="text-center text-slate-500 font-poppins">
                  Services
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Products Tab */}
          <TouchableOpacity
            className="flex-1 rounded-full overflow-hidden"
            onPress={() => setActiveTab('products')}
          >
            {activeTab === 'products' ? (
              <LinearGradient
                colors={['#FFBF12', '#FF8835', '#FF5858']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-3"
              >
                <Text className="text-center text-white font-poppinsSemiBold">
                  Products
                </Text>
              </LinearGradient>
            ) : (
              <View className="py-3">
                <Text className="text-center text-slate-500 font-poppins">
                  Products
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {loading ? (
          <View className="items-center justify-center py-8">
            <ActivityIndicator size="large" color="#FF7A00" />
            <Text className="text-gray-600 mt-2 font-poppins">
              Loading your orders...
            </Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) =>
              activeTab === 'products' ? (
                <ProductOrderCard item={item} />
              ) : (
                <ServiceOrderCard item={item} />
              )
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchOrders} />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
