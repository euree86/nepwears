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

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 48) / 2;

export interface Product {
  id: number | string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  rating?: number;
  reviews?: number;
  discount?: number;
  isFavorite?: boolean;
}

interface ProductCardProps {
  product: Product;
  // Styling props
  cardWidth?: number;
  showOriginalPrice?: boolean;
  showFavorite?: boolean;

  // Action callbacks
  onPress?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: number | string) => void;

  // Custom styling
  containerStyle?: object;
  imageStyle?: object;

  // Custom text
  addToCartText?: string;
  currencySymbol?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cardWidth = ITEM_WIDTH,
  showOriginalPrice = true,
  showFavorite = true,
  onPress,
  onAddToCart,
  onToggleFavorite,
  containerStyle,
  imageStyle,
  addToCartText = "Add to Cart",
  currencySymbol = "Rs",
}) => {
  const [localFavorite, setLocalFavorite] = useState(product.isFavorite || false);

  const handlePress = () => {
    if (onPress) {
      onPress(product);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleToggleFavorite = (e: any) => {
    e.stopPropagation(); 
    setLocalFavorite(!localFavorite); 
    if (onToggleFavorite) {
      onToggleFavorite(product.id); 
    }
  };

  const isFavorite = localFavorite; 


  return (
    <Pressable
      onPress={handlePress}
      android_ripple={{ color: "#ddd" }}
      style={({ pressed }) => [
        styles.productCard,
        { width: cardWidth },
        containerStyle,
        pressed && { opacity: 0.9 }
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={[styles.productImage, imageStyle]}
        />
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>
            {currencySymbol} {product.price}
          </Text>
          {showOriginalPrice && product.originalPrice && product.originalPrice > product.price && (
            <Text style={styles.originalPrice}>
              {currencySymbol} {product.originalPrice}
            </Text>
          )}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>{addToCartText}</Text>
          </TouchableOpacity>

          {showFavorite && (
            <TouchableOpacity
              style={[styles.favoriteButtonSmall, isFavorite && styles.favoriteButtonActive]}
              onPress={handleToggleFavorite}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                color={isFavorite ? '#FC0079' : '#4b5563'}
              />
            </TouchableOpacity>


          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  productCard: {
    marginBottom: 20,
  },
  imageContainer: {
    backgroundColor: '#f3f4f6',
    overflow: 'hidden',
    aspectRatio: 0.8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    paddingTop: 12,
    justifyContent: 'space-between',
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6b7280',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    textDecorationLine: 'line-through',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#e10b73ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  favoriteButtonSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: '#ffe6e6',
  },
});

export default ProductCard;