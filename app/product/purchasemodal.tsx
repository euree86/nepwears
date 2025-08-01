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
        onClose();
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
        <Modal animationType="slide" transparent visible={visible}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Text style={styles.priceLabel}>Total Price</Text>
                    <Text style={styles.priceText}>Rs. {Number(price) * quantity}</Text>

                    <View style={styles.quantityControl}>
                        <TouchableOpacity onPress={decrease} style={styles.qtyBtn} activeOpacity={0.7}>
                            <Ionicons name="remove" size={20} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{quantity}</Text>
                        <TouchableOpacity onPress={increase} style={styles.qtyBtn} activeOpacity={0.7}>
                            <Ionicons name="add" size={20} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.confirmBtn}
                        onPress={actionType === 'buy' ? handleBuyNow : onConfirm}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.confirmText}>
                            {actionType === 'buy' ? 'Buy Now' : 'Add to Cart'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.6}>
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 25,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    image: {
        width: 110,
        height: 120,
        borderRadius: 8,
        marginBottom: 4,
    },
    priceLabel: {
        fontSize: 14,
        color: '#888',
    },
    priceText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#222',
        marginBottom: 10,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyBtn: {
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    qtyText: {
        marginHorizontal: 16,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    confirmBtn: {
        backgroundColor: '#FC0079',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    confirmText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelBtn: {
        paddingVertical: 10,
    },
    cancelText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 600,
    },
});

export default PurchaseModal;
