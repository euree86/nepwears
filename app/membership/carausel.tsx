import React from 'react';
import {
    View,
    Text,
    Dimensions,
    Animated,
    StyleSheet,
    ImageBackground,
    FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Slide {
    id: number;
    name: string;
    subtitle: string;
    image: string;
    gradientColors: [string, string, ...string[]];
    accentColor: string;
    benefits: string[];
}

interface CarouselProps {
    slides: Slide[];
    scrollX: Animated.Value;
}

const OnboardingCarousel: React.FC<CarouselProps> = ({ slides, scrollX }) => {
    const renderBenefit = (benefit: string, index: number) => (
        <View key={index} style={styles.benefitRow}>
            <View style={styles.checkIconContainer}>
                <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
            </View>
            <Text style={styles.benefit}>{benefit}</Text>
        </View>
    );

    return (
        <Animated.FlatList
            data={slides}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item, index }) => {
                const inputRange = [
                    (index - 1) * width,
                    index * width,
                    (index + 1) * width,
                ];

                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1, 0.8],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.6, 1, 0.6],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        style={[
                            styles.slide,
                            {
                                transform: [{ scale }],
                                opacity,
                            }
                        ]}
                    >
                        <View style={styles.card}>
                            <ImageBackground
                                source={{ uri: item.image }}
                                style={styles.image}
                                imageStyle={styles.imageStyle}
                            >
                                <LinearGradient
                                    colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
                                    style={styles.overlay}
                                />
                                <View style={styles.tierBadge}>
                                    <LinearGradient
                                        colors={item.gradientColors}
                                        style={styles.badgeGradient}
                                    >
                                        <Text style={[styles.tierName, { color: item.accentColor }]}>
                                            {item.name}
                                        </Text>
                                    </LinearGradient>
                                </View>
                            </ImageBackground>

                            <View style={styles.textContainer}>
                                <Text style={styles.subtitle}>{item.subtitle}</Text>

                                <View style={styles.divider} />

                                <View style={styles.benefitsContainer}>
                                    <Text style={styles.benefitsTitle}>Member Benefits</Text>
                                    {item.benefits.map((benefit, benefitIndex) =>
                                        renderBenefit(benefit, benefitIndex)
                                    )}
                                </View>


                            </View>
                        </View>
                    </Animated.View>
                );
            }}
        />
    );
};

export default OnboardingCarousel;

const CARD_WIDTH = width * 0.85;
const IMAGE_HEIGHT = 200;

const styles = StyleSheet.create({
    flatListContainer: {
        paddingVertical: 40,
    },
    slide: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: 'white',
        borderRadius: 24,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
    },
    image: {
        width: '100%',
        height: IMAGE_HEIGHT,
        justifyContent: 'flex-end',
    },
    imageStyle: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    tierBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        borderRadius: 20,
        overflow: 'hidden',
    },
    badgeGradient: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    tierName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textContainer: {
        padding: 20,
    },
    subtitle: {
        fontSize: 20,
        color: '#2c3e50',
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    divider: {
        height: 2,
        backgroundColor: '#ecf0f1',
        marginVertical: 16,
        borderRadius: 1,
    },
    benefitsContainer: {
        marginTop: 8,
    },
    benefitsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 12,
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    checkIconContainer: {
        marginRight: 12,
    },
    benefit: {
        fontSize: 15,
        color: '#2c3e50',
        flex: 1,
        lineHeight: 20,
    },

});