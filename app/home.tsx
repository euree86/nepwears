import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView  // Added missing import
} from "react-native";
import { EvilIcons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function Home() {  // Fixed: moved export to correct component
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef(null);

    // Sample banner images - you can replace with your own images
    const bannerImages = [
        'https://cdn.pixabay.com/photo/2023/08/11/04/41/woman-8182795_640.jpg',
        'https://cdn.pixabay.com/photo/2020/10/22/06/09/woman-5674995_640.jpg',
        'https://cdn.pixabay.com/photo/2022/05/22/16/34/woman-7213852_640.jpg',
    ];

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        setCurrentIndex(index);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        scrollViewRef.current?.scrollTo({
            x: index * width,
            animated: true,
        });
    };

    const CATEGORIES = [
        { id: "1", name: "Tops", icon: "tshirt-crew" },
        { id: "2", name: "Footwear", icon: "shoe-formal" },
        { id: "3", name: "Dresses", icon: "hanger" },
        { id: "4", name: "Pants", icon: "trousers" },
        { id: "5", name: "T-shirt", icon: "tshirt-v" },
    ];

    const PRODUCTS = [
        {
            id: "1",
            title: "High Neck Shirt in White",
            image: "https://cdn.pixabay.com/photo/2023/05/06/01/34/t-shirt-7973404_640.jpg",
            price: "400",
            oldPrice: "600",
            rating: 4.8,
            reviews: 120,
        },
        {
            id: "2",
            title: "Women's Swing Tunic Notch Collar",
            image: "https://cdn.pixabay.com/photo/2024/04/29/04/21/tshirt-8726716_640.jpg",
            price: "400",
            oldPrice: "600",
            rating: 4.8,
            reviews: 120,
        },
        {
            id: "3",
            title: "Women's Swing Tunic Notch Collar",
            image: "https://cdn.pixabay.com/photo/2023/05/06/01/33/t-shirt-7973394_640.jpg",
            price: "400",
            oldPrice: "600",
            rating: 4.8,
            reviews: 120,
        },
        {
            id: "4",
            title: "Women's Swing Tunic Notch Collar",
            image: "https://cdn.pixabay.com/photo/2023/05/06/01/34/t-shirt-7973404_640.jpg",
            price: "400",
            oldPrice: "600",
            rating: 4.8,
            reviews: 120,
        },
    ];

    const CategoryItem = ({ item }) => (
        <View style={styles.categoryItem}>
            <TouchableOpacity style={styles.categoryBox}>
                <MaterialCommunityIcons name={item.icon} size={20} color="#333" />
            </TouchableOpacity>
            <Text style={styles.categoryLabel}>{item.name}</Text>
        </View>
    );

    const ProductCard = ({ item }) => (
        <View style={styles.productCard}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <TouchableOpacity style={styles.favoriteButton}>
                    <AntDesign name="hearto" size={14} color="black" />
                </TouchableOpacity>
            </View>
            <Text numberOfLines={2} style={styles.productTitle}>
                {item.title}
            </Text>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>Rs {item.price}</Text>
                <Text style={styles.oldPrice}>Rs {item.oldPrice}</Text>
            </View>
            <View style={styles.ratingContainer}>
                <AntDesign name="staro" size={12} color="#FFB800" />
                <Text style={styles.ratingText}>
                    {item.rating} ({item.reviews})
                </Text>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.locationLabel}>Location</Text>
                    <Text style={styles.locationText}>Baneshwor, Kathmandu</Text>
                </View>
                <MaterialCommunityIcons name="bell-outline" size={20} color="#333" />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <EvilIcons name="search" size={20} color="#999" />
                    <TextInput
                        placeholder="Find your favourite items"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                    />
                </View>
                <MaterialCommunityIcons name="image-filter-center-focus-strong" size={20} color="#999" />
            </View>



            {/* Categories */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={CATEGORIES}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={CategoryItem}
                contentContainerStyle={styles.categoriesList}
            />


            {/* Banner Slider */}
            <View style={styles.sliderContainer}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    style={styles.scrollView}
                >
                    {bannerImages.map((imageUri, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.bannerContainer}
                            activeOpacity={0.9}
                        >
                            <Image
                                source={{ uri: imageUri }}
                                style={styles.bannerImage}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Pagination Dots */}
                <View style={styles.paginationContainer}>
                    {bannerImages.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index ? styles.activeDot : styles.inactiveDot,
                            ]}
                            onPress={() => goToSlide(index)}
                        />
                    ))}
                </View>
            </View>

            {/* Products */}
            <Text style={styles.sectionTitle}>Hot Deals</Text>
            <FlatList
                data={PRODUCTS}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                contentContainerStyle={styles.productsList}
                renderItem={ProductCard}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}  // Disable scroll since we're inside ScrollView
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
    },
    locationLabel: {
        fontSize: 12,
        color: "#999",
        marginBottom: 2,
    },
    locationText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 24,
    },
    searchInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: "#333",
        marginLeft: 8,
    },
    sliderContainer: {
        marginBottom: 24,
    },
    scrollView: {
        height: 180,  // Reduced height to fit better
    },
    bannerContainer: {
        width: width - 32,  // Account for container padding
        height: 180,
        marginHorizontal: 14,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    activeDot: {
        backgroundColor: '#FC0079',
        width: 8,
    },
    inactiveDot: {
        backgroundColor: '#ddd',
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    viewAllText: {
        fontSize: 14,
        color: "#999",
    },
    categoriesList: {
        paddingBottom: 24,
    },
    categoryItem: {
        alignItems: "center",
        marginRight: 20,
    },
    categoryBox: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: "#EBEFFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    categoryLabel: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },
    productRow: {
        justifyContent: "space-between",
    },
    productsList: {
        paddingTop: 16,
        paddingBottom: 24,
    },
    productCard: {
        width: CARD_WIDTH,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        marginBottom: 16,
        padding: 8,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    imageContainer: {
        borderRadius: 6,
        overflow: "hidden",
        position: "relative",
    },
    productImage: {
        width: "100%",
        height: 120,
        resizeMode: "cover",
    },
    favoriteButton: {
        backgroundColor: "white",
        padding: 4,
        borderRadius: 4,
        position: "absolute",
        right: 6,
        top: 6,
    },
    productTitle: {
        fontSize: 13,
        fontWeight: "400",
        color: "#333",
        marginTop: 8,
        lineHeight: 16,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    price: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    oldPrice: {
        fontSize: 11,
        color: "#999",
        textDecorationLine: "line-through",
        marginLeft: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        gap: 4,
    },
    ratingText: {
        fontSize: 11,
        color: "#666",
        marginLeft: 2,
    },
});