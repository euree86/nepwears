import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    ScrollView,
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import NotificationPopup from "./cardsuccess";
import Header from './components/header';
import Button from './components/button';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const fontScale = width / 375;

const PaymentMethod = () => {
    const router = useRouter();
    const [selectedCard, setSelectedCard] = useState('visa');
    const [showNotificationPopup, setShowNotificationPopup] = useState(false);

    const cards = [
        {
            id: 'visa',
            type: 'Visa',
            label: 'Default',
            number: '**** **** **** 1234',
            icon: <FontAwesome5 name="cc-visa" size={28} color="#1A1F71" />,
        },
        {
            id: 'esewa',
            type: 'eSewa',
            label: '',
            number: '98XXXXXXXX',
            icon: <MaterialIcons name="account-balance-wallet" size={28} color="#60B158" />,
        },
        {
            id: 'merchantpay',
            type: 'Merchant Pay',
            label: '',
            number: '01-XXXXXXX',
            icon: <MaterialIcons name="store" size={28} color="#FF6B35" />,
        },
        {
            id: 'mobilebanking',
            type: 'Mobile Banking',
            label: '',
            number: 'Nepal Bank Ltd',
            icon: <MaterialIcons name="phone-android" size={28} color="#1976D2" />,
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
        router.push('/newcard/main');
    };

    const handleNotificationResponse = (allowed: boolean) => {
        console.log("Notification allowed?", allowed);
        setShowNotificationPopup(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Payment Method" />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.headerTitle}>Saved Payment Methods</Text>

                <View style={styles.cardList}>
                    {cards.map((card) => (
                        <TouchableOpacity
                            key={card.id}
                            onPress={() => handleCardSelect(card.id)}
                            activeOpacity={0.85}
                            style={styles.shadowWrapper}
                        >
                            <View style={[
                                styles.cardItem,
                                selectedCard === card.id && styles.selectedCard,
                            ]}>
                                <View style={styles.cardIcon}>{card.icon}</View>

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
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddNewCard}
                    activeOpacity={0.85}
                >
                    <MaterialIcons
                        name="add"
                        size={20}
                        color="#d63384"
                        style={styles.addButtonIcon}
                    />
                    <Text style={styles.addButtonText}>Add New Payment Method</Text>
                </TouchableOpacity>

                <Button
                    text="Apply"
                    onPress={() => setShowNotificationPopup(true)}

                />
            </ScrollView>

            {showNotificationPopup && (
                <NotificationPopup
                    visible={showNotificationPopup}
                    onResponse={handleNotificationResponse}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    headerTitle: {
        fontSize: 16 * fontScale,
        fontWeight: '600',
        color: '#333333',
        marginVertical: 16,
    },
    cardList: {
        gap: 16,
    },
    shadowWrapper: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderRadius: 12,
        backgroundColor: 'transparent',
    },
    cardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    selectedCard: {
        borderWidth: 1,
        borderColor: '#fec3e9ff',
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
        fontSize: 16 * fontScale,
        fontWeight: '500',
        color: '#000',
        marginRight: 8,
    },
    cardLabel: {
        fontSize: 12 * fontScale,
        color: '#d63384',
        backgroundColor: '#ffdce7',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    cardNumber: {
        fontSize: 14 * fontScale,
        color: '#666',
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
        borderColor: '#d63384',
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#d63384',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 28,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    addButtonIcon: {
        marginRight: 8,
    },
    addButtonText: {
        fontSize: 14 * fontScale,
        fontWeight: '600',
        color: '#d63384',
    },
});

export default PaymentMethod;