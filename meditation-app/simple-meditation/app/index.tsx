import React from 'react';
import { View, Text, ImageBackground, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import beachImage from "@/assets/meditation-images/beach.webp";
import CustomButton from '@/components/CustomButton';

const App = () => {
  return (
    <View className="flex-1">
      {/* StatusBar component from expo-status-bar to manage the status bar on both iOS and Android */}
      <StatusBar
        style="light"
        translucent={true} // Makes the status bar translucent
        backgroundColor={Platform.OS === 'android' ? "rgba(0,0,0,0.4)" : "transparent"}
      />

      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearGradient
          className="flex-1"
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
        >
          {/* SafeAreaView will help on iOS, and we'll add padding on Android */}
          <SafeAreaView className="flex-1 mx-6 my-12 justify-between">
            <View
              className={Platform.OS === 'android' ? 'mt-11' : ''}
            >
              <Text className="text-center text-white font-bold text-4xl mt-4">Simple Meditation</Text>
              <Text className="text-center text-white text-regular text-lg mt-4">Simplifying Meditation for Everyone</Text>
            </View>

            <View>
              <CustomButton
                onPress={() => console.log("tap")}
                title="Get Started"
              />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default App;
