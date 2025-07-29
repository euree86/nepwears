import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#FC0079',
                tabBarInactiveTintColor: 'gray',
                headerShown: false, // disable header here, will handle in stack inside Saved tab
                tabBarIcon: ({ color, size }) => {
                    let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'ellipse';

                    switch (route.name) {
                        case 'Account':
                            iconName = 'person';
                            break;
                        case 'Saved':
                            iconName = 'bookmark';
                            break;
                        case 'Cart':
                            iconName = 'cart';
                            break;
                        case 'Home':
                            iconName = 'home';
                            break;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarStyle: {
                    height: 70,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderTopWidth: 0,
                    paddingBottom: Platform.OS === 'android' ? 10 : 20,
                },
            })}
        >
            <Tabs.Screen name="Home" options={{ title: 'Home' }} />
            <Tabs.Screen name="Saved" options={{ title: 'Saved Items' }} />
            <Tabs.Screen name="Cart" options={{ title: 'My Cart' }} />
            <Tabs.Screen name="Account" options={{ title: 'Account' }} />
        </Tabs>
    );
}
