// Color palette for the marketplace admin application

// Primary colors
export const primary = {
  50: '#E6F6FF',
  100: '#BAE3FF',
  200: '#7CC4FA',
  300: '#60A5FA',
  400: '#2186EB',
  500: '#2563EB',
  600: '#1E40AF',
  700: '#03449E',
  800: '#01337D',
  900: '#002159',
};

// Secondary colors
export const secondary = {
  50: '#ECFDF5',
  100: '#D1FAE5',
  200: '#A7F3D0',
  300: '#34D399',
  400: '#10B981',
  500: '#059669',
  600: '#047857',
  700: '#065F46',
  800: '#064E3B',
  900: '#022C22',
};

// Neutral colors
export const neutral = {
  50: '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
};

// Success colors
export const success = {
  50: '#ECFDF5',
  100: '#D1FAE5',
  200: '#A7F3D0',
  300: '#34D399',
  400: '#10B981',
  500: '#059669',
  600: '#047857',
  700: '#065F46',
  800: '#064E3B',
  900: '#022C22',
};

// Warning colors
export const warning = {
  50: '#FFFBEA',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FBBF24',
  400: '#F59E0B',
  500: '#D97706',
  600: '#B45309',
  700: '#92400E',
  800: '#78350F',
  900: '#451A03',
};

// Error colors
export const error = {
  50: '#FEF2F2',
  100: '#FEE2E2',
  200: '#FECACA',
  300: '#F87171',
  400: '#EF4444',
  500: '#DC2626',
  600: '#B91C1C',
  700: '#991B1B',
  800: '#7F1D1D',
  900: '#450A0A',
};

// Info colors
export const info = {
  50: '#EFF6FF',
  100: '#DBEAFE',
  200: '#BFDBFE',
  300: '#60A5FA',
  400: '#3B82F6',
  500: '#2563EB',
  600: '#1D4ED8',
  700: '#1E40AF',
  800: '#1E3A8A',
  900: '#172554',
};

// Semantic color mapping
export const colors = {
  // Primary colors
  primary: primary[500],
  primaryLight: primary[300],
  primaryDark: primary[600],
  primaryContrast: '#FFFFFF',

  // Secondary colors
  secondary: secondary[500],
  secondaryLight: secondary[300],
  secondaryDark: secondary[600],
  secondaryContrast: '#FFFFFF',

  // Neutral colors
  neutral: neutral[500],
  neutralLight: neutral[300],
  neutralDark: neutral[700],

  // Status colors
  success: success[500],
  successLight: success[300],
  successDark: success[600],

  warning: warning[500],
  warningLight: warning[300],
  warningDark: warning[600],

  error: error[500],
  errorLight: error[300],
  errorDark: error[600],

  info: info[500],
  infoLight: info[300],
  infoDark: info[600],

  // Background colors
  background: neutral[50],
  surface: '#FFFFFF',

  // Text colors
  textPrimary: neutral[900],
  textSecondary: neutral[600],
  textDisabled: neutral[400],

  // Border colors
  border: neutral[200],
  borderLight: neutral[100],
  borderDark: neutral[300],
} as const;

// CSS Variables
export const cssVariables = {
  // Primary colors
  '--color-primary': colors.primary,
  '--color-primary-light': colors.primaryLight,
  '--color-primary-dark': colors.primaryDark,
  '--color-primary-contrast': colors.primaryContrast,

  // Secondary colors
  '--color-secondary': colors.secondary,
  '--color-secondary-light': colors.secondaryLight,
  '--color-secondary-dark': colors.secondaryDark,
  '--color-secondary-contrast': colors.secondaryContrast,

  // Neutral colors
  '--color-neutral': colors.neutral,
  '--color-neutral-light': colors.neutralLight,
  '--color-neutral-dark': colors.neutralDark,

  // Status colors
  '--color-success': colors.success,
  '--color-success-light': colors.successLight,
  '--color-success-dark': colors.successDark,

  '--color-warning': colors.warning,
  '--color-warning-light': colors.warningLight,
  '--color-warning-dark': colors.warningDark,

  '--color-error': colors.error,
  '--color-error-light': colors.errorLight,
  '--color-error-dark': colors.errorDark,

  '--color-info': colors.info,
  '--color-info-light': colors.infoLight,
  '--color-info-dark': colors.infoDark,

  // Background colors
  '--color-background': colors.background,
  '--color-surface': colors.surface,

  // Text colors
  '--color-text-primary': colors.textPrimary,
  '--color-text-secondary': colors.textSecondary,
  '--color-text-disabled': colors.textDisabled,

  // Border colors
  '--color-border': colors.border,
  '--color-border-light': colors.borderLight,
  '--color-border-dark': colors.borderDark,
} as const;
