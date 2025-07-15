import { useRouter } from 'expo-router';
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

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from "../styles";

export default function EmailLogin() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);

    // Added state to track login success
    const [loginSuccess, setLoginSuccess] = useState(false);

    const emailRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

    const validatePassword = () => {
        if (!password.trim()) {
            setPasswordError("Password is required");
            return false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError("Password must contain at least one uppercase, lowercase, number, and special character");
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const handleLogin = () => {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            // Simulate login success
            setLoginSuccess(true);
        } else {
            setLoginSuccess(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={instyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={instyles.main}>
                <Text style={styles.title}>Login with Email</Text>

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
                                setLoginSuccess(false); // Reset success on change
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
                        {emailError ? (
                            <Text style={{ color: 'red', marginTop: 4 }}>{emailError}</Text>
                        ) : null}
                    </View>

                    {/* Password Input */}
                    <View style={instyles.inputGroup}>
                        <Text style={instyles.label}>Password</Text>
                        <View style={instyles.passwordWrapper}>
                            <TextInput
                                placeholder="Enter your password"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError('');
                                    setLoginSuccess(false); // Reset success on change
                                }}
                                style={[
                                    instyles.input,
                                    {
                                        borderColor: passwordFocused
                                            ? '#FC0079'
                                            : '#C8C7CD',
                                    },
                                ]}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => {
                                    setPasswordFocused(false);
                                    validatePassword();
                                }}
                            />
                            <TouchableOpacity
                                style={instyles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <MaterialCommunityIcons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={22}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>
                        {passwordError ? (
                            <Text style={{ color: 'red', marginTop: 4 }}>{passwordError}</Text>
                        ) : null}
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity onPress={() => router.push("./forgotpw")}>
                        <Text style={instyles.forgotPassword}>Forgot Password</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity style={instyles.loginButton} onPress={() => router.push("./home")}>
                        <Text style={instyles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    {/* Success message box */}
                    {/* {loginSuccess && (
                        <View style={instyles.successBox}>
                            <Text style={instyles.successText}>Login  successful!</Text>
                            <TouchableOpacity>
                                <Text style={instyles.forgotPassword}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    )} */}
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
    form: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 15,
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
    passwordWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
    },
    forgotPassword: {
        textAlign: 'right',
        fontSize: 14,
        color: '#666',
        marginBottom: 30,
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

