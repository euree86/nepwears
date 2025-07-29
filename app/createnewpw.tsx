import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function EmailLogin() {
  const router = useRouter();

  // STATES
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const [loginSuccess, setLoginSuccess] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError('Password is required');
      return false;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must contain uppercase, lowercase, number, and special character'
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

  const handleLogin = () => {
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (isPasswordValid && isConfirmValid) {
      setLoginSuccess(true);
    } else {
      setLoginSuccess(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Create New Password</Text>

          {/* ─── New Password ─── */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
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
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialCommunityIcons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={22}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>

          {/* ─── Confirm Password ─── */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                placeholder="Re-enter your password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={(text) => {
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
                        ? '#FC0079'
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
                onPress={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                <MaterialCommunityIcons
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={22}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}
          </View>

          {/* ─── Update Password Button ─── */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Update Password</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* ─── Success Modal ─── */}
        {loginSuccess && (
          <Modal visible={loginSuccess} transparent>
            <View style={styles.bottomOverlay}>
              <View style={styles.bottomModal}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={64}
                  color="#28a745"
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.successTitle}>Password Updated !</Text>
                <TouchableOpacity
                  style={styles.trackButton}
                  onPress={() => {
                    setLoginSuccess(false);
                    router.push('./loginwithemail');
                  }}
                >
                  <Text style={styles.trackButtonText}>Continue to Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.06,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'left',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
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
    top: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: '#FC0079',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomModal: {
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    height: height * 0.3,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },

  trackButton: {
    backgroundColor: '#FC0079',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
