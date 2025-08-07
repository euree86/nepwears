import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';

import Header from '../components/header';
import Button from '../components/button';
import CardImage from './CardImage';
import CardInputForm from './CardInputForm';

import {
    detectCardType,
    validateAndSubmitCard,
    CardType,
    formatCardNumberInput,
    formatCardNumberForDisplay,
    formatExpiryDateInput,
    formatSecurityCode,
    formatCardholderName,
} from './CardValidation';

const { width: screenWidth } = Dimensions.get('window');

const AddCardScreen = () => {
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [rawCardNumber, setRawCardNumber] = useState(''); // Store unformatted number
    const [expiryDate, setExpiryDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [cardType, setCardType] = useState<CardType | null>(null);

    const handleCardholderNameChange = (text: string) => {
        const formatted = formatCardholderName(text);
        setCardholderName(formatted);
    };

    const handleCardNumberChange = (text: string) => {
        const digitsOnly = text.replace(/\D/g, '');
        const detectedType = detectCardType(digitsOnly);

        setCardType(detectedType);
        setRawCardNumber(digitsOnly);

        // Format for display in input
        const formattedForInput = formatCardNumberInput(digitsOnly, detectedType);
        setCardNumber(formattedForInput);
    };

    const handleExpiryDateChange = (text: string) => {
        const formatted = formatExpiryDateInput(text);
        setExpiryDate(formatted);
    };

    const handleSecurityCodeChange = (text: string) => {
        const formatted = formatSecurityCode(text, cardType);
        setSecurityCode(formatted);
    };

    const handleAddCard = () => {
        const isValid = validateAndSubmitCard({
            cardholderName,
            cardNumber: rawCardNumber,
            cardType,
            expiryDate,
            securityCode,
        });

        if (isValid) {
            console.log('Card Saved:', {
                cardholderName,
                cardNumber: rawCardNumber,
                maskedCardNumber: formatCardNumberForDisplay(rawCardNumber, cardType),
                expiryDate,
                cardType,
            });

            // Reset form after successful submission
            setCardholderName('');
            setCardNumber('');
            setRawCardNumber('');
            setExpiryDate('');
            setSecurityCode('');
            setCardType(null);
        }
    };

    const showSecurityCodeInfo = () => {
        const message = cardType === 'amex'
            ? 'For American Express cards, the 4-digit security code is located on the front of your card, above the card number.'
            : 'For Visa, Mastercard, and Discover cards, the 3-digit security code (CVV) is located on the back of your card.';

        Alert.alert('Security Code Help', message, [
            { text: 'Got it', style: 'default' }
        ]);
    };

    // Get masked card number for display
    const maskedCardNumber = rawCardNumber
        ? formatCardNumberForDisplay(rawCardNumber, cardType)
        : (cardType === 'amex' ? '**** ****** *****' : '**** **** **** ****');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <Header title="Add New Card" />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Add Payment Card</Text>
                        <Text style={styles.headerSubtitle}>
                            Enter your debit or credit card details securely
                        </Text>
                    </View>

                    <View style={styles.cardWrapper}>
                        <CardImage
                            cardType={cardType || 'unknown'}
                            maskedCardNumber={maskedCardNumber}
                            cardholderName={cardholderName}
                            expiryDate={expiryDate}
                        />
                    </View>

                    <View style={styles.formWrapper}>
                        <CardInputForm
                            cardholderName={cardholderName}
                            onChangeCardholderName={handleCardholderNameChange}
                            cardNumber={cardNumber}
                            onChangeCardNumber={handleCardNumberChange}
                            expiryDate={expiryDate}
                            onChangeExpiryDate={handleExpiryDateChange}
                            securityCode={securityCode}
                            onChangeSecurityCode={handleSecurityCodeChange}
                            cardType={cardType}
                            onShowSecurityInfo={showSecurityCodeInfo}
                        />
                    </View>
                </ScrollView>

                <View style={styles.buttonWrapper}>
                    <Button
                        text={cardType ? `Add ${cardType.toUpperCase()} Card` : 'Add Card'}
                        onPress={handleAddCard}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20
    },
    scrollContent: {
        paddingBottom: 0,
    },
    header: {
        paddingTop: 16,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#666',
        fontWeight: '400',
    },
    cardWrapper: {
        paddingVertical: 20,
    },
    formWrapper: {

    },
    buttonWrapper: {
        paddingHorizontal: 20,


    },
});

export default AddCardScreen;