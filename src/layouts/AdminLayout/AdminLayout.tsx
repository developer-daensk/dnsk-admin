import React, { Suspense, useState } from 'react';
import { Layout, theme, Spin, ConfigProvider, Breadcrumb } from 'antd';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidbar';
import { ErrorBoundary } from './ErrorBoundary';
import { Footer } from './Footer';
import './AdminLayout.css';

const { Content } = Layout;

const AdminLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Generate breadcrumb items from path
  const getBreadcrumbItems = () => {
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems = [
      {
        title: <Link to="/">Home</Link>,
      },
    ];

    pathSnippets.forEach((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const title = pathSnippets[index].charAt(0).toUpperCase() + pathSnippets[index].slice(1);
      breadcrumbItems.push({
        title:
          index === pathSnippets.length - 1 ? <span>{title}</span> : <Link to={url}>{title}</Link>,
      });
    });

    return breadcrumbItems;
  };

  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: colorBgContainer,
            siderBg: colorBgContainer,
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />

        <Layout className={`site-layout ${collapsed ? 'collapsed' : ''}`}>
          <Navbar collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />

          <Layout
            style={{
              background: 'transparent',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            }}
          >
            <div className="breadcrumb-container">
              <Breadcrumb items={getBreadcrumbItems()} />
            </div>

            <Content className="site-content">
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className="loading-container">
                      <Spin indicator={loadingIcon} size="large" />
                    </div>
                  }
                >
                  <div
                    className="content-wrapper"
                    style={{
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                    }}
                  >
                    <Outlet />
                  </div>
                </Suspense>
              </ErrorBoundary>
            </Content>

            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminLayout;
