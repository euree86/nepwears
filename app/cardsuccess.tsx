import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    visible: boolean;
    onResponse: (allowed: boolean) => void

};

const CardSuccess = ({ visible, onResponse }: Props) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <MaterialCommunityIcons
                        name="check-circle"
                        size={48}
                        color="#28a745"
                        style={styles.icon}
                    />
                    <Text style={styles.title}>Congratulations!</Text>
                    <Text style={styles.message}>Your new card has been added.</Text>

                    <TouchableOpacity style={styles.trackButton} onPress={() => onResponse(true)}>
                        <Text style={styles.trackButtonText}>Thanks</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        width: 300,
        elevation: 5,
    },
    icon: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000',
    },
    message: {
        fontSize: 14,
        color: '#666',
        marginBottom: 25,
    },
    trackButton: {
        backgroundColor: '#FC0079',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 6,
        width: '100%',
        alignItems: 'center',
    },
    trackButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CardSuccess;
