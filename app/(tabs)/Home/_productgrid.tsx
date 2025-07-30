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
        image: "https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_640.png",
    },
    {
        id: 2,
        name: "High Neck Shirt in White",
        price: 400,
        originalPrice: 500,
        rating: 4.8,
        reviews: 120,
        image: "https://cdn.pixabay.com/photo/2016/12/06/09/30/blank-1886001_640.png",
    },
    {
        id: 3,
        name: "High Neck Shirt in Black",
        price: 400,
        originalPrice: 500,
        rating: 4.8,
        reviews: 700,
        image: "https://cdn.pixabay.com/photo/2015/08/04/21/23/dress-875247_640.jpg",
    },
    {
        id: 4,
        name: "Women's Swing Tunic Notch Collar",
        price: 400,
        originalPrice: 500,
        rating: 4.8,
        reviews: 120,
        image: "https://cdn.pixabay.com/photo/2023/10/24/02/01/women-8337216_640.jpg",
    },
];

const ProductGrid = () => {
    const router = useRouter();

    return (
        <View style={styles.grid}>
            {products.map((product) => (
                <TouchableOpacity
                    key={product.id}
                    onPress={() => router.push("../sizeproductdetail")}
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
