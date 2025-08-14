import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SearchFilterProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    placeholder?: string;
    activeCategory?: string;
    onFilterPress?: () => void;
    containerStyle?: ViewStyle;
    searchBoxStyle?: ViewStyle;
    filterBoxStyle?: ViewStyle;
    inputStyle?: TextStyle;
    searchIconName?: string;
    filterIconName?: string;
    searchIconColor?: string;
    filterIconColor?: string;
    showFilter?: boolean;
};

const SearchFilter: React.FC<SearchFilterProps> = ({
    searchQuery,
    setSearchQuery,
    placeholder,
    activeCategory,
    onFilterPress,
    containerStyle,
    searchBoxStyle,
    filterBoxStyle,
    inputStyle,
    searchIconName = "search",
    filterIconName = "options",
    searchIconColor = "#9ca3af",
    filterIconColor = "#fff",
    showFilter = true,
}) => {
    const inputPlaceholder = placeholder ?? `Search ${activeCategory ?? ""}`;

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.searchBox, searchBoxStyle]}>
                <Ionicons name={searchIconName as any} size={20} color={searchIconColor} style={styles.searchIcon} />
                <TextInput
                    placeholder={inputPlaceholder}
                    placeholderTextColor={searchIconColor}
                    style={[styles.searchInput, inputStyle]}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {showFilter && (
                <TouchableOpacity style={[styles.filterBox, filterBoxStyle]} onPress={onFilterPress}>
                    <Ionicons name={filterIconName as any} size={20} color={filterIconColor} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingTop: 8,
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 2,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#374151',
    },
    filterBox: {
        width: 44,
        height: 46,
        backgroundColor: '#000',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchFilter;
