import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type SizeSelectorProps = {
  sizes: string[]; // assuming sizes are strings like 'S', 'M', 'L', etc.
  selectedSize: string | null; // can be null if nothing selected initially
  onSelect: (size: string) => void;
};

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Select Size</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => onSelect(size)}
            style={[
              styles.sizeOption,
              selectedSize === size && styles.selectedSizeOption,
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize === size && styles.selectedSizeText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 12,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSizeOption: {
    backgroundColor: '#FC0079',
    borderColor: '#FC0079',
  },
  sizeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSizeText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default SizeSelector;
