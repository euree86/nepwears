import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OrDivider() {
    return (
        <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.line} />
        </View>
    );
}

const styles = StyleSheet.create({
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: height * 0.03,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#777',
    },
    orText: {
        marginHorizontal: 10,
        fontSize: width * 0.035,
        color: '#000',
    },
});
