import { View, SafeAreaView, ScrollView, StatusBar, Text, Image, Platform } from 'react-native'
import React from 'react'
import BackButton from '../../components/Buttons/BackButton'
import { 
    FavouriteIcon, 
    StarIcon, 
    UserIcon,
} from 'hugeicons-react-native'

export default function AboutUs() {
    const philosophyItems = [
        {
            id: 1,
            icon: <FavouriteIcon size={32} color="#FFFFFF"  />,
            title: 'Compassionate Guidance',
            description: 'Every soul deserves profound understanding and divine clarity. I approach each consultation with deep empathy, ensuring you feel spiritually supported, and truly heard on your sacred journey.',
            bgColor: '#3B82F6'
        },
        {
            id: 2,
            icon: <StarIcon size={32} color="#FFFFFF"  />,
            title: 'Compassionate Guidance',
            description: 'Seamlessly blending time-honored Vedic traditions with contemporary spiritual understanding, I provide guidance that is both deeply rooted in ancient wisdom and practically applicable to modern life.',
            bgColor: '#FB923C'
        },
        {
            id: 3,
            icon: <UserIcon size={32} color="#FFFFFF"  />,
            title: 'Transformation Focus',
            description: 'Astrology is not merely prediction—it is divine revelation. I help you decode your cosmic blueprint to unlock your highest potential, heal past wounds, and create meaningful positive change.',
            bgColor: '#10B981'
        }
    ]

    return (
        <SafeAreaView
            className="flex-1 bg-orange-50"
            style={{
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}
        >
            <ScrollView className='px-6 py-4'>
                <BackButton heading={'About US'} />

                {/* Hero Image */}
                <View className='mt-6 overflow-hidden'>
                    <Image 
                        source={require('../../assets/images/about.png')}
                        className='w-full h-96'
                        resizeMode='cover'
                    />
                    {/* Placeholder for dummy image */}
                    {/* <View className='w-full h-96 bg-gray-300 items-center justify-center'>
                        <Text className='text-gray-500 font-poppins'>Pandit Image</Text>
                    </View> */}
                </View>

                {/* About Section */}
                <View className='mt-6'>
                    <View className='flex flex-row items-center mb-3'>
                        <Text className='text-xl font-poppinsBold font-bold text-slate-800'>
                            About Pandit Prashant Shastri
                        </Text>
                    </View>

                    <Text className='text-sm font-poppins text-slate-500 leading-6 mb-4'>
                        Welcome to a sacred journey of self-discovery and cosmic understanding. I am Pandit Prashant Suryavanshi, also known as Pandit Prashant Shastri, a dedicated Vedic astrologer and spiritual guide with over 15 years of transformative experience in helping souls navigate their divine path.
                    </Text>

                    <Text className='text-sm font-poppins text-slate-500 leading-6 mb-4'>
                        My spiritual awakening began in my early years, blessed by an ancient lineage of Vedic scholars and guided by the timeless wisdom of our sacred scriptures. Through decades of devoted study, meditation, and practice, I have developed a unique approach that honors traditional Vedic principles while embracing the evolving consciousness of modern seekers.
                    </Text>

                    <Text className='text-sm font-poppins text-slate-500 leading-6 mb-4'>
                        What distinguishes my practice is the profound understanding that astrology transcends mere prediction —it is a divine science of transformation, personal evolution, and soul awakening. Every consultation becomes a sacred dialogue between your inner wisdom, cosmic energies, and the eternal guidance that flows through us all.
                    </Text>

                    <Text className='text-sm font-poppins text-slate-500 leading-6'>
                        Having served over 10,000+ clients worldwide, I am honored to be recognized as a trusted voice in the spiritual community, with a growing presence across digital platforms where ancient wisdom meets modern accessibility.
                    </Text>
                </View>

                {/* Philosophy Section */}
                <View className='mt-8'>
                    <Text className='text-xl font-poppinsBold text-slate-800 mb-1'>
                        Our <Text className='text-orange-500'>Philosophy</Text>
                        <Text className='text-orange-500'> & Mission</Text>
                    </Text>

                    <Text className='text-sm font-poppins text-slate-500 leading-6 mb-6'>
                        Bridging timeless Vedic wisdom with contemporary understanding for profound healing and spiritual growth
                    </Text>

                    {/* Philosophy Cards */}
                    <View className='flex gap-6 mb-6'>
                        {philosophyItems.map((item) => (
                            <View key={item.id} className='items-center bg-white p-4 rounded-lg border border-[#00000026]'>
                                {/* Icon Circle */}
                                <View 
                                    className='w-16 h-16 rounded-full items-center justify-center mb-4'
                                    style={{ backgroundColor: item.bgColor }}
                                >
                                    {item.icon}
                                </View>

                                {/* Title */}
                                <Text className='text-base font-poppinsSemiBold text-slate-800 mb-2 text-center'>
                                    {item.title}
                                </Text>

                                {/* Description */}
                                <Text className='text-sm font-poppins text-slate-500 leading-6 text-center px-2'>
                                    {item.description}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}