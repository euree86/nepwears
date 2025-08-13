import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SearchFilterRowProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  onFilterPress: () => void;
};

const SearchFilterRow: React.FC<SearchFilterRowProps> = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  onFilterPress,
}) => (
  <View style={styles.searchFilterRow}>
    <View style={styles.searchBox}>
      <Ionicons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
      <TextInput
        placeholder={`Search ${activeCategory}`}
        placeholderTextColor="#9ca3af"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
    <TouchableOpacity style={styles.filterBox} onPress={onFilterPress}>
      <Ionicons name="options" size={20} color="#fff" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  searchFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
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
    width: 48,
    height: 48,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchFilterRow;
