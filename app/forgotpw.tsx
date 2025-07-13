import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function EmailLogin() {
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
            setEmailError("Please enter a valid Gmail address");
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
        <KeyboardAvoidingView
            style={instyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
                    <TouchableOpacity style={instyles.loginButton} onPress={handleLogin}>
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
        </KeyboardAvoidingView>
    );
}

const instyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    main: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#333333",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "#333333",
        marginBottom: 30,
    },
    form: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 30,
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
