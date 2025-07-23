import React from 'react';
import {
    Alert,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const LocationPermissionScreen = () => {
    const router = useRouter();

    const handleAllowLocation = async () => {
        // Request permission directly
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Location permission is needed to continue.');
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            router.push("/Home");
        } catch (error) {
            Alert.alert('Error', 'Could not fetch location. Please try again.');
            console.error(error);
        }
    };


    const handleEnterManually = () => {
        // Navigate to manual location entry screen
        router.push('/locationsearch');  // Adjust route if needed
    };

    return (
        <View style={styles.container}>
            <View style={styles.permissionContainer}>
                <View style={styles.iconContainer}>
                    <View style={styles.locationIconBg}>
                        <MaterialIcons name="location-on" color="#e91e63" style={styles.locationIcon} />
                    </View>
                </View>

                <Text style={styles.title}>What is Your Location?</Text>
                <Text style={styles.subtitle}>
                    We need to know your location in order to suggest nearby services.
                </Text>

                <TouchableOpacity
                    style={styles.allowButton}
                    onPress={handleAllowLocation}
                >
                    <Text style={styles.allowButtonText}>Allow Location Access</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleEnterManually}>
                    <Text style={styles.manualButtonText}>Enter Location Manually</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    permissionContainer: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: "center",
    },
    iconContainer: {
        marginBottom: 30,
    },
    locationIconBg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f3e5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationIcon: {
        fontSize: 52,
        color: '#e91e63',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    allowButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#e91e63',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    allowButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    manualButtonText: {
        color: '#e91e63',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default LocationPermissionScreen;
