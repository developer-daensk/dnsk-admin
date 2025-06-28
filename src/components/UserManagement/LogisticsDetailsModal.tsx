import React from 'react';
import { Modal, Descriptions, Tag, Avatar } from 'antd';
import {
  TruckOutlined,
  AlertOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import type { LogisticsData, LogisticsType } from '../../types/user-managment.types';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface LogisticsDetailsModalProps {
  isOpen: boolean;
  logistics: LogisticsData | null;
  onClose: () => void;
}

const LogisticsDetailsModal: React.FC<LogisticsDetailsModalProps> = ({
  isOpen,
  logistics,
  onClose,
}) => {
  const resourceHelpers = useResourceHelpers();
  // Get status color and label
  const getStatusDisplay = (status: string) => {
    const colors = {
      active: 'green',
      inactive: 'red',
      maintenance: 'orange',
    };
    return <Tag color={colors[status as keyof typeof colors]}>{status.toUpperCase()}</Tag>;
  };

  // Get icon and color for logistics type
  const getTypeIcon = (type: LogisticsType) => {
    switch (type) {
      case 'General Cargo':
        return <TruckOutlined style={{ color: '#1890ff', fontSize: '16px' }} />;
      case 'Special Cargo':
        return <AlertOutlined style={{ color: '#fa8c16', fontSize: '16px' }} />;
      case 'Regional Delivery':
        return <EnvironmentOutlined style={{ color: '#52c41a', fontSize: '16px' }} />;
      default:
        return null;
    }
  };

  // Get logistics type display with icon
  const getLogisticsTypeDisplay = (type: LogisticsType) => {
    const colors = {
      'General Cargo': 'blue',
      'Special Cargo': 'orange',
      'Regional Delivery': 'green',
    };
    return (
      <Tag color={colors[type]} icon={getTypeIcon(type)} style={{ fontWeight: 500 }}>
        {type}
      </Tag>
    );
  };

  // Format euro amount
  const formatEuroAmount = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Format date and time
  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get sales volume color based on amount
  const getSalesVolumeColor = (amount: number) => {
    if (amount === 0) return '#d9d9d9';
    if (amount < 1000000) return '#fa8c16';
    if (amount < 3000000) return '#1890ff';
    return '#52c41a';
  };

  // Get tours color based on count
  const getToursColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 1000) return '#fa8c16';
    if (count < 2000) return '#1890ff';
    return '#52c41a';
  };

  // Get regions color based on count
  const getRegionsColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 10) return '#fa8c16';
    if (count < 20) return '#1890ff';
    return '#52c41a';
  };

  // Get locations color based on count
  const getLocationsColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 50) return '#fa8c16';
    if (count < 150) return '#1890ff';
    return '#52c41a';
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar size="large" icon={<TruckOutlined />} style={{ backgroundColor: '#1890ff' }}>
            {logistics?.logisticNr.slice(-3) || 'LOG'}
          </Avatar>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>
              {resourceHelpers.getUserManagementText('LOGISTICS_TABLE.MODAL.TITLE')} -{' '}
              {logistics?.name}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              {logistics?.logisticNr} • {logistics?.type}
            </div>
          </div>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={900}
      destroyOnClose
    >
      {logistics && (
        <Descriptions bordered column={2} size="small">
          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'LOGISTICS_TABLE.MODAL.FIELDS.LOGISTIC_NR'
            )}
            span={2}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#1890ff' }}>
              {logistics.logisticNr}
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOGISTICS_TABLE.MODAL.FIELDS.NAME')}
          >
            <span style={{ fontWeight: 600, fontSize: '16px' }}>{logistics.name}</span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOGISTICS_TABLE.MODAL.FIELDS.TYPE')}
          >
            {getLogisticsTypeDisplay(logistics.type)}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOGISTICS_TABLE.MODAL.FIELDS.STATUS')}
          >
            {getStatusDisplay(logistics.status)}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOGISTICS_TABLE.MODAL.FIELDS.REGIONS')}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: getRegionsColor(logistics.regions),
              }}
            >
              {logistics.regions} regions
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOGISTICS_TABLE.MODAL.FIELDS.LOCATIONS')}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: getLocationsColor(logistics.locations),
              }}
            >
              {logistics.locations} locations
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOGISTICS_TABLE.MODAL.FIELDS.TOURS')}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: getToursColor(logistics.tours),
              }}
            >
              {logistics.tours.toLocaleString()} tours
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOGISTICS_TABLE.MODAL.FIELDS.ADDRESS')}
            span={2}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <EnvironmentOutlined style={{ color: '#fa8c16' }} />
              {logistics.address}
            </div>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOGISTICS_TABLE.MODAL.FIELDS.PHONE')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PhoneOutlined style={{ color: '#52c41a' }} />
              <a href={`tel:${logistics.phone}`}>{logistics.phone}</a>
            </div>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOGISTICS_TABLE.MODAL.FIELDS.EMAIL')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MailOutlined style={{ color: '#1890ff' }} />
              <a href={`mailto:${logistics.email}`}>{logistics.email}</a>
            </div>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'LOGISTICS_TABLE.MODAL.FIELDS.SALES_VOLUME'
            )}
            span={2}
          >
            <span
              style={{
                fontWeight: 600,
                color: getSalesVolumeColor(logistics.salesVolume),
                fontSize: '16px',
                fontFamily: 'monospace',
              }}
            >
              {formatEuroAmount(logistics.salesVolume)} €
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'LOGISTICS_TABLE.MODAL.FIELDS.ESTABLISHED_DATE'
            )}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>
              {formatDate(logistics.establishedDate)}
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'LOGISTICS_TABLE.MODAL.FIELDS.LAST_ACTIVITY'
            )}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>
              {formatDateTime(logistics.lastActivity)}
            </span>
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default LogisticsDetailsModal;
