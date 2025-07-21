import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import NotificationPopup from "../homealert"

const { width } = Dimensions.get('window');

const App = () => {
    const router = useRouter();
    const [showNotificationPopup, setShowNotificationPopup] = useState(true);


    const [currentSlide, setCurrentSlide] = useState(0);
    const slideAnim = useRef(new Animated.Value(0)).current;

    const categories = [
        { name: 'Tops', icon: 'tshirt-crew-outline' },
        { name: 'Footwears', icon: 'shoe-formal' },
        { name: 'Dresses', icon: 'hanger' },
        { name: 'Pants', icon: 'tshirt-v-outline' },
        { name: 'Skirts', icon: 'tshirt-crew-outline' },
        { name: 'Shoes', icon: 'shoe-sneaker' },
        { name: 'Bags', icon: 'bag-personal-outline' },
        { name: 'Watches', icon: 'watch-outline' },

    ];

    const bannerSlides = [
        {
            id: 1,
            image: 'https://cdn.pixabay.com/photo/2016/11/14/04/25/bride-1822587_640.jpg',
        },
        {
            id: 2,
            image: 'https://cdn.pixabay.com/photo/2016/04/10/21/34/woman-1320810_640.jpg',
        },
        {
            id: 3,
            image: 'https://cdn.pixabay.com/photo/2021/07/11/19/07/girl-6404712_640.jpg',
        },
    ];

    const products = [
        {
            id: 1,
            name: 'High Neck Shirt in White',
            price: 400,
            originalPrice: 500,
            rating: 4.8,
            reviews: 700,
            image: "https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_640.png",
        },
        {
            id: 2,
            name: 'High Neck Shirt in White',
            price: 400,
            originalPrice: 500,
            rating: 4.8,
            reviews: 120,
            image: "https://cdn.pixabay.com/photo/2016/12/06/09/30/blank-1886001_640.png",
        },
        {
            id: 3,
            name: 'High Neck Shirt in Black',
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
    const handleNotificationResponse = (allowed: boolean) => {
        console.log("Notification allowed?", allowed);
        setShowNotificationPopup(false);
    };
    // Auto slider effect
    useEffect(() => {
        const interval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % bannerSlides.length;
            setCurrentSlide(nextSlide);

            Animated.timing(slideAnim, {
                toValue: -nextSlide * (width - 40),
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [currentSlide, slideAnim, bannerSlides.length]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, backgroundColor: 'white', opacity: showNotificationPopup ? 0.3 : 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.push("../location")}>
                            <View style={styles.locationContainer}>
                                <Text style={styles.locationLabel}>Location</Text>
                                <View style={styles.locationRow}>
                                    <Text style={styles.locationText}>Baneshwor, Kathmandu</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.profileButton} onPress={() => router.push("../notification")}>
                            <View style={styles.profileIcon}>
                                <EvilIcons name="bell" size={22} color="black" />

                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <View style={styles.searchIcon}>
                            <EvilIcons name="search" size={22} color="black" />
                        </View>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Find your favorite items"
                            placeholderTextColor="#999"
                            selectionColor="#FF6B35"
                        />
                        <View>
                            <MaterialCommunityIcons name="image-filter-center-focus" size={22} color="black" />
                        </View>
                    </View>



                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Categories</Text>
                            <TouchableOpacity>
                                <Text style={styles.viewAllText}>View All</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.categoriesScrollContainer}
                        >
                            {categories.map((category, index) => (
                                <TouchableOpacity key={index} style={styles.categoryItem}>
                                    <View style={styles.categoryIcon}>
                                        <MaterialCommunityIcons name={category.icon as any} size={24} color="black" />
                                    </View>
                                    <Text style={styles.categoryText}>{category.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>


                    {/* Promotional Banner Slider */}
                    <View style={styles.bannerContainer}>
                        <View style={styles.sliderContainer}>
                            <Animated.View
                                style={[
                                    styles.sliderWrapper,
                                    {
                                        transform: [{ translateX: slideAnim }],
                                        width: bannerSlides.length * (width - 40),
                                    },
                                ]}
                            >
                                {bannerSlides.map((slide) => (
                                    <View
                                        key={slide.id}
                                        style={{ width: width - 40, overflow: 'hidden' }}
                                    >
                                        <Image
                                            source={{ uri: slide.image }}
                                            style={styles.bannerImage}
                                            resizeMode="cover"
                                        />
                                    </View>
                                ))}
                            </Animated.View>
                        </View>

                        {/* Optional: Slider Indicators */}
                        <View style={styles.indicatorContainer}>
                            {bannerSlides.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.indicator,
                                        { opacity: currentSlide === index ? 1 : 0.3 },
                                    ]}
                                />
                            ))}
                        </View>
                    </View>


                    {/* Hot Deals */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Hot Deals</Text>
                        <View style={styles.productsGrid}>
                            {products.map((product) => (
                                <TouchableOpacity onPress={() => router.push("../sizeproductdetail")}>
                                    <View key={product.id} style={styles.productCard}>
                                        <View >
                                            <Image source={{ uri: product.image }} style={styles.productImage} />
                                        </View>
                                        <View style={styles.productInfo}>
                                            <Text style={styles.productName} numberOfLines={2}>
                                                {product.name}
                                            </Text>
                                            <View style={styles.priceRow}>
                                                <Text style={styles.currentPrice}>Rs {product.price}</Text>
                                                <Text style={styles.originalPrice}>Rs {product.originalPrice}</Text>
                                            </View>
                                            <View style={styles.ratingRow}>
                                                <Text style={styles.starIcon}>⭐</Text>
                                                <Text style={styles.rating}>{product.rating}</Text>
                                                <Text style={styles.reviews}>({product.reviews})</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
            <NotificationPopup
                visible={showNotificationPopup}
                onResponse={handleNotificationResponse}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 4,
        backgroundColor: '#FFFFFF',
    },

    popupOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)', // translucent black for dimming effect
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    locationContainer: {
        flex: 1,
    },
    locationLabel: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 2,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginRight: 5,
    },
    dropdownIcon: {
        fontSize: 10,
        color: '#666666',
    },
    profileButton: {
        marginTop: 5,
    },
    profileIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,

        justifyContent: 'center',
        alignItems: 'center',
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 5,
    },

    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333333',
        borderWidth: 0,
        outlineWidth: 0,
        // Remove all border and outline styles
        borderColor: 'transparent',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333333',


    },
    viewAllText: {
        fontSize: 14,
        color: 'black',
        fontWeight: '500',
    },
    categoriesScrollContainer: {
        paddingRight: 10,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 20,
        width: 60,
    },
    categoryIcon: {
        width: 50,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: "#EBEFFF",
    },
    categoryEmoji: {
        fontSize: 22,
    },
    categoryText: {
        fontSize: 12,
        color: '#666666',
        textAlign: 'center',
        fontWeight: '500',
    },
    bannerContainer: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    sliderContainer: {
        overflow: 'hidden',
        borderRadius: 15,
    },
    sliderWrapper: {
        flexDirection: 'row',
    },
    banner: {
        flexDirection: 'row',
        height: 130,
    },
    bannerLeft: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    bannerDiscount: {
        fontSize: 36,
        fontWeight: '900',
        color: '#FFFFFF',
        lineHeight: 40,
    },
    bannerOff: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        marginTop: -5,
        marginBottom: 8,
    },
    bannerBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    bannerBadgeText: {
        fontSize: 10,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    bannerRight: {
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImage: {
        width: '100%',
        height: 200, // or whatever height you need
        borderRadius: 10,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FC0079',
        marginHorizontal: 4,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: (width - 50) / 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 15,
    },

    productImage: {
        width: '100%',
        height: 150,
    },

    productInfo: {
        padding: 12,
    },
    productName: {
        fontSize: 13,
        color: '#323135',
        marginBottom: 8,
        lineHeight: 16,
        fontWeight: '500',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    currentPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: 'black',
        marginRight: 8,
    },
    originalPrice: {
        fontSize: 12,
        color: '#999999',
        textDecorationLine: 'line-through',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        fontSize: 12,
        marginRight: 3,
    },
    rating: {
        fontSize: 12,
        color: '#333333',
        fontWeight: '600',
        marginRight: 3,
    },
    reviews: {
        fontSize: 12,
        color: '#666666',
    },
});

export default App;