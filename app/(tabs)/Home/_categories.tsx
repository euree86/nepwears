import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const categories = [
  { name: "Tops", icon: "tshirt-crew-outline" },
  { name: "Footwears", icon: "shoe-formal" },
  { name: "Dresses", icon: "hanger" },
  { name: "Pants", icon: "tshirt-v-outline" },
  { name: "Skirts", icon: "tshirt-crew-outline" },
  { name: "Shoes", icon: "shoe-sneaker" },
  { name: "Bags", icon: "bag-personal-outline" },
  { name: "Watches", icon: "watch-outline" },
];

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryItem}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name={category.icon as any} size={24} color="black" />
          </View>
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingRight: 10,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 20,
    width: 50,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#EBEFFF",
  },
  categoryText: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default Categories;
