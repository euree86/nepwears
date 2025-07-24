"use client";
import { Platform } from "react-native";
import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
    SafeAreaView,
} from "react-native";

const NotificationSettingsScreen = () => {
    const [settings, setSettings] = useState({
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

    const handleToggle = (key: keyof typeof settings) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const renderSettingItem = (
        title: string,
        key: keyof typeof settings,
        isLast: boolean = false
    ) => (


        <View style={[styles.settingItem, isLast && styles.lastItem]}>
            <Text style={styles.settingTitle}>{title}</Text>
            <Switch
                value={settings[key]}
                onValueChange={() => handleToggle(key)}
                trackColor={{ false: "#D3D3D3", true: "#2e2e2e" }}
                thumbColor={"#ffffff"}
                ios_backgroundColor="#D3D3D3"
                style={styles.switch}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.settingsContainer}>
                    {renderSettingItem("General Notifications", "generalNotifications")}
                    {renderSettingItem("Sound", "sound")}
                    {renderSettingItem("Vibrate", "vibrate")}
                    {renderSettingItem("Special Offers", "specialOffers")}
                    {renderSettingItem("Promo & Discounts", "promoDiscounts")}
                    {renderSettingItem("Payments", "payments")}
                    {renderSettingItem("Cashback", "cashback")}
                    {renderSettingItem("App Updates", "appUpdates")}
                    {renderSettingItem("New Service Available", "newServiceAvailable", true)}
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
    settingsContainer: {
        marginHorizontal: 20,

    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 4,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    settingTitle: {
        fontSize: 16,
        color: "#333",
        fontWeight: "400",
    },
    switch: {
        transform: Platform.OS === "ios" ? [{ scaleX: 0.9 }, { scaleY: 0.8 }] : [{ scaleX: 0.9 }, { scaleY: 0.8 }],

    },
});

export default NotificationSettingsScreen;
