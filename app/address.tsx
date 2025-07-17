import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Address = () => {
    const [selectedAddress, setSelectedAddress] = useState('home');
    const router = useRouter();
    const addresses = [
        {
            id: 'home',
            type: 'Home',
            label: 'Default',
            location: 'Naya Baneshwor',
        },
        {
            id: 'office',
            type: 'Office',
            label: '',
            location: 'Sundhara',
        },
        {
            id: 'apartment',
            type: 'Apartment',
            label: '',
            location: 'Purano Baneshwor',
        },
        {
            id: 'parents',
            type: "Parent's House",
            label: '',
            location: 'New Road',
        },
    ];

    type RadioButtonProps = {
        selected: boolean;
    };

    const RadioButton: React.FC<RadioButtonProps> = ({ selected }) => (
        <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
            {selected && <View style={styles.radioButtonInner} />}
        </View>
    );


    const handleAddressSelect = (addressId: string) => {
        setSelectedAddress(addressId);
    };

    const handleAddNewAddress = () => {
        // Handle add new address functionality
        console.log('Add new address pressed');
    };

    const handleApply = () => {
        // Handle apply functionality
        console.log('Apply pressed with selected address:', selectedAddress);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Saved Address</Text>
            </View>

            {/* Address List */}
            <View style={styles.addressList}>
                {addresses.map((address) => (
                    <TouchableOpacity
                        key={address.id}
                        style={styles.addressItem}
                        onPress={() => handleAddressSelect(address.id)}
                        activeOpacity={0.7}
                    >
                        <EvilIcons
                            name="location"
                            size={28}
                            color="#666666"
                            style={styles.locationIcon}
                        />

                        <View style={styles.addressContent}>
                            <View style={styles.addressHeader}>
                                <Text style={styles.addressType}>{address.type}</Text>
                                {address.label && (
                                    <Text style={styles.addressLabel}>{address.label}</Text>
                                )}
                            </View>
                            <Text style={styles.addressLocation}>{address.location}</Text>
                        </View>

                        <RadioButton selected={selectedAddress === address.id} />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Add New Address Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("./newaddress")}
                activeOpacity={0.7}
            >
                <MaterialIcons
                    name="add"
                    size={20}
                    color="#333333"
                    style={styles.addButtonIcon}
                />
                <Text style={styles.addButtonText}>Add New Address</Text>
            </TouchableOpacity>

            {/* Apply Button */}
            <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApply}
                activeOpacity={0.8}
            >
                <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,

    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    addressList: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 8,
        gap: 12,
    },
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    locationIcon: {
        marginRight: 16,
    },
    addressContent: {
        flex: 1,
    },
    addressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    addressType: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        marginRight: 8,
    },
    addressLabel: {
        fontSize: 12,
        color: 'black',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    addressLocation: {
        fontSize: 14,
        color: '#888888',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        borderColor: '#333333',
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#333333',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    addButtonIcon: {
        marginRight: 8,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
    },
    applyButton: {
        marginHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 16,
        backgroundColor: '#FC0079',
        borderRadius: 8,
        alignItems: 'center',
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
});

export default Address;