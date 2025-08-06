// components/AuthHeader.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

type Props = {
  title?: string; // ✅ make it optional
};

export default function AuthHeader({ title }: Props) {
  return (
    <>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.topImage}
        resizeMode="contain"
      />
      {title && (
        <Text style={styles.title}>{title}</Text> // ✅ only render if title is provided
      )}
    </>
  );
}

const styles = StyleSheet.create({
  topImage: {
    width: '100%',
    height: height * 0.25,
    opacity: 0.4,
    marginTop: height * 0.05,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#333',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
});
