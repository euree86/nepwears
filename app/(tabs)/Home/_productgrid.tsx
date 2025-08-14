import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import ProductCard, { Product } from "../../components/_productcard";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const products: Product[] = [
    {
        id: 1,
        name: "High Neck Shirt in White",
        price: 400,
        originalPrice: 500,
        rating: 4.8,
        reviews: 700,
        image: "https://cdn.pixabay.com/photo/2025/07/13/21/25/wedding-9712800_640.jpg",
        category: "clothing",
        isFavorite: false,
    },
    {
        id: 2,
        name: "High Neck Shirt in White",
        price: 400,
        originalPrice: 500,
        rating: 4.8,
        reviews: 120,
        image: "https://cdn.pixabay.com/photo/2025/07/31/20/00/woman-9747618_640.jpg",
        category: "clothing",
        isFavorite: true,
    },
    {
        id: 3,
        name: "High Neck Shirt in Black",
        price: 400,
        originalPrice: 500,
        rating: 4.8,
        reviews: 700,
        image: "https://cdn.pixabay.com/photo/2021/03/22/16/07/woman-6115105_640.jpg",
        category: "clothing",
        isFavorite: false,
    },
    {
        id: 4,
        name: "Women's Swing Tunic Notch Collar",
        price: 400,
        originalPrice: 500,
        rating: 4.8,
        reviews: 120,
        image: "https://cdn.pixabay.com/photo/2016/11/21/11/29/close-up-1844786_640.jpg",
        category: "clothing",
        isFavorite: false,
    },
];

const ProductGrid = () => {
    const router = useRouter();

    const handleProductPress = (product: Product) => {
        console.log('Product pressed:', product.name);
        router.push("../../../product/main");
    };

    const handleAddToCart = (product: Product) => {
        console.log('Added to cart:', product.name);

    };

    const handleToggleFavorite = (productId: number | string) => {
        console.log('Toggle favorite for product:', productId);

    };

    return (
        <View style={styles.grid}>
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
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

export default ProductGrid;