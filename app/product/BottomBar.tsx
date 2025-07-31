import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BottomBarProps {
  price: number | string;
  rating: number;
  onAddToCart: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ price, rating, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bottomLeft}>
        <Text style={styles.priceText}>${price}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color="#FFC107" />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addToCartBtn} onPress={onAddToCart}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  bottomLeft: {
    flex: 1,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  addToCartBtn: {
    backgroundColor: "#FC0079",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BottomBar;
