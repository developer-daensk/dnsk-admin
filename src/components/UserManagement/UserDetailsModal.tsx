import React from 'react';
import { Modal, Descriptions, Tag, Space, Avatar } from 'antd';
import { ShoppingCartOutlined, ShopOutlined, TruckOutlined, UserOutlined } from '@ant-design/icons';
import type { User, UserType } from '../../types/user-managment.types';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface UserDetailsModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, user, onClose }) => {
  const resourceHelpers = useResourceHelpers();
  // Get icon for user type
  const getTypeIcon = (type: UserType) => {
    switch (type) {
      case 'Buyer':
        return <ShoppingCartOutlined style={{ color: '#52c41a', fontSize: '16px' }} />;
      case 'Seller':
        return <ShopOutlined style={{ color: '#1890ff', fontSize: '16px' }} />;
      case 'Logistic (carrier)':
        return <TruckOutlined style={{ color: '#fa8c16', fontSize: '16px' }} />;
      default:
        return null;
    }
  };

  // Get status color and label
  const getStatusDisplay = (status: string) => {
    const colors = {
      active: 'green',
      inactive: 'red',
      pending: 'orange',
    };
    return <Tag color={colors[status as keyof typeof colors]}>{status.toUpperCase()}</Tag>;
  };

  // Get role color
  const getRoleDisplay = (role: string) => {
    const colors = {
      Admin: 'purple',
      Manager: 'blue',
      User: 'cyan',
    };
    return <Tag color={colors[role as keyof typeof colors]}>{role}</Tag>;
  };

  // Format euro amount
  const formatEuroAmount = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Render user types for modal
  const renderUserTypesForModal = (userTypes: UserType[]) => {
    return (
      <Space wrap>
        {userTypes.map((type, index) => (
          <Tag key={index} icon={getTypeIcon(type)} color="blue">
            {type}
          </Tag>
        ))}
      </Space>
    );
  };

  // Get color based functions
  const getOrderCountColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 50) return '#fa8c16';
    if (count < 150) return '#1890ff';
    return '#52c41a';
  };

  const getPurchaseAmountColor = (amount: number) => {
    if (amount === 0) return '#d9d9d9';
    if (amount < 5000) return '#fa8c16';
    if (amount < 20000) return '#1890ff';
    return '#52c41a';
  };

  const getListedArticlesColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 25) return '#fa8c16';
    if (count < 100) return '#1890ff';
    return '#52c41a';
  };

  const getSalesCountColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 30) return '#fa8c16';
    if (count < 100) return '#1890ff';
    return '#52c41a';
  };

  const getSalesAmountColor = (amount: number) => {
    if (amount === 0) return '#d9d9d9';
    if (amount < 10000) return '#fa8c16';
    if (amount < 30000) return '#1890ff';
    return '#52c41a';
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }}>
            {user?.name
              .split(' ')
              .map(n => n[0])
              .join('')}
          </Avatar>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>{user?.name}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>@{user?.profileName}</div>
          </div>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      destroyOnClose
    >
      {user && (
        <Descriptions bordered column={2} size="small">
          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.USER_ID')}
            span={2}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>{user.userId}</span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.FULL_NAME')}
          >
            {user.name}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.PROFILE_NAME')}
          >
            <span style={{ color: '#1890ff', fontFamily: 'monospace' }}>@{user.profileName}</span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.EMAIL')}
          >
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.PHONE')}
          >
            <a href={`tel:${user.phone}`}>{user.phone}</a>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.USER_TYPES')}
            span={2}
          >
            {renderUserTypesForModal(user.userTypes)}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.ROLE')}
          >
            {getRoleDisplay(user.role)}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.STATUS')}
          >
            {getStatusDisplay(user.status)}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.DEPARTMENT')}
          >
            {user.department}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.LOCATION')}
          >
            {user.location}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.JOIN_DATE')}
          >
            {user.joinDate}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.LAST_LOGIN')}
          >
            {user.lastLogin}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'USER_DETAILS_MODAL.LABELS.ACTIVE_WAREHOUSES'
            )}
            span={2}
          >
            {user.activeWarehouses.length > 0 ? (
              <Space wrap>
                {user.activeWarehouses.map((warehouse, index) => (
                  <Tag key={index} color="blue">
                    {warehouse}
                  </Tag>
                ))}
              </Space>
            ) : (
              <Tag color="default">
                {resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.NO_ACTIVE_WAREHOUSES')}
              </Tag>
            )}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.TOTAL_ORDERS')}
          >
            <span style={{ fontWeight: 600, color: getOrderCountColor(user.orderCount) }}>
              {user.orderCount.toLocaleString()}
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'USER_DETAILS_MODAL.LABELS.TOTAL_PURCHASE_AMOUNT'
            )}
          >
            <span
              style={{
                fontWeight: 600,
                color: getPurchaseAmountColor(user.totalPurchaseAmount),
                fontFamily: 'monospace',
              }}
            >
              {formatEuroAmount(user.totalPurchaseAmount)} €
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'USER_DETAILS_MODAL.LABELS.LISTED_ARTICLES'
            )}
          >
            <span style={{ fontWeight: 600, color: getListedArticlesColor(user.listedArticles) }}>
              {user.listedArticles.toLocaleString()}
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.TOTAL_SALES')}
          >
            <span style={{ fontWeight: 600, color: getSalesCountColor(user.salesCount) }}>
              {user.salesCount.toLocaleString()}
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'USER_DETAILS_MODAL.LABELS.TOTAL_SALES_AMOUNT'
            )}
            span={2}
          >
            <span
              style={{
                fontWeight: 600,
                color: getSalesAmountColor(user.totalSalesAmount),
                fontFamily: 'monospace',
              }}
            >
              {formatEuroAmount(user.totalSalesAmount)} €
            </span>
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default UserDetailsModal;
