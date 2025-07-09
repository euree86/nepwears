import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const EmptyNotificationsScreen = () => {
    return (
        <View style={styles.container}>
            <EvilIcons
                name="bell"
                size={90}
                color="#9E9E9E"

            />
            <Text style={styles.title}>You haven't gotten any notifications yet!</Text>
            <Text style={styles.subtitle}>We'll alert you when something cool happens.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#fff',
        paddingHorizontal: 50,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        paddingHorizontal: 40,
    },
});

export default EmptyNotificationsScreen;