import { EvilIcons } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyCartScreen = () => {
    return (
        <View style={styles.container}>
            <EvilIcons
                name="cart"
                size={90}
                color="#9E9E9E"

            />
            <Text style={styles.title}>Your Cart Is Empty!</Text>
            <Text style={styles.subtitle}>When you add products, they will appear here.</Text>
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
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#000',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        paddingHorizontal: 10,
    },
});

export default EmptyCartScreen;