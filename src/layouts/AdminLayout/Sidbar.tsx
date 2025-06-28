import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Menu, Layout, Typography, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useTheme } from '@/config/theme/ThemeProvider';
import { useMenuItems } from './MenuItems';
import { MenuItemType } from 'antd/es/menu/interface';
import './Sidbar.css';
import { useResourceHelpers } from '@/utils/i18nBridge';

const { Text } = Typography;

interface CustomMenuItem extends MenuItemType {
  path?: string;
  children?: CustomMenuItem[];
}

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export const Sidebar = ({ collapsed, onCollapse }: SidebarProps) => {
  const resourceHelpers = useResourceHelpers();
  const menuItems = useMenuItems();
  const [selectedKey, setSelectedKey] = useState('');
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Get user email from auth state and localStorage
  const authEmail = useSelector((state: RootState) => state.auth.user?.email);
  const [userEmail, setUserEmail] = useState(() => {
    // Try to get email from auth state first, then localStorage
    return authEmail || localStorage.getItem('userEmail') || 'admin@example.com';
  });

  // Update localStorage when auth email changes
  useEffect(() => {
    if (authEmail) {
      localStorage.setItem('userEmail', authEmail);
      setUserEmail(authEmail);
    }
  }, [authEmail]);

  // Get first two letters of email
  const getEmailInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    const findSelectedKeys = (
      items: CustomMenuItem[],
      path: string
    ): { selectedKey: string; openKeys: string[] } => {
      const result = { selectedKey: '', openKeys: [] as string[] };

      // Custom logic for /products/create and /products/edit/:id
      if (path.startsWith('/products/create') || path.startsWith('/products/edit/')) {
        result.selectedKey = resourceHelpers.getText('menuItems.products.management'); // Product Management key
        result.openKeys = [resourceHelpers.getText('menuItems.products.main')]; // Products menu key
        return result;
      }

      items?.forEach(item => {
        if (item?.path === path) {
          result.selectedKey = item.key as string;
          return;
        }

        if (item?.children) {
          const childResult = findSelectedKeys(item.children, path);
          if (childResult.selectedKey) {
            result.selectedKey = childResult.selectedKey;
            result.openKeys = [item.key as string, ...childResult.openKeys];
          }
        }
      });

      return result;
    };

    const { selectedKey, openKeys } = findSelectedKeys(menuItems, location.pathname);
    setSelectedKey(selectedKey);
    setOpenKeys(openKeys);
  }, [location.pathname]);

  const items = menuItems.map((item: CustomMenuItem) => ({
    ...item,
    onClick: item.children
      ? undefined
      : () => {
          navigate(item.path!);
          setSelectedKey(item.key as string);
        },
    children: item.children?.map((child: CustomMenuItem) => ({
      ...child,
      onClick: () => {
        navigate(child.path!);
        setSelectedKey(child.key as string);
      },
    })),
  }));

  return (
    <Layout.Sider
      onCollapse={onCollapse}
      collapsible
      collapsed={collapsed}
      width={250}
      theme={isDarkMode ? 'dark' : 'light'}
      trigger={null}
      className="custom-sidebar"
    >
      <div className="sidebar-header">
        <Avatar
          size="large"
          style={{
            backgroundColor: '#87d068',
            flexShrink: 0,
            fontSize: '18px',
            fontWeight: 'bold',
          }}
          icon={<UserOutlined />}
        >
          {getEmailInitials(userEmail)}
        </Avatar>

        {!collapsed && (
          <div
            style={{
              overflow: 'hidden',
              flex: 1,
              minWidth: 0, // This is important for text ellipsis to work in flex containers
            }}
          >
            <Tooltip title={userEmail} placement="bottom" mouseEnterDelay={0.5}>
              <Text
                ellipsis
                style={{
                  fontSize: '14px',
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
                  display: 'block',
                  width: '100%',
                  cursor: 'pointer',
                }}
              >
                {userEmail}
              </Text>
            </Tooltip>
          </div>
        )}
      </div>

      <Menu
        theme={isDarkMode ? 'dark' : 'light'}
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        items={items}
        className="sidebar-menu"
      />
    </Layout.Sider>
  );
};
