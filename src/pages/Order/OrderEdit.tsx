import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, message, Spin } from 'antd';
import { OrdersService } from '@/services/orders.service';
import { Order } from '@/types/order.types';
import { ROUTES } from '@/lib/constants';
import { PageContainer } from './Orders.styles';
import OrderForm, { OrderFormValues } from '../../components/Orders/OrderForm';

const { Text } = Typography;

const ordersService = new OrdersService();

const OrderEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      fetchOrder(id);
    }
  }, [id]);

  const fetchOrder = async (orderId: string) => {
    try {
      setLoading(true);
      const response = await ordersService.getById(orderId);
      if (response.data) {
        setOrder(response.data);
      }
    } catch (error) {
      message.error('Failed to fetch order details');
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values: OrderFormValues) => {
    if (!order) return;

    try {
      setSaving(true);
      const updatedOrder: Partial<Order> = {
        status: values.status,
        paymentStatus: values.paymentStatus,
        paymentMethod: values.paymentMethod,
        trackingNumber: values.trackingNumber,
        notes: values.notes,
        customer: {
          ...order.customer,
          name: values.customerName,
          email: values.customerEmail,
          phone: values.customerPhone,
          address: values.customerAddress,
          city: values.customerCity,
          state: values.customerState,
          zipCode: values.customerZipCode,
          country: values.customerCountry,
        },
      };

      await ordersService.update(order.id, updatedOrder);
      message.success('Order updated successfully');
      navigate(ROUTES.ORDERS);
    } catch (error) {
      message.error('Failed to update order');
      console.error('Error updating order:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.ORDERS);
  };

  if (loading) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  if (!order) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Text>Order not found</Text>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <OrderForm order={order} loading={saving} onSubmit={handleSave} onCancel={handleCancel} />
    </PageContainer>
  );
};

export default OrderEdit;
