import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { styles } from "../styles";
export default function EmailLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    return (
        <KeyboardAvoidingView
            style={instyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.main}>
                <Text style={instyles.title}>Login with Email</Text>
                <View style={instyles.formContainer}>
                    {/* Email Field */}
                    <View style={instyles.inputContainer}>
                        <Text style={instyles.paragraph}>Email</Text>
                        <TextInput
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            style={[instyles.input, { borderColor: emailFocused ? "#FC0079" : "#C8C7CD" }]}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                        />
                    </View>

                    {/* Password Field with Eye Icon */}
                    <View style={instyles.inputContainer}>
                        <Text style={instyles.paragraph}>Password</Text>
                        <View style={instyles.passwordContainer}>
                            <TextInput
                                placeholder="Enter your password"
                                secureTextEntry={!showPassword}
                                style={[instyles.input, { borderColor: passwordFocused ? "#FC0079" : "#C8C7CD" }]}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <MaterialCommunityIcons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={22}
                                    color="#888"
                                    style={instyles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={instyles.forgotPassword}>Forgot Password</Text>
                </View>

                <TouchableOpacity style={instyles.btncontainer}>
                    <Text style={instyles.buttontext}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const instyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    main: {
        flex: 1,
        paddingHorizontal: '6%',
        paddingVertical: '5%',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 30,
    },
    formContainer: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        textAlign: 'left',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333333',
    },
    passwordContainer: {
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        right: 16,
        top: -33,
    },
    forgotPassword: {
        textAlign: 'right',
        fontSize: 14,
        color: '#666666',
        marginTop: 0,
    },
    btncontainer: {
        backgroundColor: '#FC0079',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    buttontext: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});