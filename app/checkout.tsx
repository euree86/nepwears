import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CheckoutScreen = () => {
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [promoCode, setPromoCode] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>

                {/* Delivery Address Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Delivery Address</Text>
                        <TouchableOpacity>
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

                {/* Payment Method Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.paymentMethods}>
                        <TouchableOpacity
                            style={[
                                styles.paymentButton,
                                selectedPayment === 'card' && styles.paymentButtonActive,
                            ]}
                            onPress={() => setSelectedPayment('card')}
                        >
                            <MaterialCommunityIcons
                                name="credit-card-outline"
                                size={16}
                                color={selectedPayment === 'card' ? 'white' : '#666'}
                            />
                            <Text
                                style={[
                                    styles.paymentButtonText,
                                    selectedPayment === 'card' && styles.paymentButtonTextActive,
                                    { marginLeft: 6 },
                                ]}
                            >
                                Card
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.paymentButton,
                                selectedPayment === 'cash' && styles.paymentButtonActive,
                            ]}
                            onPress={() => setSelectedPayment('cash')}
                        >
                            <MaterialCommunityIcons
                                name="cash"
                                size={16}
                                color={selectedPayment === 'cash' ? 'white' : '#666'}
                            />
                            <Text
                                style={[
                                    styles.paymentButtonText,
                                    selectedPayment === 'cash' && styles.paymentButtonTextActive,
                                    { marginLeft: 6 },
                                ]}
                            >
                                Cash
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.paymentButton,
                                selectedPayment === 'pay' && styles.paymentButtonActive,
                            ]}
                            onPress={() => setSelectedPayment('pay')}
                        >
                            <MaterialCommunityIcons
                                name="cellphone"
                                size={16}
                                color={selectedPayment === 'pay' ? 'white' : '#666'}
                            />
                            <Text
                                style={[
                                    styles.paymentButtonText,
                                    selectedPayment === 'pay' && styles.paymentButtonTextActive,
                                    { marginLeft: 6 },
                                ]}
                            >
                                Pay
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Card Details */}
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

                {/* Order Summary Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Sub Total</Text>
                        <Text style={styles.summaryValue}>Rs 1700</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Delivery Fee</Text>
                        <Text style={styles.summaryValue}>Rs 200</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Discount</Text>
                        <Text style={styles.summaryValue}>Rs 100</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>Rs 1900</Text>
                    </View>
                </View>

                {/* Promo Code Section */}
                <View style={styles.promoSection}>
                    <View style={styles.promoInputContainer}>
                        <MaterialCommunityIcons name="tag-outline" size={20} color="#e91e63" style={{ marginRight: 8 }} />
                        <TextInput
                            style={styles.promoInput}
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChangeText={setPromoCode}
                        />
                        <TouchableOpacity style={styles.addButton}>
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Place Order Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.placeOrderButton}>
                    <Text style={styles.placeOrderText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
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
    promoSection: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    promoInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    promoInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
        color: '#333',
    },
    addButton: {
        backgroundColor: '#e91e63',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    addButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    bottomContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    placeOrderButton: {
        backgroundColor: '#e91e63',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    placeOrderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CheckoutScreen;
