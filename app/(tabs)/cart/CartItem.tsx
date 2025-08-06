import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

type Props = {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  onUpdate: (id: number, change: number) => void;
  onRemove: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, onUpdate, onRemove }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/product/main"); 
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.cartItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <View style={styles.productHeader}>
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity onPress={() => onRemove(item.id)}>
              <MaterialCommunityIcons name="delete" size={22} color="#999" />
            </TouchableOpacity>
          </View>
          <Text style={styles.productPrice}>${item.price.toFixed(2)} USD</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[styles.quantityButton, { backgroundColor: '#E0E0E5' }]}
              onPress={() => onUpdate(item.id, -1)}
            >
              <Text style={[styles.quantityButtonText, { color: 'black' }]}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={() => onUpdate(item.id, 1)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productImage: {
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },
  productDetails: {
    flex: 1,
    marginLeft: 15,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    flex: 1,
    marginRight: 10,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000ff',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#FC0079',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginHorizontal: 16,
  },
});

export default CartItem;
