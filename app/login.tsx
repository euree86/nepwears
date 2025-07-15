import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "../styles";

export default function LoginScreen() {
    const router = useRouter();

    return (
        <View style={instyles.container}>
            <Text style={styles.title}>Login to Nepwears</Text>

            {/* Social Login Buttons */}
            <View style={instyles.socialButtons}>
                <TouchableOpacity style={instyles.loginButton}>
                    <MaterialCommunityIcons name="google" size={22} color="green" />
                    <Text style={instyles.loginButtonText}>Login with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={instyles.loginButton}>
                    <MaterialCommunityIcons name="apple" size={22} color="black" />
                    <Text style={instyles.loginButtonText}>Login with Apple</Text>
                </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={instyles.divider}>
                <View style={instyles.line} />
                <Text style={instyles.orText}>Or</Text>
                <View style={instyles.line} />
            </View>

            {/* Email Login Button */}
            <TouchableOpacity
                style={styles.btncontainer}
                onPress={() => router.push("./loginwithemail")}
            >
                <Text style={styles.buttontext}>Login with Email</Text>
            </TouchableOpacity>

            {/* Signup Prompt */}
            <View style={instyles.signupContainer}>
                <Text style={instyles.orText}>Don't have any account yet?</Text>
                <TouchableOpacity
                    onPress={() => router.push("./signup")}>

                    <Text style={instyles.signup}> Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const instyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: "flex-start",
    },

    socialButtons: {
        gap: 20,
        marginTop: 20,
    },

    loginButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#C8C7CD",
        borderRadius: 8,
        paddingVertical: 12,
    },

    loginButtonText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "500",
        color: "#1a1a1a",
    },

    divider: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 30,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#C8C7CD",
    },

    orText: {
        marginHorizontal: 8,
        fontSize: 14,
        color: "#68656E",
    },

    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },

    signup: {
        borderBottomWidth: 2,
        borderBottomColor: "#FC0079",
        color: "#FC0079",
        fontSize: 15,
        marginLeft: 5,
    },
});
