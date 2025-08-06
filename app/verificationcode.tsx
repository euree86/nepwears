import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function VerificationScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
      if (!text && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResend = () => {
    // TODO: Add resend code logic here
    setTimer(59);
    alert('Verification code resent.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter 4 Digit Code</Text>
      <Text style={styles.subtitle}>
        Enter the 4-digit code that you received on your{'\n'}email (pixelshipon@gmail.com).
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={[
              styles.input,
              focusedIndex === index && styles.inputFocused,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            selectTextOnFocus
          />
        ))}
      </View>

      <View style={styles.resendContainer}>
        <Text style={styles.resend}>Email not received?</Text>
        <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
          <Text style={[styles.resendBold, timer > 0 && styles.resendDisabled]}>
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, code.some((digit) => digit === '') && styles.buttonDisabled]}
        onPress={() => {
          if (code.every((digit) => digit !== '')) {
            router.push('./createnewpw');
          }
        }}
        disabled={code.some((digit) => digit === '')}
      >
        <Text style={styles.buttonText}>
          {timer > 0 ? `Continue (${timer}s)` : 'Continue'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.1,
    paddingHorizontal: width * 0.06,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.075,
    fontWeight: '700',
    marginBottom: height * 0.015,
    color: '#333',
  },
  subtitle: {
    fontSize: width * 0.038,
    color: '#555',
    textAlign: 'center',
    marginBottom: height * 0.04,
    lineHeight: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: height * 0.04,
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  inputFocused: {
    borderColor: '#FC0079',
    shadowColor: '#FC0079',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.04,
  },
  resend: {
    color: '#555',
    fontSize: width * 0.038,
  },
  resendBold: {
    fontWeight: '700',
    textDecorationLine: 'underline',
    color: '#FC0079',
    fontSize: width * 0.038,
    marginLeft: 6,
  },
  resendDisabled: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: '#FC0079',
    paddingVertical: height * 0.022,
    paddingHorizontal: width * 0.12,  // smaller horizontal padding
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',             // center button horizontally
    minWidth: 160,                   // optional minimum width for consistency
  },

  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: width * 0.045,
  },
});
