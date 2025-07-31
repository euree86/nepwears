import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ColorSelectorProps {
  colors: string[]; // Array of color strings
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.colorTitle}>Select Color: Black</Text>
      <View style={styles.colorContainer}>
        {colors.map((color: string, index: number) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorOption, { backgroundColor: color }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  colorTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  colorContainer: {
    flexDirection: "row",
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
  },
});

export default ColorSelector;
