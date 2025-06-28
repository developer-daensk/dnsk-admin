import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useResourceHelpers } from '@/utils/i18nBridge';
import type { EmployeeModalProps } from '@/types/user-managment.types';

const { Option } = Select;

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  visible,
  mode,
  employee,
  locations,
  onOk,
  onCancel,
}) => {
  const resourceHelpers = useResourceHelpers();
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={
        mode === 'add'
          ? resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.MODAL.TITLE.ADD')
          : resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.MODAL.TITLE.EDIT')
      }
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={
        mode === 'add'
          ? resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.ACTIONS.ADD')
          : resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.ACTIONS.UPDATE')
      }
      cancelText={resourceHelpers.getUserManagementText('COMMON.CANCEL')}
      destroyOnClose
    >
      <Form form={form} layout="vertical" initialValues={employee}>
        <Form.Item
          label={resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.MODAL.FIELDS.NAME')}
          name="name"
          rules={[
            {
              required: true,
              message: resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.MODAL.ERRORS.NAME'),
            },
          ]}
        >
          <Input
            placeholder={resourceHelpers.getUserManagementText(
              'EMPLOYEES_TABLE.MODAL.PLACEHOLDERS.NAME'
            )}
          />
        </Form.Item>

        <Form.Item
          label={resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.MODAL.FIELDS.POSITION')}
          name="position"
          rules={[
            {
              required: true,
              message: resourceHelpers.getUserManagementText(
                'EMPLOYEES_TABLE.MODAL.ERRORS.POSITION'
              ),
            },
          ]}
        >
          <Input
            placeholder={resourceHelpers.getUserManagementText(
              'EMPLOYEES_TABLE.MODAL.PLACEHOLDERS.POSITION'
            )}
          />
        </Form.Item>

        <Form.Item
          label={resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.MODAL.FIELDS.EMAIL')}
          name="email"
          rules={[
            {
              required: true,
              message: resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.MODAL.ERRORS.EMAIL'),
            },
            {
              type: 'email',
              message: resourceHelpers.getUserManagementText(
                'EMPLOYEES_TABLE.MODAL.ERRORS.EMAIL_INVALID'
              ),
            },
          ]}
        >
          <Input
            placeholder={resourceHelpers.getUserManagementText(
              'EMPLOYEES_TABLE.MODAL.PLACEHOLDERS.EMAIL'
            )}
          />
        </Form.Item>

        <Form.Item
          label={resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.MODAL.FIELDS.PHONE')}
          name="phone"
          rules={[
            {
              required: true,
              message: resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.MODAL.ERRORS.PHONE'),
            },
          ]}
        >
          <Input
            placeholder={resourceHelpers.getUserManagementText(
              'EMPLOYEES_TABLE.MODAL.PLACEHOLDERS.PHONE'
            )}
          />
        </Form.Item>

        <Form.Item
          label={resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.MODAL.FIELDS.LOCATION')}
          name="locationId"
          rules={[
            {
              required: true,
              message: resourceHelpers.getUserManagementText(
                'EMPLOYEES_TABLE.MODAL.ERRORS.LOCATION'
              ),
            },
          ]}
        >
          <Select
            placeholder={resourceHelpers.getUserManagementText(
              'EMPLOYEES_TABLE.MODAL.PLACEHOLDERS.LOCATION'
            )}
          >
            {locations.map(location => (
              <Option key={location.locationId} value={location.locationId}>
                {location.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.MODAL.FIELDS.STATUS')}
          name="status"
          rules={[
            {
              required: true,
              message: resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.MODAL.ERRORS.STATUS'),
            },
          ]}
          initialValue="active"
        >
          <Select>
            <Option value="active">
              {resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.STATUS.ACTIVE')}
            </Option>
            <Option value="inactive">
              {resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.STATUS.INACTIVE')}
            </Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeModal;
