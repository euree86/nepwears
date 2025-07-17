import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles";


export default function LoginScreen() {
    const router = useRouter();

    return (
        <LinearGradient
            colors={["#c0cbd5ff", "#f2daf3ff"]} // pink to purple
            style={instyles.gradient}
        >
            <SafeAreaView style={instyles.safeArea}>
                <View style={instyles.container}>

                    {/* Faint logo at the top */}
                    <Image
                        source={require("../assets/images/logo.png")}
                        style={instyles.topImage}
                        resizeMode="contain"
                    />

                    <Text style={instyles.title}>Login to Nepwears</Text>

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
                        <TouchableOpacity onPress={() => router.push("./signup")}>
                            <Text style={instyles.signup}> Signup</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const instyles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "flex-start",
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#333333",
        marginBottom: 15,
        textAlign: "center",
    },

    topImage: {
        width: "100%",
        height: 250,
        opacity: 0.4, 
        marginTop: 40,// Makes logo look like a watermark
    },
    socialButtons: {
        gap: 20,
        marginTop: 10,
    },
    loginButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#C8C7CD",
        borderRadius: 8,
        paddingVertical: 12,
        backgroundColor: "rgba(255, 255, 255, 0.4)", // ensures buttons are readable
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
        backgroundColor: "#777777ff",
    },
    orText: {
        marginHorizontal: 8,
        fontSize: 14,
        color: "black",
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
