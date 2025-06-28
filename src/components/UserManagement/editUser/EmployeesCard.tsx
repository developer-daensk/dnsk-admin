import React, { useState } from 'react';
import { Card, Space, Tooltip, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResourceHelpers } from '@/utils/i18nBridge';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig } from 'antd/es/table';
import { BaseTable } from '@/components/common';
import type { CreateUserLocation } from '@/types/user-managment.types';
import EmployeeModal from './EmployeeModal';
import { DEFAULT_PAGINATION } from '@/lib/constants';
import type { PaginationState } from '@/types/user-managment.types';
import { ActionButton, StatusTag, ErrorMessage } from './EmployeesCard.style';

interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  locationId: string;
  locationName: string;
  status: 'active' | 'inactive';
}

interface EmployeesCardProps {
  locations: CreateUserLocation[];
  onEmployeeAdd: (employee: Partial<Employee>) => void;
  onEmployeeUpdate: (employee: Partial<Employee>) => void;
  onEmployeeDelete: (employeeId: string) => void;
}

const EmployeesCard: React.FC<EmployeesCardProps> = ({
  locations,
  onEmployeeAdd,
  onEmployeeUpdate,
  onEmployeeDelete,
}) => {
  const resourceHelpers = useResourceHelpers();
  const [loading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();
  const [pagination, setPagination] = useState<PaginationState>({
    current: DEFAULT_PAGINATION.PAGE,
    pageSize: DEFAULT_PAGINATION.LIMIT,
    total: 0,
  });

  // Mock data - replace with actual API call
  const employees: Employee[] = [
    {
      id: '1',
      name: 'John Doe',
      position: 'Manager',
      email: 'john@example.com',
      phone: '+1234567890',
      locationId: '1',
      locationName: 'Main Office',
      status: 'active',
    },
    // Add more mock data as needed
  ];

  const handleAddEmployee = () => {
    setModalMode('add');
    setSelectedEmployee(undefined);
    setModalVisible(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setModalMode('edit');
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  const handleModalOk = (values: Partial<Employee>) => {
    if (modalMode === 'add') {
      onEmployeeAdd(values);
    } else {
      onEmployeeUpdate({ ...values, id: selectedEmployee?.id });
    }
    setModalVisible(false);
  };

  const handleTableChange = (
    newPagination: TablePaginationConfig,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _filters?: unknown,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _sorter?: unknown
  ) => {
    setPagination({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || DEFAULT_PAGINATION.LIMIT,
      total: pagination.total,
    });
  };

  const columns: ColumnsType<Employee> = [
    {
      title: resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.COLUMNS.NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.COLUMNS.POSITION'),
      dataIndex: 'position',
      key: 'position',
      width: 150,
    },
    {
      title: resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.COLUMNS.EMAIL'),
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.COLUMNS.PHONE'),
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.COLUMNS.LOCATION'),
      dataIndex: 'locationName',
      key: 'locationName',
      width: 150,
    },
    {
      title: resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.COLUMNS.STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <StatusTag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active'
            ? resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.STATUS.ACTIVE') || 'Active'
            : resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.STATUS.INACTIVE') ||
              'Inactive'}
        </StatusTag>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.COLUMNS.ACTIONS'),
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip
            title={
              resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.ACTIONS.EDIT') ||
              'Edit Employee'
            }
          >
            <ActionButton
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditEmployee(record)}
            />
          </Tooltip>
          <Tooltip
            title={
              resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.ACTIONS.DELETE') ||
              'Delete Employee'
            }
          >
            <ActionButton
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onEmployeeDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Check if locations are available
  const hasLocations = locations && locations.length > 0;

  return (
    <Card
      title={resourceHelpers.getUserManagementText('LOCATIONS_TABLE.TITLE')}
      style={{ marginBottom: '24px' }}
      extra={
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEmployee}>
            {resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.ACTIONS.ADD')}
          </Button>
        </Space>
      }
    >
      <BaseTable<Employee>
        columns={columns}
        data={employees}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} employee${total !== 1 ? 's' : ''}`,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        onTableChange={handleTableChange}
        emptyText={resourceHelpers.getUserManagementText(
          'EMPLOYEES_TABLE.EMPTY_STATE.NO_EMPLOYEES'
        )}
        minWidth={800}
        size="middle"
        enableMobileView={true}
      />
      {!hasLocations && (
        <ErrorMessage>
          {resourceHelpers.getUserManagementText('EMPLOYEES_TABLE.ERRORS.NO_LOCATIONS')}
        </ErrorMessage>
      )}
      <EmployeeModal
        visible={modalVisible}
        mode={modalMode}
        employee={selectedEmployee}
        locations={locations}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      />
    </Card>
  );
};

export default EmployeesCard;
