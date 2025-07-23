import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";

const { width } = Dimensions.get("window");

// StarRating Component
type StarRatingProps = {
    rating?: number;
};

const StarRating = ({ rating = 5 }: StarRatingProps) => {
    return (
        <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Text key={star} style={styles.star}>
                    ⭐
                </Text>
            ))}
        </View>
    );
};

// ReviewCard Component
type ReviewCardProps = {
    reviewerName: string;
    title: string;
    content: string;
    date: string;
    productImages?: string[];
    rating?: number;
};

const ReviewCard = ({
    reviewerName,
    title,
    content,
    date,
    productImages = [],
    rating = 5,
}: ReviewCardProps) => {
    return (
        <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <StarRating rating={rating} />
                <Text style={styles.reviewerName}>{reviewerName}</Text>
            </View>
            <Text style={styles.reviewTitle}>{title}</Text>
            <Text style={styles.reviewContent}>{content}</Text>
            {productImages.length > 0 && (
                <View style={styles.productImagesContainer}>
                    {productImages.map((image, index) => (
                        <View key={index} style={styles.productImageWrapper}>
                            <Image source={{ uri: image }} style={styles.productImage} resizeMode="cover" />
                        </View>
                    ))}
                </View>
            )}
            <Text style={styles.reviewDate}>{date}</Text>
        </View>
    );
};

const ProductDetailScreen = () => {
    const colors = ["#FF6B6B", "#8B5CF6", "#1F2937", "#3B82F6", "#EC4899"];
    const sizes = ["S", "M", "L", "XL", "XXL"];
    const thumbnails = Array(5).fill(
        "https://cdn.pixabay.com/photo/2020/10/23/16/50/woman-5679284_640.jpg"
    );
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showSavedBox, setShowSavedBox] = useState(false);
    const [selectedSize, setSelectedSize] = useState("L");
    const [showReviewsContent, setShowReviewsContent] = useState(false); // State to toggle review content visibility
    const fullDescription = `Enjoy an improved audio experience compared to any previous Echo Dot with Alexa for clearer vocals, deeper bass and vibrant sound in any room. Smart voice control, connect to all your smart devices. Designed for style, performance, and comfort — all in one. Comes in vibrant colors for all personalities and fits perfectly with any outfit or setting.`;

    // Reviews data
    const reviews = [
        {
            reviewerName: "Shipon",
            title: "Great Shopping Experience!",
            content: "I've been using Napwears for a while now, and I'm impressed with the wide range of products available.",
            date: "Shipon, 10 Mar 2024",
            rating: 5,
            productImages: ["https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_640.jpg", "https://cdn.pixabay.com/photo/2015/09/02/11/01/woman-918267_640.jpg", "https://cdn.pixabay.com/photo/2018/07/22/21/58/fashion-3555648_640.jpg"],
        },
        {
            reviewerName: "Vessel",
            title: "Amazing Shopping!",
            content: "I've been using Napwears for a while now, and I'm impressed with the wide range of products available.",
            date: "Shipon Hossain, 10 Mar 2024",
            rating: 4,
            productImages: ["https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_640.jpg", "https://cdn.pixabay.com/photo/2015/09/02/11/01/woman-918267_640.jpg", "https://cdn.pixabay.com/photo/2018/07/22/21/58/fashion-3555648_640.jpg"],
        },
        {
            reviewerName: "Jhon",
            title: "Fantastic Buying Journey!",
            content: "I've been using Napwears for a while now, and I'm impressed with the wide range of products available.",
            date: "Shipon Hossain, 10 Mar 2024",
            rating: 3,
            productImages: ["https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_640.jpg", "https://cdn.pixabay.com/photo/2015/09/02/11/01/woman-918267_640.jpg", "https://cdn.pixabay.com/photo/2018/07/22/21/58/fashion-3555648_640.jpg"],
        },
    ];

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const toggleReviewsContent = () => {
        setShowReviewsContent(!showReviewsContent);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {/* Heart Icon */}
                <View style={styles.heartContainer}>
                    <TouchableOpacity
                        style={styles.heartIcon}
                        onPress={() => setIsFavorite(!isFavorite)}
                    >
                        <MaterialCommunityIcons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={24}
                            color={isFavorite ? "pink" : "black"}
                        />
                    </TouchableOpacity>
                </View>
                {/* Main Product Image */}
                <Image
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2020/10/23/16/50/woman-5679284_640.jpg",
                    }}
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
                    {/* Description with Read More */}
                    <Text
                        style={styles.description}
                        numberOfLines={showFullDescription ? undefined : 3}
                    >
                        {fullDescription}
                    </Text>
                    <TouchableOpacity onPress={toggleDescription}>
                        <Text style={styles.readMoreText}>
                            {showFullDescription ? "Read Less" : "Read More"}
                        </Text>
                    </TouchableOpacity>
                    {/* Select Size */}
                    <Text style={styles.sectionTitle}>Select Size</Text>
                    <View style={styles.sizeContainer}>
                        {sizes.map((size) => (
                            <TouchableOpacity
                                key={size}
                                onPress={() => setSelectedSize(size)}
                                style={[
                                    styles.sizeOption,
                                    selectedSize === size && styles.selectedSizeOption,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.sizeText,
                                        selectedSize === size && styles.selectedSizeText,
                                    ]}
                                >
                                    {size}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {/* Select Color */}
                    <Text style={styles.colorTitle}>Select Color: Black</Text>
                    <View style={styles.colorContainer}>
                        {colors.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.colorOption, { backgroundColor: color }]}
                            />
                        ))}
                    </View>

                    {/* Rating and Review Section Header */}
                    <TouchableOpacity
                        style={styles.ratingReviewHeader}
                        onPress={toggleReviewsContent}
                    >
                        <Text style={styles.sectionTitle}>Rating and Review</Text>
                        <MaterialCommunityIcons
                            name={showReviewsContent ? "chevron-up" : "chevron-down"}
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>

                    {/* Conditionally render the review content */}
                    {showReviewsContent && (
                        <View style={styles.ratingReviewContent}>
                            {reviews.map((review, index) => (
                                <ReviewCard
                                    key={index}
                                    reviewerName={review.reviewerName}
                                    title={review.title}
                                    content={review.content}
                                    date={review.date}
                                    productImages={review.productImages}
                                    rating={review.rating}
                                />
                            ))}
                        </View>
                    )}

                    {/* Add to Cart */}
                    <TouchableOpacity
                        style={styles.addToCartButton}
                        onPress={() => setShowSavedBox(true)}
                    >
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                    {/* Saved Notification Box */}
                    {showSavedBox && (
                        <View style={styles.savedBox}>
                            <View style={styles.savedContent}>
                                <MaterialCommunityIcons
                                    name="check-circle"
                                    size={20}
                                    color="white"
                                />
                                <Text style={styles.savedText}>Item Added to Saved</Text>
                            </View>
                            <TouchableOpacity onPress={() => setShowSavedBox(false)}>
                                <Text style={styles.closeText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    heartContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
    },
    heartIcon: {
        padding: 6,
        borderRadius: 8,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
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
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 6,
        overflow: "hidden",
        marginRight: 20,
    },
    thumbnailImage: {
        width: "100%",
        height: "100%",
    },
    productInfo: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 15,
        lineHeight: 24,
    },
    priceandrating: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    price: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    star: {
        fontSize: 16,
        marginRight: 5,
    },
    rating: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginRight: 5,
    },
    reviewCount: {
        fontSize: 14,
        color: "#666",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginVertical: 12,
    },
    description: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
        marginBottom: 8,
    },
    readMoreText: {
        fontSize: 14,
        color: "#FC0079",
        fontWeight: "500",
        marginBottom: 20,
    },
    sizeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 25,
    },
    sizeOption: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        marginRight: 10,
        marginBottom: 10,
    },
    selectedSizeOption: {
        backgroundColor: "#FC0079",
        borderColor: "#FC0079",
    },
    sizeText: {
        fontSize: 14,
        color: "#333",
    },
    selectedSizeText: {
        color: "#fff",
        fontWeight: "600",
    },
    colorTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 15,
    },
    colorContainer: {
        flexDirection: "row",
        marginBottom: 30,
    },
    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 15,
    },
    addToCartButton: {
        backgroundColor: "#FC0079",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    addToCartText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    savedBox: {
        backgroundColor: "#333",
        borderRadius: 6,
        paddingVertical: 14,
        paddingHorizontal: 15,
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    savedContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    savedText: {
        color: "white",
        marginLeft: 8,
        fontSize: 16,
    },
    closeText: {
        color: "white",
        fontSize: 16,
        marginLeft: 10,
        paddingHorizontal: 8,
    },
    // Styles for the Rating and Review section
    ratingReviewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        marginBottom: 15, // Added margin for spacing
    },
    ratingReviewContent: {
        paddingVertical: 10,
        // No horizontal padding needed here as productInfo already handles it
    },
    reviewCard: {
        backgroundColor: "#ffffff",
        paddingVertical: 20,
        paddingHorizontal: 4, // Adjusted to match productInfo padding
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    reviewHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    starContainer: {
        flexDirection: "row",
        marginRight: 12,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333333",
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 8,
    },
    reviewContent: {
        fontSize: 14,
        color: "#666666",
        lineHeight: 20,
        marginBottom: 12,
    },
    productImagesContainer: {
        flexDirection: "row",
        marginBottom: 12,
    },
    productImageWrapper: {
        marginRight: 8,
        borderRadius: 8,
        overflow: "hidden",
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    reviewDate: {
        fontSize: 12,
        color: "#999999",
        marginTop: 4,
    },
});

export default ProductDetailScreen;