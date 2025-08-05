import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
} from "react-native";
import Header from "./components/header";
const OrderTrackingScreen = () => {
    const [activeTab, setActiveTab] = useState("Ongoing");
    const orderData = {
        Ongoing: [
            {
                id: 1,
                name: "Premium Quality",
                size: "XL",
                price: "Rs 700",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop",
                status: "Track Order",
            },
            {
                id: 2,
                name: "Red Blazer",
                size: "XL",
                price: "Rs 700",
                image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",
                status: "Track Order",
            },
            {
                id: 3,
                name: "women Sunglasses",
                size: "XL",
                price: "Rs 700",
                image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
                status: "Track Order",
            },
        ],
        Complete: [
            {
                id: 4,
                name: "Completed Order 1",
                size: "L",
                price: "Rs 500",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
                status: "Delivered",
            },
        ],
        Review: [
            {
                id: 5,
                name: "Review Order 1",
                size: "M",
                price: "Rs 600",
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
                status: "Review",
            },
        ],
    }

    const handleTabPress = (tab: string) => {
        setActiveTab(tab)
        // Here you can add navigation logic to move to different pages
        console.log(`Navigating to ${tab} page`)
    }

    const handleTrackOrder = (orderId: number) => {
        console.log(`Tracking order ${orderId}`)
        // Add navigation logic for tracking individual orders
    }

    const getStatusColorStyle = (status: string) => {
        switch (status) {
            case "Track Order":
                return { color: "#ff4757" } // Red
            case "Delivered":
                return { color: "green" } // Green
            case "Review":
                return { color: "purple" } // Pink
            default:
                return { color: "#666" } // Default fallback
        }
    }


    const renderOrderItem = (item: any) => (
        <View key={item.id} style={styles.orderItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.orderDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productSize}>Size : {item.size}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.trackButton} onPress={() => handleTrackOrder(item.id)}>
                    <Text style={[styles.trackButtonText, getStatusColorStyle(item.status)]}>
                        {item.status}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>

    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            <Header title="My Orders" />


            <View style={styles.container}>
                <View style={styles.tabContainer}>
                    {["Ongoing", "Complete", "Review"].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView style={styles.orderList}>
                    {orderData[activeTab as keyof typeof orderData].map(renderOrderItem)}
                </ScrollView>
            </View>
        </SafeAreaView>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#e8e8f0",
        marginTop: 4,
        borderRadius: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 6,
        margin: 8,
        alignItems: "center",
        borderRadius: 6,
    },
    activeTab: {
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    tabText: {
        fontSize: 14,
        color: "#666",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#000",
        fontWeight: "600",
    },
    orderList: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 2,
    },
    orderItem: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 6,
        backgroundColor: "#f0f0f0",
    },
    orderDetails: {
        flex: 1,
        marginLeft: 16,
    },
    productName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
        marginBottom: 4,
    },
    productSize: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    trackButton: {
        bottom: 20,
        alignItems: "flex-end"
    },
    trackButtonText: {

        fontSize: 14,
        fontWeight: "600",
    },
})

export default OrderTrackingScreen
