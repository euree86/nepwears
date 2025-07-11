import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
export default function Index() {
  const router = useRouter();

  return (
    <View style={instyles.container}>
      <Image
        source={require("../assets/images/onboard.png")}
        resizeMode="contain"
        style={instyles.image}
      />

      <View style={instyles.textContainer} >
        <Text style={instyles.heading}>Welcome to Nepwears</Text>
        <Text style={[styles.paragraph, { textAlign: "center" }]}>
          Your one-stop destination for hassle-free online shopping
        </Text>
      </View>

      <TouchableOpacity
        style={styles.btncontainer}
        onPress={() => router.push("./login")}
      >
        <Text style={styles.buttontext}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const instyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 18,
    justifyContent: "flex-start",
    paddingVertical: 60,
  },
  image: {
    width: "100%",
    height: 400,
    alignSelf: "center",
  },
  heading: {
    fontSize: 28,
    color: "#323135",
    fontWeight: 700,
    textAlign: "center",
    paddingBottom: 8,
  },

  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

});
