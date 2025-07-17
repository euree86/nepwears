import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    PermissionsAndroid,
    Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NotificationPopup from "./succesaddress"

// Web-compatible map component
const WebMapView = ({ region, onPress, markerLocation, style }) => {
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        // Simulate map loading
        const timer = setTimeout(() => setMapLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleMapClick = (event) => {
        if (onPress) {
            // Convert click coordinates to lat/lng (simplified)
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Simple conversion (this would need proper map projection in real app)
            const lat = region.latitude + (0.5 - y / rect.height) * region.latitudeDelta;
            const lng = region.longitude + (x / rect.width - 0.5) * region.longitudeDelta;

            onPress({
                nativeEvent: {
                    coordinate: { latitude: lat, longitude: lng }
                }
            });
        }
    };

    return (
        <View style={[style, styles.webMapContainer]}>
            <View style={styles.webMapPlaceholder} onClick={handleMapClick}>
                <Text style={styles.webMapText}>
                    {mapLoaded ? 'Interactive Map' : 'Loading Map...'}
                </Text>
                <Text style={styles.webMapSubtext}>Tap anywhere to place marker</Text>

                {/* Marker representation */}
                {markerLocation && (
                    <View style={styles.webMarker}>
                        <Text style={styles.webMarkerText}>📍</Text>
                    </View>
                )}

                {/* Grid lines to make it look more map-like */}
                <View style={styles.webMapGrid}>
                    {[...Array(5)].map((_, i) => (
                        <View key={`h-${i}`} style={[styles.webGridLine, { top: `${i * 20}%` }]} />
                    ))}
                    {[...Array(5)].map((_, i) => (
                        <View key={`v-${i}`} style={[styles.webGridLine, styles.webGridLineVertical, { left: `${i * 20}%` }]} />
                    ))}
                </View>
            </View>
        </View>
    );
};

// Native map component (will only work in native environment)
const NativeMapView = ({ region, onPress, markerLocation, style }) => {
    // This would be the react-native-maps implementation
    // For now, we'll use the web fallback
    return <WebMapView region={region} onPress={onPress} markerLocation={markerLocation} style={style} />;
};

const AddressInputScreen = () => {

    const [showNotificationPopup, setShowNotificationPopup] = useState(false);

    const [location, setLocation] = useState({
        latitude: 27.7172, // Default to Kathmandu
        longitude: 85.3240,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [markerLocation, setMarkerLocation] = useState({
        latitude: 27.7172,
        longitude: 85.3240,
    });
    const [addressNickname, setAddressNickname] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [isDefaultAddress, setIsDefaultAddress] = useState(false);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'web') {
            // Web geolocation API
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const newLocation = {
                            latitude,
                            longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        };
                        setLocation(newLocation);
                        setMarkerLocation({ latitude, longitude });
                    },
                    (error) => {
                        console.log('Error getting location:', error);
                        Alert.alert('Error', 'Could not get current location');
                    }
                );
            }
        } else if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location to show your current position on the map.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            getCurrentLocation();
        }
    };

    const getCurrentLocation = () => {
        // This would use @react-native-community/geolocation in native environment
        // For now, we'll use the default location
        console.log('Getting current location...');
    };

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setMarkerLocation({ latitude, longitude });

        // Reverse geocoding would go here to get address from coordinates
        // For now, we'll just update the coordinates
        setFullAddress(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
    };

    const handleAddAddress = () => {
        if (!addressNickname.trim()) {
            Alert.alert('Error', 'Please enter an address nickname');
            return;
        }

        if (!fullAddress.trim()) {
            Alert.alert('Error', 'Please enter a full address or select a location on the map');
            return;
        }

        const addressData = {
            nickname: addressNickname,
            fullAddress: fullAddress,
            coordinates: markerLocation,
            isDefault: isDefaultAddress,
        };

        console.log('Address Data:', addressData);
        Alert.alert('Success', 'Address added successfully!');

        // Reset form
        setAddressNickname('');
        setFullAddress('');
        setIsDefaultAddress(false);
    };

    const MapComponent = Platform.OS === 'web' ? WebMapView : NativeMapView;
    const handleNotificationResponse = (allowed: boolean) => {
        console.log("Notification allowed?", allowed);
        setShowNotificationPopup(false);
    };
    return (
        <View style={styles.container}>
            {/* Map Section */}
            <View style={styles.mapContainer}>
                <MapComponent
                    style={styles.map}
                    region={location}
                    onPress={handleMapPress}
                    markerLocation={markerLocation}
                />
            </View>

            {/* Address Form Section */}
            <View style={styles.formContainer}>
                <Text style={styles.headerText}>Address</Text>

                {/* Address Nickname */}
                <Text style={styles.label}>Address Nickname</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={addressNickname}
                        onValueChange={(itemValue) => setAddressNickname(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Choose one" value="" />
                        <Picker.Item label="Home" value="home" />
                        <Picker.Item label="Work" value="work" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                </View>

                {/* Full Address */}
                <Text style={styles.label}>Full Address</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your full address"
                    value={fullAddress}
                    onChangeText={setFullAddress}
                    multiline={true}
                    numberOfLines={3}
                />

                {/* Default Address Checkbox */}
                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setIsDefaultAddress(!isDefaultAddress)}
                >
                    <View style={[styles.checkbox, isDefaultAddress && styles.checkboxChecked]}>
                        {isDefaultAddress && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.checkboxLabel}>Make this as a default address</Text>
                </TouchableOpacity>

                {/* Add Button */}
                <TouchableOpacity style={styles.addButton} onPress={() => setShowNotificationPopup(true)}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
            {showNotificationPopup && (
                <NotificationPopup
                    visible={showNotificationPopup}
                    onResponse={handleNotificationResponse}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    mapContainer: {
        flex: 1,
        height: 300,
    },
    map: {
        flex: 1,
    },
    // Web map styles
    webMapContainer: {
        flex: 1,
    },
    webMapPlaceholder: {
        flex: 1,
        backgroundColor: '#e8f5e8',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderRadius: 8,
        margin: 10,
    },
    webMapText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e7d32',
        marginBottom: 5,
    },
    webMapSubtext: {
        fontSize: 14,
        color: '#666',
    },
    webMarker: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -10 }, { translateY: -10 }],
    },
    webMarkerText: {
        fontSize: 24,
    },
    webMapGrid: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    webGridLine: {
        position: 'absolute',
        backgroundColor: '#c8e6c9',
        height: 1,
        width: '100%',
    },
    webGridLineVertical: {
        width: 1,
        height: '100%',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        marginTop: 15,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    picker: {
        height: 50,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        textAlignVertical: 'top',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 3,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#e91e63',
        borderColor: '#e91e63',
    },
    checkmark: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#666',
    },
    addButton: {
        backgroundColor: '#e91e63',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddressInputScreen;