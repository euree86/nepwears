import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderSummary = () => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            {[
                ['Sub Total', 'Rs 1700'],
                ['Delivery Fee', 'Rs 200'],
                ['Discount', 'Rs 100'],
            ].map(([label, value]) => (
                <View style={styles.summaryRow} key={label}>
                    <Text style={styles.summaryLabel}>{label}</Text>
                    <Text style={styles.summaryValue}>{value}</Text>
                </View>
            ))}
            <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>Rs 1900</Text>
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        marginTop: 8,
        paddingTop: 12,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
});

export default OrderSummary;
