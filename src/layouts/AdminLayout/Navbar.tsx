import React from 'react';
import { LoginOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Button, Layout, Space, theme, Tooltip, App, Divider } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { authService } from '../../services/auth.service';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface NavbarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Navbar = ({ collapsed, onToggleCollapse }: NavbarProps) => {
  const resourceHelpers = useResourceHelpers();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    localStorage.removeItem('userEmail'); // Clear email from localStorage
    message.success(resourceHelpers.getText('messages.logoutSuccess'));
    navigate('/login');
  };

  return (
    <Layout.Header
      style={{
        padding: '0 24px',
        background: colorBgContainer,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
        zIndex: 1,
        position: 'sticky',
        top: 0,
      }}
    >
      <Space align="center">
        <Tooltip
          title={
            collapsed
              ? resourceHelpers.getText('messages.expandSidebar')
              : resourceHelpers.getText('messages.collapseSidebar')
          }
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggleCollapse}
            style={{ fontSize: 16, width: 48, height: 48 }}
            className="trigger-button"
          />
        </Tooltip>
      </Space>

      <Space align="center" size="middle">
        <LanguageSwitcher showLabel={false} size="small" />

        <ThemeToggle />

        <Divider type="vertical" style={{ height: 24, margin: '0 8px' }} />

        <Tooltip title={resourceHelpers.getText('messages.signOut')}>
          <Button
            type="text"
            icon={<LoginOutlined />}
            onClick={handleLogout}
            style={{ fontSize: 16 }}
          />
        </Tooltip>
      </Space>
    </Layout.Header>
  );
};
