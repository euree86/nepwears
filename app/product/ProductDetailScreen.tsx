import React, { useState } from "react";
import { ScrollView, SafeAreaView, StyleSheet } from "react-native";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";
import ReviewsSection from "./ReviewsSection";
import BottomBar from "./BottomBar";
import SavedNotification from "./SavedNotification";

const ProductDetailScreen = () => {
    const colors = ["#FF6B6B", "#8B5CF6", "#1F2937", "#3B82F6", "#EC4899"];
    const sizes = ["S", "M", "L", "XL", "XXL"];
    const [selectedSize, setSelectedSize] = useState("L");
    const [showSavedBox, setShowSavedBox] = useState(false);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

    const variants = [
        {
            variantId: "pink",
            variantName: "Baby Pink",
            images: [
                "https://cdn.pixabay.com/photo/2024/12/13/10/23/woman-9264738_640.jpg",
                "https://cdn.pixabay.com/photo/2022/12/30/14/54/woman-7687153_640.jpg",
                "https://cdn.pixabay.com/photo/2024/08/24/05/02/woman-8993222_640.jpg"
            ]
        },
        {
            variantId: "purple",
            variantName: "Purple Vibe",
            images: [
                "https://cdn.pixabay.com/photo/2022/12/30/14/53/woman-7687148_640.jpg",
                "https://cdn.pixabay.com/photo/2021/09/30/18/26/woman-6670772_640.jpg",
                "https://cdn.pixabay.com/photo/2023/02/01/12/10/evening-dress-7760319_640.jpg"
            ]
        },
        {
            variantId: "black",
            variantName: "Black Chic",
            images: [
                "https://cdn.pixabay.com/photo/2024/04/10/13/19/woman-8688035_640.jpg",
                "https://cdn.pixabay.com/photo/2016/10/03/19/30/freedom-1712590_640.jpg",
                "https://cdn.pixabay.com/photo/2020/10/23/16/50/woman-5679284_640.jpg"
            ]
        }
    ];

    const fullDescription = `Enjoy an improved audio experience compared to any previous Echo Dot with Alexa for clearer vocals, deeper bass and vibrant sound in any room. Smart voice control, connect to all your smart devices. Designed for style, performance, and comfort — all in one. Comes in vibrant colors for all personalities and fits perfectly with any outfit or setting.`;

    const reviews = [
        {
            reviewerName: "Alice Johnson",
            title: "Amazing Dress!",
            content: "The dress fits perfectly and the material is top-notch.",
            date: "2024-06-15",
            rating: 5,
            productImages: [],
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
                <ProductImages
                    variants={variants}
                    selectedVariantIndex={selectedVariantIndex}
                    onSelectVariant={setSelectedVariantIndex}
                />

                <ProductInfo
                    title="Summer Dress (Baby Pink) | With bigger vibrant color"
                    price="Rs 3408"
                    description={fullDescription}
                />

                <SizeSelector
                    sizes={sizes}
                    selectedSize={selectedSize}
                    onSelect={setSelectedSize}
                />

                <ColorSelector colors={colors} />

                <ReviewsSection reviews={reviews} />

                <SavedNotification
                    visible={showSavedBox}
                    onClose={() => setShowSavedBox(false)}
                />
            </ScrollView>

            <BottomBar
                price="Rs. 3,999"
                rating={4.5}
                onAddToCart={() => setShowSavedBox(true)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        flex: 1
    },
    scrollContainer: {
        paddingBottom: 120
    }
});

export default ProductDetailScreen;
