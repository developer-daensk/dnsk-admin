import { Card, Button, Space } from 'antd';
import { PlusOutlined, LinkOutlined, EditOutlined } from '@ant-design/icons';
import { useResourceHelpers } from '@/utils/i18nBridge';
import BaseTable from '@/components/common/BaseTable';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig } from 'antd/es/table';
import { CreateUserLocation } from '@/types/user-managment.types';

interface LocationsCardProps {
  locations: CreateUserLocation[];
  onAddLocation: () => void;
  onAssignLocation: () => void;
  onEditLocation: (record: CreateUserLocation) => void;
}

const LocationsCard = ({
  locations,
  onAddLocation,
  onAssignLocation,
  onEditLocation,
}: LocationsCardProps) => {
  const resourceHelpers = useResourceHelpers();

  const locationColumns: ColumnsType<CreateUserLocation> = [
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.LOCATION_ID'),
      dataIndex: 'locationId',
      key: 'locationId',
    },
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.NAME'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.ADDRESS'),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.TYPE'),
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.STATUS'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.ACTIONS'),
      key: 'actions',
      render: (_: unknown, record: CreateUserLocation) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => onEditLocation(record)}>
            {resourceHelpers.getUserManagementText('LOCATIONS_TABLE.ACTIONS.EDIT')}
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    // Handle table changes if needed
    console.log('Table changed:', pagination);
  };

  return (
    <Card
      title={resourceHelpers.getUserManagementText('LOCATIONS_TABLE.TITLE')}
      style={{ marginBottom: '24px' }}
      extra={
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAddLocation}>
            {resourceHelpers.getUserManagementText('LOCATIONS_TABLE.ACTIONS.ADD')}
          </Button>
          <Button icon={<LinkOutlined />} onClick={onAssignLocation}>
            {resourceHelpers.getUserManagementText('LOCATIONS_TABLE.ACTIONS.ASSIGN')}
          </Button>
        </Space>
      }
    >
      <BaseTable<CreateUserLocation>
        columns={locationColumns}
        data={locations}
        rowKey="locationId"
        loading={false}
        pagination={{
          current: 1,
          pageSize: 10,
          total: locations.length,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        onTableChange={handleTableChange}
        emptyText={resourceHelpers.getUserManagementText(
          'LOCATIONS_TABLE.EMPTY_STATE.NO_LOCATIONS_FOUND'
        )}
      />
    </Card>
  );
};

export default LocationsCard;
