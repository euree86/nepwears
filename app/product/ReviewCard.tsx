import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import StarRating from './StarRating';

type ReviewCardProps = {
  reviewerName: string;
  title: string;
  content: string;
  date: string;
  productImages?: string[];
  rating?: number;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewerName,
  title,
  content,
  date,
  productImages = [],
  rating = 5,
}) => {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <StarRating rating={rating} />
        <Text style={styles.reviewerName}>{reviewerName}</Text>
      </View>
      <Text style={styles.reviewTitle}>{title}</Text>
      <Text style={styles.reviewContent}>{content}</Text>
      {productImages.length > 0 && (
        <View style={styles.productImagesContainer}>
          {productImages.map((image, index) => (
            <View key={index} style={styles.productImageWrapper}>
              <Image source={{ uri: image }} style={styles.productImage} resizeMode="cover" />
            </View>
          ))}
        </View>
      )}
      <Text style={styles.reviewDate}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 12,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  reviewContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  productImagesContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  productImageWrapper: {
    marginRight: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default ReviewCard;
