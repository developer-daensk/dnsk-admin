import React from 'react';
import { Modal, Descriptions, Tag, Space, Avatar } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, TagsOutlined } from '@ant-design/icons';
import type { Location } from '../../types/user-managment.types';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface LocationDetailsModalProps {
  isOpen: boolean;
  location: Location | null;
  onClose: () => void;
}

const LocationDetailsModal: React.FC<LocationDetailsModalProps> = ({
  isOpen,
  location,
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

  // Get cover display
  const getCoverDisplay = (cover: 'ja' | 'ne') => {
    return (
      <Tag color={cover === 'ja' ? 'success' : 'error'} style={{ textTransform: 'uppercase' }}>
        {cover}
      </Tag>
    );
  };

  // Get logistic type color
  const getLogisticDisplay = (logistic: string) => {
    const colorMap: { [key: string]: string } = {
      Express: 'red',
      Premium: 'purple',
      Standard: 'blue',
      Economy: 'green',
    };
    return <Tag color={colorMap[logistic] || 'default'}>{logistic}</Tag>;
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
    if (amount < 50000) return '#fa8c16';
    if (amount < 150000) return '#1890ff';
    return '#52c41a';
  };

  // Get articles count color
  const getArticlesColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 25) return '#fa8c16';
    if (count < 100) return '#1890ff';
    return '#52c41a';
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar
            size="large"
            icon={<EnvironmentOutlined />}
            style={{ backgroundColor: '#1890ff' }}
          >
            {location?.locationId.split('-')[1] || 'LOC'}
          </Avatar>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>
              {resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.TITLE')}{' '}
              {location?.locationId}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              @{location?.userProfileName} • {location?.area}
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
      {location && (
        <Descriptions bordered column={2} size="small">
          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'LOCATIONS_TABLE.MODAL.FIELDS.LOCATION_ID'
            )}
            span={2}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#1890ff' }}>
              {location.locationId}
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'LOCATIONS_TABLE.MODAL.FIELDS.USER_PROFILE'
            )}
          >
            <span style={{ color: '#1890ff', fontFamily: 'monospace', fontWeight: 600 }}>
              @{location.userProfileName}
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.FIELDS.AREA')}
          >
            <Tag color="blue" style={{ fontFamily: 'monospace', fontWeight: 500 }}>
              {location.area}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.FIELDS.COVER')}
          >
            {getCoverDisplay(location.cover)}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.FIELDS.STATUS')}
          >
            {getStatusDisplay(location.status)}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'LOCATIONS_TABLE.MODAL.FIELDS.LOGISTIC_TYPE'
            )}
          >
            {getLogisticDisplay(location.logistic)}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.FIELDS.MANAGER_ID')}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>{location.managerId}</span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.FIELDS.ADDRESS')}
            span={2}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <EnvironmentOutlined style={{ color: '#fa8c16' }} />
              {location.address}
            </div>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.FIELDS.PHONE')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PhoneOutlined style={{ color: '#52c41a' }} />
              <a href={`tel:${location.phone}`}>{location.phone}</a>
            </div>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.FIELDS.EMAIL')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MailOutlined style={{ color: '#1890ff' }} />
              <a href={`mailto:${location.email}`}>{location.email}</a>
            </div>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('LOCATIONS_TABLE.MODAL.FIELDS.ARTICLES')}
          >
            <span style={{ fontWeight: 600, color: getArticlesColor(location.articles) }}>
              {location.articles.toLocaleString()}
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'LOCATIONS_TABLE.MODAL.FIELDS.SALES_VOLUME'
            )}
          >
            <span
              style={{
                fontWeight: 600,
                color: getSalesVolumeColor(location.salesVolume),
                fontFamily: 'monospace',
              }}
            >
              {formatEuroAmount(location.salesVolume)} €
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'LOCATIONS_TABLE.MODAL.FIELDS.ACTIVE_TYPES'
            )}
            span={2}
          >
            {location.activeTypes.length > 0 ? (
              <Space wrap>
                {location.activeTypes.map((type, index) => (
                  <Tag key={index} icon={<TagsOutlined />} color="cyan">
                    {type}
                  </Tag>
                ))}
              </Space>
            ) : (
              <Tag color="default">
                {resourceHelpers.getUserManagementText(
                  'LOCATIONS_TABLE.MODAL.FIELDS.NO_ACTIVE_TYPES'
                )}
              </Tag>
            )}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'LOCATIONS_TABLE.MODAL.FIELDS.ESTABLISHED_DATE'
            )}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>
              {formatDate(location.establishedDate)}
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'LOCATIONS_TABLE.MODAL.FIELDS.LAST_ACTIVITY'
            )}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>
              {formatDateTime(location.lastActivity)}
            </span>
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default LocationDetailsModal;
