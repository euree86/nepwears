import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const NotificationPermissionPopup = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleAllow = () => {
        setIsVisible(false);
        console.log('Notification permission allowed');
        // Add your notification permission logic here
    };

    const handleDeny = () => {
        setIsVisible(false);
        console.log('Notification permission denied');
    };

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>"App" Would Like To Send You</Text>
                    <Text style={styles.message}>
                        Notifications may include alerts,
                        sounds, and icon badges. These can
                        be configured in Settings.
                    </Text>

                    <View style={styles.separator} />

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.denyButton} onPress={handleDeny}>
                            <Text style={styles.denyButtonText}>Don't Allow</Text>
                        </TouchableOpacity>

                        <View style={styles.buttonDivider} />

                        <TouchableOpacity style={styles.allowButton} onPress={handleAllow}>
                            <Text style={styles.allowButtonText}>Allow</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 270,
        backgroundColor: '#F2F2F6',
        borderRadius: 14,
        overflow: 'hidden',
    },

    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',

        padding: 15,
    },
    message: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
        lineHeight: 18,

    },
    separator: {
        height: 1,
        backgroundColor: '#C6C6C8',
        width: '100%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        height: 44,
    },
    denyButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    allowButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDivider: {
        width: 1,
        backgroundColor: '#C6C6C8',
        height: '100%',
    },
    denyButtonText: {
        fontSize: 17,
        color: '#FC0079',
        fontWeight: '400',
    },
    allowButtonText: {
        fontSize: 17,
        color: '#FC0079',
        fontWeight: '600',
    },
});

export default NotificationPermissionPopup;