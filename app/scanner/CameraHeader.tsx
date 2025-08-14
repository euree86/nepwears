import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, getResponsiveSize, ScanMode } from '../../utils/constant';

interface CameraHeaderProps {
  scanMode: ScanMode;
  onClose: () => void;
  onHelp: () => void;
}

const CameraHeader: React.FC<CameraHeaderProps> = ({
  scanMode,
  onClose,
  onHelp,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onClose}
        style={styles.button}
        activeOpacity={0.7}
        accessibilityLabel="Close camera"
      >
        <MaterialCommunityIcons name="close" size={24} color={COLORS.white} />
      </TouchableOpacity>
      
      <Text style={styles.title}>
        {scanMode === 'product' ? 'Scan Product' : 'Scan QR Code'}
      </Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={onHelp}
        activeOpacity={0.7}
        accessibilityLabel="Show help"
      >
        <Ionicons name="help-circle-outline" size={24} color={COLORS.white} />
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
    paddingVertical: getResponsiveSize(SPACING.md),
  },
  button: {
    width: getResponsiveSize(44),
    height: getResponsiveSize(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getResponsiveSize(22),
  },
  title: {
    color: COLORS.white,
    fontSize: getResponsiveSize(TYPOGRAPHY.sizes.lg),
    fontWeight: TYPOGRAPHY.weights.semibold,
    textAlign: 'center',
  },
});

export default CameraHeader;