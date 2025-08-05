import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Form from './form';
import OnboardingCarousel from './carausel';
import DotIndicator from './dotindicator';
import { Animated } from 'react-native';
import Header from '../components/header';
import { LinearGradient } from 'expo-linear-gradient';

const slides = [{
    id: 1,
    name: 'Silver',
    subtitle: 'Essential Membership',
    image: "https://cdn.pixabay.com/photo/2025/07/20/07/37/hand-9723837_640.jpg",
    gradientColors: ['#C0C0C0', '#E8E8E8', '#F5F5F5'] as [string, string, ...string[]],
    accentColor: '#8B8B8B',
    benefits: [
        '100 points = 5% discount',
        '500 points = 10% discount',
        '1000 points = 15% discount',
        'Basic customer support'
    ]
},
{
    id: 2,
    name: 'Gold',
    subtitle: 'Premium Experience',
    image: "https://cdn.pixabay.com/photo/2025/07/17/13/57/care-9719575_640.jpg",
    gradientColors: ['#FFD700', '#FFA500', '#FF8C00'] as [string, string, ...string[]],
    accentColor: '#B8860B',
    benefits: [
        '100 points = 8% discount',
        '500 points = 15% discount',
        '1000 points = 20% discount',
        'Priority customer support',
        'Exclusive member events'
    ]
},
{
    id: 3,
    name: 'Platinum',
    subtitle: 'VIP Elite Status',
    image: "https://cdn.pixabay.com/photo/2025/07/26/03/16/butterfly-9735952_640.jpg",
    gradientColors: ['#E5E4E2', '#D3D3D3', '#B8B8B8'] as [string, string, ...string[]],
    accentColor: '#696969',
    benefits: [
        '100 points = 12% discount',
        '500 points = 20% discount',
        '1000 points = 25% discount',
        'Dedicated account manager',
        'Free premium shipping'
    ]
}];


const OnboardingWrapper = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [showProfileForm, setShowProfileForm] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleGetStarted = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            setShowProfileForm(true);
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Header title='Membership Tiers' />

            {!showProfileForm && (
                <Animated.View
                    style={[
                        styles.onboardingOverlay,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }]
                        }
                    ]}
                >
                    <LinearGradient
                        colors={['white', '#e9ecef', 'white']}
                        style={styles.gradientBackground}
                    >
                        <View style={styles.headerSection}>
                            <Text style={styles.welcomeTitle}>Choose Your Membership</Text>
                            <Text style={styles.welcomeSubtitle}>
                                Unlock exclusive benefits and rewards
                            </Text>
                        </View>

                        <OnboardingCarousel slides={slides} scrollX={scrollX} />
                        <DotIndicator scrollX={scrollX} slideCount={slides.length} />

                        <TouchableOpacity
                            style={styles.getStartedButton}
                            onPress={handleGetStarted}
                            activeOpacity={0.8}
                        >
                            <View style={styles.buttonGradient}>
                                <Text style={styles.getStartedText}>Get Started</Text>
                            </View>

                        </TouchableOpacity>
                    </LinearGradient>
                </Animated.View>
            )}

            <View
                style={[
                    styles.profileScreenContainer,
                    !showProfileForm && { opacity: 0.1, pointerEvents: 'none' },
                ]}
            >
                <Form />
            </View>
        </View>
    );
};

export default OnboardingWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    onboardingOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
    },
    gradientBackground: {
        flex: 1,
    },
    headerSection: {
        paddingTop: 20,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: 600,
        color: '#2c3e50',
        textAlign: 'center',
    },
    welcomeSubtitle: {
        fontSize: 12,
        color: '#7f8c8d',
        textAlign: 'center',
        lineHeight: 22,
    },
    getStartedButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        borderRadius: 16,

    },
    buttonGradient: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: "#FC0079",
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