import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type FilterOptionProps = {
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
};

const FilterOption: React.FC<FilterOptionProps> = ({ title, options, selectedValue, onSelect }) => (
  <View style={styles.filterSection}>
    <Text style={styles.filterTitle}>{title}</Text>
    <View style={styles.filterOptions}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.filterOptionButton,
            selectedValue === option && styles.selectedFilterOption,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text
            style={[
              styles.filterOptionText,
              selectedValue === option && styles.selectedFilterOptionText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  filterSection: {
    marginVertical: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOptionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedFilterOption: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#4b5563',
  },
  selectedFilterOptionText: {
    color: '#fff',
  },
});

export default FilterOption;
