import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 10;
const CARD_WIDTH = (width - CARD_MARGIN * 4) / 2;
const IMAGE_HEIGHT = 220;

type ProductCardProps = {
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  onPress?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
}) => {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  return (


    <Pressable
      onPress={() => router.push("../../../product/main")}
      android_ripple={{ color: "#ddd" }}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
    >


      {/* Image with shadow */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.currentPrice}>Rs {price}</Text>
          <Text style={styles.originalPrice}>Rs {originalPrice}</Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={20}
              color={liked ? "#FC0079" : "#999"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginBottom: 20,

  },
  imageWrapper: {
    backgroundColor: "#fff",
    overflow: "hidden",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 4,
    marginBottom: 4,
  },
  productImage: {
    width: "100%",
    height: IMAGE_HEIGHT,
    resizeMode: "cover",
  },

  nameContainer: {
    minHeight: 34,
    marginBottom: 2,
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 0,
    minHeight: 100,
  },
  name: {
    fontSize: 12,
    color: "black",
    fontWeight: "600",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  currentPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "black",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 10,
    fontWeight: "500",
    color: "#888",
    textDecorationLine: "line-through",
  },

  cartButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#e10b73ff",
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ProductCard;
