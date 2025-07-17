import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Platform, StatusBar } from 'react-native';

export default function TabLayout() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                backgroundColor: '#fff',
            }}
        >
            <Tabs
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: '#FC0079',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName: React.ComponentProps<typeof Ionicons>['name'];
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
                            default:
                                iconName = 'ellipse';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarStyle: {
                        height: 70,
                        elevation: 0,
                        shadowOpacity: 0,
                        borderTopWidth: 0,
                    },
                })}
            >
                <Tabs.Screen name="Home" />
                <Tabs.Screen name="Saved" />
                <Tabs.Screen name="Cart" />
                <Tabs.Screen name="Account" />

            </Tabs>
        </SafeAreaView>
    );
}
