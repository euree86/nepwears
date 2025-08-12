import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, getResponsiveSize, ScanMode } from '../../utils/constant';

interface ScanningFrameProps {
  scanMode: ScanMode;
  frameSize: number;
  isProcessing: boolean;
}

const ScanningFrame: React.FC<ScanningFrameProps> = ({
  scanMode,
  frameSize,
  isProcessing,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.frame, { width: frameSize, height: frameSize }]}>
        {/* Corner indicators */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />

        {/* Scan line for products */}
        {scanMode === 'product' && <View style={styles.scanLine} />}

        {/* QR indicator */}
        {scanMode === 'qr' && (
          <View style={styles.qrIndicator}>
            <MaterialCommunityIcons
              name="qrcode"
              size={getResponsiveSize(40)}
              color={COLORS.primarySemi}
            />
          </View>
        )}

        {/* Processing indicator */}
        {isProcessing && (
          <View style={styles.processingIndicator}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
      </View>

      <Text style={styles.instructionText}>
        {scanMode === 'product'
          ? 'Position the product within the frame'
          : 'Center the QR code within the frame'}
      </Text>
      
      <Text style={styles.subInstructionText}>
        {scanMode === 'product'
          ? 'Make sure the product is well-lit and clearly visible'
          : 'QR code will be detected automatically'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getResponsiveSize(SPACING.xl),
  },
  frame: {
    position: 'relative',
    marginBottom: getResponsiveSize(SPACING.xxxl),
  },
  corner: {
    position: 'absolute',
    width: getResponsiveSize(24),
    height: getResponsiveSize(24),
    borderColor: COLORS.primary,
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: getResponsiveSize(4),
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: getResponsiveSize(4),
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: getResponsiveSize(4),
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: getResponsiveSize(4),
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.primary,
    top: '50%',
    opacity: 0.8,
  },
  qrIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -getResponsiveSize(20) },
      { translateY: -getResponsiveSize(20) }
    ],
  },
  processingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -getResponsiveSize(20) },
      { translateY: -getResponsiveSize(20) }
    ],
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: getResponsiveSize(25),
    width: getResponsiveSize(50),
    height: getResponsiveSize(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    color: COLORS.white,
    fontSize: getResponsiveSize(TYPOGRAPHY.sizes.md),
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
    marginBottom: getResponsiveSize(SPACING.sm),
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    paddingHorizontal: getResponsiveSize(SPACING.lg),
  },
  subInstructionText: {
    color: COLORS.white,
    fontSize: getResponsiveSize(TYPOGRAPHY.sizes.sm),
    textAlign: 'center',
    opacity: 0.8,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    paddingHorizontal: getResponsiveSize(SPACING.lg),
  },
});

export default ScanningFrame;