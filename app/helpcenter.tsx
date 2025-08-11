import React, { useMemo, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Alert,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Platform
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Header from './components/header';

type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap;
type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive scaling
const scale = screenWidth / 375;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale - 1) * factor;

interface ServiceItem {
    id: string;
    name: string;
    description: string;
    icon: FontAwesomeIconName | MaterialIconName;
    iconLibrary: 'FontAwesome' | 'MaterialIcons';
    color: string;
    backgroundColor: string;
    url: string;
    category: 'contact' | 'social' | 'support';
}

interface ServiceCategory {
    title: string;
    key: string;
    services: ServiceItem[];
}

const CustomerService = () => {
    // Memoized services configuration
    const services = useMemo<ServiceItem[]>(() => [
        {
            id: 'customer-service',
            name: 'Customer Service',
            description: 'Get help from our support team',
            icon: 'headset',
            iconLibrary: 'MaterialIcons',
            color: '#1F2937',
            backgroundColor: '#F3F4F6',
            url: 'tel:+1234567890',
            category: 'contact'
        },
        {
            id: 'whatsapp',
            name: 'WhatsApp',
            description: 'Chat with us on WhatsApp',
            icon: 'whatsapp',
            iconLibrary: 'FontAwesome',
            color: '#25D366',
            backgroundColor: '#ECFDF5',
            url: 'https://wa.me/1234567890',
            category: 'contact'
        },
        {
            id: 'email',
            name: 'Email Support',
            description: 'Send us your queries',
            icon: 'email',
            iconLibrary: 'MaterialIcons',
            color: '#DC2626',
            backgroundColor: '#FEF2F2',
            url: 'mailto:support@yourcompany.com',
            category: 'contact'
        },
        {
            id: 'live-chat',
            name: 'Live Chat',
            description: 'Chat with us in real-time',
            icon: 'chat',
            iconLibrary: 'MaterialIcons',
            color: '#7C3AED',
            backgroundColor: '#F5F3FF',
            url: 'https://yourwebsite.com/chat',
            category: 'support'
        },
        {
            id: 'faq',
            name: 'FAQ',
            description: 'Find answers to common questions',
            icon: 'help',
            iconLibrary: 'MaterialIcons',
            color: '#059669',
            backgroundColor: '#ECFDF5',
            url: 'https://yourwebsite.com/faq',
            category: 'support'
        },
        {
            id: 'website',
            name: 'Website',
            description: 'Visit our official website',
            icon: 'globe',
            iconLibrary: 'FontAwesome',
            color: '#4285F4',
            backgroundColor: '#EFF6FF',
            url: 'https://yourwebsite.com',
            category: 'support'
        },
        {
            id: 'facebook',
            name: 'Facebook',
            description: 'Follow us for updates',
            icon: 'facebook-square',
            iconLibrary: 'FontAwesome',
            color: '#4267B2',
            backgroundColor: '#EFF6FF',
            url: 'https://facebook.com/yourpage',
            category: 'social'
        },

        {
            id: 'instagram',
            name: 'Instagram',
            description: 'See our latest posts',
            icon: 'instagram',
            iconLibrary: 'FontAwesome',
            color: '#E1306C',
            backgroundColor: '#FDF2F8',
            url: 'https://instagram.com/yourhandle',
            category: 'social'
        },
    ], []);

    // Group services by category
    const serviceCategories = useMemo<ServiceCategory[]>(() => {
        const categories = services.reduce((acc, service) => {
            if (!acc[service.category]) {
                acc[service.category] = [];
            }
            acc[service.category].push(service);
            return acc;
        }, {} as Record<string, ServiceItem[]>);

        return [
            {
                title: 'Contact Us',
                key: 'contact',
                services: categories.contact || []
            },
            {
                title: 'Support',
                key: 'support',
                services: categories.support || []
            },
            {
                title: 'Follow Us',
                key: 'social',
                services: categories.social || []
            }
        ];
    }, [services]);

    // Optimized link opening with error handling
    const openLink = useCallback(async (url: string, serviceName: string) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(
                    'Unable to Open',
                    `Cannot open ${serviceName}. Please check if the app is installed.`,
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            console.error(`Error opening ${serviceName}:`, error);
            Alert.alert(
                'Error',
                `Something went wrong opening ${serviceName}. Please try again.`,
                [{ text: 'OK' }]
            );
        }
    }, []);

    // Render icon based on library
    const renderIcon = useCallback((service: ServiceItem) => {
        const iconSize = moderateScale(24);

        if (service.iconLibrary === 'FontAwesome') {
            return (
                <FontAwesome
                    name={service.icon as FontAwesomeIconName}
                    size={iconSize}
                    color={service.color}
                />
            );
        } else {
            return (
                <MaterialIcons
                    name={service.icon as MaterialIconName}
                    size={iconSize}
                    color={service.color}
                />
            );
        }
    }, []);

    // Render individual service item
    const renderServiceItem = useCallback((service: ServiceItem) => (
        <TouchableOpacity
            key={service.id}
            style={[
                styles.serviceBox,
                { backgroundColor: service.backgroundColor }
            ]}
            onPress={() => openLink(service.url, service.name)}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer,]}>
                {renderIcon(service)}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.serviceTitle}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
            </View>
            <MaterialIcons
                name="chevron-right"
                size={moderateScale(20)}
                color="#9CA3AF"
            />
        </TouchableOpacity>
    ), [openLink, renderIcon]);

    // Render service category
    const renderCategory = useCallback((category: ServiceCategory) => (
        <View key={category.key} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
            </View>
            <View style={styles.categoryContent}>
                {category.services.map(renderServiceItem)}
            </View>
        </View>
    ), [renderServiceItem]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Help Center" />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <Text style={styles.headerSubtitle}>
                        Choose the best way to get in touch with us. We're here to help!
                    </Text>
                </View>

                {serviceCategories.map(renderCategory)}


            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: moderateScale(20),
    },
    headerSection: {
        paddingHorizontal: moderateScale(16),
        alignItems: 'center',
        paddingVertical: moderateScale(12),
    },

    headerSubtitle: {
        fontSize: moderateScale(14),
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: moderateScale(18),
    },
    categoryContainer: {
        marginBottom: moderateScale(24),
    },
    categoryHeader: {
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateScale(12),
    },
    categoryTitle: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: moderateScale(3),
    },
    categorySubtitle: {
        fontSize: moderateScale(11),
        color: '#9CA3AF',
    },
    categoryContent: {
        paddingHorizontal: moderateScale(16),
        gap: moderateScale(10),
    },
    serviceBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: moderateScale(12),
        borderRadius: moderateScale(8),
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    iconContainer: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(12),
    },
    textContainer: {
        flex: 1,
    },
    serviceTitle: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: '#111827',
        marginBottom: moderateScale(1),
    },
    serviceDescription: {
        fontSize: moderateScale(11),
        color: '#6B7280',
        lineHeight: moderateScale(16),
    },
    footerSection: {
        marginHorizontal: moderateScale(16),
        marginTop: moderateScale(16),
        padding: moderateScale(16),
        backgroundColor: '#FEF2F2',
        borderRadius: moderateScale(16),
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    emergencyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: moderateScale(12),
    },
    emergencyText: {
        fontSize: moderateScale(12),
        color: '#7F1D1D',
        marginLeft: moderateScale(8),
        flex: 1,
        lineHeight: moderateScale(18),
    },
    emergencyButton: {
        backgroundColor: '#DC2626',
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(20),
        borderRadius: moderateScale(8),
        alignItems: 'center',
    },
    emergencyButtonText: {
        fontSize: moderateScale(12),
        fontWeight: '700',
        color: '#FFFFFF',
    },
});


export default CustomerService;