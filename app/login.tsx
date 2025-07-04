import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

export default function loginScreen() {
    const router = useRouter();
    return (
        <View style={instyles.container} >
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <Text style={styles.title}>
                    Login to Nepwears
                </Text>

                <View>
                    <TouchableOpacity >
                        <View style={[styles.loginbtn, { marginBottom: 20 }]}>
                            <MaterialCommunityIcons name="google" size={22} color="green" />
                            <Text style={instyles.buttonText}>Login with Google</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <View style={styles.loginbtn} >
                            <MaterialCommunityIcons name="apple" size={22} color="black" />
                            <Text style={instyles.buttonText}>Login with Apple</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={styles.linecontainer} >
                    <View style={styles.line} ></View>
                    <Text style={styles.ortext}>Or </Text>
                    <View style={styles.line}></View>
                </View>


                <TouchableOpacity style={styles.btncontainer} onPress={() => router.push("./loginwithemail")}>
                    <Text style={styles.buttontext} >Login with Email</Text>
                </TouchableOpacity>

            </View>


            <View style={styles.signupcontainer} >
                <Text style={styles.ortext}>
                    Don't have any account yet?
                </Text>
                <Text style={styles.signup}> Signup</Text>
            </View>
        </View >
    );
}

const instyles = StyleSheet.create({

    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,
        justifyContent: "space-between",
         backgroundColor:"white"
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 8,
        color: "#1a1a1a",
    },
});