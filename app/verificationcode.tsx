import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from 'react-native';
import { styles } from '../styles'; // assuming you have global styles

export default function EmailLogin() {
  // STATES
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // VALIDATORS
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

  // MAIN HANDLER
  const handleLogin = () => {
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (isPasswordValid && isConfirmValid) {
      setModalVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={instyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={instyles.main}>
        <Text style={styles.title}>Create New Password</Text>

        <View style={instyles.form}>
          {/* Password */}
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

          {/* Confirm Password */}
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

          {/* Update Button */}
          <TouchableOpacity style={instyles.loginButton} onPress={handleLogin}>
            <Text style={instyles.loginButtonText}>Update Password</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={instyles.modalContainer}>
          <View style={instyles.modalContent}>
            <Image
              source={require("../assets/images/onboard.png")}
              style={instyles.successImage}
              resizeMode="contain"
            />
            <Text style={instyles.modalText}>Password updated{'\n'}Successfully!</Text>
            <TouchableOpacity
              style={instyles.loginButton}
              onPress={() => {
                setModalVisible(false);
                // Optional: Navigate to login screen
              }}
            >
              <Text style={instyles.loginButtonText}>Continue to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 15,
  },
  successImage: {
    width: 80,
    height: 80,
  },
});
