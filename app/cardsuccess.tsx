import { MaterialCommunityIcons } from '@expo/vector-icons'; // for check-circle icon
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CardSuccess = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleTrackOrder = () => {
        setIsVisible(false);
        console.log('Track order clicked');
        // Add navigation or logic here
    };

    return (
        <Modal visible={isVisible} transparent animationType="fade">
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

                    <TouchableOpacity style={styles.trackButton} onPress={handleTrackOrder}>
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
