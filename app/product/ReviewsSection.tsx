import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReviewCard from "./ReviewCard";

interface Review {
  reviewerName: string;
  title: string;
  content: string;
  date: string;
  rating: number;
  productImages: string[];
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const [showReviewsContent, setShowReviewsContent] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userTitle, setUserTitle] = useState("");
  const [userContent, setUserContent] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState<Review[]>([]);

  const toggleReviewsContent = () => {
    setShowReviewsContent(!showReviewsContent);
  };

  const submitReview = () => {
    if (
      userRating === 0 ||
      userTitle.trim().length === 0 ||
      userContent.trim().length === 0
    ) {
      Alert.alert("Incomplete", "Please fill out all fields and select a rating.");
      return;
    }

    const newReview: Review = {
      reviewerName: "You",
      title: userTitle.trim(),
      content: userContent.trim(),
      date: new Date().toLocaleDateString(),
      rating: userRating,
      productImages: [],
    };

    setSubmittedReviews([newReview, ...submittedReviews]);
    setUserRating(0);
    setUserTitle("");
    setUserContent("");

    Alert.alert("Thank you!", "Your review has been submitted.");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.ratingReviewHeader}
          onPress={toggleReviewsContent}
        >
          <Text style={styles.sectionTitle}>Rating and Review</Text>
          <MaterialCommunityIcons
            name={showReviewsContent ? "chevron-up" : "chevron-down"}
            size={24}
            color="black"
          />
        </TouchableOpacity>

        {showReviewsContent && (
          <View style={styles.ratingReviewContent}>
            {submittedReviews.map((review, index) => (
              <ReviewCard key={`user-${index}`} {...review} />
            ))}
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}

            <View style={styles.reviewForm}>
              <Text style={styles.reviewFormTitle}>Add Your Review</Text>

              <View style={styles.starSelector}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setUserRating(star)}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons
                      name={userRating >= star ? "star" : "star-outline"}
                      size={28}
                      color={userRating >= star ? "#FC0079" : "#ccc"}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Review title"
                value={userTitle}
                onChangeText={setUserTitle}
              />

              <Text style={styles.inputLabel}>Content</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Share your experience..."
                value={userContent}
                onChangeText={setUserContent}
                multiline
                numberOfLines={4}
              />

              <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
                <Text style={styles.submitButtonText}>Submit Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
   
  },
  ratingReviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  ratingReviewContent: {
    paddingVertical: 10,
  },
  reviewForm: {
    marginTop: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  reviewFormTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  starSelector: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 5,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
    color: "#333",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#FC0079",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ReviewsSection;
