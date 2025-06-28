import 'styled-components';
import {
  themeColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
} from './themeConstants';
import { ThemeConfig } from 'antd';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeConfig {
    colors: typeof themeColors;
    typography: typeof typography;
    spacing: typeof spacing;
    borderRadius: typeof borderRadius;
    shadows: typeof shadows;
    breakpoints: typeof breakpoints;
    zIndex: typeof zIndex;
    isDarkMode: boolean;
    paddingLG: number;
    marginLG: number;
    colorTextHeading: string;
    colorTextSecondary: string;
    fontSize: number;
    fontSizeHeading3: number;
    backgroundColor: string;
    textColor: string;
    colorBorder: string;
    colorText: string;
    colorPrimary: string;
  }
}
