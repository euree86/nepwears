import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import DeliveryAddress from './DeliveryAddress';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './/OrderSummary';
import PromoCode from './/PromoCode';
import Button from '../components/button';
import Header from '../components/header';
import NotificationPopup from '../ordersuccess';

const CheckoutScreen = () => {
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [promoCode, setPromoCode] = useState('');
    const [showNotificationPopup, setShowNotificationPopup] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Checkout" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
                    <DeliveryAddress />
                    <PaymentMethod selectedPayment={selectedPayment} onSelect={setSelectedPayment} />
                    <OrderSummary />
                    <PromoCode promoCode={promoCode} onChange={setPromoCode} />
                    <Button text="Place Order" onPress={() => setShowNotificationPopup(true)} />
                </ScrollView>

                {showNotificationPopup && (
                    <NotificationPopup
                        visible={showNotificationPopup}
                        onResponse={(allowed) => {
                            console.log("Notification allowed?", allowed);
                            setShowNotificationPopup(false);
                        }}
                    />
                )}


            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default CheckoutScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingBottom: 40,
    },
});