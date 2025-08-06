import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Address {
    name: string;
    street: string;
    city: string;
    postcode: string;
    country: string;
}

interface DeliveryAddressCardProps {
    address: Address;
}

const DeliveryAddressCard: React.FC<DeliveryAddressCardProps> = ({ address }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Delivery Address</Text>
            <Text style={styles.subheading}>{address.name}</Text>
            <Text style={styles.subheading}>{address.street}</Text>
            <Text style={styles.subheading}>{address.city}, {address.postcode}</Text>
            <Text style={styles.subheading}>{address.country}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 16,

    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    subheading: {
        fontSize: 14,
    },
});

export default DeliveryAddressCard;
