import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type ProductCardProps = {
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.productImage} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.currentPrice}>Rs {price}</Text>
          <Text style={styles.originalPrice}>Rs {originalPrice}</Text>
        </View>
        <View style={styles.ratingRow}>
          <Text style={styles.starIcon}>⭐</Text>
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.reviews}>({reviews})</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 15,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 13,
    color: "#323135",
    marginBottom: 8,
    lineHeight: 16,
    fontWeight: "500",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "black",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999999",
    textDecorationLine: "line-through",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    fontSize: 12,
    marginRight: 3,
  },
  rating: {
    fontSize: 12,
    color: "#333333",
    fontWeight: "600",
    marginRight: 3,
  },
  reviews: {
    fontSize: 12,
    color: "#666666",
  },
});

export default ProductCard;
