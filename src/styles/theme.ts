import type { ThemeConfig } from 'antd';
import { primary, neutral, success, warning, error } from './colors';

// Theme configuration
export const theme: ThemeConfig = {
  token: {
    // Primary colors
    colorPrimary: primary[500],
    colorPrimaryHover: primary[600],
    colorPrimaryActive: primary[700],
    colorPrimaryBg: primary[50],
    colorPrimaryBgHover: primary[100],
    colorPrimaryBorder: primary[200],
    colorPrimaryBorderHover: primary[300],

    // Success colors
    colorSuccess: success[500],
    colorSuccessHover: success[600],
    colorSuccessActive: success[700],
    colorSuccessBg: success[50],
    colorSuccessBgHover: success[100],
    colorSuccessBorder: success[200],
    colorSuccessBorderHover: success[300],

    // Warning colors
    colorWarning: warning[500],
    colorWarningHover: warning[600],
    colorWarningActive: warning[700],
    colorWarningBg: warning[50],
    colorWarningBgHover: warning[100],
    colorWarningBorder: warning[200],
    colorWarningBorderHover: warning[300],

    // Error colors
    colorError: error[500],
    colorErrorHover: error[600],
    colorErrorActive: error[700],
    colorErrorBg: error[50],
    colorErrorBgHover: error[100],
    colorErrorBorder: error[200],
    colorErrorBorderHover: error[300],

    // Text colors
    colorText: neutral[900],
    colorTextSecondary: neutral[600],
    colorTextDisabled: neutral[400],
    colorTextHeading: neutral[900],

    // Background colors
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#FFFFFF',
    colorBgLayout: neutral[50],
    colorBgSpotlight: neutral[800],

    // Border colors
    colorBorder: neutral[200],
    colorBorderSecondary: neutral[100],

    // Font sizes
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,

    // Border radius
    borderRadius: 6,
    borderRadiusSM: 4,
    borderRadiusLG: 8,
    borderRadiusXS: 2,

    // Spacing
    padding: 16,
    paddingXS: 8,
    paddingSM: 12,
    paddingLG: 24,
    paddingXL: 32,
    margin: 16,
    marginXS: 8,
    marginSM: 12,
    marginLG: 24,
    marginXL: 32,

    // Control height
    controlHeight: 36,
    controlHeightSM: 24,
    controlHeightLG: 48,
  },
  components: {
    Button: {
      colorPrimary: primary[500],
      colorPrimaryHover: primary[600],
      colorPrimaryActive: primary[700],
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
      paddingInline: 16,
      paddingInlineLG: 24,
      paddingInlineSM: 12,
    },
    Input: {
      colorBorder: neutral[200],
      colorInfoBorderHover: primary[300],
      colorBgContainer: '#FFFFFF',
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
      paddingInline: 12,
      paddingInlineLG: 16,
      paddingInlineSM: 8,
    },
    Card: {
      colorBgContainer: '#FFFFFF',
      colorBorderSecondary: neutral[100],
      borderRadiusLG: 8,
    },
  },
};
