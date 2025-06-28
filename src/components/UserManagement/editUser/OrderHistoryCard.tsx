import React, { useState, useEffect } from 'react';
import { Card, List, Tag, Typography, Space, Empty, Spin, Button, Select, message } from 'antd';
import {
  ShoppingOutlined,
  CalendarOutlined,
  EyeOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import { useResourceHelpers } from '@/utils/i18nBridge';
import dayjs from 'dayjs';

const { Text } = Typography;
const { Option } = Select;

interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  total: number;
  itemCount: number;
  createdAt: string;
}

interface OrderHistoryCardProps {
  userId?: string;
  onViewOrder?: (orderId: string) => void;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({ onViewOrder }) => {
  const resourceHelpers = useResourceHelpers();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchOrders();
  }, [currentPage, pageSize, sortBy, sortOrder]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await api.getOrders({
      //   userId,
      //   page: currentPage,
      //   pageSize,
      //   sortBy,
      //   sortOrder,
      // });
      // setOrders(response.data);

      // Mock data for now
      const mockOrders: Order[] = [
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          status: 'delivered',
          total: 156.99,
          itemCount: 3,
          createdAt: '2024-01-15T10:30:00Z',
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-002',
          status: 'shipped',
          total: 89.5,
          itemCount: 2,
          createdAt: '2024-01-10T14:20:00Z',
        },
        {
          id: '3',
          orderNumber: 'ORD-2024-003',
          status: 'processing',
          total: 234.75,
          itemCount: 5,
          createdAt: '2024-01-08T09:15:00Z',
        },
        {
          id: '4',
          orderNumber: 'ORD-2023-156',
          status: 'cancelled',
          total: 67.25,
          itemCount: 1,
          createdAt: '2023-12-28T16:45:00Z',
        },
      ];

      setOrders(mockOrders);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch orders';
      setError(errorMessage);
      message.error('Failed to load order history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'orange',
      processing: 'blue',
      shipped: 'cyan',
      delivered: 'green',
      cancelled: 'red',
      refunded: 'volcano',
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status: Order['status']) => {
    return (
      resourceHelpers.getUserManagementText(`ORDER_HISTORY.STATUS.${status.toUpperCase()}`) ||
      status
    );
  };

  const handleSortChange = (value: string) => {
    const [field, order] = value.split('-');
    setSortBy(field as 'date' | 'amount');
    setSortOrder(order as 'asc' | 'desc');
  };

  return (
    <Card
      title={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <ShoppingOutlined />
            {resourceHelpers.getUserManagementText('ORDER_HISTORY.TITLE')}
          </Space>
          <Select
            defaultValue="date-desc"
            style={{ width: 150 }}
            onChange={handleSortChange}
            suffixIcon={<SortAscendingOutlined />}
          >
            <Option value="date-desc">Newest First</Option>
            <Option value="date-asc">Oldest First</Option>
            <Option value="amount-desc">Highest Amount</Option>
            <Option value="amount-asc">Lowest Amount</Option>
          </Select>
        </Space>
      }
      style={{ height: '100%' }}
      bodyStyle={{ padding: '16px' }}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Text type="danger">{error}</Text>
          <br />
          <Button type="link" onClick={fetchOrders}>
            Retry
          </Button>
        </div>
      ) : orders.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={resourceHelpers.getUserManagementText('ORDER_HISTORY.NO_ORDERS')}
        />
      ) : (
        <List
          dataSource={orders}
          size="small"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: page => setCurrentPage(page),
            showSizeChanger: true,
            onShowSizeChange: (_, size) => setPageSize(size),
            showTotal: total => `Total ${total} orders`,
          }}
          renderItem={order => (
            <List.Item
              style={{
                padding: '16px',
                borderBottom: '1px solid #f0f0f0',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onClick={() => onViewOrder?.(order.id)}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafafa')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}
                >
                  <div>
                    <Space>
                      <Text strong style={{ fontSize: '14px' }}>
                        {order.orderNumber}
                      </Text>
                      <Tag color={getStatusColor(order.status)}>{getStatusText(order.status)}</Tag>
                    </Space>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      <CalendarOutlined style={{ marginRight: '4px' }} />
                      {dayjs(order.createdAt).format('MMM DD, YYYY')}
                    </Text>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
                      ${order.total.toFixed(2)}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                    </Text>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={e => {
                      e.stopPropagation();
                      onViewOrder?.(order.id);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}

      {orders.length > 0 && (
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {resourceHelpers.getUserManagementText('ORDER_HISTORY.SUBTITLE')}
          </Text>
        </div>
      )}
    </Card>
  );
};

export default OrderHistoryCard;
