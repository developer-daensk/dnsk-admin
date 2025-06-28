import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { PageTitle } from '@/components';
import { useResourceHelpers } from '@/utils/i18nBridge';
import { ROUTES } from '@/lib/constants';

interface TabItem {
  key: string;
  label: string;
}

interface UserManagementTabsProps {
  /**
   * The title to display in the PageTitle component
   */
  title?: string;
  /**
   * Array of tab items to display
   */
  tabItems?: TabItem[];
  /**
   * Base path for navigation (e.g., '/user-management')
   */
  basePath?: string;
  /**
   * Default route to navigate to when no valid tab is found
   */
  defaultRoute?: string;
  /**
   * Index of the path segment that contains the tab key (default: 2 for /user-management/[tabSegment])
   */
  pathSegmentIndex?: number;
}

export default function UserManagementTabs({
  title,
  tabItems,
  basePath = '/user-management',
  defaultRoute = ROUTES.USER_MANAGEMENT_OVERVIEW,
  pathSegmentIndex = 2,
}: UserManagementTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const location = useLocation();
  const resourceHelpers = useResourceHelpers();

  // Compute title and tabItems based on current language (reactive)
  const displayTitle = title || resourceHelpers.getUserManagementText('TITLE');
  const displayTabItems = tabItems || [
    { key: 'overview', label: resourceHelpers.getUserManagementText('TABS.OVERVIEW') },
    { key: 'orders', label: resourceHelpers.getUserManagementText('TABS.ORDERS') },
    { key: 'users', label: resourceHelpers.getUserManagementText('TABS.USERS') },
    { key: 'products', label: resourceHelpers.getUserManagementText('TABS.PRODUCTS') },
    { key: 'locations', label: resourceHelpers.getUserManagementText('TABS.LOCATIONS') },
    { key: 'logistics', label: resourceHelpers.getUserManagementText('TABS.LOGISTICS') },
  ];

  // Create path to tab mapping from tabItems
  const pathToTabMap: Record<string, string> = displayTabItems.reduce(
    (acc, item) => {
      acc[item.key] = item.key;
      return acc;
    },
    {} as Record<string, string>
  );

  // Update active tab based on current path
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const tabSegment = pathSegments[pathSegmentIndex];

    if (tabSegment && pathToTabMap[tabSegment]) {
      setActiveTab(tabSegment);
    } else {
      // Default to overview if no valid tab found
      setActiveTab('overview');
      navigate(defaultRoute, { replace: true });
    }
  }, [location.pathname, navigate, pathToTabMap, defaultRoute, pathSegmentIndex]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    // Navigate directly to the tab route
    navigate(`${basePath}/${key}`);
  };

  return (
    <>
      <PageTitle>{displayTitle}</PageTitle>

      <Tabs activeKey={activeTab} onChange={handleTabChange} items={displayTabItems} />

      <Outlet />
    </>
  );
}
