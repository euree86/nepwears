import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | string;
type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

const getCardIcon = (cardType: CardType): MaterialIconName => {
    switch (cardType.toLowerCase()) {
        case 'visa':
        case 'mastercard':
        case 'amex':
        case 'discover':
            return 'credit-card';
        default:
            return 'credit-card';
    }
};

const getCardGradient = (cardType: CardType): [string, string] => {
    switch (cardType.toLowerCase()) {
        case 'visa':
            return ['#1A1F71', '#2E4BC6'];
        case 'mastercard':
            return ['#EB001B', '#FF5F00'];
        case 'amex':
            return ['#006FCF', '#00A2E5'];
        case 'discover':
            return ['#FF6000', '#FFA500'];
        default:
            return ['#001972ff', '#f892dbff'];
    }
};

const getCardBrandText = (cardType: CardType): string => {
    switch (cardType.toLowerCase()) {
        case 'visa':
            return 'VISA';
        case 'mastercard':
            return 'MASTERCARD';
        case 'amex':
            return 'AMEX';
        case 'discover':
            return 'DISCOVER';
        default:
            return 'CARD';
    }
};

interface CardImageProps {
    cardType: CardType;
    maskedCardNumber?: string;
    cardholderName?: string;
    expiryDate?: string;
}

const CardImage: React.FC<CardImageProps> = ({
    cardType,
    maskedCardNumber = '**** **** **** ****',
    cardholderName = 'CARDHOLDER NAME',
    expiryDate = 'MM/YY',
}) => {
    const [colorStart, colorEnd] = getCardGradient(cardType);

    return (
        <View style={[
            styles.cardPreview,
            {
                backgroundColor: colorStart,
                shadowColor: colorEnd,
            }
        ]}>
            <View style={styles.cardHeader}>
                <MaterialIcons name={getCardIcon(cardType)} size={28} color="#fff" />
                <Text style={styles.cardBrand}>{getCardBrandText(cardType)}</Text>
            </View>

            <View style={styles.cardNumber}>
                <Text style={styles.cardNumberText}>{maskedCardNumber}</Text>
            </View>

            <View style={styles.cardFooter}>
                <View style={styles.cardDetailItem}>
                    <Text style={styles.cardDetailLabel}>CARDHOLDER</Text>
                    <Text style={styles.cardDetailValue} numberOfLines={1}>
                        {cardholderName || 'CARDHOLDER NAME'}
                    </Text>
                </View>
                <View style={styles.cardDetailItemRight}>
                    <Text style={styles.cardDetailLabel}>EXPIRES</Text>
                    <Text style={styles.cardDetailValue}>{expiryDate || 'MM/YY'}</Text>
                </View>
            </View>

            {/* Chip simulation */}
            <View style={styles.chip} />
        </View>
    );
};

const styles = StyleSheet.create({
    cardPreview: {
        width: '100%',
        height: screenHeight * 0.25,
        borderRadius: 16,
        padding: 24,
        justifyContent: 'space-between',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 12,
        position: 'relative',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardBrand: {
        color: '#fff',
        fontSize: screenWidth * 0.04,
        fontWeight: '700',
        letterSpacing: 1.5,
    },
    cardNumber: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardNumberText: {
        color: '#fff',
        fontSize: screenWidth * 0.055,
        fontWeight: '500',
        letterSpacing: 3,
        fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    cardDetailItem: {
        flex: 1,
    },
    cardDetailItemRight: {
        alignItems: 'flex-end',
    },
    cardDetailLabel: {
        color: '#fff',
        fontSize: screenWidth * 0.025,
        fontWeight: '400',
        opacity: 0.8,
        letterSpacing: 0.8,
    },
    cardDetailValue: {
        color: '#fff',
        fontSize: screenWidth * 0.035,
        fontWeight: '600',
        marginTop: 4,
        letterSpacing: 1,
    },
    chip: {
        position: 'absolute',
        left: 24,
        top: 80,
        width: 32,
        height: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
});

export default CardImage;
