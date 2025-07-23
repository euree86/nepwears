import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const SearchLocationScreen = () => {
    const router = useRouter();
    const [searchText, setSearchText] = React.useState('');

    const handleUseCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert.alert('Permission denied', 'Location permission is needed to get your current location.');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        console.log('Current location:', latitude, longitude);

        router.push({
            pathname: '/locationpermission',
            params: { latitude: latitude.toString(), longitude: longitude.toString() },
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={22} color="gray" style={styles.searchIcon} />
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
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 10,
        height: 50,
    },

    searchIcon: {
        marginRight: 8,
    },

    searchInput: {
        flex: 1,
        fontSize: 16,
        height: '100%',
        color: '#333',
    },

    currentLocationButton: {
        flexDirection: 'row',
        alignItems: 'center',

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
