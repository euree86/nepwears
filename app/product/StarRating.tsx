import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StarRating = ({ rating = 5 }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text key={star} style={styles.star}>
          ⭐
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row"
  },
  star: {
    fontSize: 16,
    marginRight: 5
  }
});

export default StarRating;