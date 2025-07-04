import React, { useState } from 'react';
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
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

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
                            style={[
                                instyles.input,
                                { borderColor: emailFocused ? '#FC0079' : '#C8C7CD' },
                            ]}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                        />
                    </View>

                    {/* Password Input */}
                    <View style={instyles.inputGroup}>
                        <Text style={instyles.label}>Password</Text>
                        <View style={instyles.passwordWrapper}>
                            <TextInput
                                placeholder="Enter your password"
                                secureTextEntry={!showPassword}
                                style={[
                                    instyles.input,
                                    { borderColor: passwordFocused ? '#FC0079' : '#C8C7CD' },
                                ]}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
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
                    </View>

                    <TouchableOpacity>
                        <Text style={instyles.forgotPassword}>Forgot Password</Text>
                    </TouchableOpacity>


                    {/* Login Button */}
                    <TouchableOpacity style={styles.btncontainer}>
                        <Text style={styles.buttontext}>Login</Text>
                    </TouchableOpacity>
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
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
