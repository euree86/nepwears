import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#FC0079',
                tabBarInactiveTintColor: 'gray',
                headerShown: route.name === 'Saved', // 👈 show header only on Saved tab
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
            <Tabs.Screen
                name="Saved"
                options={{
                    title: 'Saved Items',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#fff',
                        height: Platform.OS === 'android' ? 80 : 80, // adjust height
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: Platform.OS === 'android' ? 7 : 0, // fine-tune spacing on Android
                    },
                }}
            />

            <Tabs.Screen name="Cart" options={{
                title: 'My Cart',
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    height: Platform.OS === 'android' ? 80 : 80, // adjust height
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: Platform.OS === 'android' ? 7 : 0, // fine-tune spacing on Android
                },
            }} />
            <Tabs.Screen name="Account" options={{
                title: 'Account',
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    height: Platform.OS === 'android' ? 80 : 80, // adjust height
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: Platform.OS === 'android' ? 8 : 0, // fine-tune spacing on Android
                },
            }} />
        </Tabs>
    );
}
