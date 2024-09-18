import { View, Text, StatusBar, Platform, FlatList, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import AppGradient from '@/components/AppGradient'

import { MEDITATION_DATA } from '@/constants/MeditationData'
import MEDITATION_IMAGES from '@/constants/meditation-images'
import { router } from 'expo-router'
import meditationImages from '@/constants/meditation-images'
import { LinearGradient } from 'expo-linear-gradient'

const NatureMeditate = () => {
    return (
        <View className="flex-1">
            {/* Set the status bar style to light-content for both iOS and Android */}
            <StatusBar
                barStyle="light-content"
                translucent={true}
                backgroundColor="transparent"
            />
            <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
                <View className="mb-6">
                    <Text className="text-gray-200 mb-3 font-bold text-4xl text-left">
                        Welcome Steven
                    </Text>
                    <Text className="text-indigo-100 text-xl font-medium">
                        Start your meditation practice today
                    </Text>
                </View>
                <View>
                    <FlatList data={MEDITATION_DATA} className='mb-20' keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() =>
                                    router.push(`/meditate/${item.id}`)
                                }
                                className="h-48 my-3 mb-5 rounded-xl overflow-hidden"
                            >
                                <ImageBackground
                                    source={MEDITATION_IMAGES[item.id - 1]}
                                    resizeMode="cover"
                                    className='flex-1 rounded-lg justify-center'
                                >
                                    <LinearGradient
                                        // Gradient from transparent to black
                                        colors={[
                                            "transparent",
                                            "rgba(0,0,0,0.8)",
                                        ]}
                                        className='flex-1 justify-center items-center'
                                    >
                                        <Text className="text-gray-100 text-3xl font-bold text-center">
                                            {item.title}
                                        </Text>
                                    </LinearGradient>
                                </ImageBackground>
                            </Pressable>
                        )}
                    />
                </View>
            </AppGradient>
        </View>
    )
}


export default NatureMeditate