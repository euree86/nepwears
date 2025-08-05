import React from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface DotIndicatorProps {
  scrollX: Animated.Value;
  slideCount: number;
}

const DotIndicator: React.FC<DotIndicatorProps> = ({ scrollX, slideCount }) => {
  const inputRange = Array.from({ length: slideCount }, (_, i) => i * width);

  return (
    <View style={styles.container}>
      {inputRange.map((input, index) => {
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: inputRange.map((_, i) => (i === index ? 1.4 : 1)),
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: inputRange.map((_, i) => (i === index ? 1 : 0.4)),
          extrapolate: 'clamp',
        });

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: inputRange.map((_, i) => (i === index ? 24 : 8)),
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dotContainer,
              {
                transform: [{ scale }],
                opacity,
              }
            ]}
          >
            <Animated.View style={[styles.dot, { width: dotWidth }]}>
              <LinearGradient
                colors={index === 0 ? ['#FC0079', '#f8beecff'] : 
                       index === 1 ? ['#FC0079', '#FC0079'] : 
                       ['#f8beecff', '#FC0079']}
                style={styles.dotGradient}
              />
            </Animated.View>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default DotIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "27%",
 
  },
  dotContainer: {
    marginHorizontal: 4,
  },
  dot: {
    height: 6,
    borderRadius: 4,
    overflow: 'hidden',
  },
  dotGradient: {
    flex: 1,
    borderRadius: 4,
  },
});