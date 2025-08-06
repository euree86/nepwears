import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NotificationPopup from "./ordersuccess";
import { useRouter } from "expo-router";
import Header from './components/header';

const { width, height } = Dimensions.get('window');

const CheckoutScreen = () => {
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [promoCode, setPromoCode] = useState('');
    const [showNotificationPopup, setShowNotificationPopup] = useState(false);

    const handleNotificationResponse = (allowed: boolean) => {
        console.log("Notification allowed?", allowed);
        setShowNotificationPopup(false);
    };

    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Checkout" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Delivery Address */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Delivery Address</Text>
                            <TouchableOpacity onPress={() => router.push("./address")}>
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

                    {/* Payment Method */}
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
                                    onPress={() => setSelectedPayment(method)}
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

                    {/* Order Summary */}
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

                    {/* Promo Code */}
                    <View style={styles.promoSection}>
                        <View style={styles.promoInputContainer}>
                            <MaterialCommunityIcons
                                name="tag-outline"
                                size={20}
                                color="#e91e63"
                                style={{ marginRight: 8 }}
                            />
                            <TextInput
                                style={styles.promoInput}
                                placeholder="Enter promo code"
                                value={promoCode}
                                onChangeText={setPromoCode}
                                returnKeyType="done"
                            />
                            <TouchableOpacity style={styles.addButton}>
                                <Text style={styles.addButtonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* ✅ Moved Bottom Button inside ScrollView */}
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            style={styles.placeOrderButton}
                            onPress={() => setShowNotificationPopup(true)}
                        >
                            <Text style={styles.placeOrderText}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {showNotificationPopup && (
                    <NotificationPopup
                        visible={showNotificationPopup}
                        onResponse={handleNotificationResponse}
                    />
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        padding: 16,

    },
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
        shadowOffset: { width: 0, height: 2 },
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
        marginTop: 16,
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
