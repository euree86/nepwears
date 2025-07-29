import React, { useState } from 'react';
const { useRouter } = require('expo-router');
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';


export default function EmailLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const emailRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d._%+-]+@gmail\.com$/;

    const validateEmail = () => {
        if (!email.trim()) {
            setEmailError("Email is required");
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const handleLogin = () => {
        const isEmailValid = validateEmail();
        setLoginSuccess(isEmailValid);
    };

    return (


        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingVertical: 15 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false} // 👈 hides scrollbar
                >
                    <Image
                        source={require("../assets/images/logo.png")}
                        style={instyles.topImage}
                        resizeMode="contain"
                    />
                    <View style={instyles.main}>
                        <Text style={instyles.title}>Forgot Password</Text>
                        <Text style={instyles.subtitle}>
                            Enter your email id for the verification process, we will send a 4-digit code to your email
                        </Text>

                        <View style={instyles.form}>
                            {/* Email Input */}
                            <View style={instyles.inputGroup}>
                                <Text style={instyles.label}>Email</Text>
                                <TextInput
                                    placeholder="Enter your email"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={(text) => {
                                        setEmail(text);
                                        setEmailError('');
                                        setLoginSuccess(false);
                                    }}
                                    style={[
                                        instyles.input,
                                        {
                                            borderColor: emailError
                                                ? 'red'
                                                : emailFocused
                                                    ? '#FC0079'
                                                    : '#C8C7CD',
                                        },
                                    ]}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => {
                                        setEmailFocused(false);
                                        validateEmail();
                                    }}
                                    autoCapitalize="none"
                                />
                                {emailError && (
                                    <Text style={{ color: 'red', marginTop: 4 }}>{emailError}</Text>
                                )}
                            </View>

                            {/* Continue Button */}
                            <TouchableOpacity
                                style={instyles.loginButton}
                                onPress={() => {
                                    const valid = validateEmail();
                                    if (valid) router.push("./verificationcode");
                                }}
                            >
                                <Text style={instyles.loginButtonText}>Continue</Text>
                            </TouchableOpacity>

                            {/* Success Message */}
                            {loginSuccess && (
                                <View style={instyles.successBox}>
                                    <Text style={instyles.successText}>Verification code sent successfully!</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>


    );
}

const instyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,

    },
    main: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    topImage: {
        width: "100%",
        height: 200,
        opacity: 0.4,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#333333",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "#333333",
        marginBottom: 15,

    },
    form: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#FC0079',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    successBox: {
        backgroundColor: '#d4edda',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#c3e6cb',
        alignItems: 'center',
    },
    successText: {
        color: '#155724',
        fontWeight: '600',
        fontSize: 16,
    },
});
