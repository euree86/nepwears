import { Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const isTablet = screenWidth >= 768;
export const isSmallDevice = screenWidth < 375;

export const COLORS = {
  primary: '#FF6B35',
  primaryLight: 'rgba(255, 107, 53, 0.1)',
  primarySemi: 'rgba(255, 107, 53, 0.6)',
  white: '#FFFFFF',
  black: '#000000',
  text: '#333333',
  textSecondary: '#666666',
  placeholder: '#999999',
  background: '#F8F9FA',
  shadow: 'rgba(0, 0, 0, 0.15)',
  shadowLight: 'rgba(0, 0, 0, 0.08)',
  overlay: 'rgba(0, 0, 0, 0.8)',
  success: '#28A745',
  error: '#DC3545',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const TYPOGRAPHY = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const getResponsiveSize = (base: number): number => {
  if (isTablet) return base * 1.2;
  if (isSmallDevice) return base * 0.9;
  return base;
};

export const getScanFrameSize = (): number => {
  const baseSize = Math.min(screenWidth * 0.7, 280);
  return getResponsiveSize(baseSize);
};

export type ScanMode = 'product' | 'qr';