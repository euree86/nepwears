import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddCardScreen = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [maskedCardNumber, setMaskedCardNumber] = useState('');

    // Format card number with spaces and mask all but last 4 digits
    const formatCardNumber = (text) => {
        // Remove all non-digit characters
        const cleaned = text.replace(/\D/g, '').slice(0, 16);
        setCardNumber(cleaned);

        if (cleaned.length === 0) {
            setMaskedCardNumber('');
            return;
        }

        let formatted = '';
        
        if (cleaned.length <= 4) {
            // If 4 or fewer digits, show them as is
            formatted = cleaned;
        } else {
            // If more than 4 digits, mask all but the last 4
            const lastFour = cleaned.slice(-4);
            const hiddenCount = cleaned.length - 4;
            
            // Create masked part with bullets
            const maskedPart = '•'.repeat(hiddenCount);
            
            // Combine masked part with last 4 digits
            const combined = maskedPart + lastFour;
            
            // Add spaces every 4 characters
            formatted = combined.replace(/(.{4})/g, '$1 ').trim();
        }

        setMaskedCardNumber(formatted);
    };

    // Format expiry date as MM/YY
    const formatExpiryDate = (text) => {
        // Remove all non-digits
        const cleaned = text.replace(/\D/g, '');
        // Limit to 4 digits
        const limited = cleaned.slice(0, 4);
        
        // Add slash after 2 digits
        if (limited.length >= 2) {
            const month = limited.slice(0, 2);
            const year = limited.slice(2);
            
            // Validate month (01-12)
            if (parseInt(month) > 12) {
                setExpiryDate('12/' + year);
            } else if (parseInt(month) === 0) {
                setExpiryDate('01/' + year);
            } else {
                setExpiryDate(month + '/' + year);
            }
        } else {
            setExpiryDate(limited);
        }
    };

    // Format security code (limit to 4 digits)
    const formatSecurityCode = (text) => {
        const cleaned = text.replace(/\D/g, '');
        const limited = cleaned.slice(0, 4);
        setSecurityCode(limited);
    };

    // Validate card number using Luhn algorithm
    const validateCardNumber = (number) => {
        if (number.length !== 16) return false;
        
        let sum = 0;
        let isEven = false;
        
        // Loop through values starting from the rightmost side
        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number[i]);
            
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            
            sum += digit;
            isEven = !isEven;
        }
        
        return sum % 10 === 0;
    };

    // Validate expiry date
    const validateExpiryDate = (date) => {
        if (date.length !== 5) return false;
        
        const [month, year] = date.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
        const currentMonth = currentDate.getMonth() + 1;
        
        const expMonth = parseInt(month);
        const expYear = parseInt(year);
        
        // Check if month is valid
        if (expMonth < 1 || expMonth > 12) return false;
        
        // Check if date is not in the past
        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
            return false;
        }
        
        return true;
    };

    const handleAddCard = () => {
        // Validate card number
        if (!cardNumber || cardNumber.length !== 16) {
            Alert.alert('Error', 'Please enter a valid 16-digit card number');
            return;
        }
        
        if (!validateCardNumber(cardNumber)) {
            Alert.alert('Error', 'Please enter a valid card number');
            return;
        }
        
        // Validate expiry date
        if (!expiryDate || expiryDate.length !== 5) {
            Alert.alert('Error', 'Please enter a valid expiry date (MM/YY)');
            return;
        }
        
        if (!validateExpiryDate(expiryDate)) {
            Alert.alert('Error', 'Please enter a valid future expiry date');
            return;
        }
        
        // Validate security code
        if (!securityCode || securityCode.length < 3) {
            Alert.alert('Error', 'Please enter a valid security code (3-4 digits)');
            return;
        }

        Alert.alert('Success', 'Card added successfully!');
        console.log('Card Details:', {
            cardNumber: cardNumber,
            maskedCardNumber: maskedCardNumber,
            expiryDate: expiryDate,
            securityCode: securityCode,
        });
    };

    const showSecurityCodeInfo = () => {
        Alert.alert(
            'Security Code',
            'The 3 or 4 digit code on the back of your card (or front for Amex cards)'
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Add Debit or Credit Card</Text>
            </View>

            <View style={styles.form}>
                {/* Card Number */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Card Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your card number"
                        placeholderTextColor="#999999"
                        value={maskedCardNumber}
                        onChangeText={formatCardNumber}
                        keyboardType="numeric"
                        maxLength={19} // 16 digits + 3 spaces
                    />
                </View>

                {/* Expiry Date and Security Code Row */}
                <View style={styles.row}>
                    <View style={[styles.inputGroup, styles.halfWidth]}>
                        <Text style={styles.label}>Expiry Date</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="MM/YY"
                            placeholderTextColor="#999999"
                            value={expiryDate}
                            onChangeText={formatExpiryDate}
                            keyboardType="numeric"
                            maxLength={5}
                        />
                    </View>

                    <View style={[styles.inputGroup, styles.halfWidth]}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Security Code</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="CVC"
                                placeholderTextColor="#999999"
                                value={securityCode}
                                onChangeText={formatSecurityCode}
                                keyboardType="numeric"
                                maxLength={4}
                                secureTextEntry={false}
                            />
                            <TouchableOpacity 
                                onPress={showSecurityCodeInfo}
                                style={styles.infoIcon}
                            >
                                <MaterialIcons
                                    name="info-outline"
                                    size={16}
                                    color="#999999"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Add Card Button */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddCard}
                    activeOpacity={0.8}
                >
                    <Text style={styles.addButtonText}>Add Card</Text>
                </TouchableOpacity>
            </View>
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
        paddingVertical: 14,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
    },
    form: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
        paddingBottom: 8,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333333',
        backgroundColor: '#ffffff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '48%',
    },
    addButton: {
        backgroundColor: '#ff1493',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 40,
    },
    infoIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
        padding: 4,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
});

export default AddCardScreen;