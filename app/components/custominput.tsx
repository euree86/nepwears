import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';

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
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const validateName = (name: string) => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 3) return 'Name must be at least 3 characters';
    return null;
  };

  const validateEmail = (email: string): string | null => {
    if (!email.trim()) return 'Email is required';
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return isValid ? null : 'Invalid email format';
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

  useEffect(() => {
    if (validator) {
      setValidationError(validator(value));
    } else if (label.toLowerCase().includes('name')) {
      setValidationError(validateName(value));
    } else if (label.toLowerCase().includes('email')) {
      setValidationError(validateEmail(value));
    } else if (label.toLowerCase().includes('phone')) {
      setValidationError(validatePhoneNumber(value));
    } else if (label.toLowerCase().includes('address')) {
      setValidationError(validateAddress(value));
    } else if (label.toLowerCase().includes('gender')) {
      setValidationError(validateGender(value));
    } else if (label.toLowerCase().includes('birth') || label.toLowerCase().includes('dob')) {
      setValidationError(validateDOB(value));
    } else {
      setValidationError(null);
    }
  }, [value, validator, label]);

  // Reset interaction state when error prop is cleared (form is reset)
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

  // Only show validation error if user has interacted AND there's actually an error, or if there's an external error
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

  // Default text input
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
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          editable={!isPicker}
          showSoftInputOnFocus={!isPicker}
        />
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
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    height: 48,
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
});

export default CustomInputWithValidation;