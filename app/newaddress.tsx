import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    PermissionsAndroid,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import NotificationPopup from "./succesaddress";

const SimpleMapView = ({ region, onPress, markerLocation, style }) => {
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMapLoaded(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleMapPress = () => {
        if (onPress) {
            const lat = region.latitude + (Math.random() - 0.5) * 0.01;
            const lng = region.longitude + (Math.random() - 0.5) * 0.01;
            onPress({
                nativeEvent: { coordinate: { latitude: lat, longitude: lng } },
            });
        }
    };

    return (
        <TouchableOpacity
            style={[style, styles.simpleMapContainer]}
            onPress={handleMapPress}
            activeOpacity={0.8}
        >
            <View style={styles.simpleMapContent}>
                <Text style={styles.simpleMapText}>
                    {mapLoaded ? "Interactive Map" : "Loading Map..."}
                </Text>
                <Text style={styles.simpleMapSubtext}>
                    Tap anywhere to place marker
                </Text>
                {markerLocation && (
                    <View style={styles.simpleMarker}>
                        <Text style={styles.simpleMarkerText}>📍</Text>
                    </View>
                )}
                <View style={styles.simpleGrid}>
                    {[...Array(5)].map((_, i) => (
                        <View
                            key={`h-${i}`}
                            style={[styles.simpleGridLine, { top: `${i * 20}%` }]}
                        />
                    ))}
                    {[...Array(5)].map((_, i) => (
                        <View
                            key={`v-${i}`}
                            style={[
                                styles.simpleGridLine,
                                styles.simpleGridLineVertical,
                                { left: `${i * 20}%` },
                            ]}
                        />
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const AddressInputScreen = () => {
    const [showNotificationPopup, setShowNotificationPopup] = useState(false);
    const [location, setLocation] = useState({
        latitude: 27.7172,
        longitude: 85.324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [markerLocation, setMarkerLocation] = useState({
        latitude: 27.7172,
        longitude: 85.324,
    });
    const [addressNickname, setAddressNickname] = useState("");
    const [fullAddress, setFullAddress] = useState("");
    const [isDefaultAddress, setIsDefaultAddress] = useState(false);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        if (Platform.OS === "web") {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    ({ coords }) => {
                        const newLoc = {
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        };
                        setLocation(newLoc);
                        setMarkerLocation({
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                        });
                    },
                    () => Alert.alert("Error", "Could not get current location")
                );
            }
        } else if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Native geolocation logic
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const handleMapPress = ({ nativeEvent: { coordinate } }) => {
        setMarkerLocation(coordinate);
        setFullAddress(
            `Lat: ${coordinate.latitude.toFixed(
                6
            )}, Lng: ${coordinate.longitude.toFixed(6)}`
        );
    };

    const handleAddAddress = () => {
        if (!addressNickname.trim())
            return Alert.alert("Error", "Please select an address nickname");
        if (!fullAddress.trim())
            return Alert.alert(
                "Error",
                "Please enter a full address or select a location on the map"
            );

        const addressData = {
            nickname: addressNickname,
            fullAddress,
            coordinates: markerLocation,
            isDefault: isDefaultAddress,
        };

        console.log("Address Data:", addressData);
        Alert.alert("Success", "Address added successfully!");
        setAddressNickname("");
        setFullAddress("");
        setIsDefaultAddress(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.mapContainer}>
                        <SimpleMapView
                            style={styles.map}
                            region={location}
                            onPress={handleMapPress}
                            markerLocation={markerLocation}
                        />
                    </View>

                    <View style={styles.formContainer}>
                        <Text style={styles.headerText}>Address</Text>

                        <Text style={styles.label}>Address Nickname</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={addressNickname}
                                onValueChange={setAddressNickname}
                                style={styles.picker}
                            >
                                <Picker.Item label="Choose one" value="" />
                                <Picker.Item label="Home" value="home" />
                                <Picker.Item label="Work" value="work" />
                                <Picker.Item label="Other" value="other" />
                            </Picker>
                        </View>

                        <Text style={styles.label}>Full Address</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your full address"
                            value={fullAddress}
                            onChangeText={setFullAddress}
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                        />

                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setIsDefaultAddress(!isDefaultAddress)}
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    isDefaultAddress && styles.checkboxChecked,
                                ]}
                            >
                                {isDefaultAddress && <Text style={styles.checkmark}>✓</Text>}
                            </View>
                            <Text style={styles.checkboxLabel}>
                                Make this as a default address
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => setShowNotificationPopup(true)}
                        >
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>

                    {showNotificationPopup && (
                        <NotificationPopup
                            visible={showNotificationPopup}
                            onResponse={(allowed) => {
                                console.log("Notification allowed?", allowed);
                                setShowNotificationPopup(false);
                            }}
                        />
                    )}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 50
    },
    mapContainer: {
        height: 300
    },
    map: {
        flex: 1
    },
    simpleMapContainer: {
        flex: 1
    },
    simpleMapContent: {
        flex: 1,
        backgroundColor: "#e8f5e8",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        margin: 10,
        position: "relative",
    },
    simpleMapText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2e7d32"
    },
    simpleMapSubtext: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10
    },
    simpleMarker: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -10 }, { translateY: -10 }],
    },
    simpleMarkerText: {
        fontSize: 24
    },
    simpleGrid: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    simpleGridLine: {
        position: "absolute",
        backgroundColor: "#c8e6c9",
        height: 1,
        width: "100%",
    },
    simpleGridLineVertical: {
        width: 1,
        height: "100%"
    },
    formContainer: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        flex: 1,
        minHeight: 450,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
        marginTop: 15
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        height: 45,
        justifyContent: "center",
    },
    picker: {
        height: "100%",
        color: "#333"
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
        minHeight: 100,
        color: "#333",
        lineHeight: 20,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        paddingVertical: 5,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 3,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    checkboxChecked: {
        backgroundColor: "#e91e63",
        borderColor: "#e91e63"
    },
    checkmark: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold"
    },
    checkboxLabel: {
        fontSize: 14,
        color: "#666",
        flex: 1
    },
    addButton: {
        backgroundColor: "#e91e63",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
    },
    addButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
});

export default AddressInputScreen;
