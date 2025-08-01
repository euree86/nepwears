import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type ProductInfoProps = {
  title: string;
  price: string | number;
  description: string;
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  price,
  description,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <View style={styles.container}>
      {/* Product Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Price Tag */}
      <View style={styles.priceWrapper}>
        <Text style={styles.price}> {price}</Text>
      </View>

      {/* Product Details Section */}
      <Text style={styles.sectionTitle}>Product Details</Text>
      <Text
        style={styles.description}
        numberOfLines={showFullDescription ? undefined : 4}
      >
        {description}
      </Text>

      {/* Read More / Less Toggle */}
      {description.length > 100 && (
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.readMore}>
            {showFullDescription ? 'Read Less ▲' : 'Read More ▼'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 14,
    lineHeight: 26,
  },
  priceWrapper: {
    backgroundColor: '#fff0f6',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  price: {
    color: '#FC0079',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
    marginBottom: 6,
    textAlign: "justify",
  },
  readMore: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FC0079',
    marginTop: 4,

  },
});

export default ProductInfo;
