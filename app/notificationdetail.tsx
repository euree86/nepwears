"use client";
import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./components/header";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Responsive scaling
const scale = screenWidth / 375; // Based on iPhone X width
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale - 1) * factor;

// Type definitions
interface NotificationSettings {
    generalNotifications: boolean;
    sound: boolean;
    vibrate: boolean;
    specialOffers: boolean;
    promoDiscounts: boolean;
    payments: boolean;
    cashback: boolean;
    appUpdates: boolean;
    newServiceAvailable: boolean;
}

interface SettingConfig {
    key: keyof NotificationSettings;
    title: string;
    subtitle?: string;
    icon: string;
    category: 'general' | 'marketing' | 'account';
}

const NotificationSettingsScreen = () => {
    const [settings, setSettings] = useState<NotificationSettings>({
        generalNotifications: true,
        sound: true,
        vibrate: false,
        specialOffers: true,
        promoDiscounts: true,
        payments: false,
        cashback: false,
        appUpdates: true,
        newServiceAvailable: true,
    });

    // Optimized toggle handler with useCallback alternative
    const handleToggle = (key: keyof NotificationSettings) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // Memoized settings configuration
    const settingsConfig = useMemo<SettingConfig[]>(() => [
        {
            key: 'generalNotifications',
            title: 'General Notifications',
            subtitle: 'Allow all notifications',
            icon: 'notifications',
            category: 'general'
        },
        {
            key: 'sound',
            title: 'Sound',
            subtitle: 'Play sound for notifications',
            icon: 'volume-up',
            category: 'general'
        },
        {
            key: 'vibrate',
            title: 'Vibrate',
            subtitle: 'Vibrate on notifications',
            icon: 'vibration',
            category: 'general'
        },
        {
            key: 'specialOffers',
            title: 'Special Offers',
            subtitle: 'Get notified about special deals',
            icon: 'local-offer',
            category: 'marketing'
        },
        {
            key: 'promoDiscounts',
            title: 'Promo & Discounts',
            subtitle: 'Receive promotional offers',
            icon: 'discount',
            category: 'marketing'
        },
        {
            key: 'payments',
            title: 'Payments',
            subtitle: 'Transaction notifications',
            icon: 'payment',
            category: 'account'
        },
        {
            key: 'cashback',
            title: 'Cashback',
            subtitle: 'Cashback and rewards updates',
            icon: 'account-balance-wallet',
            category: 'account'
        },
        {
            key: 'appUpdates',
            title: 'App Updates',
            subtitle: 'New version notifications',
            icon: 'system-update',
            category: 'general'
        },
        {
            key: 'newServiceAvailable',
            title: 'New Service Available',
            subtitle: 'Get notified about new features',
            icon: 'new-releases',
            category: 'general'
        },
    ], []);

    // Group settings by category
    const groupedSettings = useMemo(() => {
        const groups = settingsConfig.reduce((acc, setting) => {
            if (!acc[setting.category]) {
                acc[setting.category] = [];
            }
            acc[setting.category].push(setting);
            return acc;
        }, {} as Record<string, SettingConfig[]>);

        return [
            { title: 'General', key: 'general', settings: groups.general || [] },
            { title: 'Marketing', key: 'marketing', settings: groups.marketing || [] },
            { title: 'Account & Security', key: 'account', settings: groups.account || [] },
        ];
    }, [settingsConfig]);

    const renderSettingItem = (config: SettingConfig, isLast: boolean = false) => (
        <View key={config.key} style={[styles.settingItem, isLast && styles.lastItem]}>
            <View style={styles.settingContent}>
                <View style={styles.iconContainer}>
                    <MaterialIcons
                        name={config.icon as any}
                        size={moderateScale(20)}
                        color="#666"
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.settingTitle}>{config.title}</Text>
                    {config.subtitle && (
                        <Text style={styles.settingSubtitle}>{config.subtitle}</Text>
                    )}
                </View>
            </View>
            <Switch
                value={settings[config.key]}
                onValueChange={() => handleToggle(config.key)}
                trackColor={{
                    false: "#E5E7EB",
                    true: "#d63384"
                }}
                thumbColor="#ffffff"
                ios_backgroundColor="#E5E7EB"
                style={styles.switch}
            />
        </View>
    );

    const renderCategory = (category: typeof groupedSettings[0]) => (
        <View key={category.key} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <View style={styles.categoryContent}>
                {category.settings.map((setting, index) =>
                    renderSettingItem(setting, index === category.settings.length - 1)
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Notification Settings" />
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.headerSection}>
                    <Text style={styles.headerText}>
                        Manage your notification preferences to stay informed about what matters most to you.
                    </Text>
                </View>

                {groupedSettings.map(renderCategory)}

                <View style={styles.footerSection}>
                    <Text style={styles.footerText}>
                        You can change these settings anytime. Some notifications may still appear for security and legal purposes.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: moderateScale(30),
    },
    headerSection: {
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(10),
        paddingBottom: moderateScale(20),
    },
    headerText: {
        fontSize: moderateScale(14),
        color: "#6B7280",
        lineHeight: moderateScale(20),
        textAlign: "center",
    },
    categoryContainer: {
        marginBottom: moderateScale(24),
    },
    categoryTitle: {
        fontSize: moderateScale(16),
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: moderateScale(12),
        marginHorizontal: moderateScale(20),
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    categoryContent: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: moderateScale(20),
        borderRadius: moderateScale(12),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(16),
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    settingContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: moderateScale(16),
    },
    iconContainer: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: "#F9FAFB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: moderateScale(12),
    },
    textContainer: {
        flex: 1,
    },
    settingTitle: {
        fontSize: moderateScale(16),
        color: "#1F2937",
        fontWeight: "500",
        marginBottom: moderateScale(2),
    },
    settingSubtitle: {
        fontSize: moderateScale(13),
        color: "#6B7280",
        lineHeight: moderateScale(18),
    },
    switch: {
        transform: Platform.select({
            ios: [{ scaleX: 0.9 }, { scaleY: 0.85 }],
            android: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
        }),
    },
    footerSection: {
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(20),
    },
    footerText: {
        fontSize: moderateScale(12),
        color: "#9CA3AF",
        lineHeight: moderateScale(18),
        textAlign: "center",
    },
});

export default NotificationSettingsScreen;