import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface PurchaseModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    quantity: number;
    setQuantity: (val: number) => void;
    image: string;
    price: string | number;
    actionType: 'buy' | 'cart';
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
    visible,
    onClose,
    onConfirm,
    quantity,
    setQuantity,
    image,
    price,
    actionType,
}) => {
    const router = useRouter();

    const increase = () => setQuantity(quantity + 1);
    const decrease = () => quantity > 1 && setQuantity(quantity - 1);

    const handleBuyNow = () => {
        onClose(); // Close modal first
        router.push({
            pathname: '/checkout',
            params: {
                image,
                quantity: quantity.toString(),
                price: price.toString(),
                total: (quantity * Number(price)).toString(),
            },
        });
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Text style={styles.priceText}>Rs. {Number(price) * quantity}</Text>

                    <View style={styles.quantityControl}>
                        <TouchableOpacity onPress={decrease} style={styles.qtyBtn}>
                            <Ionicons name="remove" size={22} />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{quantity}</Text>
                        <TouchableOpacity onPress={increase} style={styles.qtyBtn}>
                            <Ionicons name="add" size={22} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.confirmBtn}
                        onPress={actionType === 'buy' ? handleBuyNow : onConfirm}
                    >
                        <Text style={styles.confirmText}>
                            {actionType === 'buy' ? 'Buy Now' : 'Add to Cart'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 15,
    },
    priceText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    qtyBtn: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 8,
    },
    qtyText: {
        marginHorizontal: 20,
        fontSize: 18,
    },
    confirmBtn: {
        backgroundColor: '#FC0079',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
    },
    confirmText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelBtn: {
        padding: 10,
        marginTop: 10,
    },
    cancelText: {
        color: '#888',
        fontSize: 14,
    },
});

export default PurchaseModal;
