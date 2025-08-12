import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const categories = [
  {
    name: "Tops",
    icon: "tshirt-crew-outline",
    bgImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop"
  },
  {
    name: "Footwears",
    icon: "shoe-formal",
    bgImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop"
  },
  {
    name: "Dresses",
    icon: "hanger",
    bgImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop"
  },
  {
    name: "Pants",
    icon: "tshirt-v-outline",
    bgImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop"
  },
  {
    name: "Skirts",
    icon: "tshirt-crew-outline",
    bgImage: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=100&h=100&fit=crop"
  },
  {
    name: "Shoes",
    icon: "shoe-sneaker",
    bgImage: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=100&h=100&fit=crop"
  },
  {
    name: "Bags",
    icon: "bag-personal-outline",
    bgImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop"
  },
  {
    name: "Watches",
    icon: "watch-outline",
    bgImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100&fit=crop"
  },
];

const Categories = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Category</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <ImageBackground
              source={{ uri: category.bgImage }}
              style={styles.categoryIcon}
              imageStyle={styles.backgroundImage}
            >
              {/* Dark overlay for reduced opacity */}
              <View style={styles.overlay} />

              {/* Icon in front */}
              <MaterialCommunityIcons
                name={category.icon as any}
                size={24}
                color="white"
                style={styles.icon}
              />
            </ImageBackground>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#666666',
  },
  scrollContainer: {
    paddingRight: 10,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 20,
    width: 55,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: 'hidden',
    borderRadius: 6,

  },
  backgroundImage: {
    borderRadius: 6,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  icon: {
    zIndex: 2,
  },
  categoryText: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default Categories;