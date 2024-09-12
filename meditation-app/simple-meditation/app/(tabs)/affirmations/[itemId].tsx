import { View, Text, ImageBackground, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory';
import AFFIRMATION_GALLERY from '@/constants/affirmations-gallery';
import AntDesign from '@expo/vector-icons/AntDesign';
import AppGradient from '@/components/AppGradient';

const AffirmationPractice = () => {

    const { itemId } = useLocalSearchParams();

    const [affirmation, setAffirmation] = useState<GalleryPreviewData>();

    useEffect(() => {
        for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
            const affirmationData = AFFIRMATION_GALLERY[idx].data;

            const affirmationToStart = affirmationData.find(
                (a) => a.id === Number(itemId)
            );

            if (affirmationToStart) {
                setAffirmation(affirmationToStart);
                return;
            }
        }
    }, []);

    return (
        <View className="flex-1">
            <ImageBackground
                source={affirmation?.image}
                resizeMode="cover"
                className="flex-1"
            >
                <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
                    <Pressable
                        onPress={() => router.back()}
                        className="absolute top-16 left-6 z-10"
                    >
                        <AntDesign name="leftcircle" size={35} color="white" />
                    </Pressable>

                    {/* <ScrollView
                        className="mt-20"
                        showsVerticalScrollIndicator={false}
                    >
                        <View className="h-full border-white justify-center">
                            <View className="h-4/5 justify-center">
                                {sentences.map((sentence, idx) => (
                                    <Text
                                        className="text-white text-3xl mb-12 font-bold text-center"
                                        key={idx}
                                    >
                                        {sentence}.
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </ScrollView> */}
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default AffirmationPractice