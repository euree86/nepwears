import { EvilIcons } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptySavedScreen = () => {
    return (
        <View style={styles.container}>
            <EvilIcons
                name="heart"
                size={90}
                color="#9E9E9E"

            />
            <Text style={styles.title}>No Saved Items!</Text>
            <Text style={styles.subtitle}>You dont have any Saved items! </Text>
            <Text style={styles.subtitle}>Go to home and add some.
            </Text>

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

export default EmptySavedScreen;