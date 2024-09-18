import { View, Text, ImageBackground, StatusBar, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from "@expo/vector-icons";


import meditationImages from '@/constants/meditation-images';
import AppGradient from '@/components/AppGradient';
import { router, useLocalSearchParams } from 'expo-router';

const Meditate = () => {
  const { id } = useLocalSearchParams();

  // State to track whether the meditation session is active
  const [isMeditating, setMeditating] = useState(false);
  const [secondsRemaining, setDuration] = useState(600); // Hardcoded duration (10 mins = 600 seconds)

  // Timer logic using useEffect to decrement seconds
  useEffect(() => {
    let timerId: any;

    if (isMeditating && secondsRemaining > 0) {
      timerId = setInterval(() => {
        setDuration(prev => prev - 1);
      }, 1000);
    }

    if (secondsRemaining === 0) {
      setMeditating(false); // Stop meditation when timer hits zero
    }

    return () => clearInterval(timerId); // Clear the interval on component unmount or timer reset
  }, [isMeditating, secondsRemaining]);

  // Function to format seconds into MM:SS format
  const formatTime = () => {
    const minutes = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');
    const seconds = String(secondsRemaining % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Toggle meditation status (start/stop)
  const toggleMeditation = () => {
    setMeditating(!isMeditating);
  };

  // Hardcoded adjust duration logic for now
  const adjustDuration = () => {
    if (isMeditating) setMeditating(false); // Stop the timer if adjusting during the session
    setDuration(300); // Adjust the duration to 5 minutes (300 seconds)
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={meditationImages[Number(id) - 1]} // Hardcoded background image
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]} // Gradient for background
        >
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-4 z-10"
          >
            <AntDesign name="leftcircle" size={35} color="white" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="ml-5 mt-2 text-4xl text-blue-800 font-rmono">
                {formatTime()} {/* Display formatted time */}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            {/* Simple Button for Adjust Duration */}
            <TouchableOpacity
              onPress={adjustDuration}
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
              onPress={toggleMeditation}
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
