import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
type ProductCardProps = {
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  onPress?: () => void; // optional prop if you want to handle card press outside
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  onPress,
}) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked(!liked);
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("../../../product/ProductDetailScreen")}
      android_ripple={{ color: "#ddd" }}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.7 }, // opacity effect on iOS and fallback on Android
      ]}
    >
      <Image source={{ uri: image }} style={styles.productImage} />

      {/* Separator */}
      <View style={styles.separator} />

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

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={toggleLike}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={22}
              color={liked ? "#FC0079" : "#999"}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <LinearGradient
              colors={["#76C4E3", "#FC0079"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cartButton}
            >
              <Text style={styles.cartButtonText}>Add to Cart</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 15,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 190,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    width: "100%",
  },
  info: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  name: {
    fontSize: 14,
    color: "#323135",
    marginBottom: 6,
    fontWeight: "600",
    lineHeight: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  currentPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FC0079",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 11,
    fontWeight: "500",
    color: "black",
    textDecorationLine: "line-through",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  starIcon: {
    fontSize: 10,
    marginRight: 3,
  },
  rating: {
    fontSize: 10,
    color: "#333333",
    fontWeight: "600",
    marginRight: 3,
  },
  reviews: {
    fontSize: 10,
    color: "#666666",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  cartButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  cartButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ProductCard;
