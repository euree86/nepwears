import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

// Type for a Saved item
type Saved = {
  id: number;
  title: string;
  price: string;
  oldPrice: string;
  rating: string;
  image: string;
};

const SavedGrid = () => {
  const Saveds: Saved[] = [
    {
      id: 1,
      title: 'Summer Dress',
      price: 'Rs 400',
      oldPrice: 'Rs 600',
      rating: '4.8 (120)',
      image: 'https://cdn.pixabay.com/photo/2016/11/08/11/58/fashion-1808116_640.jpg',
    },
    {
      id: 2,
      title: 'Summer Dress',
      price: 'Rs 400',
      oldPrice: 'Rs 600',
      rating: '4.8 (120)',
      image: 'https://cdn.pixabay.com/photo/2022/01/20/06/49/woman-6951571_640.jpg',
    },
    {
      id: 3,
      title: 'Summer Dress',
      price: 'Rs 400',
      oldPrice: 'Rs 600',
      rating: '4.8 (120)',
      image: 'https://cdn.pixabay.com/photo/2018/07/22/21/58/fashion-3555648_640.jpg',
    },
    {
      id: 4,
      title: 'Summer Dress',
      price: 'Rs 400',
      oldPrice: 'Rs 600',
      rating: '4.8 (120)',
      image: 'https://cdn.pixabay.com/photo/2015/06/13/20/26/dresses-808321_640.jpg',
    },
    {
      id: 5,
      title: 'Summer Dress',
      price: 'Rs 400',
      oldPrice: 'Rs 600',
      rating: '4.8 (120)',
      image: 'https://cdn.pixabay.com/photo/2017/02/17/05/53/dress-2073427_640.jpg',
    },
    {
      id: 6,
      title: 'Summer Dress',
      price: 'Rs 400',
      oldPrice: 'Rs 600',
      rating: '4.8 (120)',
      image: 'https://cdn.pixabay.com/photo/2024/05/25/05/34/ai-generated-8786357_640.jpg',
    },
  ];

  const renderCard = (item: Saved) => {
    return (
      <View key={item.id} style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.separator} />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.oldPrice}>{item.oldPrice}</Text>
          </View>
          <View style={styles.ratingRow}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>{Saveds.map(renderCard)}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  card: {
    width: (width - 45) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 190, // increased for elegance
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    width: '100%',
  },
  info: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#323135',
    marginBottom: 6,
    lineHeight: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FC0079',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 11,
    fontWeight: '500',
    color: 'black',
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 10,
    marginRight: 3,
  },
  rating: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '500',
  },
});

export default SavedGrid;
