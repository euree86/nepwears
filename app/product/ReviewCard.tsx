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
    <View >
      <View style={styles.reviewHeader}>
        <StarRating rating={rating} />
        <Text style={styles.reviewerName}>{reviewerName}</Text>
      </View>

      <Text style={styles.reviewTitle}>{title}</Text>
      <Text style={styles.reviewContent}>{content}</Text>

      {productImages.length > 0 && (
        <View style={styles.imageContainer}>
          {productImages.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginLeft: 10,
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
  },
  reviewContent: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,

  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },

});

export default ReviewCard;
