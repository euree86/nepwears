import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Header from "../components/header";
import CategoryCard from './categorycard';
import { categories } from './categories';
import { Category } from '../../utils/type';
import SearchFilter from "../components/searchfilter"

export default function HomeScreen() {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');

    const handlePress = (category: Category) => {
        router.push({ pathname: '/saved', params: { id: category.id } });
    };

    return (
        <View style={styles.container}>
            <Header title="My Orders" />

            <View style={styles.content}>
                
                <SearchFilter
                    searchQuery={searchText}
                    setSearchQuery={setSearchText}
                    placeholder="Search Categories"
                />

                <ScrollView showsVerticalScrollIndicator={false}>
                    {categories
                        .filter((c) =>
                            c.title.toLowerCase().includes(searchText.toLowerCase())
                        )
                        .map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                onPress={handlePress}
                            />
                        ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
