import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ProductGrid = () => {
    const products = [
        {
            id: 1,
            title: 'Summer Dress',
            price: 'Rs 400',
            oldPrice: 'Rs 600',
            rating: '4.8 (120)',
            image: 'https://cdn.pixabay.com/photo/2016/11/08/11/58/fashion-1808116_640.jpg'
        },
        {
            id: 2,
            title: 'Summer Dress',
            price: 'Rs 400',
            oldPrice: 'Rs 600',
            rating: '4.8 (120)',
            image: 'https://cdn.pixabay.com/photo/2022/01/20/06/49/woman-6951571_640.jpg'
        },
        {
            id: 3,
            title: 'Summer Dress',
            price: 'Rs 400',
            oldPrice: 'Rs 600',
            rating: '4.8 (120)',
            image: 'https://cdn.pixabay.com/photo/2018/07/22/21/58/fashion-3555648_640.jpg'
        },
        {
            id: 4,
            title: 'Summer Dress',
            price: 'Rs 400',
            oldPrice: 'Rs 600',
            rating: '4.8 (120)',
            image: 'https://cdn.pixabay.com/photo/2015/06/13/20/26/dresses-808321_640.jpg'
        },
        {
            id: 5,
            title: 'Summer Dress',
            price: 'Rs 400',
            oldPrice: 'Rs 600',
            rating: '4.8 (120)',
            image: 'https://cdn.pixabay.com/photo/2017/02/17/05/53/dress-2073427_640.jpg'
        },
        {
            id: 6,
            title: 'Summer Dress',
            price: 'Rs 400',
            oldPrice: 'Rs 600',
            rating: '4.8 (120)',
            image: 'https://cdn.pixabay.com/photo/2024/05/25/05/34/ai-generated-8786357_640.jpg'
        },
    ];

    const renderCard = (item) => (
        <View key={item.id} style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.heart}>
                    <Text style={styles.heartText}>♡</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.grid}>
                {products.map(renderCard)}
            </View>
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
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 150,
    },
    heart: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 30,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heartText: {
        fontSize: 16,
        color: '#666',
    },
    info: {
        padding: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 8,
    },
    oldPrice: {
        fontSize: 12,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        fontSize: 12,
        marginRight: 3,
    },
    rating: {
        fontSize: 12,
        color: '#333',
    },
});

export default ProductGrid;