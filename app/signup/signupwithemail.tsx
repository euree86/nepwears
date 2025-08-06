import { MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import React, { useState, useRef } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import AuthHeader from "../components/authheader";
import Button from '../components/button';
export default function EmailSignup() {
    const router = useRouter();
    const slideAnim = useRef(new Animated.Value(-100)).current;

    // Show/hide password toggles
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Input states and errors
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    const [isChecked, setChecked] = useState(false);
    const [checkboxError, setCheckboxError] = useState('');

    const [signupSuccess, setSignupSuccess] = useState(false);

    // Validation regex
    const emailRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validation functions
    const validateEmail = () => {
        if (!email.trim()) return setEmailError('Email is required'), false;
        if (!emailRegex.test(email)) return setEmailError('Enter a valid Gmail address'), false;
        setEmailError('');
        return true;
    };

    const validatePassword = () => {
        if (!password.trim()) return setPasswordError('Password is required'), false;
        if (!passwordRegex.test(password)) {
            setPasswordError('Must contain uppercase, lowercase, number & symbol');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const validateConfirmPassword = () => {
        if (!confirmPassword.trim()) return setConfirmPasswordError('Confirm password required'), false;
        if (password !== confirmPassword) return setConfirmPasswordError('Passwords do not match'), false;
        setConfirmPasswordError('');
        return true;
    };

    // Handle signup
    const handleSignup = () => {
        const validEmail = validateEmail();
        const validPassword = validatePassword();
        const validConfirm = validateConfirmPassword();

        if (!isChecked) setCheckboxError('You must agree to Terms & Conditions');
        else setCheckboxError('');

        if (validEmail && validPassword && validConfirm && isChecked) {
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
        } else {
            setSignupSuccess(false);
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
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={text => {
                                setEmail(text);
                                setEmailError('');
                                setSignupSuccess(false);
                            }}
                            style={[
                                styles.input,
                                { borderColor: emailError ? 'red' : emailFocused ? '#C8C7CD' : '#C8C7CD' },
                            ]}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => {
                                setEmailFocused(false);
                                validateEmail();
                            }}
                            autoCapitalize="none"
                        />
                        {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                placeholder="Enter your password"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={text => {
                                    setPassword(text);
                                    setPasswordError('');
                                    setSignupSuccess(false);
                                }}
                                style={[
                                    styles.input,
                                    {
                                        borderColor: passwordError ? 'red' : passwordFocused ? '#C8C7CD' : '#C8C7CD',
                                    },
                                ]}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => {
                                    setPasswordFocused(false);
                                    validatePassword();
                                }}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <MaterialCommunityIcons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={22}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>
                        {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                placeholder="Re-enter your password"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={text => {
                                    setConfirmPassword(text);
                                    setConfirmPasswordError('');
                                    setSignupSuccess(false);
                                }}
                                style={[
                                    styles.input,
                                    {
                                        borderColor: confirmPasswordError ? 'red' : confirmPasswordFocused ? '#C8C7CD' : '#C8C7CD',
                                    },
                                ]}
                                onFocus={() => setConfirmPasswordFocused(true)}
                                onBlur={() => {
                                    setConfirmPasswordFocused(false);
                                    validateConfirmPassword();
                                }}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <MaterialCommunityIcons
                                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                                    size={22}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>
                        {!!confirmPasswordError && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
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
                    <Button text="Signup" onPress={handleSignup} />
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
        marginBottom: 15,
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
});
