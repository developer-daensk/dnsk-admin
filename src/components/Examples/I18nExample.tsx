import React from 'react';
import { Card, Space, Typography, Button, Divider, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHybridTranslation, useResourceHelpers } from '../../utils/i18nBridge';
import { useLanguage } from '../../contexts/LanguageContext';

const { Title, Text, Paragraph } = Typography;

/**
 * Example component demonstrating different ways to use i18n
 * This component shows migration patterns from existing resources to i18n
 */
const I18nExample: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { t: hybridT } = useHybridTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const resourceHelpers = useResourceHelpers(); // Reactive resource helpers

  return (
    <div style={{ padding: '24px', maxWidth: '1200px' }}>
      <Title level={2}>🌍 Internationalization Examples</Title>
      <Text type="secondary">
        Current Language: <strong>{currentLanguage.toUpperCase()}</strong>
      </Text>

      <Divider />

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Language switching demo */}
        <Card title="Language Switching Demo" size="small">
          <Space>
            <Text strong>Switch Language:</Text>
            <Button
              type={currentLanguage === 'de' ? 'primary' : 'default'}
              onClick={() => changeLanguage('de')}
            >
              🇩🇪 De
            </Button>
            <Button
              type={currentLanguage === 'en' ? 'primary' : 'default'}
              onClick={() => changeLanguage('en')}
            >
              🇺🇸 En
            </Button>
          </Space>
        </Card>

        {/* DEBUG: Language State Information */}
        <Card title="🐛 DEBUG: Language State" size="small" style={{ background: '#fff2e8' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>LanguageContext.currentLanguage:</Text>{' '}
              <Text code style={{ color: 'red' }}>
                {currentLanguage}
              </Text>
            </div>
            <div>
              <Text strong>i18n.language:</Text>{' '}
              <Text code style={{ color: 'blue' }}>
                {i18n.language}
              </Text>
            </div>
            <div>
              <Text strong>localStorage.language:</Text>{' '}
              <Text code style={{ color: 'green' }}>
                {localStorage.getItem('language') || 'not set'}
              </Text>
            </div>
            <div>
              <Text strong>Test German text (should show when DE selected):</Text>{' '}
              <Text code>Benutzerverwaltung</Text>
            </div>
            <div>
              <Text strong>Test English text (should show when EN selected):</Text>{' '}
              <Text code>User Management</Text>
            </div>
            <div>
              <Text strong>Actual resourceHelpers output:</Text>{' '}
              <Text code style={{ fontSize: '16px', fontWeight: 'bold', color: 'purple' }}>
                {resourceHelpers.getUserManagementText('TITLE')}
              </Text>
            </div>
          </Space>
        </Card>

        {/* Live ResourceHelpers Test */}
        <Card
          title="🧪 Live ResourceHelpers Test (REACTIVE)"
          size="small"
          style={{ background: '#f0f8ff' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>USER_MANAGEMENT.TITLE:</Text>{' '}
              <Text code>{resourceHelpers.getUserManagementText('TITLE')}</Text>
            </div>
            <div>
              <Text strong>USER_MANAGEMENT.TABS.USERS:</Text>{' '}
              <Text code>{resourceHelpers.getUserManagementText('TABS.USERS')}</Text>
            </div>
            <div>
              <Text strong>USER_MANAGEMENT.TABS.ORDERS:</Text>{' '}
              <Text code>{resourceHelpers.getUserManagementText('TABS.ORDERS')}</Text>
            </div>
            <div>
              <Text strong>orders.TITLE:</Text>{' '}
              <Text code>{resourceHelpers.getOrderText('TITLE')}</Text>
            </div>
            <div>
              <Text strong>product.TITLE:</Text>{' '}
              <Text code>{resourceHelpers.getProductText('TITLE')}</Text>
            </div>
            <Paragraph
              style={{ marginTop: 16, padding: 8, background: '#fff', border: '1px solid #d9d9d9' }}
            >
              <Text strong>✅ Test:</Text> Switch language above and see if these values change
              immediately!
            </Paragraph>
          </Space>
        </Card>

        {/* Comprehensive Resource Examples */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="🔧 Basic Categories" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text strong>Common:</Text> {t('common.loading')}
                </div>
                <div>
                  <Text strong>Navigation:</Text> {t('navigation.dashboard')}
                </div>
                <div>
                  <Text strong>Forms:</Text> {t('forms.email')}
                </div>
                <div>
                  <Text strong>Messages:</Text> {t('messages.welcome')}
                </div>
                <div>
                  <Text strong>Errors:</Text> {t('errors.network')}
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="🏢 Business Resources" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text strong>Auth:</Text> {hybridT('auth.title')}
                </div>
                <div>
                  <Text strong>Truck:</Text> {hybridT('truck.MODAL.TITLE')}
                </div>
                <div>
                  <Text strong>Chart:</Text> {hybridT('chart.cardTitles.visitors')}
                </div>
                <div>
                  <Text strong>Menu:</Text> {hybridT('menuItems.DASHBOARD')}
                </div>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* User Management Examples */}
        <Card title="👥 User Management Resources (REACTIVE)" size="small">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Text strong>Main Title:</Text>
              <br />
              {resourceHelpers.getUserManagementText('TITLE')}
            </Col>
            <Col xs={24} md={8}>
              <Text strong>Users Table:</Text>
              <br />
              {resourceHelpers.getUserManagementText('USERS_TABLE.TITLE')}
            </Col>
            <Col xs={24} md={8}>
              <Text strong>Add User:</Text>
              <br />
              {resourceHelpers.getUserManagementText('USERS_TABLE.ACTIONS.ADD_USER')}
            </Col>
          </Row>
        </Card>

        {/* Orders Management Examples */}
        <Card title="📦 Orders Management Resources" size="small">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Text strong>Orders Title:</Text>
              <br />
              {resourceHelpers.getOrderText('TITLE')}
            </Col>
            <Col xs={24} md={8}>
              <Text strong>Order Number:</Text>
              <br />
              {resourceHelpers.getOrderText('TABLE.COLUMNS.ORDER_NUMBER')}
            </Col>
            <Col xs={24} md={8}>
              <Text strong>Status Pending:</Text>
              <br />
              {resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.PENDING')}
            </Col>
          </Row>
        </Card>

        {/* Product Management Examples */}
        <Card title="🛍️ Product Management Resources" size="small">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={6}>
              <Text strong>Product Title:</Text>
              <br />
              {resourceHelpers.getProductText('TITLE')}
            </Col>
            <Col xs={24} md={6}>
              <Text strong>Basic Info:</Text>
              <br />
              {resourceHelpers.getProductText('BASIC_INFORMATION.NAME')}
            </Col>
            <Col xs={24} md={6}>
              <Text strong>Pricing:</Text>
              <br />
              {resourceHelpers.getProductText('PRICING_AND_QUANTITY.PRICE_PER_UNIT')}
            </Col>
            <Col xs={24} md={6}>
              <Text strong>Dimensions:</Text>
              <br />
              {resourceHelpers.getProductText('DIMENSIONS_AND_WEIGHT.WIDTH')}
            </Col>
          </Row>
        </Card>

        {/* Truck Resources Examples */}
        <Card title="🚛 Truck Resources" size="small">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Text strong>Modal Title:</Text>
              <br />
              {resourceHelpers.getTruckText('MODAL.TITLE')}
            </Col>
            <Col xs={24} md={8}>
              <Text strong>Postal Code:</Text>
              <br />
              {resourceHelpers.getTruckText('MODAL.LABELS.POSTAL_CODE')}
            </Col>
            <Col xs={24} md={8}>
              <Text strong>Save Button:</Text>
              <br />
              {resourceHelpers.getTruckText('MODAL.BUTTONS.SAVE')}
            </Col>
          </Row>
        </Card>

        {/* Interactive examples */}
        <Card title="🎯 Interactive Examples" size="small">
          <Space direction="vertical">
            <div>
              <Text strong>Button with translated text:</Text>
              <br />
              <Button type="primary" style={{ marginTop: 8 }}>
                {t('common.save')}
              </Button>
            </div>

            <div>
              <Text strong>Error message:</Text>
              <br />
              <Text type="danger" style={{ marginTop: 8 }}>
                {t('errors.network')}
              </Text>
            </div>

            <div>
              <Text strong>Success message:</Text>
              <br />
              <Text type="success" style={{ marginTop: 8 }}>
                {t('messages.dataUpdated')}
              </Text>
            </div>

            <div>
              <Text strong>With interpolation:</Text>
              <br />
              <Text style={{ marginTop: 8 }}>
                {resourceHelpers.getUserManagementText('USERS_TABLE.TOOLTIPS.TOTAL_SPENT', {
                  amount: '1,250.50',
                })}
              </Text>
            </div>
          </Space>
        </Card>

        <Card title="📚 Available Resource Helpers" size="small">
          <Paragraph>
            <Text strong>useResourceHelpers() - REACTIVE!</Text> - Use this hook in components for
            automatic re-rendering
          </Paragraph>
          <Paragraph>
            <Text strong>resourceHelpers.getUserManagementText()</Text> - For user management
            resources
          </Paragraph>
          <Paragraph>
            <Text strong>resourceHelpers.getOrderText()</Text> - For order resources
          </Paragraph>
          <Paragraph>
            <Text strong>resourceHelpers.getProductText()</Text> - For product resources
          </Paragraph>
          <Paragraph>
            <Text strong>resourceHelpers.getAuthText()</Text> - For authentication resources
          </Paragraph>
          <Paragraph>
            <Text strong>resourceHelpers.getTruckText()</Text> - For truck resources
          </Paragraph>
          <Paragraph>
            <Text strong>resourceHelpers.getMenuText()</Text> - For menu resources
          </Paragraph>
          <Paragraph>
            <Text strong>resourceHelpers.getChartText()</Text> - For chart resources
          </Paragraph>
        </Card>

        <Card title="✅ Migration Status" size="small">
          <Paragraph>
            <Text strong>✅ Complete:</Text> All resource files now have German translations
          </Paragraph>
          <Paragraph>
            <Text strong>✅ Categories:</Text> common, navigation, forms, messages, errors
          </Paragraph>
          <Paragraph>
            <Text strong>✅ Auth Resources:</Text> Login forms, OTP verification
          </Paragraph>
          <Paragraph>
            <Text strong>✅ Chart Resources:</Text> Chart titles and options
          </Paragraph>
          <Paragraph>
            <Text strong>✅ Menu Items:</Text> Navigation menu items
          </Paragraph>
          <Paragraph>
            <Text strong>✅ Truck Resources:</Text> Truck modal and shipping
          </Paragraph>
          <Paragraph>
            <Text strong>✅ User Management:</Text> Complete user, location, logistics management
          </Paragraph>
          <Paragraph>
            <Text strong>✅ Orders:</Text> Order management, forms, statuses
          </Paragraph>
          <Paragraph>
            <Text strong>✅ Products:</Text> Product management, attributes, tags, variations
          </Paragraph>
          <Paragraph>
            <Text strong>✅ Error Messages:</Text> System error messages
          </Paragraph>
        </Card>

        <Card
          title="🔄 NEW: Reactive Translation Guide"
          size="small"
          style={{ background: '#f6ffed' }}
        >
          <Paragraph>
            <Text strong>✅ WORKING NOW:</Text> Use the reactive hook for automatic language
            switching!
          </Paragraph>
          <Paragraph>
            <Text code>1. Import:</Text>{' '}
            <Text code>
              import {'{'} useResourceHelpers {'}'} from '@/utils/i18nBridge'
            </Text>
          </Paragraph>
          <Paragraph>
            <Text code>2. Use hook:</Text>{' '}
            <Text code>const resourceHelpers = useResourceHelpers();</Text>
          </Paragraph>
          <Paragraph>
            <Text code>3. Call functions:</Text>{' '}
            <Text code>resourceHelpers.getUserManagementText('TITLE')</Text>
          </Paragraph>
          <Paragraph>
            <Text strong>
              🎉 Components will now re-render automatically when language changes!
            </Text>
          </Paragraph>
        </Card>
      </Space>
    </div>
  );
};

export default I18nExample;
