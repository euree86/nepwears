import React from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

const SearchLocationScreen = () => {
    const router = useRouter();
    const [searchText, setSearchText] = React.useState('');

    const handleUseCurrentLocation = async () => {
        // Ask for permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Location permission is needed to get your current location.');
            return;
        }

        // Get current position
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // For now, just log it (or do whatever you want)
        console.log('Current location:', latitude, longitude);

        // Example: Navigate to another page passing location as query params
        // Adjust route path as needed
        router.push({
            pathname: '/locationpermission',
            params: { latitude: latitude.toString(), longitude: longitude.toString() },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Find your location"
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholderTextColor="#999"
                    />
                </View>

                <TouchableOpacity
                    style={styles.currentLocationButton}
                    onPress={handleUseCurrentLocation}
                >
                    <View style={styles.locationIcon}>
                        <Text style={styles.locationIconText}>📍</Text>
                    </View>
                    <Text style={styles.currentLocationText}>Use my current location</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    searchContainer: {
        marginBottom: 20,
    },
    searchInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    currentLocationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    locationIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationIconText: {
        fontSize: 16,
        color: '#e91e63',
    },
    currentLocationText: {
        fontSize: 16,
        color: '#e91e63',
        fontWeight: '500',
    },
});

export default SearchLocationScreen;
