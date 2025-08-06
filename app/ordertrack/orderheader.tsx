import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
interface OrderHeaderProps {
    item?: any; // or define a specific type if you know its shape
    customerName: string;
    orderDate: string;
    orderNumber: string;
    trackingNumber: string;
    paymentAmount: string | number;
    paymentMode: string;
    orderStatus: string;
}
const OrderHeader: React.FC<OrderHeaderProps> = ({
    item,
    customerName,
    orderDate,
    orderNumber,
    trackingNumber,
    paymentAmount,
    paymentMode,
    orderStatus,
}) => (
    <View style={styles.header}>
        <View style={styles.productInfo}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.customerName}>{customerName}</Text>
                <Text style={styles.orderDate}>Ordered on {orderDate}</Text>
                <Text style={styles.orderNumber}>Order ID {orderNumber}</Text>
                <Text style={styles.trackingNumber}>Tracking: {trackingNumber}</Text>
            </View>
        </View>
        <View style={styles.paymentInfo}>
            <Text style={styles.paymentAmount}>{paymentAmount}</Text>
            <Text style={styles.paymentMode}>{paymentMode}</Text>
            <Text style={[styles.orderStatus, { color: "#FC0079" }]}>
                {orderStatus}
            </Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: "white",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    productInfo: {
        flexDirection: "row",
        flex: 1
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12
    },
    productDetails: {
        flex: 1
    },
    productName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 4,
    },
    customerName: {
        fontSize: 12,
        color: "#494b50ff",
        fontWeight: 500,
        marginBottom: 2
    },
    orderDate: {
       fontSize:12,
        color: "#9CA3AF",
        marginBottom: 2
    },
    orderNumber: {
       fontSize:12,
        color: "#9CA3AF",
        marginBottom: 2
    },
    trackingNumber: {
       fontSize:12,
        color: "#FC0079",
        fontWeight: "500"
    },
    paymentInfo: {
        alignItems: "flex-end"
    },
    paymentAmount: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 4,
    },
    paymentMode: {
       fontSize:12,
         color: "#494b50ff",
        marginBottom: 4
    },
    orderStatus: {
        fontSize: 12,
        fontWeight: "600"
    },
});

export default OrderHeader;
