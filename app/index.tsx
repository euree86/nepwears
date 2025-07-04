import { useRouter } from "expo-router";
import { styles } from "../styles"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.rootContainer}>
      <View style={styles.imgwrapper}>
        <Image
          source={require("../assets/images/onboard.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.main}>
        <Text style={styles.heading}>Welcome to Nepwears</Text>
        <Text style={styles.paragraph}>
          Your one-stop destination for hassle free online shopping.
        </Text>

        <TouchableOpacity style={styles.btncontainer} onPress={() => router.push("./login")}>
          <Text style={styles.buttontext}>Get Started</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}


