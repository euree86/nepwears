import React, { useState, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Modal,
    Pressable,
    Animated
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface Variant {
    variantId: string;
    variantName: string;
    images: string[];
}

interface ProductImagesProps {
    variants: Variant[];
    selectedVariantIndex: number;
    onSelectVariant: (index: number) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({
    variants,
    selectedVariantIndex,
    onSelectVariant
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);

    const scrollRef = useRef<ScrollView>(null);
    const fullscreenScrollRef = useRef<ScrollView>(null);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const selectedImages = variants[selectedVariantIndex]?.images || [];

    const onScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    const openModalAtIndex = (index: number) => {
        setCurrentIndex(index);
        setModalVisible(true);
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();

        setTimeout(() => {
            fullscreenScrollRef.current?.scrollTo({ x: index * width, animated: false });
        }, 50);
    };

    return (
        <View>
            {/* Scrollable Main Carousel with Dot Navigator Inside */}
            <View style={styles.imageSliderContainer}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    ref={scrollRef}
                >
                    {selectedImages.map((img, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.9}
                            onPress={() => openModalAtIndex(index)}
                        >
                            <Image source={{ uri: img }} style={styles.mainImage} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Dot Indicator Inside */}
                <View style={styles.dotOverlay}>
                    {selectedImages.map((_, i) => (
                        <View
                            key={i}
                            style={[styles.dot, i === currentIndex && styles.activeDot]}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.colorcontainer}>
                <Text style={styles.colortext}> COLOUR: MULTI</Text>
            </View>

            {/* Thumbnails for Variants */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.thumbnailScroll}
            >
                {variants.map((variant, index) => (
                    <TouchableOpacity
                        key={variant.variantId}
                        onPress={() => {
                            onSelectVariant(index);
                            setCurrentIndex(0);
                            scrollRef.current?.scrollTo({ x: 0, animated: false });
                        }}
                    >
                        <Image
                            source={{ uri: variant.images[0] }}
                            style={[
                                styles.thumbnail,
                                index === selectedVariantIndex && styles.activeThumbnail
                            ]}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Full Screen Modal */}
            <Modal visible={isModalVisible} transparent animationType="none">
                <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <MaterialCommunityIcons name="close" size={30} color="#fff" />
                    </Pressable>

                    <ScrollView
                        ref={fullscreenScrollRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={onScroll}
                        scrollEventThrottle={16}
                    >
                        {selectedImages.map((img, i) => (
                            <Image
                                key={i}
                                source={{ uri: img }}
                                style={styles.fullscreenImage}
                            />
                        ))}
                    </ScrollView>
                </Animated.View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    imageSliderContainer: {
        height: 450,
        position: "relative"
    },
    mainImage: {
        width: width,
        height: 500,
        resizeMode: "cover"
    },
    dotOverlay: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 4,
        backgroundColor: "#aaa",
        marginHorizontal: 4
    },
    activeDot: {
        backgroundColor: "#fff"
    },
    colorcontainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    colortext: {
        fontSize: 14,
        fontWeight: "500",
    },
    thumbnailScroll: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingTop: 10,
    },
    thumbnail: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "transparent"
    },
    activeThumbnail: {
        borderColor: "#FC0079"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center"
    },
    fullscreenImage: {
        width: width,
        height: height,
        resizeMode: "cover"
    },
    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 10
    }
});

export default ProductImages;
