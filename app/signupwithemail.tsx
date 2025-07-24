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
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function EmailSignup() {
    const router = useRouter();
    const slideAnim = useRef(new Animated.Value(-100)).current;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const [loginSuccess, setLoginSuccess] = useState(false);

    const emailRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

    const handleLogin = () => {
        const validEmail = validateEmail();
        const validPassword = validatePassword();
        const validConfirm = validateConfirmPassword();

        if (!isChecked) setCheckboxError('You must agree to Terms & Conditions');
        else setCheckboxError('');

        if (validEmail && validPassword && validConfirm && isChecked) {
            setLoginSuccess(true);

            // Animate slide from top
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }).start();

            // Wait, then redirect
            setTimeout(() => {
                setLoginSuccess(false);
                slideAnim.setValue(-100); // Reset position
                router.replace('/login'); // Navigate to login screen
            }, 500);
        } else {
            setLoginSuccess(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.topImage}
                    resizeMode="contain"
                />

                <ScrollView
                    contentContainerStyle={styles.main}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.title}>Signup with Email</Text>

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
                                setLoginSuccess(false);
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
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
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
                                    setLoginSuccess(false);
                                }}
                                style={[
                                    styles.input,
                                    {
                                        borderColor: passwordError
                                            ? 'red'
                                            : passwordFocused
                                                ? '#C8C7CD'
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
                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
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
                                    setLoginSuccess(false);
                                }}
                                style={[
                                    styles.input,
                                    {
                                        borderColor: confirmPasswordError
                                            ? 'red'
                                            : confirmPasswordFocused
                                                ? '#C8C7CD'
                                                : '#C8C7CD',
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
                        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                    </View>

                    {/* Checkbox */}
                    <View style={styles.checkboxcontainer}>
                        <Checkbox
                            value={isChecked}
                            onValueChange={value => {
                                setChecked(value);
                                if (value) setCheckboxError('');
                            }}
                            color={isChecked ? '#FC0079' : undefined}
                        />
                        <Text> Agree with</Text>
                        <TouchableOpacity>
                            <Text style={styles.signup}>Terms & Condition</Text>
                        </TouchableOpacity>
                    </View>
                    {checkboxError ? <Text style={styles.errorText}>{checkboxError}</Text> : null}

                    {/* Signup Button */}
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Signup</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Animated Success Message */}
                {loginSuccess && (
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
    topImage: {
        width: "100%",
        height: 200,
        opacity: 0.4,
    },
    main: {
        flexGrow: 1,
        justifyContent: 'flex-start',
      
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#333333",
        marginBottom: 8,
        textAlign: "center",
    },
    inputGroup: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
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
    forgotPassword: {
        textAlign: 'right',
        fontSize: 14,
        color: '#666',
        marginTop: 10,
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
    checkboxcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        marginLeft: 3,
    },
    signup: {
        borderBottomWidth: 1.5,
        borderBottomColor: '#FC0079',
        color: '#FC0079',
        fontSize: 15,
        marginLeft: 5,
    },
    successText: {
        color: '#155724',
        fontWeight: '600',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginTop: 4,
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
