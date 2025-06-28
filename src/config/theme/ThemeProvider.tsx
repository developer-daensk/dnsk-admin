import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ConfigProvider, theme } from 'antd';
import { createContext, useContext, useState } from 'react';
import {
  themeColors as colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
} from '../../theme/themeConstants';

const ThemeContext = createContext<{
  isDarkMode: boolean;
  toggleTheme: () => void;
} | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const { token } = theme.useToken();

  // Save theme preference to localStorage
  React.useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Create theme tokens based on dark/light mode
  const styledTheme = {
    colors,
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
      colorSuccess: colors.success.main,
      colorWarning: colors.warning.main,
      colorError: colors.error.main,
      colorInfo: colors.info.main,
      borderRadius: 6,
      fontFamily: typography.fontFamily,
      colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
      colorBgElevated: isDarkMode ? '#1f1f1f' : '#ffffff',
      colorText: isDarkMode ? '#ffffff' : '#000000',
      colorTextSecondary: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
    },
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 6,
            colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
            colorText: isDarkMode ? '#ffffff' : '#000000',
            colorTextSecondary: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
          },
          components: {
            Layout: {
              headerBg: isDarkMode ? '#1f1f1f' : '#ffffff',
              siderBg: isDarkMode ? '#141414' : '#ffffff',
              bodyBg: isDarkMode ? '#000000' : '#f5f5f5',
              triggerBg: isDarkMode ? '#262626' : '#f0f0f0',
              triggerColor: isDarkMode ? '#ffffff' : '#1f1f1f',
            },
            Menu: {
              itemBg: isDarkMode ? '#141414' : '#ffffff',
              subMenuItemBg: isDarkMode ? '#1f1f1f' : '#fafafa',
              itemHoverBg: isDarkMode ? '#262626' : '#f0f0f0',
              itemSelectedBg: isDarkMode ? '#262626' : '#e6f7ff',
              itemSelectedColor: isDarkMode ? '#ffffff' : '#1890ff',
              darkItemBg: isDarkMode ? '#141414' : '#001529',
              darkItemSelectedBg: isDarkMode ? '#262626' : '#1890ff',
              darkItemHoverBg: isDarkMode ? '#1f1f1f' : '#003366',
            },
            Card: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorTextHeading: isDarkMode ? '#ffffff' : 'rgba(0, 0, 0, 0.88)',
              colorText: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.88)',
              colorBorderSecondary: isDarkMode ? '#303030' : '#f0f0f0',
            },
            Table: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              headerBg: isDarkMode ? '#141414' : '#fafafa',
            },
            Input: {
              colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
              colorBorder: isDarkMode ? '#434343' : '#d9d9d9',
              colorText: isDarkMode ? '#ffffff' : '#000000',
              colorTextPlaceholder: isDarkMode
                ? 'rgba(255, 255, 255, 0.45)'
                : 'rgba(0, 0, 0, 0.45)',
            },
            Form: {
              labelColor: isDarkMode ? '#ffffff' : 'rgba(0, 0, 0, 0.88)',
              labelRequiredMarkColor: isDarkMode ? '#ff4d4f' : '#ff4d4f',
            },
            Button: {
              colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
              colorBorder: isDarkMode ? '#434343' : '#d9d9d9',
            },
          },
        }}
      >
        <StyledThemeProvider theme={styledTheme}>{children}</StyledThemeProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
