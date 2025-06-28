import {
  DashboardOutlined,
  HomeOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ContactsOutlined,
} from '@ant-design/icons';
import { ROUTES } from '@/lib/constants';
import { useResourceHelpers } from '@/utils/i18nBridge';

export const useMenuItems = () => {
  const resourceHelpers = useResourceHelpers();

  return [
    {
      key: '1',
      icon: <HomeOutlined />,
      path: '/',
      label: resourceHelpers.getMenuText('DASHBOARD'),
    },
    {
      key: '2',
      icon: <ShoppingCartOutlined />,
      path: '/orders',
      label: resourceHelpers.getMenuText('ORDERS'),
    },
    {
      key: '3',
      icon: <DashboardOutlined />,
      label: resourceHelpers.getMenuText('PRODUCTS.MAIN'),
      children: [
        {
          key: '31',
          path: '/products/management',
          label: resourceHelpers.getMenuText('PRODUCTS.MANAGEMENT'),
        },
        {
          key: '32',
          path: '/products/attributes',
          label: resourceHelpers.getMenuText('PRODUCTS.PRODUCT_ATTRIBUTES'),
        },
        {
          key: '33',
          path: ROUTES.PRODUCT_TAGS,
          label: resourceHelpers.getMenuText('PRODUCTS.PRODUCT_TAGS'),
        },
        {
          key: '34',
          path: ROUTES.PRODUCT_VARIATIONS,
          label: resourceHelpers.getMenuText('PRODUCTS.PRODUCT_VARIATIONS'),
        },
      ],
    },
    {
      key: '4',
      icon: <UserOutlined />,
      label: resourceHelpers.getMenuText('MANAGEMENT.MAIN'),
      path: ROUTES.USER_MANAGEMENT_USERS,
    },
    {
      key: '5',
      icon: <ContactsOutlined />,
      label: resourceHelpers.getMenuText('CONTACT_PERSONS.MAIN'),
      children: [
        {
          key: '51',
          path: ROUTES.CONTACT_PERSONS_ALL,
          label: resourceHelpers.getMenuText('CONTACT_PERSONS.ALL'),
        },
        {
          key: '52',
          path: ROUTES.CONTACT_PERSONS_CONTACT_PERSONS,
          label: resourceHelpers.getMenuText('CONTACT_PERSONS.CONTACT_PERSONS'),
        },
      ],
    },
    {
      key: '6',
      icon: <SettingOutlined />,
      path: '/management/settings',
      label: 'Settings',
    },
  ];
};

export const SIDEBAR_KEYS = {
  PRODUCTS: '3',
  PRODUCT_MANAGEMENT: '31',
  PRODUCT_CREATE: '32',
  PRODUCT_EDIT: '33',
  USER_MANAGEMENT: '4',
  USER_LIST: '41',
  USER_ROLES: '42',
};
