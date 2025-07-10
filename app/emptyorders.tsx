import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyOrdersScreen = () => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name="clipboard-list"
                size={90}
                color="#9E9E9E"

            />
            <Text style={styles.title}>No Ongoing Orders!</Text>
            <Text style={styles.subtitle}>You don't have any ongoing orders at this time</Text>
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

export default EmptyOrdersScreen;