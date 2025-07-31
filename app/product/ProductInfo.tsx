import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Define props type
type ProductInfoProps = {
  title: string;
  price: string | number;
  description: string;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ title, price, description }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.productTitle}>{title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
      </View>
      <Text style={styles.sectionTitle}>Product Details</Text>
      <Text style={styles.description} numberOfLines={showFullDescription ? undefined : 3}>
        {description}
      </Text>
      <TouchableOpacity onPress={toggleDescription}>
        <Text style={styles.readMoreText}>
          {showFullDescription ? 'Read Less' : 'Read More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    lineHeight: 24,
  },
  priceContainer: {
    marginBottom: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  readMoreText: {
    fontSize: 14,
    color: '#FC0079',
    fontWeight: '500',
    marginBottom: 20,
  },
});

export default ProductInfo;
