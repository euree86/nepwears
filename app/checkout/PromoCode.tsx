import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    promoCode: string;
    onChange: (code: string) => void;
}

const PromoCode = ({ promoCode, onChange }: Props) => {
    return (
        <View style={styles.section}>
            <View style={styles.promoInputContainer}>
                <MaterialCommunityIcons
                    name="tag-outline"
                    size={20}
                    color="#e91e63"
                    style={{ marginRight: 8 }}
                />
                <TextInput
                    style={styles.promoInput}
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChangeText={onChange}
                    returnKeyType="done"
                />
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    promoInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    promoInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
        color: '#333',
    },
    addButton: {
        backgroundColor: '#e91e63',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    addButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
});

export default PromoCode;
