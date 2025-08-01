import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import PurchaseModal from './purchasemodal';

interface BottomBarProps {
  price: number | string;
  onAddToCart?: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ price }) => {
  const [liked, setLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'buy' | 'cart'>('cart');
  const [quantity, setQuantity] = useState(1);

  const toggleHeart = () => setLiked(!liked);

  const handleOpenModal = (type: 'buy' | 'cart') => {
    setModalType(type);
    setQuantity(1);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    setTimeout(() => {
      alert(`${modalType === 'buy' ? 'Purchased' : 'Added to cart'} successfully!`);
    }, 300);
  };

  return (
    <>
      <View style={styles.container}>
        {/* Wishlist Button */}
        <TouchableOpacity onPress={toggleHeart} style={styles.heartBtn}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? '#FC0079' : '#666'}
          />
        </TouchableOpacity>

        {/* Buy Now */}
        <TouchableOpacity
          style={[styles.actionBtn, styles.buyNowBtn]}
          onPress={() => handleOpenModal('buy')}
        >
          <MaterialIcons name="shopping-bag" size={20} color="#fff" />
          <Text style={styles.actionText}>Buy Now</Text>
        </TouchableOpacity>

        {/* Add to Cart */}
        <TouchableOpacity
          style={[styles.actionBtn, styles.addToCartBtn]}
          onPress={() => handleOpenModal('cart')}
        >
          <Ionicons name="cart" size={20} color="#fff" />
          <Text style={styles.actionText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Purchase Modal */}
      <PurchaseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirm}
        quantity={quantity}
        setQuantity={setQuantity}
        image="https://cdn.pixabay.com/photo/2024/12/13/10/23/woman-9264738_640.jpg"
        price={price}
        actionType={modalType}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 90,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 8,
    // borderTopWidth: 1,
    // borderTopColor: '#eee',
    // elevation: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // zIndex: 1000,
  },
  heartBtn: {
    flex: 0.8,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  actionBtn: {
    flex: 2.2,
    height: 48,
    borderRadius: 12,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  buyNowBtn: {
    backgroundColor: '#FF4081',
  },
  addToCartBtn: {
    backgroundColor: '#5B2C6F',
  },
  actionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default BottomBar;
