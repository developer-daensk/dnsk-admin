import { Form, Input, Select, Row, Col, Card } from 'antd';
import { useResourceHelpers } from '@/utils/i18nBridge';

const { Option } = Select;

interface UserDetailsCardProps {
  disabled?: boolean;
}

const UserDetailsCard: React.FC<UserDetailsCardProps> = ({ disabled = false }) => {
  const resourceHelpers = useResourceHelpers();

  return (
    <Card
      title={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.TITLE')}
      style={{ marginBottom: '24px' }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.FIRST_NAME')}
            name="firstName"
            rules={[{ required: true, message: 'Please input first name!' }]}
          >
            <Input placeholder="Enter first name" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.LAST_NAME')}
            name="lastName"
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
            <Input placeholder="Enter last name" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.ROLE')}
            name="role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select placeholder="Select role" disabled={disabled}>
              <Option value="administrator">
                {resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.LABELS.ROLE_ADMINISTRATION_IT'
                )}
              </Option>
              <Option value="areamanagement">
                {resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.LABELS.ROLE_AREA_MANAGEMENT'
                )}
              </Option>
              <Option value="operationsmanagement">
                {resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.LABELS.ROLE_OPERATIONS_MANAGEMENT'
                )}
              </Option>
              <Option value="accounting">
                {resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.ROLE_ACCOUNTING')}
              </Option>
              <Option value="controlling">
                {resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.LABELS.ROLE_CONTROLLING'
                )}
              </Option>
              <Option value="logisticscoordinator">
                {resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.LABELS.ROLE_LOGISTICS_COORDINATOR'
                )}
              </Option>
              <Option value="purchasing">
                {resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.ROLE_PURCHASING')}
              </Option>
              <Option value="management">
                {resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.ROLE_MANAGEMENT')}
              </Option>
              <Option value="customersupport">
                {resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.LABELS.ROLE_CUSTOMER_SUPPORT'
                )}
              </Option>
              <Option value="warehousing">
                {resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.LABELS.ROLE_WAREHOUSING'
                )}
              </Option>
              <Option value="warehousemanagement">
                {resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.LABELS.ROLE_WAREHOUSE_MANAGEMENT'
                )}
              </Option>
              <Option value="logistics">
                {resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.ROLE_LOGISTICS')}
              </Option>
              <Option value="projectmanagement">
                {resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.LABELS.ROLE_PROJECT_MANAGEMENT'
                )}
              </Option>
              <Option value="administrative">
                {resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.LABELS.ROLE_ADMINISTRATIVE'
                )}
              </Option>
              <Option value="secretary">
                {resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.ROLE_SECRETARY')}
              </Option>
              <Option value="sales">
                {resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.ROLE_SALES')}
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.EMAIL')}
            name="email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Enter email address" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.PHONE')}
            name="phone"
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input placeholder="Enter phone number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.MOBILE')}
            name="mobile"
            rules={[{ required: true, message: 'Please input mobile number!' }]}
          >
            <Input placeholder="Enter mobile number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.FAX')}
            name="fax"
          >
            <Input placeholder="Enter fax number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.ADDRESS')}
            name="address"
            rules={[{ required: true, message: 'Please input address!' }]}
          >
            <Input.TextArea rows={2} placeholder="Enter full address" disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default UserDetailsCard;
