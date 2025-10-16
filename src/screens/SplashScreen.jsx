// import React, { useEffect } from 'react';
// import { View, Text, Image } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';

// const SplashScreen = ({ navigation }) => {
//   const { isAuthenticated } = useSelector(state => state.auth);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (isAuthenticated) {
//         navigation.replace('Home');
//       } else {
//         navigation.replace('Login');
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [isAuthenticated, navigation]);

//   return (
//     <View className="flex-1 bg-background items-center justify-center">
//       {/* Logo */}
//       <View className="items-center mb-8">
//         <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-4">
//           <Text className="text-white font-prociono text-2xl">AG</Text>
//         </View>

//         <Text className="text-text1 font-prociono text-3xl mb-2">
//           AstroGuid
//         </Text>

//         <Text className="text-text2 font-poppins text-base text-center px-8">
//           Your Personal Astrology Guide
//         </Text>
//       </View>

//       {/* Loading indicator */}
//       <View className="absolute bottom-20">
//         <View className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
//       </View>
//     </View>
//   );
// };

// export default SplashScreen;






import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSequence,
    runOnJS,
} from 'react-native-reanimated';

export default function SplashScreen({ navigation }) {
    const imageWidth = useSharedValue(0);
    const imageRotation = useSharedValue(0);
    const textScale = useSharedValue(0);
    const textOpacity = useSharedValue(0);
    const translateY = useSharedValue(0);
    const containerOpacity = useSharedValue(1);

    const navigateToHome = () => {
        // navigation.replace('Home');
    };

    useEffect(() => {
        // Step 1: Start all animations in parallel (grow and appear)
        imageWidth.value = withTiming(150, { duration: 1500 });
        imageRotation.value = withTiming(360, { duration: 1500 });
        textScale.value = withTiming(1, { duration: 1500 });
        textOpacity.value = withTiming(1, { duration: 1500 });

        // Step 2: After 2 seconds, move up and fade out
        translateY.value = withDelay(
            3000,
            withTiming(-500, { duration: 1200 })
        );
        containerOpacity.value = withDelay(
            3000,
            withTiming(0, { duration: 1200 }, (finished) => {
                if (finished) {
                    runOnJS(navigateToHome)();
                }
            })
        );
    }, []);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            width: imageWidth.value,
            height: imageWidth.value,
            transform: [
                { rotate: `${imageRotation.value}deg` },
                { translateY: translateY.value }
            ],
        };
    });

    const textAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: textScale.value },
                { translateY: translateY.value }
            ],
            opacity: textOpacity.value,
        };
    });

    const containerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: containerOpacity.value,
        };
    });

    return (
        <View className="flex-1 justify-center items-center">
            <Animated.View style={containerAnimatedStyle} className="justify-center items-center">
                {/* Animated Logo */}
                <Animated.View style={imageAnimatedStyle} className="mb-8">
                    <Image
                        source={require('../assets/images/logo.png')}
                        className="w-full h-full"
                        resizeMode="contain"
                    />
                </Animated.View>

                {/* Animated Text */}
                <Animated.View style={textAnimatedStyle}>
                    <Text className="text-4xl font-bold text-primary text-center mb-3">
                        AstroGuid
                    </Text>
                </Animated.View>
            </Animated.View>
        </View>
    );
}