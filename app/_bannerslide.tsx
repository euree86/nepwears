import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");

const bannerSlides = [
  {
    id: 1,
    image: "https://cdn.pixabay.com/photo/2016/11/14/04/25/bride-1822587_640.jpg",
  },
  {
    id: 2,
    image: "https://cdn.pixabay.com/photo/2016/04/10/21/34/woman-1320810_640.jpg",
  },
  {
    id: 3,
    image: "https://cdn.pixabay.com/photo/2021/07/11/19/07/girl-6404712_640.jpg",
  },
];

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % bannerSlides.length;
      setCurrentSlide(nextSlide);

      Animated.timing(slideAnim, {
        toValue: -nextSlide * (width - 40),
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide, slideAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Animated.View
          style={[
            styles.sliderWrapper,
            {
              transform: [{ translateX: slideAnim }],
              width: bannerSlides.length * (width - 40),
            },
          ]}
        >
          {bannerSlides.map((slide) => (
            <View key={slide.id} style={{ width: width - 40, overflow: "hidden" }}>
              <Image
                source={{ uri: slide.image }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </View>
          ))}
        </Animated.View>
      </View>
      <View style={styles.indicatorContainer}>
        {bannerSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { opacity: currentSlide === index ? 1 : 0.3 },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sliderContainer: {
    overflow: "hidden",
    borderRadius: 15,
  },
  sliderWrapper: {
    flexDirection: "row",
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FC0079",
    marginHorizontal: 4,
  },
});

export default BannerSlider;
