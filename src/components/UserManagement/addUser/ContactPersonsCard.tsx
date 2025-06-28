import { Card, Button, Space } from 'antd';
import { PlusOutlined, LinkOutlined, EditOutlined } from '@ant-design/icons';
import { useResourceHelpers } from '@/utils/i18nBridge';
import BaseTable from '@/components/common/BaseTable';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig } from 'antd/es/table';
import { CreateUserContactPerson } from '@/types/user-managment.types';

interface ContactPersonsCardProps {
  contactPersons: CreateUserContactPerson[];
  onAddContact: () => void;
  onAssignContact: () => void;
  onEditContact: (record: CreateUserContactPerson) => void;
}

const ContactPersonsCard = ({
  contactPersons,
  onAddContact,
  onAssignContact,
  onEditContact,
}: ContactPersonsCardProps) => {
  const resourceHelpers = useResourceHelpers();
  const contactColumns: ColumnsType<CreateUserContactPerson> = [
    {
      title: resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.COLUMNS.CONTACT_ID'),
      dataIndex: 'contactId',
      key: 'contactId',
    },
    {
      title: resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.COLUMNS.FIRST_NAME'),
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.COLUMNS.LAST_NAME'),
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.COLUMNS.EMAIL'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.COLUMNS.PHONE'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.COLUMNS.POSITION'),
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.COLUMNS.DEPARTMENT'),
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.COLUMNS.STATUS'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.COLUMNS.ACTIONS'),
      key: 'actions',
      render: (_: unknown, record: CreateUserContactPerson) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => onEditContact(record)}>
            {resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.ACTIONS.EDIT')}
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
      title={resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.TITLE')}
      style={{ marginBottom: '24px' }}
      extra={
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAddContact}>
            {resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.ACTIONS.ADD')}
          </Button>
          <Button icon={<LinkOutlined />} onClick={onAssignContact}>
            {resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.ACTIONS.ASSIGN')}
          </Button>
        </Space>
      }
    >
      <BaseTable<CreateUserContactPerson>
        columns={contactColumns}
        data={contactPersons}
        rowKey="contactId"
        loading={false}
        pagination={{
          current: 1,
          pageSize: 10,
          total: contactPersons.length,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        onTableChange={handleTableChange}
        emptyText={resourceHelpers.getUserManagementText(
          'CONTACT_PERSONS_TABLE.EMPTY_STATE.NO_CONTACTS_FOUND'
        )}
      />
    </Card>
  );
};

export default ContactPersonsCard;
