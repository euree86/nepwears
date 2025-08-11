import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Animated,
    Dimensions,
} from 'react-native';
import OnboardingCarousel from './carausel';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/header';
import Form from './form';
import DotIndicator from './dotindicator';
const { width } = Dimensions.get('window');

const slides = [
    {
        id: 1,
        name: 'Silver',
        subtitle: 'Essential Membership',
        image: 'https://cdn.pixabay.com/photo/2025/07/20/07/37/hand-9723837_640.jpg',
        gradientColors: ['#C0C0C0', '#E8E8E8', '#F5F5F5'] as [string, string, ...string[]],
        accentColor: '#8B8B8B',
        benefits: [
            '100 points = 5% discount',
            '500 points = 10% discount',
            '1000 points = 15% discount',
            'Basic customer support',
        ],
    },
    {
        id: 2,
        name: 'Gold',
        subtitle: 'Premium Experience',
        image: 'https://cdn.pixabay.com/photo/2025/07/17/13/57/care-9719575_640.jpg',
        gradientColors: ['#FFD700', '#FFA500', '#FF8C00'] as [string, string, ...string[]],
        accentColor: '#B8860B',
        benefits: [
            '100 points = 8% discount',
            '500 points = 15% discount',
            '1000 points = 20% discount',
            'Priority customer support',
            'Exclusive member events',
        ],
    },
    {
        id: 3,
        name: 'Platinum',
        subtitle: 'VIP Elite Status',
        image: 'https://cdn.pixabay.com/photo/2025/07/26/03/16/butterfly-9735952_640.jpg',
        gradientColors: ['#E5E4E2', '#D3D3D3', '#B8B8B8'] as [string, string, ...string[]],
        accentColor: '#696969',
        benefits: [
            '100 points = 12% discount',
            '500 points = 20% discount',
            '1000 points = 25% discount',
            'Dedicated account manager',
            'Free premium shipping',
        ],
    },
];

const OnboardingWrapper = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showProfileForm, setShowProfileForm] = useState(false);

    useEffect(() => {
        const listenerId = scrollX.addListener(({ value }) => {
            const index = Math.round(value / width);
            setCurrentIndex(index);
        });
        return () => {
            scrollX.removeListener(listenerId);
        };
    }, []);

    const handleGetStarted = () => {
        setShowProfileForm(true);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Header title="Membership Tiers" />

            {!showProfileForm && (
                <View style={styles.carouselContainer}>
                    <OnboardingCarousel slides={slides} scrollX={scrollX} />

                    {/* Dot indicator always visible */}
                    <DotIndicator scrollX={scrollX} slideCount={slides.length} />

                    {/* Get Started button only on last slide */}
                    {currentIndex === slides.length - 1 && (
                        <TouchableOpacity
                            style={styles.getStartedButton}
                            onPress={handleGetStarted}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#FC0079', '#FD3A69']}
                                start={[0, 0]}
                                end={[1, 0]}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.getStartedText}>Get Started</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {showProfileForm && (
                <View style={styles.profileScreenContainer}>
                    <Form />
                </View>
            )}
        </View>
    );
};

export default OnboardingWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    carouselContainer: {
        flex: 1,
    },
    getStartedButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        borderRadius: 30,
        overflow: 'hidden',
    },
    buttonGradient: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        alignItems: 'center',
    },
    getStartedText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    profileScreenContainer: {
        flex: 1,
    },
});
