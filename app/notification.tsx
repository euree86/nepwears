import React from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;


// Types
type NotificationItem = {
    icon: MaterialCommunityIconName; // ✅ This ensures icon is a valid name
    title: string;
    subtitle: string;
};

type NotificationSection = {
    section: string;
    items: NotificationItem[];
};

const NotificationsScreen = () => {
    const notifications: NotificationSection[] = [
        {
            section: 'Today',
            items: [
                {
                    icon: "tag-outline",
                    title: '30% Special Discount!',
                    subtitle: 'Special promotion only valid today.',
                },
            ],
        },
        {
            section: 'Yesterday',
            items: [
                {
                    icon: 'wallet-outline',
                    title: 'Top Up E-wallet Successfully!',
                    subtitle: 'You have top up your e-wallet.',
                },
                {
                    icon: 'map-marker-outline',
                    title: 'New Service Available!',
                    subtitle: 'Now you can track order in real-time.',
                },
            ],
        },
        {
            section: 'March 15, 2025',
            items: [
                {
                    icon: 'credit-card-outline',
                    title: 'Credit Card Connected!',
                    subtitle: 'Credit card has been linked.',
                },
                {
                    icon: 'account-outline',
                    title: 'Account Setup Successfully!',
                    subtitle: 'Your account has been created.',
                },
            ],
        },
    ];

    return (
        <ScrollView style={styles.container}>
            {notifications.map((section: NotificationSection, sectionIndex: number) => (
                <View key={sectionIndex} style={styles.section}>
                    <Text style={styles.sectionTitle}>{section.section}</Text>

                    {section.items.map((item: NotificationItem, itemIndex: number) => (
                        <View key={itemIndex}>
                            <View style={styles.notificationItem}>
                                <MaterialCommunityIcons name={item.icon} size={24} color="#333" style={styles.icon} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                                </View>
                            </View>
                            {itemIndex !== section.items.length - 1 && <View style={styles.divider} />}
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
        marginBottom: 15,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 10,
    },
    icon: {
        marginRight: 15,
        marginTop: 4,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        lineHeight: 18,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginLeft: 39, // Align with text start
    },
});

export default NotificationsScreen;
