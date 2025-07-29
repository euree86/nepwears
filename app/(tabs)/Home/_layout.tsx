import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SavedStackLayout() {
    const router = useRouter();

    return (
        <Stack
            initialRouteName="index"
            screenOptions={{

                headerShown: false,
            }}
        />
    );
}
