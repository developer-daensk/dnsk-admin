import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, message, Spin, Row, Col, Tabs } from 'antd';
import { useResourceHelpers } from '@/utils/i18nBridge';
import { PageTitle } from '@/components/PageTitle';
import DetailsCard from './DetailsCard';
import UserIdCard from './UserIdCard';
import UserTypeCard from './UserTypeCard';
import NotificationStatusCard from './NotificationStatusCard';
import LocationsCard from './LocationsCard';
import LocationModal from './LocationModal';
import OrderHistoryCard from './OrderHistoryCard';
import SalesHistoryCard from './SalesHistoryCard';
import OfferingsCard from './OfferingsCard';
import OrganizationalChart from './OrganizationalChart';
import type {
  User,
  EditUserFormData,
  UserStatusInfo,
  CreateUserLocation,
} from '@/types/user-managment.types';
import EmployeesCard from './EmployeesCard';

const EditUserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const resourceHelpers = useResourceHelpers();
  const [form] = Form.useForm<EditUserFormData>();

  const [user, setUser] = useState<User | null>(null);
  const [userStatus, setUserStatus] = useState<UserStatusInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'assign' | 'edit'>('add');
  const [editingLocation, setEditingLocation] = useState<CreateUserLocation | undefined>();

  // Mock locations data
  const [locations, setLocations] = useState<CreateUserLocation[]>([
    {
      key: '1',
      locationId: 'LOC001',
      name: 'Main Office',
      address: '123 Business Ave, New York, NY 10001',
      type: 'Office',
      status: 'active',
    },
    {
      key: '2',
      locationId: 'LOC002',
      name: 'Warehouse NYC',
      address: '456 Storage St, Brooklyn, NY 11201',
      type: 'Warehouse',
      status: 'active',
    },
  ]);

  // Mock employees data
  const mockEmployees = [
    {
      id: '1',
      name: 'John Smith',
      position: 'Manager',
      department: 'IT',
      locationId: 'LOC001',
      avatar: undefined,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      position: 'Developer',
      department: 'IT',
      locationId: 'LOC001',
      avatar: undefined,
    },
    {
      id: '3',
      name: 'Michael Brown',
      position: 'Warehouse Manager',
      department: 'Operations',
      locationId: 'LOC002',
      avatar: undefined,
    },
  ];

  // Handler functions
  const handleAddLocation = () => {
    setModalMode('add');
    setEditingLocation(undefined);
    setModalVisible(true);
  };

  const handleAssignLocation = () => {
    setModalMode('assign');
    setEditingLocation(undefined);
    setModalVisible(true);
  };

  const handleEditLocation = (record: CreateUserLocation) => {
    setModalMode('edit');
    setEditingLocation(record);
    setModalVisible(true);
  };

  const handleModalOk = (values: Partial<CreateUserLocation>) => {
    if (modalMode === 'add') {
      const newLocation: CreateUserLocation = {
        key: Date.now().toString(),
        locationId: values.locationId || `LOC${Date.now()}`,
        name: values.name || '',
        address: values.address || '',
        type: values.type || '',
        status: values.status || 'active',
      };
      setLocations([...locations, newLocation]);
    } else if (modalMode === 'edit' && editingLocation) {
      setLocations(
        locations.map(loc => (loc.key === editingLocation.key ? { ...loc, ...values } : loc))
      );
    } else if (modalMode === 'assign') {
      // Handle assign logic here
      console.log('Assign location:', values);
    }

    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingLocation(undefined);
  };

  // Format the ID as a 12-digit number by padding with zeros if needed
  const formatUserId = (userId: string | undefined): string => {
    if (!userId) return '000000000000';
    return userId.padStart(12, '0');
  };

  const formattedUserId = formatUserId(id);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setError('User ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Simulate API call - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock user data - replace with actual API response
        const mockUser: User = {
          userId: id,
          name: 'John Doe',
          profileName: 'john_admin',
          userTypes: ['Buyer', 'Seller'],
          activeWarehouses: ['NYC Warehouse A', 'NYC Warehouse B'],
          orderCount: 247,
          totalPurchaseAmount: 45678.9,
          listedArticles: 142,
          salesCount: 189,
          totalSalesAmount: 67834.5,
          email: 'john.doe@example.com',
          phone: '+1 234 567 8900',
          role: 'Admin',
          status: 'active',
          joinDate: '2023-01-15',
          lastLogin: '2024-01-15 10:30',
          department: 'IT',
          location: 'New York',
        };

        // Mock user status info - replace with actual API response
        const mockUserStatus: UserStatusInfo = {
          hasSellerApplication: true,
          sellerApplicationStatus: 'approved',
          listsGoods: true,
          goodsCount: 142,
          hasDocuments: true,
          documentsCount: 8,
          pendingDocumentReview: false,
        };

        setUser(mockUser);
        setUserStatus(mockUserStatus);

        // Populate form with user data
        form.setFieldsValue({
          name: mockUser.name,
          profileName: mockUser.profileName,
          email: mockUser.email,
          phone: mockUser.phone,
          role: mockUser.role,
          status: mockUser.status,
          department: mockUser.department,
          location: mockUser.location,
          userTypes: mockUser.userTypes,
        });
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, form]);

  const handleSubmit = async (values: EditUserFormData) => {
    try {
      setSaving(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Saving user data:', values);

      message.success(
        resourceHelpers.getUserManagementText('USERS_TABLE.MESSAGES.UPDATE_SUCCESS') ||
          'User updated successfully!'
      );

      // Navigate back to users list
      navigate('/user-management/users');
    } catch (err) {
      console.error('Error updating user:', err);
      message.error(
        resourceHelpers.getUserManagementText('USERS_TABLE.MESSAGES.UPDATE_ERROR') ||
          'Failed to update user. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  // Add employees to locations
  const locationsWithEmployees = locations.map(location => ({
    ...location,
    employees: mockEmployees.filter(emp => emp.locationId === location.locationId),
    isHeadLocation: location.locationId === 'LOC001', // Set first location as head location
  }));

  // Loading state
  if (loading) {
    return (
      <Form form={form} layout="vertical">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
          }}
        >
          <Spin size="large">
            <div style={{ padding: '50px', background: 'rgba(0, 0, 0, 0.05)' }}>
              {resourceHelpers.getUserManagementText('EDIT_USER_FORM.LOADING.FETCHING')}
            </div>
          </Spin>
        </div>
      </Form>
    );
  }

  // Error state
  if (error) {
    return (
      <Form form={form} layout="vertical">
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ color: '#ff4d4f', fontSize: '16px', marginBottom: '16px' }}>{error}</div>
          <Button onClick={() => navigate('/user-management/users')}>
            {resourceHelpers.getUserManagementText('EDIT_USER_FORM.BUTTONS.BACK')}
          </Button>
        </div>
      </Form>
    );
  }

  // User not found
  if (!user) {
    return (
      <Form form={form} layout="vertical">
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', marginBottom: '16px' }}>
            {resourceHelpers.getUserManagementText('EDIT_USER_FORM.MESSAGES.USER_NOT_FOUND')}
          </div>
          <Button onClick={() => navigate('/user-management/users')}>
            {resourceHelpers.getUserManagementText('EDIT_USER_FORM.BUTTONS.BACK')}
          </Button>
        </div>
      </Form>
    );
  }

  return (
    <Spin spinning={saving}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
        <PageTitle>{resourceHelpers.getUserManagementText('EDIT_USER_FORM.TITLE')}</PageTitle>

        <Form form={form} layout="vertical" onFinish={handleSubmit} scrollToFirstError>
          {/* User Types Section */}
          <Row gutter={16}>
            <Col span={8}>
              <UserIdCard user={user} formattedUserId={formattedUserId} />
            </Col>
            <Col span={8}>
              <UserTypeCard user={user} />
            </Col>
            <Col span={8}>
              <NotificationStatusCard userStatus={userStatus} />
            </Col>
          </Row>

          {/* User Details Section */}
          <Tabs
            defaultActiveKey="details"
            size="large"
            style={{ marginTop: '24px' }}
            items={[
              {
                key: 'details',
                label: resourceHelpers.getUserManagementText('EDIT_USER_FORM.TABS.DETAILS'),
                children: <DetailsCard user={user} />,
              },
              {
                key: 'location',
                label: resourceHelpers.getUserManagementText('EDIT_USER_FORM.TABS.LOCATION'),
                children: (
                  <>
                    <LocationsCard
                      locations={locations}
                      onAddLocation={handleAddLocation}
                      onAssignLocation={handleAssignLocation}
                      onEditLocation={handleEditLocation}
                    />
                    <LocationModal
                      visible={modalVisible}
                      mode={modalMode}
                      location={editingLocation}
                      onOk={handleModalOk}
                      onCancel={handleModalCancel}
                    />
                  </>
                ),
              },
              {
                key: 'employees',
                label: resourceHelpers.getUserManagementText('EDIT_USER_FORM.TABS.EMPLOYEES'),
                children: (
                  <EmployeesCard
                    locations={locations}
                    onEmployeeAdd={employee => {
                      // TODO: Implement employee add logic
                      console.log('Add employee:', employee);
                    }}
                    onEmployeeUpdate={employee => {
                      // TODO: Implement employee update logic
                      console.log('Update employee:', employee);
                    }}
                    onEmployeeDelete={employeeId => {
                      // TODO: Implement employee delete logic
                      console.log('Delete employee:', employeeId);
                    }}
                  />
                ),
              },
              {
                key: 'orders',
                label: resourceHelpers.getUserManagementText('EDIT_USER_FORM.TABS.ORDERS'),
                children: <OrderHistoryCard />,
              },
              {
                key: 'sales',
                label: resourceHelpers.getUserManagementText('EDIT_USER_FORM.TABS.SALES'),
                children: <SalesHistoryCard />,
              },
              {
                key: 'offerings',
                label: resourceHelpers.getUserManagementText('EDIT_USER_FORM.TABS.OFFERINGS'),
                children: <OfferingsCard />,
              },
              {
                key: 'org-chart',
                label: resourceHelpers.getUserManagementText('EDIT_USER_FORM.TABS.ORG_CHART'),
                children: <OrganizationalChart locations={locationsWithEmployees} />,
              },
            ]}
          />
        </Form>
      </div>
    </Spin>
  );
};

export default EditUserForm;
