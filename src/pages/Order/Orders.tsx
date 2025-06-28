import React, { useState } from 'react';
import { Typography } from 'antd';
import { ShoppingCartOutlined, TruckOutlined } from '@ant-design/icons';
import OrdersTable from '@/components/Orders/OrdersTable';
import YourTruckModal from '@/components/Orders/YourTruckModal';
import { useResourceHelpers } from '@/utils/i18nBridge';
import { PageContainer, PageHeader, HeaderContent, PageTitle, TruckButton } from './Orders.styles';
import { useTheme } from 'styled-components';

const { Title } = Typography;

const Orders: React.FC = () => {
  const theme = useTheme();
  const [truckModalOpen, setTruckModalOpen] = useState(false);

  // Get reactive translation helpers that update when language changes
  const resourceHelpers = useResourceHelpers();

  const handleTruckClick = () => {
    setTruckModalOpen(true);
  };

  const handleTruckModalClose = () => {
    setTruckModalOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader>
        <HeaderContent>
          <PageTitle>
            <ShoppingCartOutlined />
            <Title
              level={2}
              style={{
                margin: 0,
                fontSize: '1.25rem',
                color: theme.isDarkMode ? '#ffffff' : 'inherit',
              }}
            >
              {resourceHelpers.getOrderText('TITLE')}
            </Title>
          </PageTitle>
        </HeaderContent>

        <TruckButton type="primary" icon={<TruckOutlined />} onClick={handleTruckClick}>
          {resourceHelpers.getOrderText('TRUCK_BUTTON')}
        </TruckButton>
      </PageHeader>

      <OrdersTable />

      <YourTruckModal open={truckModalOpen} onClose={handleTruckModalClose} />
    </PageContainer>
  );
};

export default Orders;
