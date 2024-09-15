import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';

import { useColorScheme } from 'react-native'; // Import the hook for system theme

// Icons Import
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



const TabsLayout = () => {
    const colorScheme = useColorScheme(); // Get the current color scheme ('light' or 'dark')

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colorScheme === 'dark' ? 'white' : Colors.primary, // Set active color based on theme
                tabBarInactiveTintColor: colorScheme === 'dark' ? 'gray' : 'black', // Set inactive color based on theme
                tabBarStyle: {
                    backgroundColor: colorScheme === 'dark' ? 'black' : 'white', // Change background color based on theme
                    paddingBottom: 8,  // Add some padding at the bottom to move the label up
                    height: 70,         // Optional: Adjust the height of the tab bar
                    borderWidth: 1,      // Add border width
                    borderColor: colorScheme === 'dark' ? 'black' : 'white', // Set border color based on theme
                },
                tabBarLabelStyle: {
                    fontSize: 14,       // Adjust font size if needed
                },
            }}
        >
            <Tabs.Screen
                name="nature-meditate"
                options={{
                    tabBarLabel: "Meditate",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="flower-tulip"
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="affirmations"
                options={{
                    tabBarLabel: "Affirmations",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="book-open" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

export default TabsLayout;
