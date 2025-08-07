import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

type CardType = 'visa' | 'mastercard' | 'amex' | 'discover';

interface CardInputFormProps {
    cardholderName: string;
    onChangeCardholderName: (text: string) => void;
    cardNumber: string;
    onChangeCardNumber: (text: string) => void;
    expiryDate: string;
    onChangeExpiryDate: (text: string) => void;
    securityCode: string;
    onChangeSecurityCode: (text: string) => void;
    cardType: CardType | null;
    onShowSecurityInfo: () => void;
}

const CardInputForm: React.FC<CardInputFormProps> = ({
    cardholderName,
    onChangeCardholderName,
    cardNumber,
    onChangeCardNumber,
    expiryDate,
    onChangeExpiryDate,
    securityCode,
    onChangeSecurityCode,
    cardType,
    onShowSecurityInfo,
}) => {
    const getCardColor = () => {
        switch (cardType) {
            case 'visa':
                return '#1A1F71';
            case 'mastercard':
                return '#EB001B';
            case 'amex':
                return '#006FCF';
            case 'discover':
                return '#FF6000';
            default:
                return '#6B73FF';
        }
    };

    const getCardIcon = () => {
        switch (cardType) {
            case 'visa':
            case 'mastercard':
            case 'amex':
            case 'discover':
                return 'credit-card';
            default:
                return 'credit-card';
        }
    };

    return (
        <View style={styles.form}>
            {/* Cardholder Name */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Cardholder Name</Text>
                <TextInput
                    style={[styles.input, cardholderName ? styles.inputFilled : null]}
                    placeholder="Enter full name as on card"
                    placeholderTextColor="#999"
                    value={cardholderName}
                    onChangeText={onChangeCardholderName}
                    autoCapitalize="words"
                    autoCorrect={false}
                />
            </View>

            {/* Card Number */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Card Number</Text>
                <View style={[
                    styles.inputWithIcon,
                    cardNumber ? styles.inputFilled : null
                ]}>
                    <TextInput
                        style={styles.inputField}
                        placeholder="1234 5678 9012 3456"
                        placeholderTextColor="#999"
                        value={cardNumber}
                        onChangeText={onChangeCardNumber}
                        keyboardType="numeric"
                        maxLength={cardType === 'amex' ? 18 : 19} // Including spaces
                        autoCorrect={false}
                    />
                    {cardType && (
                        <MaterialIcons
                            name={getCardIcon() as any}
                            size={24}
                            color={getCardColor()}
                            style={styles.iconRight}
                        />
                    )}
                </View>
            </View>

            {/* Row: Expiry Date + Security Code */}
            <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Expiry Date</Text>
                    <TextInput
                        style={[styles.input, expiryDate ? styles.inputFilled : null]}
                        placeholder="MM/YY"
                        placeholderTextColor="#999"
                        value={expiryDate}
                        onChangeText={onChangeExpiryDate}
                        keyboardType="numeric"
                        maxLength={5}
                        autoCorrect={false}
                    />
                </View>

                <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>
                        Security Code
                    </Text>
                    <View style={[
                        styles.inputWithIcon,
                        securityCode ? styles.inputFilled : null
                    ]}>
                        <TextInput
                            style={styles.inputField}
                            placeholder={cardType === 'amex' ? '1234' : '123'}
                            placeholderTextColor="#999"
                            value={securityCode}
                            onChangeText={onChangeSecurityCode}
                            keyboardType="numeric"
                            maxLength={cardType === 'amex' ? 4 : 3}
                            secureTextEntry
                            autoCorrect={false}
                        />
                        <TouchableOpacity onPress={onShowSecurityInfo}>
                            <MaterialIcons
                                name="help-outline"le app
                                size={20}
                                color="#FC0079"
                                style={styles.iconRight}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        paddingVertical: 16,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: "#E1E5E9",
        borderRadius: 8,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        height: 48,
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
    inputFilled: {
        borderColor: '#FC0079',
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#E1E5E9",
        borderRadius: 8,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        height: 48,
    },
    inputField: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
    iconRight: {
        marginLeft: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    halfWidth: {
        flex: 1,
    },

});

export default CardInputForm;