import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../../utils/type'; 

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface Props {
    category: Category;
    onPress: (category: Category) => void;
}

export default function CategoryCard({ category, onPress }: Props) {
    return (
        <TouchableOpacity
            onPress={() => onPress(category)}
            style={styles.card}
            activeOpacity={0.9}
        >
            <View style={styles.horizontalImageRow}>
                <Image source={{ uri: category.images[0] }} style={[styles.sideImage, { marginTop: 20 }]} />
                <Image source={{ uri: category.images[1] }} style={[styles.centerImage, { marginTop: 0 }]} />
                <Image source={{ uri: category.images[2] }} style={[styles.sideImage, { marginTop: 20 }]} />
            </View>

            <View style={styles.bottomRow}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{category.title}</Text>
                    <Text style={styles.subtitle}>{category.items} items</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#666" />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 32,
        backgroundColor: '#fff',
        paddingBottom: 10,
        borderBottomColor: "#e2e0e0ff",
        borderBottomWidth: 1
    },
    horizontalImageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: CARD_WIDTH,
    },
    sideImage: {
        width: CARD_WIDTH * 0.27,
        height: 140,
        backgroundColor: '#eee',
    },
    centerImage: {
        width: CARD_WIDTH * 0.38,
        height: 180,
        backgroundColor: '#ddd',
    },
    bottomRow: {
        marginTop: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
        fontWeight: '400',
    },
});
