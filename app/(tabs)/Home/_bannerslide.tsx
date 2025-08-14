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
    image: "https://marketplace.canva.com/EAGHC5NUD-Q/1/0/1600w/canva-black-and-white-modern-fashion-sale-banner-landscape-n7GVeIDu0Tg.jpg",
  },
  {
    id: 2,
    image: "https://img.freepik.com/premium-vector/summer-fashion-sale-banner-design-template_2239-1174.jpg",
  },
  {
    id: 3,
    image: "https://img.freepik.com/premium-vector/fashion-banner-sale-with-text-effect_92715-89.jpg",
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
    marginVertical: 20,
  },
  sliderContainer: {
    overflow: "hidden",
    borderRadius: 8,
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
    backgroundColor: "#D81B60",
    marginHorizontal: 4,
  },
});

export default BannerSlider;
