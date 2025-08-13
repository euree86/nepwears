import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import ProductCard from "./_productcard";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const products = [
    {
        id: 1,
        name: "High Neck Shirt in White",
        price: 400,
        originalPrice: 500,
        rating: 4.8,
        reviews: 700,
        image: "https://cdn.pixabay.com/photo/2025/07/13/21/25/wedding-9712800_640.jpg",
    },
    {
        id: 2,
        name: "High Neck Shirt in White",
        price: 400,
        originalPrice: 500,
        rating: 4.8,
        reviews: 120,
        image: "https://cdn.pixabay.com/photo/2025/07/31/20/00/woman-9747618_640.jpg",
    },
    {
        id: 3,
        name: "High Neck Shirt in Black",
        price: 400,
        originalPrice: 500,
        rating: 4.8,
        reviews: 700,
        image: "https://cdn.pixabay.com/photo/2021/03/22/16/07/woman-6115105_640.jpg",
    },
    {
        id: 4,
        name: "Women's Swing Tunic Notch Collar",
        price: 400,
        originalPrice: 500,
        rating: 4.8,
        reviews: 120,
        image: "https://cdn.pixabay.com/photo/2016/11/21/11/29/close-up-1844786_640.jpg",
    },
];

const ProductGrid = () => {
    const router = useRouter();

    return (
        <View style={styles.grid}>
            {products.map((product) => (
                <TouchableOpacity
                    key={product.id}
                    onPress={() => router.push("../../../product/ProductDetailScreen")}
                    style={styles.cardContainer}
                >
                    <ProductCard {...product} />
                </TouchableOpacity>
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
    cardContainer: {
        width: (width - 50) / 2,
    },
});

export default ProductGrid;
