import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles';

export default function EmailLogin() {
    //STATES 
    const [showPassword, setShowPassword] = useState(false);

    const [showconfirmPassword, setshowconfirmPassword] = useState(false);


    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [confirmpasswordFocused, setconfirmpasswordFocused] = useState(false);


    const [isChecked, setChecked] = useState(false);      // ✅ real checkbox state
    const [checkboxError, setCheckboxError] = useState('');

    const [loginSuccess, setLoginSuccess] = useState(false);

    const emailRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    //  VALIDATORS 
    const validateEmail = () => {
        if (!email.trim()) {
            setEmailError('Email is required');
            return false;
        }
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid Gmail address');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = () => {
        if (!password.trim()) {
            setPasswordError('Password is required');
            return false;
        }
        if (!passwordRegex.test(password)) {
            setPasswordError(
                'Password must contain at least one uppercase, lowercase, number, and special character'
            );
            return false;
        }
        setPasswordError('');
        return true;
    };

    const validateConfirmPassword = () => {
        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Confirm password is required');
            return false;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return false;
        }
        setConfirmPasswordError('');
        return true;
    };

    //  MAIN HANDLER 
    const handleLogin = () => {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();

        if (!isChecked) setCheckboxError('You must agree to the Terms & Conditions');
        else setCheckboxError('');

        if (isEmailValid && isPasswordValid && isConfirmValid && isChecked) {
            setLoginSuccess(true);
        } else {
            setLoginSuccess(false);
        }
    };

    //  UI 
    return (
        <KeyboardAvoidingView
            style={instyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={instyles.main}>
                <Text style={styles.title}>Signup with Email</Text>

                <View style={instyles.form}>
                    {/* ───── Email ───── */}
                    <View style={instyles.inputGroup}>
                        <Text style={instyles.label}>Email</Text>
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

                    {/* ───── Password ───── */}
                    <View style={instyles.inputGroup}>
                        <Text style={instyles.label}>Password</Text>
                        <View style={instyles.passwordWrapper}>
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
                                    instyles.input,
                                    {
                                        borderColor: passwordError
                                            ? 'red'
                                            : passwordFocused
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

                    {/* ───── Confirm Password ───── */}
                    <View style={instyles.inputGroup}>
                        <Text style={instyles.label}>Confirm Password</Text>
                        <View style={instyles.passwordWrapper}>
                            <TextInput
                                placeholder="Re-enter your password"
                                secureTextEntry={!showconfirmPassword}
                                value={confirmPassword}
                                onChangeText={text => {
                                    setConfirmPassword(text);
                                    setConfirmPasswordError('');
                                    setLoginSuccess(false);
                                }}
                                style={[
                                    instyles.input,
                                    {
                                        borderColor: confirmPasswordError
                                            ? 'red'
                                            : confirmpasswordFocused
                                                ? '#FC0079'
                                                : '#C8C7CD',
                                    },
                                ]}
                                onFocus={() => setconfirmpasswordFocused(true)}
                                onBlur={() => {
                                    setconfirmpasswordFocused(false);
                                    validateConfirmPassword();
                                }}
                            />
                            <TouchableOpacity
                                style={instyles.eyeIcon}
                                onPress={() => setshowconfirmPassword(!showconfirmPassword)}
                            >
                                <MaterialCommunityIcons
                                    name={showconfirmPassword ? 'eye-off' : 'eye'}
                                    size={22}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>
                        {confirmPasswordError ? (
                            <Text style={{ color: 'red', marginTop: 4 }}>
                                {confirmPasswordError}
                            </Text>
                        ) : null}
                    </View>

                    {/* ───── Checkbox ───── */}
                    <View style={instyles.checkboxcontainer}>
                        <Checkbox
                            value={isChecked}
                            onValueChange={value => {
                                setChecked(value);
                                if (value) setCheckboxError('');
                            }}
                            color={isChecked ? '#FC0079' : 'black'}
                        />
                        <Text> Agree with</Text>
                        <TouchableOpacity>
                            <Text style={instyles.signup}>Terms & Condition</Text>
                        </TouchableOpacity>
                    </View>
                    {checkboxError ? (
                        <Text style={{ color: 'red', marginBottom: 10 }}>
                            {checkboxError}
                        </Text>
                    ) : null}

                    {/* ───── Button ───── */}
                    <TouchableOpacity style={instyles.loginButton} onPress={handleLogin}>
                        <Text style={instyles.loginButtonText}>Signup</Text>
                    </TouchableOpacity>

                    {/* ───── Success ───── */}
                    {loginSuccess && (
                        <View style={instyles.successBox}>
                            <Text style={instyles.successText}>Signup successful!</Text>
                            <TouchableOpacity>
                                <Text style={instyles.forgotPassword}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

//  STYLES 
const instyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    checkboxcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    signup: {
        borderBottomWidth: 2,
        borderBottomColor: '#FC0079',
        color: '#FC0079',
        fontSize: 15,
        marginLeft: 5,
    },
});
