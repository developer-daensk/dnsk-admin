import Overview from '@/pages/user-management/overview';
import Users from '@/pages/user-management/users/users';
import AddUser from '@/pages/user-management/users/add-user';
import Orders from '@/pages/user-management/orders';
import Products from '@/pages/user-management/products';
import Locations from '@/pages/user-management/locations';
import Logistics from '@/pages/user-management/logistics';
import EditUser from '@/pages/user-management/users/edit-user';

const UserManagementRoutes = {
  path: 'user-management',
  meta: {
    title: 'User Management',
    description: 'User management overview',
  },

  children: [
    {
      path: 'overview',
      element: <Overview />,
      meta: {
        title: 'Overview',
        description: 'Management overview dashboard',
      },
    },
    {
      path: 'users',
      element: <Users />,
      meta: {
        title: 'Users',
        description: 'User management',
      },
    },
    {
      path: 'add-user',
      element: <AddUser />,
      meta: {
        title: 'Add User',
        description: 'Add user',
      },
    },
    {
      path: 'edit-user/:id',
      element: <EditUser />,
      meta: {
        title: 'Edit User',
        description: 'Edit user',
      },
    },
    {
      path: 'orders',
      element: <Orders />,
      meta: {
        title: 'Orders',
        description: 'Order management',
      },
    },
    {
      path: 'products',
      element: <Products />,
      meta: {
        title: 'Products',
        description: 'Product management',
      },
    },
    {
      path: 'locations',
      element: <Locations />,
      meta: {
        title: 'Locations',
        description: 'Location management',
      },
    },
    {
      path: 'logistics',
      element: <Logistics />,
      meta: {
        title: 'Logistics',
        description: 'Logistics management',
      },
    },
  ],
};

export default UserManagementRoutes;
