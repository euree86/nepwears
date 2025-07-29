import * as LocalAuthentication from 'expo-local-authentication';

export const checkBiometricSupport = async (): Promise<boolean> => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
};

export const authenticateWithBiometrics = async (): Promise<{
    success: boolean;
    error?: string;
}> => {
    const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Fingerprint',
        fallbackLabel: 'Use Password',
        disableDeviceFallback: false,
    });

    return result;
};
