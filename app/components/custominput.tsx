import React, { useEffect, useState, ReactNode } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  error?: string;
  validator?: (value: string) => string | null;
  onPress?: () => void;
  isPicker?: boolean;
  prefix?: string;
  suffix?: ReactNode;
  showPasswordToggle?: boolean;
  onValidationChange?: (isValid: boolean) => void; // New prop to report validation status
}

const CustomInputWithValidation: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  validator,
  keyboardType = 'default',
  secureTextEntry = false,
  error,
  onPress,
  isPicker = false,
  prefix,
  autoCapitalize = 'none',
  showPasswordToggle = false,
  onValidationChange,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateName = (name: string) => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 3) return 'Name must be at least 3 characters';
    return null;
  };

  const validateEmail = (email: string): string | null => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password.trim()) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    if (!hasUppercase) return 'Password must contain at least one uppercase letter';
    if (!hasLowercase) return 'Password must contain at least one lowercase letter';
    if (!hasNumber) return 'Password must contain at least one number';
    if (!hasSpecialChar) return 'Password must contain at least one special character (@$!%*?&)';

    return null;
  };

  const validateLoginPassword = (password: string): string | null => {
    if (!password.trim()) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    if (!hasUppercase) return 'Password must contain at least one uppercase letter';
    if (!hasLowercase) return 'Password must contain at least one lowercase letter';
    if (!hasNumber) return 'Password must contain at least one number';
    if (!hasSpecialChar) return 'Password must contain at least one special character (@$!%*?&)';

    return null;
  };

  const validatePhoneNumber = (phone: string): string | null => {
    if (!phone.trim()) return 'Phone number is required';
    const isValid = /^\d{10}$/.test(phone);
    return isValid ? null : 'Phone number must be 10 digits';
  };

  const validateAddress = (address: string): string | null => {
    if (!address.trim()) return 'Address is required';
    return null;
  };

  const validateGender = (gender: string): string | null => {
    if (!gender.trim()) return 'Gender is required';
    return null;
  };

  const validateDOB = (dob: string): string | null => {
    if (!dob.trim()) return 'Date of Birth is required';
    return null;
  };

  // Function to get appropriate validator based on context
  const getValidator = () => {
    if (validator) {
      return validator;
    } else if (label.toLowerCase().includes('name')) {
      return validateName;
    } else if (label.toLowerCase().includes('email')) {
      return validateEmail;
    } else if (label.toLowerCase().includes('password')) {
      // Check if it's a login context vs signup context
      const isLoginContext = placeholder?.toLowerCase().includes('enter your password') &&
        !placeholder?.toLowerCase().includes('re-enter');
      const isSignupContext = placeholder?.toLowerCase().includes('enter your password') &&
        label.toLowerCase() === 'password';

      if (isLoginContext && !isSignupContext) {
        return validateLoginPassword;
      } else {
        return validatePassword; // Full validation for signup
      }
    } else if (label.toLowerCase().includes('phone')) {
      return validatePhoneNumber;
    } else if (label.toLowerCase().includes('address')) {
      return validateAddress;
    } else if (label.toLowerCase().includes('gender')) {
      return validateGender;
    } else if (label.toLowerCase().includes('birth') || label.toLowerCase().includes('dob')) {
      return validateDOB;
    }
    return null;
  };

  useEffect(() => {
    const currentValidator = getValidator();
    const currentError = currentValidator ? currentValidator(value) : null;
    setValidationError(currentError);

    // Report validation status to parent component
    if (onValidationChange) {
      onValidationChange(currentError === null && value.trim() !== '');
    }
  }, [value, validator, label, onValidationChange]);

  useEffect(() => {
    if (!error && !value) {
      setHasInteracted(false);
    }
  }, [error, value]);

  const handleTextChange = (text: string) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    onChangeText?.(text);
  };

  const handlePress = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    onPress?.();
  };

  const handleFocus = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const shouldShowError = (hasInteracted && validationError) || (error && error.trim() !== '');
  const errorMessage = error || validationError;

  // Picker input
  if (isPicker) {
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePress}
          style={[
            styles.pickerContainer,
            shouldShowError && styles.inputError,
          ]}
        >
          {prefix && <Text style={styles.prefix}>{prefix}</Text>}
          <Text style={[styles.pickerText, !value && styles.placeholderText]}>
            {value || placeholder || label}
          </Text>
        </TouchableOpacity>
        {shouldShowError && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
      </View>
    );
  }

  // Default text input with optional eye toggle
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.textInputWrapper,
        shouldShowError && styles.inputError,
      ]}>
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleTextChange}
          onFocus={handleFocus}
          placeholder={placeholder || label}
          placeholderTextColor="#999"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !showPassword}
          autoCapitalize={autoCapitalize}
          editable={!isPicker}
          showSoftInputOnFocus={!isPicker}
        />
        {showPasswordToggle && label.toLowerCase().includes('password') && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye' : 'eye-off'}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        )}
      </View>
      {shouldShowError && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    marginBottom: 4,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#C8C7CD",
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    height: 48,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    height: 48,
  },
  pickerText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  placeholderText: {
    color: '#999999',
  },
  prefix: {
    marginRight: 8,
    fontSize: 16,
    color: '#333333',
    lineHeight: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -11 }],
  },
});

export default CustomInputWithValidation;