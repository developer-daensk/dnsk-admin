import React from 'react';
import {
  Descriptions,
  Tag,
  Typography,
  Divider,
  List,
  Space,
  Button,
  Steps,
  Card,
  Row,
  Col,
  Tooltip,
  message,
} from 'antd';
import {
  UserOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  TruckOutlined,
  CalendarOutlined,
  PrinterOutlined,
  CopyOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ShoppingOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Order } from '@/types/order.types';
import dayjs from 'dayjs';
import { useTheme } from 'styled-components';
import { useResourceHelpers } from '@/utils/i18nBridge';
import {
  StyledModal,
  SectionHeader,
  CustomerSection,
  PaymentSection,
  OrderItemCard,
  StatusTag,
  PriceText,
  SummarySection,
  HeaderSection,
  ActionButtonsSection,
  StatusTimelineSection,
  ItemsSection,
} from './OrderDetailsModal.styles';

const { Title, Text } = Typography;

interface OrderDetailsModalProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ open, order, onClose }) => {
  const theme = useTheme();

  // Get reactive translation helpers that update when language changes
  const resourceHelpers = useResourceHelpers();

  if (!order) return null;

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: theme.colors?.warning?.main || '#D97706',
      processing: theme.colors?.primary?.main || theme.colorPrimary || '#2563EB',
      shipped: theme.colors?.info?.main || '#2563EB',
      delivered: theme.colors?.success?.main || '#059669',
      cancelled: theme.colors?.error?.main || '#DC2626',
      refunded: theme.colors?.error?.main || '#DC2626',
    };
    return colors[status] || theme.colors?.neutral?.[400] || '#9CA3AF';
  };

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    const colors = {
      pending: theme.colors?.warning?.main || '#D97706',
      paid: theme.colors?.success?.main || '#059669',
      failed: theme.colors?.error?.main || '#DC2626',
      refunded: theme.colors?.error?.main || '#DC2626',
    };
    return colors[status] || theme.colors?.neutral?.[400] || '#9CA3AF';
  };

  const getStatusStep = (status: Order['status']) => {
    const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
    const rejectedStatuses = ['cancelled', 'refunded'];

    if (rejectedStatuses.includes(status)) {
      return -1; // Special case for rejected orders
    }

    return statusOrder.indexOf(status);
  };

  const getStatusIcon = (status: Order['status']) => {
    const icons = {
      pending: <ClockCircleOutlined />,
      processing: <ShoppingOutlined />,
      shipped: <TruckOutlined />,
      delivered: <CheckCircleOutlined />,
      cancelled: <ExclamationCircleOutlined />,
      refunded: <ExclamationCircleOutlined />,
    };
    return icons[status];
  };

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    message.success(resourceHelpers.getOrderText('DETAILS_MODAL.MESSAGES.ORDER_NUMBER_COPIED'));
  };

  const handlePrint = () => {
    window.print();
    message.info(resourceHelpers.getOrderText('DETAILS_MODAL.MESSAGES.PRINT_DIALOG_OPENED'));
  };

  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const currentStep = getStatusStep(order.status);
  const isRejected = ['cancelled', 'refunded'].includes(order.status);

  return (
    <StyledModal
      title={
        <HeaderSection>
          <div>
            <Title
              level={3}
              style={{
                margin: 0,
                color: theme.isDarkMode
                  ? '#ffffff'
                  : theme.colors?.primary?.main || theme.colorPrimary || '#2563EB',
              }}
            >
              {resourceHelpers.getOrderText('DETAILS_MODAL.TITLE')}
            </Title>
            <Text type="secondary">{resourceHelpers.getOrderText('DETAILS_MODAL.SUBTITLE')}</Text>
          </div>
          <ActionButtonsSection>
            <Tooltip
              title={resourceHelpers.getOrderText('DETAILS_MODAL.ACTIONS.COPY_ORDER_NUMBER')}
            >
              <Button type="text" icon={<CopyOutlined />} onClick={copyOrderNumber} size="small" />
            </Tooltip>
            <Tooltip title={resourceHelpers.getOrderText('DETAILS_MODAL.ACTIONS.PRINT_ORDER')}>
              <Button type="text" icon={<PrinterOutlined />} onClick={handlePrint} size="small" />
            </Tooltip>
          </ActionButtonsSection>
        </HeaderSection>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
    >
      {/* Order Header */}
      <Card style={{ marginBottom: 24 }} size="small">
        <Row gutter={24}>
          <Col span={12}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Title
                  level={2}
                  style={{
                    margin: 0,
                    color: theme.isDarkMode ? '#ffffff' : 'inherit',
                  }}
                >
                  {order.orderNumber}
                </Title>
                <StatusTag color={getStatusColor(order.status)}>
                  {getStatusIcon(order.status)} {order.status.toUpperCase()}
                </StatusTag>
              </div>
              <Text type="secondary">
                <CalendarOutlined /> {resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.CREATED')}{' '}
                {dayjs(order.createdAt).format('MMM DD, YYYY HH:mm')}
              </Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" size="small" style={{ width: '100%', textAlign: 'right' }}>
              <PriceText strong size="large">
                ${order.total.toFixed(2)}
              </PriceText>
              <Text style={{ color: theme.isDarkMode ? '#ffffff' : 'inherit' }}>
                {(() => {
                  const currentLanguage =
                    resourceHelpers.getText('common.loading') === 'Loading...' ? 'en' : 'de';
                  if (currentLanguage === 'de') {
                    return `${totalQuantity} Artikel`;
                  } else {
                    return totalQuantity === 1 ? `${totalQuantity} item` : `${totalQuantity} items`;
                  }
                })()}
              </Text>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Order Status Timeline */}
      {!isRejected && (
        <StatusTimelineSection>
          <SectionHeader>
            <TruckOutlined />
            <Title
              level={4}
              style={{
                margin: 0,
                color: theme.isDarkMode ? '#ffffff' : 'inherit',
              }}
            >
              {resourceHelpers.getOrderText('DETAILS_MODAL.SECTIONS.ORDER_PROGRESS')}
            </Title>
          </SectionHeader>
          <Steps
            current={currentStep}
            size="small"
            items={[
              {
                title: resourceHelpers.getOrderText('DETAILS_MODAL.STATUS_STEPS.PENDING.TITLE'),
                description: resourceHelpers.getOrderText(
                  'DETAILS_MODAL.STATUS_STEPS.PENDING.DESCRIPTION'
                ),
              },
              {
                title: resourceHelpers.getOrderText('DETAILS_MODAL.STATUS_STEPS.PROCESSING.TITLE'),
                description: resourceHelpers.getOrderText(
                  'DETAILS_MODAL.STATUS_STEPS.PROCESSING.DESCRIPTION'
                ),
              },
              {
                title: resourceHelpers.getOrderText('DETAILS_MODAL.STATUS_STEPS.SHIPPED.TITLE'),
                description: resourceHelpers.getOrderText(
                  'DETAILS_MODAL.STATUS_STEPS.SHIPPED.DESCRIPTION'
                ),
              },
              {
                title: resourceHelpers.getOrderText('DETAILS_MODAL.STATUS_STEPS.DELIVERED.TITLE'),
                description: resourceHelpers.getOrderText(
                  'DETAILS_MODAL.STATUS_STEPS.DELIVERED.DESCRIPTION'
                ),
              },
            ]}
          />
        </StatusTimelineSection>
      )}

      <Row gutter={24}>
        {/* Left Column */}
        <Col span={14}>
          {/* Customer Information */}
          <CustomerSection>
            <SectionHeader>
              <UserOutlined />
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: theme.isDarkMode ? '#ffffff' : 'inherit',
                }}
              >
                {resourceHelpers.getOrderText('DETAILS_MODAL.SECTIONS.CUSTOMER_INFORMATION')}
              </Title>
            </SectionHeader>

            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item
                label={resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.CUSTOMER')}
              >
                {order.customer.name}
              </Descriptions.Item>
              <Descriptions.Item label={resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.EMAIL')}>
                {order.customer.email}
              </Descriptions.Item>
              <Descriptions.Item label={resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.PHONE')}>
                {order.customer.phone}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <EnvironmentOutlined />{' '}
                    {resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.SHIPPING_ADDRESS')}
                  </>
                }
              >
                {`${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.zipCode}, ${order.customer.country}`}
              </Descriptions.Item>
            </Descriptions>
          </CustomerSection>

          {/* Order Items */}
          <ItemsSection>
            <SectionHeader>
              <ShoppingOutlined />
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: theme.isDarkMode ? '#ffffff' : 'inherit',
                }}
              >
                {(() => {
                  const currentLanguage =
                    resourceHelpers.getText('common.loading') === 'Loading...' ? 'en' : 'de';
                  const baseText = resourceHelpers.getOrderText(
                    'DETAILS_MODAL.SECTIONS.ORDER_ITEMS'
                  );
                  if (currentLanguage === 'de') {
                    return `${baseText} (${totalQuantity} Artikel)`;
                  } else {
                    return `${baseText} (${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'})`;
                  }
                })()}
              </Title>
            </SectionHeader>

            <List
              dataSource={order.items}
              renderItem={(item, index) => (
                <OrderItemCard>
                  <Row align="middle">
                    <Col flex="none">
                      <div className="item-number">{index + 1}</div>
                    </Col>
                    <Col flex="auto">
                      <div className="item-details">
                        <div className="product-name">{item.productName}</div>
                        {item.variation && (
                          <div className="product-variation">
                            {resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.VARIATION')}{' '}
                            {item.variation}
                          </div>
                        )}
                        <div className="quantity-info">
                          <span className="quantity-label">
                            {resourceHelpers.getOrderText(
                              'DETAILS_MODAL.LABELS.QUANTITY_SHORT'
                            )}{' '}
                          </span>
                          <span className="quantity-value">{item.quantity}</span>
                          <span className="unit-price"> × ${item.unitPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </Col>
                    <Col flex="none">
                      <div className="item-price">
                        <div className="total-price">${item.totalPrice.toFixed(2)}</div>
                      </div>
                    </Col>
                  </Row>
                </OrderItemCard>
              )}
            />
          </ItemsSection>
        </Col>

        {/* Right Column */}
        <Col span={10}>
          {/* Payment Information */}
          <PaymentSection>
            <SectionHeader>
              <CreditCardOutlined />
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: theme.isDarkMode ? '#ffffff' : 'inherit',
                }}
              >
                {resourceHelpers.getOrderText('DETAILS_MODAL.SECTIONS.PAYMENT_DETAILS')}
              </Title>
            </SectionHeader>

            <Descriptions column={1} size="small">
              <Descriptions.Item
                label={resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.STATUS')}
              >
                <Tag color={getPaymentStatusColor(order.paymentStatus)}>
                  {order.paymentStatus.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item
                label={resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.METHOD')}
              >
                {order.paymentMethod.replace('_', ' ').toUpperCase()}
              </Descriptions.Item>
              {order.trackingNumber && (
                <Descriptions.Item
                  label={resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.TRACKING')}
                >
                  <Text code>{order.trackingNumber}</Text>
                </Descriptions.Item>
              )}
            </Descriptions>
          </PaymentSection>

          {/* Order Summary */}
          <SummarySection>
            <Title
              level={4}
              style={{
                marginBottom: 16,
                color: theme.isDarkMode ? '#ffffff' : 'inherit',
              }}
            >
              {resourceHelpers.getOrderText('DETAILS_MODAL.SECTIONS.ORDER_SUMMARY')}
            </Title>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ color: theme.isDarkMode ? '#ffffff' : 'inherit' }}>
                {resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.SUBTOTAL')}
              </Text>
              <Text style={{ color: theme.isDarkMode ? '#ffffff' : 'inherit' }}>
                ${order.subtotal.toFixed(2)}
              </Text>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ color: theme.isDarkMode ? '#ffffff' : 'inherit' }}>
                {resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.TAX')}
              </Text>
              <Text style={{ color: theme.isDarkMode ? '#ffffff' : 'inherit' }}>
                ${order.tax.toFixed(2)}
              </Text>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <Text style={{ color: theme.isDarkMode ? '#ffffff' : 'inherit' }}>
                {resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.SHIPPING')}
              </Text>
              <Text style={{ color: theme.isDarkMode ? '#ffffff' : 'inherit' }}>
                ${order.shipping.toFixed(2)}
              </Text>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title
                level={3}
                style={{
                  margin: 0,
                  color: theme.isDarkMode ? '#ffffff' : 'inherit',
                }}
              >
                {resourceHelpers.getOrderText('DETAILS_MODAL.LABELS.TOTAL')}
              </Title>
              <PriceText strong size="large">
                ${order.total.toFixed(2)}
              </PriceText>
            </div>
          </SummarySection>

          {order.notes && (
            <Card size="small" style={{ marginTop: 16 }}>
              <Title
                level={4}
                style={{
                  color: theme.isDarkMode ? '#ffffff' : 'inherit',
                }}
              >
                {resourceHelpers.getOrderText('DETAILS_MODAL.SECTIONS.ORDER_NOTES')}
              </Title>
              <Text style={{ color: theme.isDarkMode ? '#ffffff' : 'inherit' }}>{order.notes}</Text>
            </Card>
          )}
        </Col>
      </Row>
    </StyledModal>
  );
};

export default OrderDetailsModal;
