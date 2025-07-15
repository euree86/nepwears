import { View, Text, ScrollView, Image, StyleSheet, SafeAreaView } from "react-native";

type StarRatingProps = {
    rating?: number;
};

const StarRating = ({ rating = 5 }: StarRatingProps) => {
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

type ReviewCardProps = {
    reviewerName: string;
    title: string;
    content: string;
    date: string;
    productImages?: string[];
};

const ReviewCard = ({
    reviewerName,
    title,
    content,
    date,
    productImages = [],
}: ReviewCardProps) => {
    return (
        <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <StarRating />
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

export default function ReviewsScreen() {
    const reviews = [
        {
            reviewerName: "Shipon",
            title: "Great Shopping Experience!",
            content: "I've been using Napwears for a while now, and I'm impressed with the wide range of products available.",
            date: "Shipon, 10 Mar 2024",
            productImages: ["https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_640.jpg", "https://cdn.pixabay.com/photo/2015/09/02/11/01/woman-918267_640.jpg", "https://cdn.pixabay.com/photo/2018/07/22/21/58/fashion-3555648_640.jpg"],
        },
        {
            reviewerName: "Vessel",
            title: "Amazing Shopping!",
            content: "I've been using Napwears for a while now, and I'm impressed with the wide range of products available.",
            date: "Shipon Hossain, 10 Mar 2024",
            productImages: ["https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_640.jpg", "https://cdn.pixabay.com/photo/2015/09/02/11/01/woman-918267_640.jpg", "https://cdn.pixabay.com/photo/2018/07/22/21/58/fashion-3555648_640.jpg"],
        },
        {
            reviewerName: "Jhon",
            title: "Fantastic Buying Journey!",
            content: "I've been using Napwears for a while now, and I'm impressed with the wide range of products available.",
            date: "Shipon Hossain, 10 Mar 2024",
            productImages: ["https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_640.jpg", "https://cdn.pixabay.com/photo/2015/09/02/11/01/woman-918267_640.jpg", "https://cdn.pixabay.com/photo/2018/07/22/21/58/fashion-3555648_640.jpg"],
        },
    ]

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {reviews.map((review, index) => (
                    <ReviewCard
                        key={index}
                        reviewerName={review.reviewerName}
                        title={review.title}
                        content={review.content}
                        date={review.date}
                        productImages={review.productImages}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    reviewCard: {
        backgroundColor: "#ffffff",
        paddingVertical: 20,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    reviewHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    starContainer: {
        flexDirection: "row",
        marginRight: 12,
    },
    star: {
        fontSize: 16,
        marginRight: 2,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333333",
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 8,
    },
    reviewContent: {
        fontSize: 14,
        color: "#666666",
        lineHeight: 20,
        marginBottom: 12,
    },
    productImagesContainer: {
        flexDirection: "row",
        marginBottom: 12,
    },
    productImageWrapper: {
        marginRight: 8,
        borderRadius: 8,
        overflow: "hidden",
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    reviewDate: {
        fontSize: 12,
        color: "#999999",
        marginTop: 4,
    },
})