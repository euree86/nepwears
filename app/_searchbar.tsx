import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <EvilIcons name="search" size={22} color="black" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Find your favorite items"
        placeholderTextColor="#999"
        selectionColor="#FF6B35"
      />
      <MaterialCommunityIcons
        name="image-filter-center-focus"
        size={22}
        color="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
    borderWidth: 0,
    borderColor: "transparent",
    outlineWidth: 0,
  },
});

export default SearchBar;
