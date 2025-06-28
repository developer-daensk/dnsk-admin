import React from 'react';
import { Switch, Space } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '@/config/theme/ThemeProvider';
import './ThemeToggleSwitch.css';

export const ThemeToggleSwitch: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Space className="theme-toggle-switch-container">
      <SunOutlined className={`sun-icon ${!isDarkMode ? 'active' : ''}`} />
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        className="theme-switch"
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
      />
      <MoonOutlined className={`moon-icon ${isDarkMode ? 'active' : ''}`} />
    </Space>
  );
};
