import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const DeliveryAddress = () => {
    const router = useRouter();

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Delivery Address</Text>
                <TouchableOpacity onPress={() => router.push("/address")}>
                    <Text style={styles.changeLink}>Change</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.addressContainer}>
                <MaterialCommunityIcons
                    name="map-marker"
                    size={24}
                    color="#e91e63"
                    style={styles.locationIcon}
                />
                <View>
                    <Text style={styles.addressTitle}>Home</Text>
                    <Text style={styles.addressText}>Naya Baneshwor, Kathmandu</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    changeLink: {
        color: '#e91e63',
        fontSize: 14,
        fontWeight: '500',
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        marginRight: 12,
    },
    addressTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    addressText: {
        fontSize: 12,
        color: '#666',
    },
});

export default DeliveryAddress;
