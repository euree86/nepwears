import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
    Dimensions,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AuthHeader from "../components/authheader";
import Button from "../components/button";
import OrDivider from "../components/divider";
const { width, height } = Dimensions.get('window');

export default function SignupScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Fixed image container */}
            {/* <View style={styles.imageContainer}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={styles.topImage}
                    resizeMode="contain"
                />
            </View> */}

            <AuthHeader />

            {/* Scrollable content below image */}
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Signup to Nepwears</Text>

                {/* Social Signup Buttons */}
                <View style={styles.socialButtons}>
                    <TouchableOpacity style={styles.socialButton}>
                        <MaterialCommunityIcons name="google" size={22} color="green" />
                        <Text style={styles.socialButtonText}>Signup with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <MaterialCommunityIcons name="apple" size={22} color="black" />
                        <Text style={styles.socialButtonText}>Signup with Apple</Text>
                    </TouchableOpacity>
                </View>

                {/* Divider */}
                <OrDivider />

                {/* Email Signup Button */}
                <Button text="Signup with Email" onPress={() => router.push("./signupwithemail")} />

                {/* Login Prompt */}
                <View style={styles.promptContainer}>
                    <Text style={styles.promptText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/login/login")}>
                        <Text style={styles.loginText}> Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {
        width: '100%',
        height: height * 0.22,
        opacity: 0.4,
        marginTop: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topImage: {
        width: '90%',
        height: '100%',
    },
    container: {
        paddingHorizontal: width * 0.06,
        paddingTop: height * 0.02,
        paddingBottom: height * 0.05,
    },
    title: {
        fontSize: width * 0.07,
        fontWeight: "700",
        color: "#333333",
        marginBottom: height * 0.02,
        textAlign: "center",
    },
    socialButtons: {
        gap: 20,
        marginTop: height * 0.01,
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#C8C7CD",
        borderRadius: 8,
        paddingVertical: height * 0.015,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
    },
    socialButtonText: {
        marginLeft: 10,
        fontSize: width * 0.045,
        fontWeight: "500",
        color: "#1a1a1a",
    },

    orText: {
        marginHorizontal: 12,
        fontSize: width * 0.035,
        color: "#333",
        fontWeight: "500",
    },

    promptContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.02,
    },
    promptText: {
        fontSize: width * 0.037,
        color: "#333",
    },
    loginText: {
        borderBottomWidth: 2,
        borderBottomColor: "#FC0079",
        color: "#FC0079",
        fontSize: width * 0.037,
        marginLeft: 6,
        fontWeight: "600",
    },
});
