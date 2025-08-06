import React, { useState } from 'react';
import { useRouter } from 'expo-router';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function EmailLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const emailRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d._%+-]+@gmail\.com$/;

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Logo fixed at top */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.topImage}
          resizeMode="contain"
        />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.main}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              Enter your email id for the verification process, we will send a 4-digit code to your
              email
            </Text>

            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
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
                    styles.input,
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
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  const valid = validateEmail();
                  if (valid) router.push('./verificationcode');
                }}
              >
                <Text style={styles.loginButtonText}>Continue</Text>
              </TouchableOpacity>

              {/* Success Message */}
              {loginSuccess && (
                <View style={styles.successBox}>
                  <Text style={styles.successText}>Verification code sent successfully!</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    width: '100%',
    height: height * 0.22,
    opacity: 0.4,
    marginTop: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
    width: '80%',
    height: '100%',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.02,
    justifyContent: 'flex-start',
  },
  main: {
    flex: 1,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '700',
    color: '#333333',
    marginBottom: height * 0.015,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width * 0.038,
    fontWeight: '400',
    color: '#333333',
    marginBottom: height * 0.03,
    textAlign: 'center',
    lineHeight: 20,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: height * 0.025,
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: '500',
    color: '#333',
    marginBottom: height * 0.008,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    fontSize: width * 0.045,
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  loginButton: {
    backgroundColor: '#FC0079',
    paddingVertical: height * 0.018,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: height * 0.03,
    elevation: 3,
    shadowColor: '#FC0079',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: width * 0.035,
  },
  successBox: {
    backgroundColor: '#d4edda',
    padding: height * 0.015,
    borderRadius: 8,
    marginTop: height * 0.015,
    borderWidth: 1,
    borderColor: '#c3e6cb',
    alignItems: 'center',
  },
  successText: {
    color: '#155724',
    fontWeight: '600',
    fontSize: width * 0.04,
  },
});
