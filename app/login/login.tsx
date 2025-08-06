import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
    Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Button from "../components/button";
import AuthHeader from "../components/authheader";
import OrDivider from '../components/divider';
const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Logo */}
                <AuthHeader title="Login to Nepwears" />


                {/* Social Login Buttons */}
                <View style={styles.socialButtons}>
                    <TouchableOpacity style={styles.loginButton}>
                        <MaterialCommunityIcons name="google" size={22} color="green" />
                        <Text style={styles.loginButtonText}>Login with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton}>
                        <MaterialCommunityIcons name="apple" size={22} color="black" />
                        <Text style={styles.loginButtonText}>Login with Apple</Text>
                    </TouchableOpacity>
                </View>

                {/* Divider */}
                <OrDivider />

                {/* Email Login */}
                <Button text="Login with Email" onPress={() => router.push("./loginwithemail")} />


                {/* Signup Prompt */}
                <View style={styles.signupContainer}>
                    <Text style={styles.orText}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={() => router.push("/signup/signup")}>
                        <Text style={styles.signup}> Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        paddingHorizontal: width * 0.06,
        justifyContent: "flex-start",
    },
    socialButtons: {
        gap: 15,
        marginTop: height * 0.01,
    },
    loginButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#C8C7CD",
        borderRadius: 10,
        paddingVertical: height * 0.015,
        backgroundColor: "rgba(255,255,255,0.9)",
    },
    loginButtonText: {
        marginLeft: 10,
        fontSize: width * 0.04,
        fontWeight: "500",
        color: "#1a1a1a",
    },

    orText: {
        marginHorizontal: 10,
        fontSize: width * 0.035,
        color: "#000",
    },

    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.02,
    },
    signup: {
        borderBottomWidth: 2,
        borderBottomColor: "#FC0079",
        color: "#FC0079",
        fontSize: width * 0.037,
        marginLeft: 6,
        fontWeight: "600",
    },
});
