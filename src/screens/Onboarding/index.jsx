import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { ArrowRight02Icon, ArrowLeft02Icon } from 'hugeicons-react-native';
import { BlurView } from '@react-native-community/blur';

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    title: "Get Personalized Predictions",
    description: "Accurate insights on career, relationships, health, and finance tailored just for you.",
    image: require("./../../assets/images/onboardscreens/OS1.png"),
  },
  {
    id: 2,
    title: "Spiritual Products",
    description: "Rudraksha, gemstones, yantras, and more—energized and certified for your well-being.",
    image: require("./../../assets/images/onboardscreens/OS2.png"),
  },
  {
    id: 3,
    title: "Begin Your Journey",
    description: "Trusted guidance and authentic products—download and explore now!",
    image: require("./../../assets/images/onboardscreens/OS3.png"),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      navigation.replace("Login");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const slide = slides[currentIndex];
  const isLast = currentIndex === slides.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ImageBackground
        source={slide.image}
        resizeMode="cover"
        style={{ width, height }}
        className="justify-end"
      >
        {/* Overlay */}
        <View className="absolute inset-0 bg-black/40" />

        {/* Bottom Content with Glass Effect */}
        <View className="p-6">
          <View 
          style={{ backgroundColor: '#00000040' }}
          className=" rounded-xl p-4 w-full border border-white/10"
        >
          {/* Text Container with Glass Effect */}
          <View 
            className="rounded-3xl p-6 mb-1 "
          >
            <Text className="text-white px-6 text-center text-3xl font-bold mb-2">
              {slide.title}
            </Text>
            <Text className="text-gray-200 px-2 text-base text-center">
              {slide.description}
            </Text>
          </View>

          {/* Pagination Dots */}
          <View className="flex-row justify-center mb-3">
            {slides.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full mx-1 ${
                  currentIndex === index
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-white/40"
                }`}
              />
            ))}
          </View>

          {/* Navigation Buttons with Glass Effect */}
          <View 
            className="flex-row justify-between items-end  w-full "
          >
            {/* Previous Button */}
            <TouchableOpacity
              onPress={handlePrevious}
              disabled={currentIndex === 0}
              style={{ backgroundColor: '#FFFFFF26' }}
              className="w-14 h-14 rounded-full items-center justify-center blur-md"
            >
              <ArrowLeft02Icon
                size={28}
                color={currentIndex === 0 ? "#FFFFFF40" : "#FFFFFF"}
                className="font-bold"
              />

            </TouchableOpacity>

            {/* Next/Get Started Button */}
            <TouchableOpacity
              onPress={handleNext}
              style={{ backgroundColor: '#FFFFFF26' }}
              className="w-14 h-14 rounded-full items-center justify-center blur-md"
            >
              {/* <BlurView
        style={{
          borderRadius: 20,
          width: 15,
          height: 15,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          padding: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
        }}
        blurType="light"
        blurAmount={10}
      > */}
              {/* <Text className="text-white font-semibold text-base mr-2">
                {isLast ? "Get Started" : "Next"}
              </Text> */}
              <ArrowRight02Icon size={28} color="#FFFFFF" className="font-bold" />
              {/* </BlurView> */}
            </TouchableOpacity>

            {/* Placeholder for symmetry when on first slide */}
            {/* {currentIndex === 0 && (
              <View className="w-14 h-14" />
            )} */}
          </View>
        </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OnboardingScreen;