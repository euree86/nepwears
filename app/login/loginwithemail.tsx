import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomInputWithValidation from '../components/custominput';
import Button from '../components/button';
import AuthHeader from '../components/authheader';
import OrDivider from '../components/divider';
import * as LocalAuthentication from 'expo-local-authentication';

const { width } = Dimensions.get('window');

export default function LoginWithEmail() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [biometricSupported, setBiometricSupported] = useState(false);

    // Check if both email and password are valid
    const isFormValid = isEmailValid && isPasswordValid;

    useEffect(() => {
        // Check biometric support on mount
        (async () => {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            setBiometricSupported(hasHardware && isEnrolled);
        })();
    }, []);

    const handleLogin = () => {
        if (!isFormValid) {
            // This shouldn't happen if button is properly disabled, but just in case
            return;
        }

        // Proceed with login
        console.log('Logging in with:', email, password);
        router.replace('/Home');
    };

    const handleBiometricAuth = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Login with Biometrics',
                fallbackLabel: 'Use Password',
                disableDeviceFallback: false,
            });

            if (result.success) {
                // Successful biometric login, navigate to Home
                router.replace('/Home');
            } else {
                Alert.alert('Authentication failed', 'Please try again or use password login.');
            }
        } catch (error) {
            Alert.alert('Error', 'Biometric authentication error. Please try again.');
            console.error(error);
        }
    };

    const handleEmailValidation = (isValid: boolean) => {
        setIsEmailValid(isValid);
    };

    const handlePasswordValidation = (isValid: boolean) => {
        setIsPasswordValid(isValid);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <AuthHeader />

                    <View>
                        <CustomInputWithValidation
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onValidationChange={handleEmailValidation}
                        />

                        <CustomInputWithValidation
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            showPasswordToggle={true}
                            onValidationChange={handlePasswordValidation}
                        />


                    </View>

                    <TouchableOpacity onPress={() => router.push('/forgotpw')}>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Button
                        text="Login"
                        onPress={() => {
                            if (isFormValid) {
                                handleLogin();
                            }
                        }}
                    />

                    <View style={styles.signupContainer}>
                        <Text style={styles.orText}>Don't have an account yet?</Text>
                        <TouchableOpacity onPress={() => router.push("/signup/signup")}>
                            <Text style={styles.signup}> Signup</Text>
                        </TouchableOpacity>
                    </View>
                    <OrDivider />

                    {/* Biometric fingerprint icon below password input */}
                    {biometricSupported && (
                        <TouchableOpacity
                            onPress={handleBiometricAuth}
                            style={styles.fingerprintIconContainer}
                            accessibilityLabel="Login with fingerprint"
                        >
                            <MaterialCommunityIcons
                                name="fingerprint"
                                size={48}
                                color="#FC0079"
                            />
                            <Text style={styles.fingerprintText}>Use Fingerprint</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        padding: 20,
        justifyContent: 'center',
    },
    forgotPassword: {
        textAlign: 'right',
        color: 'black',
        fontSize: 14,
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
        marginTop: 10,
    },
    signup: {
        borderBottomWidth: 2,
        borderBottomColor: "#FC0079",
        color: "#FC0079",
        fontSize: width * 0.037,
        marginLeft: 6,
        fontWeight: "600",
    },

    fingerprintIconContainer: {
        alignItems: 'center',
    },
    fingerprintText: {
        marginTop: 6,
        fontSize: 14,
        color: 'black',
        fontWeight: '400',
    },

    disabledButton: {
        opacity: 0.5,
        backgroundColor: '#cccccc',
    },
});
