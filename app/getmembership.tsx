import React, { useState } from 'react';
import { View, Dimensions, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import MyProfile from './myprofile'; // Adjust import path

const { width, height } = Dimensions.get('window');

const images = [
    { uri: 'https://cdn.pixabay.com/photo/2019/07/10/14/41/start-4328799_640.png' },
    { uri: 'https://cdn.pixabay.com/photo/2017/09/01/08/50/online-membership-2703464_640.png' },
    { uri: 'https://cdn.pixabay.com/photo/2016/08/29/09/22/register-1627729_640.png' },
    { uri: 'https://cdn.pixabay.com/photo/2015/11/03/09/10/presentation-1020162_640.jpg' },


];

const CustomCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isCarouselComplete, setIsCarouselComplete] = useState(false);

    const handleNext = () => {
        if (activeIndex < images.length - 1) {
            setActiveIndex(prev => prev + 1);
        } else {
            // Last image tapped again
            setIsCarouselComplete(true);
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <View style={StyleSheet.absoluteFill}>
                <MyProfile />
                {!isCarouselComplete && (
                    <BlurView intensity={110} tint="light" style={StyleSheet.absoluteFill} />
                )}
            </View>


            {!isCarouselComplete && (
                <View style={styles.carouselContainer}>
                    <View style={styles.imageWrapper}>
                        <Image source={images[activeIndex]} style={styles.image} resizeMode="cover" />
                        <TouchableOpacity style={styles.rightArrowInsideImage} onPress={handleNext}>
                            <Ionicons
                                name={activeIndex === images.length - 1 ? 'checkmark-circle' : 'chevron-forward-circle'}
                                size={40}
                                color="#ffffffcc"
                            />
                        </TouchableOpacity>


                    </View>
                </View>
            )}

        </View>
    );
};

export default CustomCarousel;

const styles = StyleSheet.create({
    carouselContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    imageWrapper: {
        width: width * 0.9,
        height: height * 0.7,
        borderRadius: 0,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    rightArrowInsideImage: {
        position: 'absolute',
        right: 5,
        top: '50%',
        transform: [{ translateY: -20 }],
    },

});