import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ConfigProvider, theme } from 'antd';
import {
  themeColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
} from './themeConstants';
import { DefaultTheme } from 'styled-components';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const { token } = theme.useToken();

  const styledTheme: DefaultTheme = {
    colors: themeColors,
    typography,
    spacing,
    borderRadius,
    shadows,
    breakpoints,
    zIndex,
    isDarkMode,
    paddingLG: token.paddingLG,
    marginLG: token.marginLG,
    colorTextHeading: isDarkMode ? '#ffffff' : token.colorTextHeading,
    colorTextSecondary: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : token.colorTextSecondary,
    fontSize: token.fontSize,
    fontSizeHeading3: token.fontSizeHeading3,
    backgroundColor: isDarkMode ? '#141414' : '#ffffff',
    textColor: isDarkMode ? '#ffffff' : '#000000',
    colorBorder: isDarkMode ? '#434343' : '#d9d9d9',
    colorText: isDarkMode ? '#ffffff' : '#000000',
    colorPrimary: '#1890ff',
    token: {
      ...token,
      colorPrimary: '#1890ff',
      colorSuccess: themeColors.success.main,
      colorWarning: themeColors.warning.main,
      colorError: themeColors.error.main,
      colorInfo: themeColors.info.main,
      borderRadius: 6,
      fontFamily: typography.fontFamily,
      colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
      colorBgElevated: isDarkMode ? '#1f1f1f' : '#ffffff',
      colorText: isDarkMode ? '#ffffff' : '#000000',
      colorTextSecondary: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
    },
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: themeColors.primary.main,
            colorSuccess: themeColors.success.main,
            colorWarning: themeColors.warning.main,
            colorError: themeColors.error.main,
            colorInfo: themeColors.info.main,
            borderRadius: parseInt(borderRadius.md),
            fontFamily: typography.fontFamily,
            // Dark mode specific colors
            ...(isDarkMode && {
              colorBgContainer: themeColors.neutral[800],
              colorBgElevated: themeColors.neutral[700],
              colorText: themeColors.neutral[100],
              colorTextSecondary: themeColors.neutral[400],
            }),
          },
        }}
      >
        <StyledThemeProvider theme={styledTheme}>{children}</StyledThemeProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
