import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
const PaymentMethod = () => {
    const  router = useRouter();
    const [selectedCard, setSelectedCard] = useState('visa');

    const cards = [
        {
            id: 'visa',
            type: 'Visa',
            label: 'Default',
            number: '**** **** **** 1234',
        },
        {
            id: 'mastercard',
            type: 'MasterCard',
            label: '',
            number: '**** **** **** 5678',
        },
        {
            id: 'amex',
            type: 'Amex',
            label: '',
            number: '**** **** **** 9012',
        },
        {
            id: 'paypal',
            type: 'PayPal',
            label: '',
            number: 'eurika@example.com',
        },
    ];

    const RadioButton = ({ selected }: { selected: boolean }) => (
        <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
            {selected && <View style={styles.radioButtonInner} />}
        </View>
    );


    const handleCardSelect = (cardId: string) => {
        setSelectedCard(cardId);
    };
    const handleAddNewCard = () => {
         router.push('/newcard');
    };

    const handleApply = () => {
        console.log('Apply pressed with selected card:', selectedCard);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Saved Cards</Text>
            </View>

            {/* Card List */}
            <View style={styles.cardList}>
                {cards.map((card) => (
                    <TouchableOpacity
                        key={card.id}
                        style={styles.cardItem}
                        onPress={() => handleCardSelect(card.id)}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="card-outline"
                            size={28}
                            color="#666666"
                            style={styles.cardIcon}
                        />

                        <View style={styles.cardContent}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardType}>{card.type}</Text>
                                {card.label && (
                                    <Text style={styles.cardLabel}>{card.label}</Text>
                                )}
                            </View>
                            <Text style={styles.cardNumber}>{card.number}</Text>
                        </View>

                        <RadioButton selected={selectedCard === card.id} />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Add New Card Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddNewCard}
                activeOpacity={0.7}
            >
                <MaterialIcons
                    name="add"
                    size={20}
                    color="#333333"
                    style={styles.addButtonIcon}
                />
                <Text style={styles.addButtonText}>Add New Card</Text>
            </TouchableOpacity>

            {/* Apply Button */}
            <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApply}
                activeOpacity={0.8}
            >
                <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
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
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    cardList: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 8,
        gap: 12,
    },
    cardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    cardIcon: {
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    cardType: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        marginRight: 8,
    },
    cardLabel: {
        fontSize: 12,
        color: 'black',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    cardNumber: {
        fontSize: 14,
        color: '#888888',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        borderColor: '#333333',
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#333333',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    addButtonIcon: {
        marginRight: 8,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
    },
    applyButton: {
        marginHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 16,
        backgroundColor: '#FC0079',
        borderRadius: 8,
        alignItems: 'center',
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
});

export default PaymentMethod;
