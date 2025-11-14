import { View, Text, SafeAreaView, StatusBar, ScrollView, Platform } from 'react-native';
import React from 'react';

import BackButton from '../../components/Buttons/BackButton';

export default function PrivacyPolicy() {

  return (
    <SafeAreaView
      className="flex-1 bg-orange-50"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView className='px-6 py-4'>
        <BackButton heading={'Privacy Policy'} />

        <View className="mt-6 space-y-5">

          {/* Intro */}
          <Text className="font-poppins text-gray-700 leading-6">
            Welcome to our Pandit App. We value your privacy and are committed
            to protecting your personal information. This Privacy Policy explains
            how we collect, use, store, and safeguard your data when you use our
            products, services, bookings, and payment features.
          </Text>

          {/* Section 1 */}
          <View>
            <Text className="font-poppinsSemiBold text-lg text-gray-900 mb-2">
              1. Information We Collect
            </Text>
            <Text className="font-poppins text-gray-700 leading-6">
              We collect information to provide better services and fulfill your
              product orders and service bookings. The information includes:
              {'\n'}{'\n'}• Personal details (full name, email, phone number)
              {'\n'}• Profile image and personal images uploaded by you
              {'\n'}• Address details (home, workplace, or delivery address)
              {'\n'}• Service booking details (date, time, service type)
              {'\n'}• Product order details
              {'\n'}• Payment information (processed securely through the payment gateway)
              {'\n'}• Device & app usage information
            </Text>
          </View>

          {/* Section 2 */}
          <View>
            <Text className="font-poppinsSemiBold text-lg text-gray-900 mb-2">
              2. How We Use Your Information
            </Text>
            <Text className="font-poppins text-gray-700 leading-6">
              Your information is used to ensure smooth functioning of the app and
              to provide accurate and personalized services. This includes:
              {'\n'}{'\n'}• Creating and managing your account
              {'\n'}• Providing Pandit services (online, offline, and Zoom sessions)
              {'\n'}• Processing product orders and deliveries
              {'\n'}• Verifying identity & handling uploaded images for service purposes
              {'\n'}• Managing bookings, schedules, and communication with Pandits
              {'\n'}• Sending booking updates, reminders, and notifications
              {'\n'}• Processing secure payments through third-party payment gateways
              {'\n'}• Improving app performance, user experience, and security
            </Text>
          </View>

          {/* Section 3 */}
          <View>
            <Text className="font-poppinsSemiBold text-lg text-gray-900 mb-2">
              3. Sharing of Information
            </Text>
            <Text className="font-poppins text-gray-700 leading-6">
              We do not sell or rent your personal information. Your data may be shared only with:
              {'\n'}{'\n'}• Authorized Pandits for service fulfillment
              {'\n'}• Delivery partners (only when you order products)
              {'\n'}• Payment gateway partners for processing payments
              {'\n'}• Service providers helping us operate the app and improve performance
              {'\n'}• Legal authorities if required under law
            </Text>
          </View>

          {/* Section 4 */}
          <View>
            <Text className="font-poppinsSemiBold text-lg text-gray-900 mb-2">
              4. Data Security
            </Text>
            <Text className="font-poppins text-gray-700 leading-6">
              We implement industry-standard technical and organizational security
              measures to protect your data, including:
              {'\n'}{'\n'}• Encrypted communications
              {'\n'}• Secure payment processing
              {'\n'}• Restricted access to personal information
              {'\n'}• Safe storage of uploaded images and files
              {'\n'}However, no method of storage or transmission over the internet
              is completely secure.
            </Text>
          </View>

          {/* Section 5 */}
          <View>
            <Text className="font-poppinsSemiBold text-lg text-gray-900 mb-2">
              5. Your Rights
            </Text>
            <Text className="font-poppins text-gray-700 leading-6">
              You have full control over your data. You may:
              {'\n'}{'\n'}• Access your personal information at any time
              {'\n'}• Update or correct your details
              {'\n'}• Request data deletion or account removal
              {'\n'}• Change profile image or uploaded images
              {'\n'}• Manage notification and communication settings
            </Text>
          </View>

          {/* Section 6 */}
          <View>
            <Text className="font-poppinsSemiBold text-lg text-gray-900 mb-2">
              6. Third-Party Services
            </Text>
            <Text className="font-poppins text-gray-700 leading-6">
              We integrate third-party services such as:
              {'\n'}{'\n'}• Payment Gateways (PhonePe / Razorpay / Paytm)
              {'\n'}• Zoom or other video services for online sessions
              {'\n'}• Delivery services for product orders
              {'\n'}Each third-party service follows its own privacy policy.
            </Text>
          </View>

          {/* Section 7 */}
          <View>
            <Text className="font-poppinsSemiBold text-lg text-gray-900 mb-2">
              7. Contact Us
            </Text>
            <Text className="font-poppins text-gray-700 leading-6">
              For questions related to this Privacy Policy or your data, contact our support team:
              {'\n'}{'\n'}Email: support@panditapp.com
              {'\n'}Phone: +91 98765 43210
              {'\n'}Working Hours: Monday – Saturday (9 AM – 7 PM)
            </Text>
          </View>

          <View className="h-8" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
