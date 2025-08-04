import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
    searchText: string;
    setSearchText: (text: string) => void;
}

export default function SearchBar({ searchText, setSearchText }: SearchBarProps) {
    return (
        <View style={styles.searchRow}>
            <View style={styles.searchBox}>
                <Ionicons name="search" size={18} color="#666" style={{ marginRight: 6 }} />
                <TextInput
                    placeholder="Search"
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.searchInput}
                    returnKeyType="search"
                    onSubmitEditing={() => Keyboard.dismiss()}
                />
            </View>
            <TouchableOpacity style={styles.filterBtn} onPress={() => alert('Filter pressed')}>
                <Ionicons name="filter-outline" size={18} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
    },
    filterBtn: {
        marginLeft: 10,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 8,
    },
});
