import React from 'react';
import { Modal, Descriptions, Tag, Avatar, Image, Space } from 'antd';
import { ProductOutlined } from '@ant-design/icons';
import type { Product } from '../../types/user-managment.types';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface ProductDetailsModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ isOpen, product, onClose }) => {
  const resourceHelpers = useResourceHelpers();
  // Get status color and label
  const getStatusDisplay = (status: string) => {
    const colors = {
      active: 'green',
      inactive: 'red',
    };
    return <Tag color={colors[status as keyof typeof colors]}>{status.toUpperCase()}</Tag>;
  };

  // Format euro amount
  const formatEuroAmount = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Get sales volume color
  const getSalesVolumeColor = (amount: number) => {
    if (amount === 0) return '#d9d9d9';
    if (amount < 20000) return '#fa8c16';
    if (amount < 50000) return '#1890ff';
    return '#52c41a';
  };

  // Get crowd color
  const getCrowdColor = (count: number) => {
    if (count === 0) return '#f5222d'; // Red for out of stock
    if (count < 50) return '#fa8c16'; // Orange for low stock
    if (count < 100) return '#1890ff'; // Blue for medium stock
    return '#52c41a'; // Green for high stock
  };

  // Get locations color
  const getLocationsColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 5) return '#fa8c16';
    if (count < 10) return '#1890ff';
    return '#52c41a';
  };

  // Get pictures color
  const getPicturesColor = (count: number) => {
    if (count === 0) return '#f5222d'; // Red for no pictures
    if (count < 3) return '#fa8c16'; // Orange for few pictures
    if (count < 5) return '#1890ff'; // Blue for good amount
    return '#52c41a'; // Green for many pictures
  };

  // Render pictures info
  const renderPicturesInfo = (pictures: string[] | number) => {
    const count = Array.isArray(pictures) ? pictures.length : pictures || 0;
    const color = getPicturesColor(count);

    if (Array.isArray(pictures) && pictures.length > 0) {
      return (
        <Space direction="vertical" size="small">
          <span style={{ fontWeight: 600, color }}>
            {count} image{count !== 1 ? 's' : ''}
          </span>
          <Space wrap>
            {pictures.slice(0, 3).map((url, index) => (
              <Image
                key={index}
                width={60}
                height={60}
                src={url}
                alt={`Product image ${index + 1}`}
                style={{ borderRadius: '4px', objectFit: 'cover' }}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+2LRiYUEn5c2Rk4UYdMBJKjO1N4xutVBdRIlJjFIg7hPl+CqJ7qo9PX0u8KOtV4dOXj4/Hx/YK9n+QhXj14j3q1at5ZVcRr169E6fh/HGx9H7xRZKbLnLMj6sWp6tz4VxI+QFm3z+Y+vXbkIXD17/vPtWD9L+YD8vtCCIIIAgCCIIAgiCAIAgCCIIAgiCAIAgCCIIAggyZhQAyYCCIIhgEYAjCCIIggCAIIgiCAIIggCAIIggCAIIggCAIIAgCCIIAggyZhQAyYCCIIhgEYAjCCIIggCAIIgiCAIIggCAIIggCAIIggCAIIAgyZZKbLjLl6RIbj64j/cRAIwBNGC4JjQhsRGgjCdqIgkJZCCAAAgwCZCGBRCMReBBYAgiCAIIggCAIIAgCCIIAggyZxQCADBgIoggGARgCMIIgiCAIIgiCAIIggCAIIggCAIIggCAIIAgCCIIAgiCAIAMGAmAggBBAEAQBBEEQEzYZKjRl6d8iOZF30vUdj9/W9B14nZE7sR3Y77rkjqj+X5oFAIYJBGACABiCAAECBBA="
              />
            ))}
            {count > 3 && <Tag color="blue">+{count - 3} more</Tag>}
          </Space>
        </Space>
      );
    }

    return (
      <span style={{ fontWeight: 600, color }}>
        {count} image{count !== 1 ? 's' : ''}
      </span>
    );
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar size="large" icon={<ProductOutlined />} style={{ backgroundColor: '#1890ff' }}>
            {product?.artNr.slice(-2)}
          </Avatar>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>{product?.title}</div>
            <div style={{ fontSize: '14px', color: '#666', fontFamily: 'monospace' }}>
              Art-Nr: {product?.artNr}
            </div>
          </div>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      destroyOnClose
    >
      {product && (
        <Descriptions bordered column={2} size="small">
          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('PRODUCT_TABLE.COLUMNS.ART_NR')}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{product.artNr}</span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('PRODUCT_TABLE.COLUMNS.STATUS')}
          >
            {getStatusDisplay(product.status)}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('PRODUCT_TABLE.COLUMNS.TITLE')}
            span={2}
          >
            <span style={{ fontWeight: 500, fontSize: '16px' }}>{product.title}</span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('PRODUCT_TABLE.COLUMNS.PICTURES')}
            span={2}
          >
            {renderPicturesInfo(product.pictures)}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('PRODUCT_TABLE.COLUMNS.LOCATION')}
          >
            <span style={{ fontWeight: 600, color: getLocationsColor(product.locations) }}>
              {product.locations} location{product.locations !== 1 ? 's' : ''}
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('PRODUCT_TABLE.COLUMNS.CROWD')}
          >
            <span style={{ fontWeight: 600, color: getCrowdColor(product.crowd) }}>
              {product.crowd.toLocaleString()} unit{product.crowd !== 1 ? 's' : ''}
            </span>
            {product.crowd === 0 && (
              <Tag color="red" style={{ marginLeft: '8px' }}>
                OUT OF STOCK
              </Tag>
            )}
            {product.crowd > 0 && product.crowd < 50 && (
              <Tag color="orange" style={{ marginLeft: '8px' }}>
                LOW STOCK
              </Tag>
            )}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('PRODUCT_TABLE.COLUMNS.SALES_VOLUME')}
            span={2}
          >
            <span
              style={{
                fontWeight: 600,
                color: getSalesVolumeColor(product.salesVolume),
                fontFamily: 'monospace',
                fontSize: '16px',
              }}
            >
              {formatEuroAmount(product.salesVolume)} €
            </span>
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText('PRODUCT_TABLE.COLUMNS.STOCK_STATUS')}
            span={2}
          >
            {product.crowd === 0 && (
              <Tag color="red" style={{ fontSize: '14px', padding: '4px 8px' }}>
                OUT OF STOCK - Product unavailable
              </Tag>
            )}
            {product.crowd > 0 && product.crowd < 50 && (
              <Tag color="orange" style={{ fontSize: '14px', padding: '4px 8px' }}>
                LOW STOCK - Only {product.crowd} units remaining
              </Tag>
            )}
            {product.crowd >= 50 && product.crowd < 100 && (
              <Tag color="blue" style={{ fontSize: '14px', padding: '4px 8px' }}>
                MEDIUM STOCK - {product.crowd} units available
              </Tag>
            )}
            {product.crowd >= 100 && (
              <Tag color="green" style={{ fontSize: '14px', padding: '4px 8px' }}>
                HIGH STOCK - {product.crowd} units available
              </Tag>
            )}
          </Descriptions.Item>

          <Descriptions.Item
            label={resourceHelpers.getUserManagementText(
              'PRODUCT_TABLE.COLUMNS.AVAILABILITY_STATUS'
            )}
            span={2}
          >
            {product.status === 'active' ? (
              <Tag color="green" style={{ fontSize: '14px', padding: '4px 8px' }}>
                ACTIVE - Available to users in {product.locations} location
                {product.locations !== 1 ? 's' : ''}
              </Tag>
            ) : (
              <Tag color="red" style={{ fontSize: '14px', padding: '4px 8px' }}>
                INACTIVE - Hidden from users
              </Tag>
            )}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default ProductDetailsModal;
