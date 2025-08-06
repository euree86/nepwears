import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    selectedPayment: string;
    onSelect: (method: string) => void;
}

const PaymentMethod = ({ selectedPayment, onSelect }: Props) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentMethods}>
                {['card', 'cash', 'pay'].map((method) => (
                    <TouchableOpacity
                        key={method}
                        style={[
                            styles.paymentButton,
                            selectedPayment === method && styles.paymentButtonActive,
                        ]}
                        onPress={() => onSelect(method)}
                    >
                        <MaterialCommunityIcons
                            name={
                                method === 'card' ? 'credit-card-outline' :
                                    method === 'cash' ? 'cash' :
                                        'cellphone'
                            }
                            size={16}
                            color={selectedPayment === method ? 'white' : '#666'}
                        />
                        <Text
                            style={[
                                styles.paymentButtonText,
                                selectedPayment === method && styles.paymentButtonTextActive,
                                { marginLeft: 6 },
                            ]}
                        >
                            {method.charAt(0).toUpperCase() + method.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {selectedPayment === 'card' && (
                <View style={styles.cardContainer}>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardBrand}>VISA</Text>
                        <Text style={styles.cardNumber}>**** **** **** 2512</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <MaterialCommunityIcons name="pencil" size={20} color="#333" />
                    </TouchableOpacity>
                </View>
            )}
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
    },
    paymentMethods: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'space-between',
    },
    paymentButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
    },
    paymentButtonActive: {
        backgroundColor: '#e91e63',
        borderColor: '#e91e63',
    },
    paymentButtonText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    paymentButtonTextActive: {
        color: 'white',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    cardInfo: {
        flex: 1,
    },
    cardBrand: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    cardNumber: {
        fontSize: 14,
        color: '#666',
    },
    editButton: {
        padding: 4,
    },
});

export default PaymentMethod;
