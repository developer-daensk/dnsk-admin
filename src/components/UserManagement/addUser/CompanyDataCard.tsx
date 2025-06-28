import { Form, Input, Row, Col, Card } from 'antd';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface CompanyDataCardProps {
  disabled?: boolean;
}

const CompanyDataCard: React.FC<CompanyDataCardProps> = ({ disabled = false }) => {
  const resourceHelpers = useResourceHelpers();

  return (
    <Card
      title={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.COMPANY_DATA')}
      style={{ marginBottom: '24px' }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.COMPANY_NAME')}
            name="companyName"
            rules={[
              {
                required: true,
                message: resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.ERRORS.COMPANY_NAME'
                ),
              },
            ]}
          >
            <Input
              placeholder={resourceHelpers.getUserManagementText(
                'USER_DETAILS_MODAL.PLACEHOLDERS.COMPANY_NAME'
              )}
              disabled={disabled}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.COMPANY_ID')}
            name="companyId"
            rules={[
              {
                required: true,
                message: resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.ERRORS.COMPANY_ID'
                ),
              },
            ]}
          >
            <Input
              placeholder={resourceHelpers.getUserManagementText(
                'USER_DETAILS_MODAL.PLACEHOLDERS.COMPANY_ID'
              )}
              disabled={disabled}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.COMPANY_PHONE')}
            name="companyPhone"
            rules={[
              {
                required: true,
                message: resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.ERRORS.COMPANY_PHONE'
                ),
              },
            ]}
          >
            <Input
              placeholder={resourceHelpers.getUserManagementText(
                'USER_DETAILS_MODAL.PLACEHOLDERS.COMPANY_PHONE'
              )}
              disabled={disabled}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.COMPANY_FAX')}
            name="companyFax"
          >
            <Input
              placeholder={resourceHelpers.getUserManagementText(
                'USER_DETAILS_MODAL.PLACEHOLDERS.COMPANY_FAX'
              )}
              disabled={disabled}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.COMPANY_EMAIL')}
            name="companyEmail"
            rules={[
              {
                required: true,
                message: resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.ERRORS.COMPANY_EMAIL'
                ),
              },
              {
                type: 'email',
                message: resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.ERRORS.COMPANY_EMAIL_INVALID'
                ),
              },
            ]}
          >
            <Input
              placeholder={resourceHelpers.getUserManagementText(
                'USER_DETAILS_MODAL.PLACEHOLDERS.COMPANY_EMAIL'
              )}
              disabled={disabled}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label={resourceHelpers.getUserManagementText('USER_DETAILS_MODAL.LABELS.ADDRESS')}
            name="companyAddress"
            rules={[
              {
                required: true,
                message: resourceHelpers.getUserManagementText(
                  'USER_DETAILS_MODAL.ERRORS.COMPANY_ADDRESS'
                ),
              },
            ]}
          >
            <Input.TextArea
              rows={2}
              placeholder={resourceHelpers.getUserManagementText(
                'USER_DETAILS_MODAL.PLACEHOLDERS.ADDRESS'
              )}
              disabled={disabled}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default CompanyDataCard;
