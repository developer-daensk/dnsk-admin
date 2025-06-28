import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message, Divider, Typography } from 'antd';
import { useResourceHelpers } from '@/utils/i18nBridge';

const { Option } = Select;
const { Title } = Typography;

interface CreateContactPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface CreateContactPersonFormData {
  companyId: string;
  locationId: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  mobile: string;
}

interface Company {
  id: string;
  name: string;
  locations: Location[];
}

interface Location {
  id: string;
  name: string;
  address: string;
}

const CreateContactPersonModal: React.FC<CreateContactPersonModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const resourceHelpers = useResourceHelpers();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [availableLocations, setAvailableLocations] = useState<Location[]>([]);

  // Mock data for companies and their locations
  const mockCompanies: Company[] = [
    {
      id: 'TC001',
      name: 'TechCorp GmbH',
      locations: [
        { id: 'LOC001', name: 'Berlin HQ', address: 'Alexanderplatz 1, 10178 Berlin' },
        { id: 'LOC002', name: 'Berlin Warehouse', address: 'Potsdamer Platz 1, 10785 Berlin' },
      ],
    },
    {
      id: 'GE001',
      name: 'GreenEnergy Solutions',
      locations: [
        { id: 'LOC003', name: 'Hamburg Office', address: 'Hafenstraße 45, 20457 Hamburg' },
        { id: 'LOC004', name: 'Hamburg Factory', address: 'Industriestraße 12, 20457 Hamburg' },
      ],
    },
    {
      id: 'LP001',
      name: 'LogisticsPro GmbH',
      locations: [
        { id: 'LOC005', name: 'Munich HQ', address: 'Marienplatz 8, 80331 München' },
        {
          id: 'LOC006',
          name: 'Munich Distribution',
          address: 'Sendlinger Straße 1, 80331 München',
        },
      ],
    },
    {
      id: 'HP001',
      name: 'HealthPlus Medical',
      locations: [
        { id: 'LOC007', name: 'Frankfurt Office', address: 'Zeil 123, 60313 Frankfurt' },
        { id: 'LOC008', name: 'Frankfurt Clinic', address: 'Hauptstraße 45, 60313 Frankfurt' },
      ],
    },
    {
      id: 'FT001',
      name: 'FoodTech Innovations',
      locations: [
        { id: 'LOC009', name: 'Düsseldorf HQ', address: 'Königsallee 92, 40212 Düsseldorf' },
        { id: 'LOC010', name: 'Düsseldorf Factory', address: 'Industriepark 5, 40212 Düsseldorf' },
      ],
    },
  ];

  useEffect(() => {
    // Load companies data (in real app, this would be an API call)
    setCompanies(mockCompanies);
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      const company = companies.find(c => c.id === selectedCompany);
      if (company) {
        setAvailableLocations(company.locations);
        // Pre-fill the first location
        form.setFieldsValue({ locationId: company.locations[0]?.id });
      }
    } else {
      setAvailableLocations([]);
      form.setFieldsValue({ locationId: undefined });
    }
  }, [selectedCompany, companies, form]);

  const handleCompanyChange = (companyId: string) => {
    setSelectedCompany(companyId);
  };

  const handleSubmit = async (values: CreateContactPersonFormData) => {
    setLoading(true);
    try {
      // Here you would typically make an API call to create the contact person
      console.log('Creating contact person:', values);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      message.success(resourceHelpers.getCompanyContactsText('MODAL.MESSAGES.SUCCESS'));
      form.resetFields();
      setSelectedCompany(null);
      setAvailableLocations([]);
      onSuccess();
      onClose();
    } catch (error) {
      message.error(resourceHelpers.getCompanyContactsText('MODAL.MESSAGES.ERROR'));
      console.error('Error creating contact person:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedCompany(null);
    setAvailableLocations([]);
    onClose();
  };

  return (
    <Modal
      title={resourceHelpers.getCompanyContactsText('ADD_CONTACT_PERSON')}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={700}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Company Section */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={5} style={{ marginBottom: '16px', color: '#1890ff' }}>
            {resourceHelpers.getCompanyContactsText('MODAL.SECTIONS.COMPANY')}
          </Title>
          <Form.Item
            name="companyId"
            rules={[
              {
                required: true,
                message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.SELECT_COMPANY'),
              },
            ]}
          >
            <Select
              placeholder={resourceHelpers.getCompanyContactsText(
                'MODAL.PLACEHOLDERS.SELECT_COMPANY'
              )}
              onChange={handleCompanyChange}
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {companies.map(company => (
                <Option key={company.id} value={company.id}>
                  {company.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* Location Section */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={5} style={{ marginBottom: '16px', color: '#1890ff' }}>
            {resourceHelpers.getCompanyContactsText('MODAL.SECTIONS.LOCATION')}
          </Title>
          <Form.Item
            name="locationId"
            rules={[
              {
                required: true,
                message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.SELECT_LOCATION'),
              },
            ]}
          >
            <Select
              placeholder={resourceHelpers.getCompanyContactsText(
                'MODAL.PLACEHOLDERS.SELECT_LOCATION'
              )}
              disabled={!selectedCompany}
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {availableLocations.map(location => (
                <Option key={location.id} value={location.id}>
                  {location.name} - {location.address}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Divider />

        {/* Contact Person Information Section */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={5} style={{ marginBottom: '16px', color: '#1890ff' }}>
            {resourceHelpers.getCompanyContactsText('MODAL.SECTIONS.CONTACT_PERSON_INFO')}
          </Title>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              label={resourceHelpers.getCompanyContactsText('MODAL.FIELDS.FIRST_NAME')}
              name="firstName"
              rules={[
                {
                  required: true,
                  message: resourceHelpers.getCompanyContactsText(
                    'MODAL.VALIDATION.ENTER_FIRST_NAME'
                  ),
                },
                {
                  min: 2,
                  message: resourceHelpers.getCompanyContactsText(
                    'MODAL.VALIDATION.FIRST_NAME_MIN'
                  ),
                },
                {
                  max: 50,
                  message: resourceHelpers.getCompanyContactsText(
                    'MODAL.VALIDATION.FIRST_NAME_MAX'
                  ),
                },
                {
                  pattern: /^[a-zA-Z\s\-']+$/,
                  message: resourceHelpers.getCompanyContactsText(
                    'MODAL.VALIDATION.FIRST_NAME_PATTERN'
                  ),
                },
              ]}
            >
              <Input
                placeholder={resourceHelpers.getCompanyContactsText(
                  'MODAL.PLACEHOLDERS.ENTER_FIRST_NAME'
                )}
                maxLength={50}
              />
            </Form.Item>

            <Form.Item
              label={resourceHelpers.getCompanyContactsText('MODAL.FIELDS.LAST_NAME')}
              name="lastName"
              rules={[
                {
                  required: true,
                  message: resourceHelpers.getCompanyContactsText(
                    'MODAL.VALIDATION.ENTER_LAST_NAME'
                  ),
                },
                {
                  min: 2,
                  message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.LAST_NAME_MIN'),
                },
                {
                  max: 50,
                  message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.LAST_NAME_MAX'),
                },
                {
                  pattern: /^[a-zA-Z\s\-']+$/,
                  message: resourceHelpers.getCompanyContactsText(
                    'MODAL.VALIDATION.LAST_NAME_PATTERN'
                  ),
                },
              ]}
            >
              <Input
                placeholder={resourceHelpers.getCompanyContactsText(
                  'MODAL.PLACEHOLDERS.ENTER_LAST_NAME'
                )}
                maxLength={50}
              />
            </Form.Item>

            <Form.Item
              label={resourceHelpers.getCompanyContactsText('EMAIL')}
              name="email"
              rules={[
                {
                  required: true,
                  message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.ENTER_EMAIL'),
                },
                {
                  type: 'email',
                  message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.VALID_EMAIL'),
                },
                {
                  max: 100,
                  message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.EMAIL_MAX'),
                },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: resourceHelpers.getCompanyContactsText(
                    'MODAL.VALIDATION.VALID_EMAIL_FORMAT'
                  ),
                },
              ]}
            >
              <Input
                placeholder={resourceHelpers.getCompanyContactsText(
                  'MODAL.PLACEHOLDERS.ENTER_EMAIL'
                )}
                maxLength={100}
              />
            </Form.Item>

            <Form.Item
              label={resourceHelpers.getCompanyContactsText('MODAL.FIELDS.PHONE_NUMBER')}
              name="phone"
              rules={[
                {
                  required: true,
                  message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.ENTER_PHONE'),
                },
                {
                  max: 20,
                  message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.PHONE_MAX'),
                },
                {
                  pattern: /^[+]?[0-9\s\-()]+$/,
                  message: resourceHelpers.getCompanyContactsText(
                    'MODAL.VALIDATION.VALID_PHONE_FORMAT'
                  ),
                },
                {
                  validator: (_, value) => {
                    if (value && value.replace(/[\s\-()]/g, '').length < 7) {
                      return Promise.reject(
                        new Error(
                          resourceHelpers.getCompanyContactsText(
                            'MODAL.VALIDATION.PHONE_MIN_DIGITS'
                          )
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                placeholder={resourceHelpers.getCompanyContactsText(
                  'MODAL.PLACEHOLDERS.ENTER_PHONE'
                )}
                maxLength={20}
              />
            </Form.Item>

            <Form.Item
              label={resourceHelpers.getCompanyContactsText('MODAL.FIELDS.MOBILE_NUMBER')}
              name="mobile"
              rules={[
                {
                  required: true,
                  message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.ENTER_MOBILE'),
                },
                {
                  max: 20,
                  message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.MOBILE_MAX'),
                },
                {
                  pattern: /^[+]?[0-9\s\-()]+$/,
                  message: resourceHelpers.getCompanyContactsText(
                    'MODAL.VALIDATION.VALID_MOBILE_FORMAT'
                  ),
                },
                {
                  validator: (_, value) => {
                    if (value && value.replace(/[\s\-()]/g, '').length < 7) {
                      return Promise.reject(
                        new Error(
                          resourceHelpers.getCompanyContactsText(
                            'MODAL.VALIDATION.MOBILE_MIN_DIGITS'
                          )
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                placeholder={resourceHelpers.getCompanyContactsText(
                  'MODAL.PLACEHOLDERS.ENTER_MOBILE'
                )}
                maxLength={20}
              />
            </Form.Item>

            <Form.Item
              label={resourceHelpers.getCompanyContactsText('MODAL.FIELDS.ADDRESS')}
              name="address"
              rules={[
                {
                  required: true,
                  message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.ENTER_ADDRESS'),
                },
                {
                  min: 10,
                  message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.ADDRESS_MIN'),
                },
                {
                  max: 200,
                  message: resourceHelpers.getCompanyContactsText('MODAL.VALIDATION.ADDRESS_MAX'),
                },
              ]}
              style={{ gridColumn: '1 / -1' }}
            >
              <Input.TextArea
                placeholder={resourceHelpers.getCompanyContactsText(
                  'MODAL.PLACEHOLDERS.ENTER_ADDRESS'
                )}
                rows={3}
                style={{ resize: 'none' }}
                maxLength={200}
                showCount
              />
            </Form.Item>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
          <Button onClick={handleCancel}>
            {resourceHelpers.getCompanyContactsText('MODAL.BUTTONS.CANCEL')}
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {resourceHelpers.getCompanyContactsText('MODAL.BUTTONS.SAVE')}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateContactPersonModal;
