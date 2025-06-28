import React, { useState } from 'react';
import { Card, List, Tag, Typography, Space, Empty, Spin, Alert, Select, theme } from 'antd';
import { DollarOutlined, CalendarOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { useResourceHelpers } from '@/utils/i18nBridge';
import dayjs from 'dayjs';

const { Text } = Typography;
const { Option } = Select;

interface Sale {
  id: string;
  saleNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  total: number;
  itemCount: number;
  buyerName: string;
  createdAt: string;
}

interface SalesHistoryCardProps {
  /** User ID to fetch sales history for. Will be used in the actual API implementation */
  userId?: string;
  loading?: boolean;
  error?: string;
}

const ITEMS_PER_PAGE = 5;

const SalesHistoryCard: React.FC<SalesHistoryCardProps> = ({ loading = false, error }) => {
  const resourceHelpers = useResourceHelpers();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { token } = theme.useToken();

  // Mock sales data - in a real implementation, this would fetch sales for the specific user as a seller
  // TODO: Replace with actual API call: fetchSalesByUserId(userId || '')
  const sales: Sale[] = [
    {
      id: '1',
      saleNumber: 'SALE-2024-001',
      status: 'delivered',
      total: 89.99,
      itemCount: 2,
      buyerName: 'Alice Johnson',
      createdAt: '2024-01-16T09:30:00Z',
    },
    {
      id: '2',
      saleNumber: 'SALE-2024-002',
      status: 'shipped',
      total: 156.5,
      itemCount: 1,
      buyerName: 'Bob Smith',
      createdAt: '2024-01-12T11:20:00Z',
    },
    {
      id: '3',
      saleNumber: 'SALE-2024-003',
      status: 'processing',
      total: 45.75,
      itemCount: 3,
      buyerName: 'Carol Davis',
      createdAt: '2024-01-09T14:15:00Z',
    },
    {
      id: '4',
      saleNumber: 'SALE-2023-198',
      status: 'delivered',
      total: 234.25,
      itemCount: 4,
      buyerName: 'David Wilson',
      createdAt: '2023-12-29T10:45:00Z',
    },
    {
      id: '5',
      saleNumber: 'SALE-2023-189',
      status: 'cancelled',
      total: 67.5,
      itemCount: 1,
      buyerName: 'Emma Brown',
      createdAt: '2023-12-25T16:30:00Z',
    },
  ];

  const getStatusColor = (status: Sale['status']) => {
    const colors = {
      pending: token.colorWarning,
      processing: token.colorInfo,
      shipped: token.colorPrimary,
      delivered: token.colorSuccess,
      cancelled: token.colorError,
      refunded: token.colorErrorActive,
    };
    return colors[status] || token.colorText;
  };

  const getStatusText = (status: Sale['status']) => {
    return (
      resourceHelpers.getUserManagementText(`SALES_HISTORY.STATUS.${status.toUpperCase()}`) ||
      status
    );
  };

  const sortedSales = [...sales].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const paginatedSales = sortedSales.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalSales = sales.filter(sale => sale.status === 'delivered').length;
  const totalRevenue = sales
    .filter(sale => sale.status === 'delivered')
    .reduce((sum, sale) => sum + sale.total, 0);

  if (error) {
    return (
      <Card>
        <Alert
          message={resourceHelpers.getUserManagementText('SALES_HISTORY.ERROR')}
          description={error}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  return (
    <Card
      title={
        <Space>
          <DollarOutlined style={{ color: token.colorPrimary }} />
          <Text strong style={{ color: token.colorTextHeading }}>
            {resourceHelpers.getUserManagementText('SALES_HISTORY.TITLE')}
          </Text>
        </Space>
      }
      style={{
        height: '100%',
        backgroundColor: token.colorBgContainer,
        borderRadius: token.borderRadiusLG,
      }}
      bodyStyle={{
        padding: token.paddingLG,
      }}
      extra={
        <Select
          defaultValue="desc"
          style={{ width: 120 }}
          onChange={(value: 'asc' | 'desc') => setSortOrder(value)}
          suffixIcon={<SortAscendingOutlined style={{ color: token.colorTextSecondary }} />}
        >
          <Option value="desc">
            {resourceHelpers.getUserManagementText('SALES_HISTORY.SORT.NEWEST')}
          </Option>
          <Option value="asc">
            {resourceHelpers.getUserManagementText('SALES_HISTORY.SORT.OLDEST')}
          </Option>
        </Select>
      }
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: token.paddingXL }}>
          <Spin size="large" />
        </div>
      ) : sales.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={resourceHelpers.getUserManagementText('SALES_HISTORY.NO_SALES')}
        />
      ) : (
        <>
          {/* Sales Summary */}
          <div
            style={{
              background: token.colorBgLayout,
              padding: token.paddingLG,
              borderRadius: token.borderRadiusLG,
              marginBottom: token.marginLG,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: token.boxShadowTertiary,
            }}
          >
            <div>
              <Text strong style={{ fontSize: token.fontSizeLG, color: token.colorTextHeading }}>
                {resourceHelpers.getUserManagementText('SALES_HISTORY.COMPLETED_SALES')}:{' '}
                {totalSales}
              </Text>
            </div>
            <div>
              <Text strong style={{ fontSize: token.fontSizeLG, color: token.colorSuccess }}>
                {resourceHelpers.getUserManagementText('SALES_HISTORY.TOTAL_REVENUE')}: $
                {totalRevenue.toFixed(2)}
              </Text>
            </div>
          </div>

          <List
            dataSource={paginatedSales}
            size="small"
            pagination={{
              current: currentPage,
              pageSize: ITEMS_PER_PAGE,
              total: sales.length,
              onChange: page => setCurrentPage(page),
              showSizeChanger: false,
              style: { marginTop: token.marginLG },
            }}
            renderItem={sale => (
              <List.Item
                style={{
                  padding: token.paddingLG,
                  borderBottom: `1px solid ${token.colorBorderSecondary}`,
                  transition: `background-color ${token.motionDurationMid}`,
                }}
              >
                <div style={{ width: '100%' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: token.marginSM,
                    }}
                  >
                    <div>
                      <Text
                        strong
                        style={{ fontSize: token.fontSizeLG, color: token.colorTextHeading }}
                      >
                        {sale.saleNumber}
                      </Text>
                      <br />
                      <Text
                        type="secondary"
                        style={{ fontSize: token.fontSize, color: token.colorTextSecondary }}
                      >
                        <CalendarOutlined
                          style={{ marginRight: token.marginXS, color: token.colorTextSecondary }}
                        />
                        {dayjs(sale.createdAt).format('MMM DD, YYYY')}
                      </Text>
                      <br />
                      <Text
                        type="secondary"
                        style={{ fontSize: token.fontSize, color: token.colorTextSecondary }}
                      >
                        Buyer: {sale.buyerName}
                      </Text>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Text
                        strong
                        style={{ fontSize: token.fontSizeLG, color: token.colorTextHeading }}
                      >
                        ${sale.total.toFixed(2)}
                      </Text>
                      <br />
                      <Text
                        type="secondary"
                        style={{ fontSize: token.fontSize, color: token.colorTextSecondary }}
                      >
                        {sale.itemCount} {sale.itemCount === 1 ? 'item' : 'items'}
                      </Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Tag color={getStatusColor(sale.status)}>{getStatusText(sale.status)}</Tag>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </>
      )}

      {sales.length > 0 && (
        <div style={{ marginTop: token.marginLG, textAlign: 'center' }}>
          <Text
            type="secondary"
            style={{ fontSize: token.fontSize, color: token.colorTextSecondary }}
          >
            {resourceHelpers.getUserManagementText('SALES_HISTORY.SUBTITLE')}
          </Text>
        </div>
      )}
    </Card>
  );
};

export default SalesHistoryCard;
