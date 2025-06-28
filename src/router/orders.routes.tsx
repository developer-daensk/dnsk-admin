import Orders from '@/pages/Order/Orders';
import OrderEdit from '@/pages/Order/OrderEdit';

const OrdersRoutes = {
  path: 'orders',
  meta: {
    title: 'Orders',
    description: 'Order management',
  },
  children: [
    {
      path: '',
      element: <Orders />,
      meta: {
        title: 'Orders',
        description: 'Manage customer orders',
      },
    },
    {
      path: 'edit/:id',
      element: <OrderEdit />,
      meta: {
        title: 'Edit Order',
        description: 'Edit order details',
      },
    },
  ],
};

export default OrdersRoutes;
