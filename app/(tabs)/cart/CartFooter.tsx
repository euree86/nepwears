import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type Props = {
  total: number;
  onCheckout: () => void;
};

const CartFooter: React.FC<Props> = ({ total, onCheckout }) => (
  <View style={styles.footer}>
    <View style={styles.totalContainer}>
      <Text style={styles.totalLabel}>Total:</Text>
      <Text style={styles.totalAmount}>${total.toFixed(2)} USD</Text>
    </View>
    <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
      <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#FC0079',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default CartFooter;
