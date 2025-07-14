import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const LocationPermissionScreen = () => {
    const handleAllowLocation = () => {
        // Handle location permission
        console.log('Allow location access');
    };

    const handleEnterManually = () => {
        // Navigate or show manual location input screen
        console.log('Enter location manually');
    };

    return (
        <View style={styles.container}>
            <View style={styles.permissionContainer}>
                <View style={styles.iconContainer}>
                    <View style={styles.locationIconBg}>
                        <Text style={styles.locationIcon}>📍</Text>
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

                <TouchableOpacity
                    style={styles.manualButton}
                    onPress={handleEnterManually}
                >
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
        paddingTop: 60,
        alignItems: 'center',
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
        fontSize: 32,
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
        marginBottom: 15,
    },
    allowButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    manualButton: {
        paddingVertical: 15,
    },
    manualButtonText: {
        color: '#e91e63',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default LocationPermissionScreen;
