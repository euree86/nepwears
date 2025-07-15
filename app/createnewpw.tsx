import { MaterialCommunityIcons, } from '@expo/vector-icons';
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
  Modal
} from 'react-native';
import { styles } from '../styles';

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

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // VALIDATORS
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

  // MAIN HANDLER
  const handleLogin = () => {
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (isPasswordValid && isConfirmValid) {
      setLoginSuccess(true);
    } else {
      setLoginSuccess(false);
    }
  };



  // UI
  return (
    <KeyboardAvoidingView
      style={instyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={instyles.main}>
        <Text style={styles.title}>Create New Password</Text>

        <View style={instyles.form}>
          {/* ───── Password ───── */}
          <View style={instyles.inputGroup}>
            <Text style={instyles.label}>New Password</Text>
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
                secureTextEntry={!showConfirmPassword}
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
                style={instyles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <MaterialCommunityIcons
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
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

          {/* ───── Button ───── */}
          <TouchableOpacity style={instyles.loginButton} onPress={handleLogin}>
            <Text style={instyles.loginButtonText}>Update Password</Text>
          </TouchableOpacity>

          {loginSuccess && (
            <Modal visible={loginSuccess} transparent>
              <View style={instyles.bottomOverlay}>
                <View style={instyles.bottomModal}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={66}
                    color="#28a745"
                    style={instyles.icon}
                  />
                  <View  >
                    <Text style={instyles.title}>Password updated  </Text>
                    <Text style={instyles.title}>Successfully! </Text>

                  </View>


                  <TouchableOpacity
                    style={instyles.trackButton}
                    onPress={() => {
                      setLoginSuccess(false);
                      router.push("./loginwithemail");
                      // Add navigation logic here
                    }}
                  >
                    <Text style={instyles.trackButtonText}>Continue to Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// STYLES
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
    marginTop: 10,
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
  bottomOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomModal: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
    height: 300, // ← increase height as you like
  },


  icon: {
    marginBottom: 10,
  },


  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    textAlign: "center",
  },

  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
  },

  trackButton: {
    backgroundColor: '#FC0079',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
