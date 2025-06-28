import React from 'react';
import { Button, Tooltip } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '@/config/theme/ThemeProvider';
import './ThemeToggle.css';
import { useResourceHelpers } from '@/utils/i18nBridge';

export const ThemeToggle: React.FC = () => {
  const resourceHelpers = useResourceHelpers();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Tooltip
      title={
        isDarkMode
          ? resourceHelpers.getText('theme.lightMode')
          : resourceHelpers.getText('theme.darkMode')
      }
    >
      <Button
        type="text"
        icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleTheme}
        className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
        style={{
          fontSize: 18,
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </Tooltip>
  );
};
