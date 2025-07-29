import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SavedStackLayout() {
    const router = useRouter();

    return (
        <Stack
            initialRouteName="detail"
            screenOptions={{
                title: "Account",
                headerTitleAlign: 'center',
                headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
                headerLeft: () => (
                    <TouchableOpacity

                        onPress={() => router.push('/Home')} // navigate to previous tab or screen here
                    >
                        <Ionicons name="arrow-back" size={24} />
                    </TouchableOpacity>
                ),
            }}
        />
    );
}
