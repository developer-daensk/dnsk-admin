export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ORDERS: '/orders',
  ORDER_EDIT: '/orders/edit/:id',
  PRODUCT_VARIATIONS: '/products/variations',
  PRODUCT_TAGS: '/products/tags',
  PRODUCT_MANAGEMENT: '/products/management',
  PRODUCT_CREATE: '/products/create',
  PRODUCT_EDIT: '/products/edit/:id',
  USER_MANAGEMENT: '/user-management',
  USER_MANAGEMENT_OVERVIEW: '/user-management/overview',
  USER_MANAGEMENT_USERS: '/user-management/users',
  USER_MANAGEMENT_ORDERS: '/user-management/orders',
  USER_MANAGEMENT_PRODUCTS: '/user-management/products',
  USER_MANAGEMENT_LOCATIONS: '/user-management/locations',
  USER_MANAGEMENT_LOGISTICS: '/user-management/logistics',
  CONTACT_PERSONS_ALL: '/contact-persons/all',
  CONTACT_PERSONS_CONTACT_PERSONS: '/contact-persons/contact-persons',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: import.meta.env.VITE_ACCESS_TOKEN_KEY || 'access_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
} as const;

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
} as const;

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const AUTH = {
  RESEND_TIMER: Number(import.meta.env.VITE_RESEND_TIMER) || 30,
} as const;
