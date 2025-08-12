import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, getResponsiveSize, ScanMode } from '../../utils/constant';

interface ScanModeToggleProps {
  scanMode: ScanMode;
  onModeChange: (mode: ScanMode) => void;
}

const ScanModeToggle: React.FC<ScanModeToggleProps> = ({
  scanMode,
  onModeChange,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, scanMode === 'product' && styles.activeButton]}
        onPress={() => onModeChange('product')}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="cube-scan"
          size={getResponsiveSize(20)}
          color={scanMode === 'product' ? COLORS.primary : COLORS.white}
        />
        <Text style={[styles.text, scanMode === 'product' && styles.activeText]}>
          Product
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, scanMode === 'qr' && styles.activeButton]}
        onPress={() => onModeChange('qr')}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={getResponsiveSize(20)}
          color={scanMode === 'qr' ? COLORS.primary : COLORS.white}
        />
        <Text style={[styles.text, scanMode === 'qr' && styles.activeText]}>
          QR Code
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: getResponsiveSize(SPACING.xl),
    paddingVertical: getResponsiveSize(SPACING.md),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getResponsiveSize(SPACING.lg),
    paddingVertical: getResponsiveSize(SPACING.sm),
    marginHorizontal: getResponsiveSize(SPACING.xs),
    borderRadius: getResponsiveSize(20),
    backgroundColor: 'rgba(255,255,255,0.1)',
    minWidth: getResponsiveSize(100),
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  text: {
    color: COLORS.white,
    fontSize: getResponsiveSize(TYPOGRAPHY.sizes.sm),
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: getResponsiveSize(SPACING.xs),
  },
  activeText: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
});

export default ScanModeToggle;