import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Header from '../../components/header';
import { useRouter } from 'expo-router';

import CartItem from './CartItem';
import CartFooter from './CartFooter';

const { width } = Dimensions.get('window');

const MyCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Retinol Youth Renewal Night Cream',
      price: 84.0,
      quantity: 1,
      image: 'https://cdn.pixabay.com/photo/2019/11/22/08/01/shoes-4644338_640.png',
    },
    {
      id: 2,
      name: 'Glycolic Acid 7% Toning Solution',
      price: 14.5,
      quantity: 1,
      image: 'https://cdn.pixabay.com/photo/2019/08/18/23/03/people-4415189_640.jpg',
    },
    {
      id: 3,
      name: 'Solar Power',
      price: 95.0,
      quantity: 1,
      image: 'https://cdn.pixabay.com/photo/2024/05/25/05/34/ai-generated-8786357_640.jpg',
    },
    {
      id: 4,
      name: 'Natural Moisturising Factors + HA',
      price: 155.0,
      quantity: 1,
      image: 'https://cdn.pixabay.com/photo/2012/09/30/03/00/woman-58558_640.jpg',
    },
  ]);

  const router = useRouter();

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Cart" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} onUpdate={updateQuantity} onRemove={removeItem} />
        ))}
      </ScrollView>
      <CartFooter total={calculateTotal()} onCheckout={() => router.push('/checkout/main')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
});

export default MyCart;
