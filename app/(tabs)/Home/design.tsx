import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    ScrollView,
} from 'react-native';
import ProductCard, { Product } from '../../components/_productcard'; // Import your reusable ProductCard component
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Sample product data matching your ProductCard interface
const products: Product[] = [
    {
        id: '1',
        name: 'Spring Floral Dress',
        price: 2159.20,
        originalPrice: 2699.00,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        category: 'Dresses',
        rating: 4.5,
        reviews: 128,
        discount: 20,
        isFavorite: false
    },
    {
        id: '2',
        name: 'Pastel Floral Blouse',
        price: 1344.00,
        originalPrice: 1680.00,
        image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        category: 'Tops',
        rating: 4.3,
        reviews: 89,
        discount: 20,
        isFavorite: true
    },


];

const SpringBanner = () => {
    const router = useRouter();

    const handleShopNow = () => {
        console.log('Shop now pressed');
    };

    const handleProductPress = (product: Product) => {
        console.log('Product pressed:', product.name);
        router.push("../../../product/ProductDetailScreen");
    };

    const handleAddToCart = (product: Product) => {
        console.log('Added to cart:', product.name);
    };

    const handleToggleFavorite = (productId: number | string) => {
        console.log('Toggle favorite for product:', productId);
    };

    return (
        <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
            {/* Banner Section */}
            <View style={styles.outerContainer}>
                <View style={styles.container}>
                    <ImageBackground
                        source={{
                            uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                        }}
                        style={styles.backgroundImage}
                        resizeMode="cover"
                        imageStyle={styles.imageStyle}
                    >
                        <View style={styles.overlay} />

                        {/* Bottom Content */}
                        <View style={styles.bottomContent}>
                            <View style={styles.textContainer}>
                                <Text style={styles.headerText}>SPRING COLLECTION</Text>
                                <Text style={styles.discountText}>20% OFF</Text>
                            </View>

                            <TouchableOpacity style={styles.shopButton} onPress={handleShopNow}>
                                <Text style={styles.shopButtonText}>Shop now</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </View>

            {/* Product Grid Section */}
            <View style={styles.productSection}>


                <View style={styles.productGrid}>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            cardWidth={(width - 50) / 2}
                            onPress={handleProductPress}
                            onAddToCart={handleAddToCart}
                            onToggleFavorite={handleToggleFavorite}
                            showOriginalPrice={true}
                            showFavorite={true}
                            currencySymbol="Rs"
                            addToCartText="Add to Cart"
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    outerContainer: {
        marginBottom: 20,
    },
    container: {
        height: width * 0.55,
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    imageStyle: {
        borderRadius: 8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 24,
        paddingBottom: 20,
        paddingTop: 20,
    },
    textContainer: {
        flex: 1,
        maxWidth: '60%',
    },
    headerText: {
        fontSize: width * 0.035,
        fontWeight: '600',
        color: '#FFFFFF',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    discountText: {
        fontSize: width * 0.1,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    shopButton: {
        backgroundColor: '#242328',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    shopButtonText: {
        color: '#FFFFFF',
        fontSize: width * 0.035,
        fontWeight: '600',
    },
    productSection: {
        paddingBottom: 20,
    },

    gridContainer: {
        paddingBottom: 20,
    },
    productGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

export default SpringBanner;