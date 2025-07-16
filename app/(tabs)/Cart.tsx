import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from 'react';

import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';

type CartItemType = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

const MyCart = () => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([
        {
            id: 1,
            name: 'Retinol Youth Renewal Night Cream',
            price: 84.00,
            quantity: 1,
            image: 'https://cdn.pixabay.com/photo/2019/11/22/08/01/shoes-4644338_640.png',
        },
        {
            id: 2,
            name: 'Glycolic Acid 7% Toning Solution',
            price: 14.50,
            quantity: 1,
            image: 'https://cdn.pixabay.com/photo/2019/08/18/23/03/people-4415189_640.jpg',
        },
        {
            id: 3,
            name: 'Solar Power',
            price: 95.00,
            quantity: 1,
            image: 'https://cdn.pixabay.com/photo/2024/05/25/05/34/ai-generated-8786357_640.jpg',
        },
        {
            id: 4,
            name: 'Natural Moisturising Factors + HA',
            price: 155.00,
            quantity: 1,
            image: 'https://cdn.pixabay.com/photo/2012/09/30/03/00/woman-58558_640.jpg',
        },
    ]);

    const updateQuantity = (id: number | string, change: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const removeItem = (id: number | string) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const [couponCode, setCouponCode] = useState('');

    const CartItem = ({ item }: { item: CartItemType }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />

            <View style={styles.productDetails}>
                <View style={styles.productHeader}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                        <MaterialCommunityIcons name="delete" size={24} color="#E0E0E5" style={styles.removeButton} />

                    </TouchableOpacity>
                </View>

                <Text style={styles.productPrice}>${item.price.toFixed(2)} USD</Text>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={[styles.quantityButton, { backgroundColor: "#E0E0E5" }]}
                        onPress={() => updateQuantity(item.id, -1)}
                    >
                        <Text style={[styles.quantityButtonText, { color: "black" }]}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantity}>{item.quantity}</Text>

                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}

                <View style={styles.couponSection}>
                    <View style={styles.couponContainer}>
                        <View style={styles.couponIcon}>
                            <Text style={styles.couponIconText}>🎫</Text>
                        </View>
                        <TextInput
                            style={styles.couponInput}
                            placeholder="Enter coupon code"
                            placeholderTextColor="#999"
                            value={couponCode}
                            onChangeText={setCouponCode}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)} USD</Text>
                </View>

                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
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
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    cartItem: {
        flexDirection: 'row',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
    },
    productDetails: {
        flex: 1,
        marginLeft: 15,
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        flex: 1,
        marginRight: 10,
    },
    removeButton: {
        fontSize: 18,
        color: 'black',
        fontWeight: '300',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 12,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 4,
        backgroundColor: '#FC0079',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    quantityButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
    },
    quantity: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        marginHorizontal: 20,
    },

    couponInput: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
    },

    couponSection: {
        paddingVertical: 20,
    },
    couponContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
    },
    couponIcon: {
        marginRight: 10,
    },
    couponIconText: {
        fontSize: 16,
    },
    couponText: {
        fontSize: 16,
        color: '#666666',
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333333',
    },
    checkoutButton: {
        backgroundColor: '#FC0079',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default MyCart;