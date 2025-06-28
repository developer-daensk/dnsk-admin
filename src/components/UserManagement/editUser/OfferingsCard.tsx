import React from 'react';
import { Card, List, Tag, Typography, Empty, Statistic, Row, Col } from 'antd';
import { useResourceHelpers } from '@/utils/i18nBridge';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface Offering {
  id: string;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  location: string;
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  createdAt: string;
}

// TODO: Replace with actual API call
const mockOfferings: Offering[] = [
  {
    id: '1',
    itemName: 'Organic Apples',
    category: 'Fruits',
    quantity: 50,
    price: 2.99,
    location: 'Berlin',
    status: 'ACTIVE',
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    itemName: 'Fresh Milk',
    category: 'Dairy',
    quantity: 30,
    price: 1.99,
    location: 'Munich',
    status: 'ACTIVE',
    createdAt: '2024-03-14T15:30:00Z',
  },
  {
    id: '3',
    itemName: 'Whole Grain Bread',
    category: 'Bakery',
    quantity: 0,
    price: 3.49,
    location: 'Hamburg',
    status: 'OUT_OF_STOCK',
    createdAt: '2024-03-13T09:15:00Z',
  },
];

const getStatusColor = (status: Offering['status']): string => {
  switch (status) {
    case 'ACTIVE':
      return 'success';
    case 'INACTIVE':
      return 'default';
    case 'OUT_OF_STOCK':
      return 'error';
    default:
      return 'default';
  }
};

const OfferingsCard: React.FC = () => {
  const resourceHelpers = useResourceHelpers();
  const offerings = mockOfferings; // TODO: Replace with API call

  const totalItems = offerings.length;
  const totalQuantity = offerings.reduce((sum, offering) => sum + offering.quantity, 0);

  return (
    <Card>
      <Title level={4} style={{ color: '#000' }}>
        {resourceHelpers.getUserManagementText('OFFERINGS.TITLE')}
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        {resourceHelpers.getUserManagementText('OFFERINGS.SUBTITLE')}
      </Text>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Statistic
            title={resourceHelpers.getUserManagementText('OFFERINGS.TOTAL_ITEMS')}
            value={totalItems}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={resourceHelpers.getUserManagementText('OFFERINGS.TOTAL_QUANTITY')}
            value={totalQuantity}
          />
        </Col>
      </Row>

      {offerings.length === 0 ? (
        <Empty description={resourceHelpers.getUserManagementText('OFFERINGS.NO_OFFERINGS')} />
      ) : (
        <List
          dataSource={offerings}
          renderItem={offering => (
            <List.Item>
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text strong>{offering.itemName}</Text>
                  <Tag color={getStatusColor(offering.status)}>
                    {resourceHelpers.getUserManagementText(`OFFERINGS.STATUS.${offering.status}`)}
                  </Tag>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: 'rgba(0, 0, 0, 0.45)',
                  }}
                >
                  <Text>
                    {resourceHelpers.getUserManagementText('OFFERINGS.COLUMNS.CATEGORY')}:{' '}
                    {offering.category}
                  </Text>
                  <Text>
                    {resourceHelpers.getUserManagementText('OFFERINGS.COLUMNS.QUANTITY')}:{' '}
                    {offering.quantity}
                  </Text>
                  <Text>
                    {resourceHelpers.getUserManagementText('OFFERINGS.COLUMNS.PRICE')}: €
                    {offering.price.toFixed(2)}
                  </Text>
                  <Text>
                    {resourceHelpers.getUserManagementText('OFFERINGS.COLUMNS.LOCATION')}:{' '}
                    {offering.location}
                  </Text>
                  <Text>{dayjs(offering.createdAt).format('DD.MM.YYYY')}</Text>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default OfferingsCard;
