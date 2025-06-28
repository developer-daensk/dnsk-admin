import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ProductRoutes from './product.routes';
import UserManagementRoutes from './user-management.routes';
import OrdersRoutes from './orders.routes';
import { RouteConfig } from '../types/router';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Dashboard } from '@/pages/Dashboard';
import { About } from '@/pages/About';
import ContactPersonRoutes from './contact-persons.routes';

const routes: RouteConfig[] = [
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
    meta: {
      title: 'Login',
      description: 'Login page',
    },
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    meta: {
      title: 'Home',
      description: 'Main application layout',
    },
    children: [
      {
        path: '',
        element: <Dashboard />,
        meta: {
          title: 'Dashboard',
          description: 'Dashboard page',
        },
      },
      {
        path: 'about',
        element: <About />,
        meta: {
          title: 'About',
          description: 'About page',
        },
      },
      { ...ProductRoutes },
      { ...UserManagementRoutes },
      { ...OrdersRoutes },
      { ...ContactPersonRoutes },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
