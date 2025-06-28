import { Form, Input, Row, Col } from 'antd';
import { useResourceHelpers } from '@/utils/i18nBridge';
import BaseTable from '@/components/common/BaseTable';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig } from 'antd/es/table';

interface ContactPerson {
  key: string;
  contactId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: string;
}

interface ContactModalProps {
  modalType: 'add' | 'assign';
  contactPersons: ContactPerson[];
}

const ContactModal = ({ modalType, contactPersons }: ContactModalProps) => {
  const resourceHelpers = useResourceHelpers();
  const contactColumns: ColumnsType<ContactPerson> = [
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
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    // Handle table changes if needed
    console.log('Table changed:', pagination);
  };

  if (modalType === 'add') {
    return (
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={resourceHelpers.getUserManagementText(
                'CONTACT_PERSONS_TABLE.LABELS.FIRST_NAME'
              )}
              name="contactFirstName"
              rules={[
                {
                  required: true,
                  message: resourceHelpers.getUserManagementText(
                    'CONTACT_PERSONS_TABLE.ERRORS.FIRST_NAME'
                  ),
                },
              ]}
            >
              <Input
                placeholder={resourceHelpers.getUserManagementText(
                  'CONTACT_PERSONS_TABLE.PLACEHOLDERS.FIRST_NAME'
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={resourceHelpers.getUserManagementText(
                'CONTACT_PERSONS_TABLE.LABELS.LAST_NAME'
              )}
              name="contactLastName"
              rules={[
                {
                  required: true,
                  message: resourceHelpers.getUserManagementText(
                    'CONTACT_PERSONS_TABLE.ERRORS.LAST_NAME'
                  ),
                },
              ]}
            >
              <Input
                placeholder={resourceHelpers.getUserManagementText(
                  'CONTACT_PERSONS_TABLE.PLACEHOLDERS.LAST_NAME'
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.LABELS.EMAIL')}
              name="contactEmail"
              rules={[
                {
                  required: true,
                  message: resourceHelpers.getUserManagementText(
                    'CONTACT_PERSONS_TABLE.ERRORS.EMAIL'
                  ),
                },
                {
                  type: 'email',
                  message: resourceHelpers.getUserManagementText(
                    'CONTACT_PERSONS_TABLE.ERRORS.EMAIL_INVALID'
                  ),
                },
              ]}
            >
              <Input
                placeholder={resourceHelpers.getUserManagementText(
                  'CONTACT_PERSONS_TABLE.PLACEHOLDERS.EMAIL'
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.LABELS.PHONE')}
              name="contactPhone"
              rules={[
                {
                  required: true,
                  message: resourceHelpers.getUserManagementText(
                    'CONTACT_PERSONS_TABLE.ERRORS.PHONE'
                  ),
                },
              ]}
            >
              <Input
                placeholder={resourceHelpers.getUserManagementText(
                  'CONTACT_PERSONS_TABLE.PLACEHOLDERS.PHONE'
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.LABELS.POSITION')}
              name="contactPosition"
              rules={[
                {
                  required: true,
                  message: resourceHelpers.getUserManagementText(
                    'CONTACT_PERSONS_TABLE.ERRORS.POSITION'
                  ),
                },
              ]}
            >
              <Input
                placeholder={resourceHelpers.getUserManagementText(
                  'CONTACT_PERSONS_TABLE.PLACEHOLDERS.POSITION'
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={resourceHelpers.getUserManagementText(
                'CONTACT_PERSONS_TABLE.LABELS.DEPARTMENT'
              )}
              name="contactDepartment"
              rules={[
                {
                  required: true,
                  message: resourceHelpers.getUserManagementText(
                    'CONTACT_PERSONS_TABLE.ERRORS.DEPARTMENT'
                  ),
                },
              ]}
            >
              <Input
                placeholder={resourceHelpers.getUserManagementText(
                  'CONTACT_PERSONS_TABLE.PLACEHOLDERS.DEPARTMENT'
                )}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  return (
    <div>
      <Form layout="vertical">
        <Form.Item
          label={resourceHelpers.getUserManagementText('CONTACT_PERSONS_TABLE.LABELS.SEARCH')}
          name="searchContact"
        >
          <Input.Search
            placeholder={resourceHelpers.getUserManagementText(
              'CONTACT_PERSONS_TABLE.PLACEHOLDERS.SEARCH'
            )}
            allowClear
            enterButton
          />
        </Form.Item>
        <BaseTable<ContactPerson>
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
      </Form>
    </div>
  );
};

export default ContactModal;
