import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type CategoryItemProps = {
    category: string;
    isActive: boolean;
    onPress: () => void;
    style?: object;
};
const CategoryItem: React.FC<CategoryItemProps> = ({ category, isActive, onPress, style }) => (
    <TouchableOpacity
        style={[styles.categoryButton, isActive && styles.activeCategoryButton, style]} 
        onPress={onPress}
    >
        <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
            {category}
        </Text>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
    categoryButton: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 6,
        backgroundColor: '#f3f4f6',
        marginRight: 8,
    },
    activeCategoryButton: {
        backgroundColor: '#000',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4b5563',
    },
    activeCategoryText: {
        color: '#fff',
    },
});

export default CategoryItem;
