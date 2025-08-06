import { MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import React, { useState, useRef } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import AuthHeader from "../components/authheader";
import Button from '../components/button';
import CustomInputWithValidation from '../components/custominput';

export default function EmailSignup() {
    const router = useRouter();
    const slideAnim = useRef(new Animated.Value(-100)).current;

    // Input states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Validation states
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

    const [isChecked, setChecked] = useState(false);
    const [checkboxError, setCheckboxError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);

    // Custom validator for email (Gmail only)
    const validateGmailEmail = (email: string): string | null => {
        if (!email.trim()) return 'Email is required';
        const gmailRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) return 'Enter a valid Gmail address';
        return null;
    };

    // Custom validator for confirm password
    const validateConfirmPassword = (confirmPwd: string): string | null => {
        if (!confirmPwd.trim()) return 'Confirm password required';
        if (password !== confirmPwd) return 'Passwords do not match';
        return null;
    };

    // Validation change handlers
    const handleEmailValidation = (isValid: boolean) => {
        setIsEmailValid(isValid);
    };

    const handlePasswordValidation = (isValid: boolean) => {
        setIsPasswordValid(isValid);
    };

    const handleConfirmPasswordValidation = (isValid: boolean) => {
        setIsConfirmPasswordValid(isValid);
    };

    // Handle confirm password text change
    const handleConfirmPasswordChange = (text: string) => {
        setConfirmPassword(text);
        setConfirmPasswordError('');
        setSignupSuccess(false);

        // Validate confirm password immediately
        const error = validateConfirmPassword(text);
        setConfirmPasswordError(error || '');
        setIsConfirmPasswordValid(!error && text.trim() !== '');
    };

    // Check if form is valid
    const isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid && isChecked;

    // Handle signup
    const handleSignup = () => {
        if (!isChecked) {
            setCheckboxError('You must agree to Terms & Conditions');
            return;
        }

        setCheckboxError('');

        if (isFormValid) {
            setSignupSuccess(true);

            // Animate success box sliding down
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();

            // After delay, reset and navigate
            setTimeout(() => {
                setSignupSuccess(false);
                slideAnim.setValue(-100);
                router.replace('/login/login');
            }, 1000);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <AuthHeader />

                <ScrollView
                    contentContainerStyle={styles.main}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <CustomInputWithValidation
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setSignupSuccess(false);
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            validator={validateGmailEmail}
                            onValidationChange={handleEmailValidation}
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputGroup}>
                        <CustomInputWithValidation
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setSignupSuccess(false);
                                // Re-validate confirm password when password changes
                                if (confirmPassword) {
                                    const error = validateConfirmPassword(confirmPassword);
                                    setConfirmPasswordError(error || '');
                                    setIsConfirmPasswordValid(!error && confirmPassword.trim() !== '');
                                }
                            }}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            showPasswordToggle={true}
                            onValidationChange={handlePasswordValidation}
                        />
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputGroup}>
                        <CustomInputWithValidation
                            label="Confirm Password"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChangeText={handleConfirmPasswordChange}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            showPasswordToggle={true}
                            error={confirmPasswordError}
                            validator={() => null}
                            onValidationChange={() => { }}
                        />
                    </View>

                    {/* Terms Checkbox */}
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={isChecked}
                            onValueChange={value => {
                                setChecked(value);
                                if (value) setCheckboxError('');
                            }}
                            color={isChecked ? '#FC0079' : undefined}
                        />
                        <Text style={{ marginLeft: 8 }}>I agree with</Text>
                        <TouchableOpacity>
                            <Text style={styles.termsText}> Terms & Conditions</Text>
                        </TouchableOpacity>
                    </View>
                    {!!checkboxError && <Text style={styles.errorText}>{checkboxError}</Text>}

                    {/* Signup Button */}
                    <Button
                        text="Signup"
                        onPress={() => {
                            if (isFormValid) {
                                handleSignup();
                            }
                        }}

                    />
                </ScrollView>

                {/* Animated Success Message */}
                {signupSuccess && (
                    <Animated.View
                        style={[
                            styles.animatedSuccessBox,
                            { transform: [{ translateY: slideAnim }] },
                        ]}
                    >
                        <Text style={styles.successText}>Signup successful!</Text>
                    </Animated.View>
                )}
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white",
    },
    main: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#333333",
        marginBottom: 12,
        textAlign: "center",
    },
    inputGroup: {
        marginBottom: 0,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    passwordWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 14,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        marginLeft: 3,
    },
    termsText: {
        color: '#FC0079',
        fontWeight: '600',
        fontSize: 15,
        marginLeft: 5,
        borderBottomWidth: 1.5,
        borderBottomColor: '#FC0079',
    },
    errorText: {
        color: 'red',
        marginTop: 4,
    },
    successText: {
        color: '#155724',
        fontWeight: '600',
        fontSize: 16,
    },
    animatedSuccessBox: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        backgroundColor: '#d4edda',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#c3e6cb',
        alignItems: 'center',
        zIndex: 999,
    },
    signupButton: {
        // Add any additional styles for the button
    },
    disabledButton: {
        opacity: 0.5,
        backgroundColor: '#cccccc',
    },
});