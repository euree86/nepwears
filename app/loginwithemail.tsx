import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    Dimensions,
    StatusBar
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { checkBiometricSupport, authenticateWithBiometrics } from './biometricauth';
import { styles } from '../styles';

const { width } = Dimensions.get('window');

export default function EmailLogin() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

    const emailRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    useEffect(() => {
        (async () => {
            const supported = await checkBiometricSupport();
            setIsBiometricAvailable(supported);
        })();
    }, []);

    const validateEmail = () => {
        if (!email.trim()) {
            setEmailError('Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid Gmail address');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const validatePassword = () => {
        if (!password.trim()) {
            setPasswordError('Password is required');
            return false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError(
                'Password must contain at least one uppercase, lowercase, number, and special character'
            );
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
            router.replace('/Home');

        }
    };

    const handleFingerprintLogin = async () => {
        const result = await authenticateWithBiometrics();
        if (result.success) {
            router.replace('/Home');


        } else {
            alert('Fingerprint Authentication failed. Please try again.');
        }
    };

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <ScrollView
                contentContainerStyle={stylesx.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={require('../assets/images/logo.png')}
                    style={stylesx.topImage}
                    resizeMode="contain"
                />

                <Text style={stylesx.title}>Login with Email</Text>

                {/* Email */}
                <View style={stylesx.inputGroup}>
                    <Text style={stylesx.label}>Email</Text>
                    <TextInput
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailError('');
                        }}
                        style={[
                            stylesx.input,
                            { borderColor: emailError ? 'red' : emailFocused ? '#C8C7CD' : '#C8C7CD' },
                        ]}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => {
                            setEmailFocused(false);
                            validateEmail();
                        }}
                        autoCapitalize="none"
                    />
                    {emailError ? <Text style={stylesx.errorText}>{emailError}</Text> : null}
                </View>

                {/* Password */}
                <View style={stylesx.inputGroup}>
                    <Text style={stylesx.label}>Password</Text>
                    <View style={stylesx.passwordWrapper}>
                        <TextInput
                            placeholder="Enter your password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setPasswordError('');
                            }}
                            style={[
                                stylesx.input,
                                { borderColor: passwordFocused ? '#C8C7CD' : '#C8C7CD' },
                            ]}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => {
                                setPasswordFocused(false);
                                validatePassword();
                            }}
                        />
                        <TouchableOpacity
                            style={stylesx.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <MaterialCommunityIcons
                                name={showPassword ? 'eye' : 'eye-off'}
                                size={22}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordError ? <Text style={stylesx.errorText}>{passwordError}</Text> : null}
                </View>

                {/* Forgot */}
                <TouchableOpacity onPress={() => router.push('./forgotpw')}>
                    <Text style={stylesx.forgotPassword}>Forgot Password</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity style={stylesx.loginButton} onPress={handleLogin}>
                    <Text style={stylesx.loginButtonText}>Login</Text>
                </TouchableOpacity>

                {/* OR text */}
                <Text style={stylesx.orText}>OR</Text>

                {/* Fingerprint */}
                {isBiometricAvailable && (
                    <View style={stylesx.biometricContainer}>
                        <TouchableOpacity
                            onPress={handleFingerprintLogin}
                            style={stylesx.fingerprintWrapper}
                        >
                            <MaterialIcons name="fingerprint" size={55} color="#FC0079" />
                        </TouchableOpacity>
                        <Text style={stylesx.biometricText}>Tap here to login with Fingerprint</Text>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>

    );
}

const stylesx = StyleSheet.create({

    scrollContent: {
        paddingHorizontal: 20,
        backgroundColor: "white",
        flexGrow: 1,
    },
    topImage: {
        width: '100%',
        height: 200,
        opacity: 0.4,
        marginTop: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 10,
        textAlign: 'center',
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
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    passwordWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 12,
    },
    errorText: {
        color: 'red',
    },
    forgotPassword: {
        textAlign: 'right',
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
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
    orText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: '#333',

    },
    biometricContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    fingerprintWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
    },
    biometricText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
});
