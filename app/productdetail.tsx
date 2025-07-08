import React from 'react';
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
    const colors = ['#FF6B6B', '#8B5CF6', '#1F2937', '#3B82F6', '#EC4899'];
    const thumbnails = Array(5).fill('https://cdn.pixabay.com/photo/2020/10/23/16/50/woman-5679284_640.jpg');

    return (
        <ScrollView style={styles.container}>
            {/* Heart Icon */}
            <View style={styles.heartContainer}>
                <View style={styles.heartIcon}>
                    <EvilIcons name="heart" size={24} color="black" />
                </View>
            </View>

            {/* Main Product Image */}
            <Image
                source={{ uri: 'https://cdn.pixabay.com/photo/2020/10/23/16/50/woman-5679284_640.jpg' }}
                style={styles.mainImage}
                resizeMode="cover"
            />

            {/* Thumbnail Images */}
            <View style={styles.thumbnailContainer}>
                {thumbnails.map((thumb, index) => (
                    <TouchableOpacity key={index} style={styles.thumbnail}>
                        <Image
                            source={{ uri: thumb }}
                            style={styles.thumbnailImage}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Product Info */}
            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>
                    Summer Dress (Baby Pink) | With bigger vibrant color
                </Text>

                <View style={styles.priceandrating}>
                    <Text style={styles.price}>Rs 3408</Text>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.star}>⭐</Text>
                        <Text style={styles.rating}>4.5</Text>
                        <Text style={styles.reviewCount}>(40 Review)</Text>
                    </View>
                </View>


                <Text style={styles.sectionTitle}>Product Details</Text>
                <Text style={styles.description}>
                    Enjoy an improved audio experience compared to any previous Echo Dot with Alexa for clearer vocals, deeper bass and vibrant sound in any...
                </Text>

                <Text style={styles.colorTitle}>Select Color: Black</Text>

                {/* Color Options */}
                <View style={styles.colorContainer}>
                    {colors.map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.colorOption, { backgroundColor: color }]}
                        />
                    ))}
                </View>

                {/* Add to Cart Button */}
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heartContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    heartIcon: {
        padding: 6,
        borderRadius: 8,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    mainImage: {
        width: width,
        height: 300,
    },
    thumbnailContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 6,
        overflow: 'hidden',
        marginRight: 20,
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
    },
    productInfo: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
        lineHeight: 24,
    },

    priceandrating: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"

    },

    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    star: {
        fontSize: 16,
        marginRight: 5,
    },
    rating: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginRight: 5,
    },
    reviewCount: {
        fontSize: 14,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginVertical: 12,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#E6E6E6",
        paddingBottom: 15
    },
    colorTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    colorContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 15,
    },
    addToCartButton: {
        backgroundColor: '#FC0079',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ProductDetailScreen;