import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, getResponsiveSize, ScanMode } from '../../utils/constant';

interface CameraControlsProps {
  scanMode: ScanMode;
  cameraReady: boolean;
  isProcessing: boolean;
  onGalleryPress: () => void;
  onCapturePress: () => void;
  onHelpPress: () => void;
}

const CameraControls: React.FC<CameraControlsProps> = ({
  scanMode,
  cameraReady,
  isProcessing,
  onGalleryPress,
  onCapturePress,
  onHelpPress,
}) => {
  const isCaptureDisabled = !cameraReady || scanMode === 'qr' || isProcessing;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.sideButton}
        onPress={onGalleryPress}
        activeOpacity={0.7}
        accessibilityLabel="Open gallery"
      >
        <View style={styles.sideButtonContainer}>
          <Ionicons name="images" size={getResponsiveSize(24)} color={COLORS.white} />
        </View>
        <Text style={styles.sideButtonText}>Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.captureButton, isCaptureDisabled && styles.captureButtonDisabled]}
        onPress={scanMode === 'product' ? onCapturePress : undefined}
        disabled={isCaptureDisabled}
        activeOpacity={0.8}
        accessibilityLabel={scanMode === 'product' ? 'Take photo' : 'QR mode - automatic detection'}
      >
        <View style={[
          styles.captureButtonInner,
          isCaptureDisabled && styles.captureButtonInnerDisabled
        ]}>
          {isProcessing ? (
            <ActivityIndicator size="small" color={COLORS.text} />
          ) : scanMode === 'product' ? (
            <MaterialCommunityIcons
              name="camera"
              size={getResponsiveSize(28)}
              color={cameraReady ? COLORS.text : COLORS.placeholder}
            />
          ) : (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={getResponsiveSize(28)}
              color={COLORS.placeholder}
            />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sideButton}
        onPress={onHelpPress}
        activeOpacity={0.7}
        accessibilityLabel="Show help"
      >
        <View style={styles.sideButtonContainer}>
          <Ionicons name="help-circle" size={getResponsiveSize(24)} color={COLORS.white} />
        </View>
        <Text style={styles.sideButtonText}>Help</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getResponsiveSize(SPACING.xl),
    paddingBottom: Platform.OS === 'ios' ? getResponsiveSize(SPACING.xxxl) : getResponsiveSize(SPACING.xl),
    backgroundColor: COLORS.overlay,
  },
  sideButton: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: getResponsiveSize(SPACING.sm),
  },
  sideButtonContainer: {
    padding: getResponsiveSize(SPACING.sm),
  },
  sideButtonText: {
    color: COLORS.white,
    fontSize: getResponsiveSize(TYPOGRAPHY.sizes.xs),
    fontWeight: TYPOGRAPHY.weights.medium,
    marginTop: getResponsiveSize(SPACING.xs),
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  captureButton: {
    width: getResponsiveSize(80),
    height: getResponsiveSize(80),
    borderRadius: getResponsiveSize(40),
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
    marginHorizontal: getResponsiveSize(SPACING.lg),
  },
  captureButtonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.3)',
  },
  captureButtonInner: {
    width: getResponsiveSize(64),
    height: getResponsiveSize(64),
    borderRadius: getResponsiveSize(32),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInnerDisabled: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default CameraControls;