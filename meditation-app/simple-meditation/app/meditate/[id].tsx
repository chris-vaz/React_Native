import { View, Text, ImageBackground, StatusBar, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { AntDesign } from "@expo/vector-icons";
import { Audio } from 'expo-av';

import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData';
import meditationImages from '@/constants/meditation-images';
import AppGradient from '@/components/AppGradient';
import { router, useLocalSearchParams } from 'expo-router';
import { TimerContext } from '@/context/TimerContext';

const Meditate = () => {
  const { id } = useLocalSearchParams();

  const { duration: secondsRemaining, setDuration } = useContext(TimerContext);

  // State to track whether the meditation session is active
  const [isMeditating, setMeditating] = useState(false);
  // const [secondsRemaining, setDuration] = useState(600); 
  const [isPlayingAudio, setPlayingAudio] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // Exit early when we reach 0
    if (secondsRemaining === 0) {
      if (isPlayingAudio) audioSound?.pauseAsync();
      setMeditating(false);
      setPlayingAudio(false);
      return;
    }

    if (isMeditating) {
      // Save the interval ID to clear it when the component unmounts
      timerId = setTimeout(() => {
        setDuration(secondsRemaining - 1);
      }, 1000);
    }

    // Clear timeout if the component is unmounted or the time left changes
    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating]);

  useEffect(() => {
    return () => {
      setDuration(10);
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(
      AUDIO_FILES[audioFileName]
    );
    setSound(sound);
    return sound;
  };

  const togglePlayPause = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound?.playAsync();
      setPlayingAudio(true);
    } else {
      await sound?.pauseAsync();
      setPlayingAudio(false);
    }
  };

  async function toggleMeditationSessionStatus() {
    if (secondsRemaining === 0) setDuration(10);

    setMeditating(!isMeditating);

    await togglePlayPause();
  }

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();

    router.push("/(modal)/adjust-meditation-duration");
  };

  // Format the timeLeft to ensure two digits are displayed
  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        source={meditationImages[Number(id) - 1]} // Hardcoded background image
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]} // Gradient for background
        >
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-4 z-10"
          >
            <AntDesign name="leftcircle" size={35} color="white" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="mt-2 text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            {/* Simple Button for Adjust Duration */}
            <TouchableOpacity
              onPress={handleAdjustDuration}
              style={{
                backgroundColor: '#3498db',
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>Adjust Duration</Text>
            </TouchableOpacity>

            {/* Simple Button for Start/Stop Meditation */}
            <TouchableOpacity
              onPress={toggleMeditationSessionStatus}
              style={{
                backgroundColor: isMeditating ? '#e74c3c' : '#2ecc71', // Red if stop, green if start
                padding: 15,
                borderRadius: 15,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>
                {isMeditating ? 'Stop Meditation' : 'Start Meditation'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Set StatusBar to light content for both iOS and Android */}
          <StatusBar barStyle="light-content" />
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
