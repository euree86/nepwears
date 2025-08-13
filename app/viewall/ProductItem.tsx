import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Product = {
    id: number;
    name: string;
    price: string;
    image: string;
    isFavorite: boolean;
    category: string;
};

type ProductItemProps = {
    item: Product;
    isFavorite: boolean;
    toggleFavorite: (id: number) => void;
    addToCart: (product: Product) => void;
};

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

const ProductItem: React.FC<ProductItemProps> = ({ item, isFavorite, toggleFavorite, addToCart }) => (
    <View style={styles.productCard}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>

        {/* Wrap info in a row to align buttons */}
        <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
                {item.name}
            </Text>
            <Text style={styles.productPrice}>{item.price}</Text>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.favoriteButtonSmall, isFavorite && styles.favoriteButtonActive]}
                    onPress={() => toggleFavorite(item.id)}
                >
                    <Ionicons
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={20}
                        color={isFavorite ? '#FC0079' : '#4b5563'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    productCard: {
        width: ITEM_WIDTH,
        marginBottom: 20,
    },
    imageContainer: {
        backgroundColor: '#f3f4f6',
        overflow: 'hidden',
        aspectRatio: 0.8,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    productInfo: {
        paddingTop: 12,
        justifyContent: 'space-between',
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
        marginBottom: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: '#e10b73ff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginRight: 8,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    favoriteButtonSmall: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoriteButtonActive: {
        backgroundColor: '#ffe6e6',
    },
});

export default ProductItem;
