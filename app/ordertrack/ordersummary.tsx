import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface OrderSummaryProps {
    items: OrderItem[];
    deliveryFee: number;
    promoCode?: string;
    totalAmount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, deliveryFee, promoCode, totalAmount }) => (
    <View style={styles.container}>
        {items.map((item, index) => (
            <View key={index} style={styles.row}>
                <Text style={styles.text}>{item.name} x{item.quantity}</Text>
                <Text style={styles.text}>${item.price * item.quantity}</Text>
            </View>
        ))}
        <View style={styles.row}>
            <Text style={styles.label}>Delivery Fee</Text>
            <Text style={styles.text}>${deliveryFee}</Text>
        </View>
        {promoCode && (
            <View style={styles.row}>
                <Text style={styles.label}>Promo Code ({promoCode})</Text>
                <Text style={styles.text}>- $5</Text> {/* Adjust logic as needed */}
            </View>
        )}
        <View style={styles.row}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>${totalAmount}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 8
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4
    },
    text: {
        fontSize: 14,
        color: '#374151'
    },
    label: {
        fontSize: 14,
        color: '#6B7280'
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827'
    },
});

export default OrderSummary;
