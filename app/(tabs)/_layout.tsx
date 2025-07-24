import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
    const commonHeaderOptions = {
        headerShown: true,
        headerTitleAlign: 'center' as const,
        headerStyle: {
            backgroundColor: '#fff',
            height: 45, // Reduced height
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            paddingTop: 0,
        },
        headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 0, // Removed marginTop
        },
        headerStatusBarHeight: 0, // Removes extra padding for status bar
    };

    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#FC0079',
                tabBarInactiveTintColor: 'gray',
                // Show header only on all tabs except Home (override in Screens below)
                headerShown: route.name !== 'Home',
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
            <Tabs.Screen
                name="Home"
                options={{
                    title: 'Home',
                    headerShown: false, // explicitly hide header on Home tab
                }}
            />

            <Tabs.Screen
                name="Saved"
                options={{
                    title: 'Saved Items',
                    ...commonHeaderOptions,
                }}
            />

            <Tabs.Screen
                name="Cart"
                options={{
                    title: 'My Cart',
                    ...commonHeaderOptions,
                }}
            />

            <Tabs.Screen
                name="Account"
                options={{
                    title: 'Account',
                    ...commonHeaderOptions,
                }}
            />
        </Tabs>
    );
}
