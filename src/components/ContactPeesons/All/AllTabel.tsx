import React, { useState, useMemo } from 'react';
import { Tag, Space, Button, Tooltip } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  EditOutlined,
} from '@ant-design/icons';
import type { User, CompanyData } from '@/types/user-managment.types';
import { BaseTable, TableSearchAndFilter } from '@/components/common';
import type { SortOption } from '@/types/common.types';
import { DEFAULT_PAGINATION } from '@/lib/constants';
import { useResourceHelpers } from '@/utils/i18nBridge';
import { useNavigate } from 'react-router-dom';

interface FounderData extends User {
  companyData: CompanyData;
}

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

const mockData: FounderData[] = [
  {
    userId: '1',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+49 30 12345678',
    role: 'Administrator',
    status: 'active',
    department: 'Executive',
    location: 'Berlin',
    userTypes: ['Seller'],
    profileName: 'jsmith',
    activeWarehouses: ['WH001'],
    orderCount: 0,
    totalPurchaseAmount: 0,
    listedArticles: 0,
    salesCount: 0,
    totalSalesAmount: 0,
    joinDate: '2023-01-15',
    lastLogin: '2024-03-20',
    registrationDate: '2023-01-15',
    companyData: {
      companyName: 'TechCorp GmbH',
      companyId: 'TC001',
      companyPhone: '+49 30 87654321',
      companyAddress: 'Alexanderplatz 1, 10178 Berlin, Germany',
      companyWebsite: 'www.techcorp.com',
      companyType: 'Technology',
      companyDescription: 'Leading technology solutions provider',
      email: 'info@techcorp.com',
      phone: '+49 30 87654321',
      address: 'Alexanderplatz 1, 10178 Berlin, Germany',
    },
  },
  {
    userId: '2',
    name: 'Maria Schmidt',
    email: 'maria.schmidt@greenenergy.de',
    phone: '+49 40 98765432',
    role: 'Operations management',
    status: 'active',
    department: 'Technology',
    location: 'Hamburg',
    userTypes: ['Seller'],
    profileName: 'mschmidt',
    activeWarehouses: ['WH002'],
    orderCount: 0,
    totalPurchaseAmount: 0,
    listedArticles: 0,
    salesCount: 0,
    totalSalesAmount: 0,
    joinDate: '2023-03-20',
    lastLogin: '2024-03-19',
    registrationDate: '2023-03-20',
    companyData: {
      companyName: 'GreenEnergy Solutions',
      companyId: 'GE001',
      companyPhone: '+49 40 12345678',
      companyAddress: 'Hafenstraße 45, 20457 Hamburg, Germany',
      companyWebsite: 'www.greenenergy.de',
      companyType: 'Renewable Energy',
      companyDescription: 'Sustainable energy solutions',
      email: 'contact@greenenergy.de',
      phone: '+49 40 12345678',
      address: 'Hafenstraße 45, 20457 Hamburg, Germany',
    },
  },
  {
    userId: '3',
    name: 'Thomas Weber',
    email: 'thomas.weber@logisticspro.de',
    phone: '+49 89 45678901',
    role: 'Management',
    status: 'pending',
    department: 'Operations',
    location: 'Munich',
    userTypes: ['Logistic (carrier)'],
    profileName: 'tweber',
    activeWarehouses: ['WH003'],
    orderCount: 0,
    totalPurchaseAmount: 0,
    listedArticles: 0,
    salesCount: 0,
    totalSalesAmount: 0,
    joinDate: '2024-01-10',
    lastLogin: '2024-03-18',
    registrationDate: '2024-01-10',
    companyData: {
      companyName: 'LogisticsPro GmbH',
      companyId: 'LP001',
      companyPhone: '+49 89 98765432',
      companyAddress: 'Marienplatz 8, 80331 München, Germany',
      companyWebsite: 'www.logisticspro.de',
      companyType: 'Logistics',
      companyDescription: 'Professional logistics services',
      email: 'info@logisticspro.de',
      phone: '+49 89 98765432',
      address: 'Marienplatz 8, 80331 München, Germany',
    },
  },
  {
    userId: '4',
    name: 'Sarah Müller',
    email: 'sarah.mueller@healthplus.de',
    phone: '+49 69 23456789',
    role: 'Operations management',
    status: 'inactive',
    department: 'Operations',
    location: 'Frankfurt',
    userTypes: ['Seller'],
    profileName: 'smueller',
    activeWarehouses: ['WH004'],
    orderCount: 0,
    totalPurchaseAmount: 0,
    listedArticles: 0,
    salesCount: 0,
    totalSalesAmount: 0,
    joinDate: '2023-06-15',
    lastLogin: '2024-02-28',
    registrationDate: '2023-06-15',
    companyData: {
      companyName: 'HealthPlus Medical',
      companyId: 'HP001',
      companyPhone: '+49 69 87654321',
      companyAddress: 'Zeil 123, 60313 Frankfurt, Germany',
      companyWebsite: 'www.healthplus.de',
      companyType: 'Healthcare',
      companyDescription: 'Medical equipment and supplies',
      email: 'contact@healthplus.de',
      phone: '+49 69 87654321',
      address: 'Zeil 123, 60313 Frankfurt, Germany',
    },
  },
  {
    userId: '5',
    name: 'Michael Fischer',
    email: 'michael.fischer@foodtech.de',
    phone: '+49 211 34567890',
    role: 'Administrator',
    status: 'active',
    department: 'Executive',
    location: 'Düsseldorf',
    userTypes: ['Seller'],
    profileName: 'mfischer',
    activeWarehouses: ['WH005'],
    orderCount: 0,
    totalPurchaseAmount: 0,
    listedArticles: 0,
    salesCount: 0,
    totalSalesAmount: 0,
    joinDate: '2023-09-01',
    lastLogin: '2024-03-20',
    registrationDate: '2023-09-01',
    companyData: {
      companyName: 'FoodTech Innovations',
      companyId: 'FT001',
      companyPhone: '+49 211 98765432',
      companyAddress: 'Königsallee 92, 40212 Düsseldorf, Germany',
      companyWebsite: 'www.foodtech.de',
      companyType: 'Food Technology',
      companyDescription: 'Innovative food processing solutions',
      email: 'info@foodtech.de',
      phone: '+49 211 98765432',
      address: 'Königsallee 92, 40212 Düsseldorf, Germany',
    },
  },
];

const AllTabel: React.FC = () => {
  const resourceHelpers = useResourceHelpers();
  const navigate = useNavigate();
  const [loading] = useState(false);
  const [data] = useState<FounderData[]>(mockData);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    current: DEFAULT_PAGINATION.PAGE,
    pageSize: DEFAULT_PAGINATION.LIMIT,
    total: 0,
  });

  const sortOptions: SortOption[] = [
    { label: 'Name (A-Z)', value: 'name_asc' },
    { label: 'Name (Z-A)', value: 'name_desc' },
    { label: 'Company (A-Z)', value: 'company_asc' },
    { label: 'Company (Z-A)', value: 'company_desc' },
    { label: 'Registration Date (Newest)', value: 'date_desc' },
    { label: 'Registration Date (Oldest)', value: 'date_asc' },
    { label: 'Status (Active First)', value: 'status_active' },
    { label: 'Status (Inactive First)', value: 'status_inactive' },
  ];

  const filteredData = useMemo(() => {
    let result = data;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      result = result.filter(founder => {
        return (
          founder.name.toLowerCase().includes(searchLower) ||
          founder.email.toLowerCase().includes(searchLower) ||
          founder.companyData.companyName.toLowerCase().includes(searchLower) ||
          founder.companyData.companyAddress?.toLowerCase().includes(searchLower) ||
          founder.role?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply sorting
    if (sortOption) {
      result = [...result].sort((a, b) => {
        switch (sortOption) {
          case 'name_asc':
            return a.name.localeCompare(b.name);
          case 'name_desc':
            return b.name.localeCompare(a.name);
          case 'company_asc':
            return a.companyData.companyName.localeCompare(b.companyData.companyName);
          case 'company_desc':
            return b.companyData.companyName.localeCompare(a.companyData.companyName);
          case 'date_desc':
            return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
          case 'date_asc':
            return new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
          case 'status_active':
            return a.status === 'active' ? -1 : b.status === 'active' ? 1 : 0;
          case 'status_inactive':
            return a.status === 'inactive' ? -1 : b.status === 'inactive' ? 1 : 0;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [data, searchText, sortOption]);

  const columns: ColumnsType<FounderData> = [
    {
      title: resourceHelpers.getCompanyContactsText('NAME_LAST_NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 180,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: text => (
        <Tooltip title={text}>
          <Space>
            <UserOutlined style={{ marginRight: 4 }} />
            <span
              style={{
                maxWidth: '140px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'inline-block',
              }}
            >
              {text}
            </span>
          </Space>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getCompanyContactsText('ROLE'),
      dataIndex: 'role',
      key: 'role',
      width: 120,
      sorter: (a, b) => a.role.localeCompare(b.role),
      filters: [
        { text: 'Administrator', value: 'Administrator' },
        { text: 'Operations management', value: 'Operations management' },
        { text: 'Management', value: 'Management' },
      ],
      onFilter: (value, record) => record.role === value,
      render: role => (
        <Tooltip title={role}>
          <span
            style={{
              maxWidth: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'inline-block',
            }}
          >
            {role}
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getCompanyContactsText('COMPANY_NAME'),
      dataIndex: ['companyData', 'companyName'],
      key: 'companyName',
      width: 200,
      sorter: (a, b) => a.companyData.companyName.localeCompare(b.companyData.companyName),
      filters: [
        ...Array.from(new Set(mockData.map(d => d.companyData.companyName))).map(name => ({
          text: name,
          value: name,
        })),
      ],
      onFilter: (value, record) => record.companyData.companyName === value,
      render: text => (
        <Tooltip title={text}>
          <span
            style={{
              maxWidth: '180px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'inline-block',
            }}
          >
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getCompanyContactsText('COMPANY_ADDRESS'),
      dataIndex: ['companyData', 'companyAddress'],
      key: 'companyAddress',
      width: 260,
      render: text =>
        text ? (
          <Tooltip title={text}>
            <Space>
              <EnvironmentOutlined style={{ marginRight: 4 }} />
              <span
                style={{
                  maxWidth: '210px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                }}
              >
                {text}
              </span>
            </Space>
          </Tooltip>
        ) : (
          '-'
        ),
    },
    {
      title: resourceHelpers.getCompanyContactsText('EMAIL'),
      dataIndex: 'email',
      key: 'email',
      width: 240,
      render: text => (
        <Tooltip title={text}>
          <Space>
            <MailOutlined style={{ marginRight: 4 }} />
            <span
              style={{
                maxWidth: '190px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'inline-block',
              }}
            >
              {text}
            </span>
          </Space>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getCompanyContactsText('REGISTRATION_DATE'),
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      width: 160,
      render: date => (
        <Space>
          <CalendarOutlined style={{ marginRight: 4 }} />
          <span style={{ paddingLeft: 2 }}>{new Date(date).toLocaleDateString()}</span>
        </Space>
      ),
    },
    {
      title: resourceHelpers.getCompanyContactsText('STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      sorter: (a, b) => a.status.localeCompare(b.status),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Pending', value: 'pending' },
      ],
      onFilter: (value, record) => record.status === value,
      render: status => {
        let color = 'gray';
        let label = 'UNKNOWN';
        const normalized = (status || '').toLowerCase();
        if (normalized === 'active') {
          color = 'green';
          label = 'ACTIVE';
        } else if (normalized === 'inactive') {
          color = 'red';
          label = 'INACTIVE';
        } else if (normalized === 'pending') {
          color = 'orange';
          label = 'PENDING';
        }
        return (
          <Tag color={color} style={{ padding: '0 8px' }}>
            {label}
          </Tag>
        );
      },
    },
    {
      key: 'actions',
      fixed: 'right',
      width: 60,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              navigate(`/user-management/edit-user/${record.userId}`);
            }}
          />
        </Space>
      ),
    },
  ];

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      current: newPagination.current || DEFAULT_PAGINATION.PAGE,
      pageSize: newPagination.pageSize || DEFAULT_PAGINATION.LIMIT,
      total: pagination.total,
    });
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination(prev => ({
      ...prev,
      current: DEFAULT_PAGINATION.PAGE,
    }));
  };

  const handleSortChange = (value: string | null) => {
    setSortOption(value);
    setPagination(prev => ({
      ...prev,
      current: DEFAULT_PAGINATION.PAGE,
    }));
  };

  return (
    <div>
      <TableSearchAndFilter
        searchPlaceholder={resourceHelpers.getCompanyContactsText('SEARCH_FOUNDERS')}
        searchValue={searchText}
        onSearch={handleSearch}
        sortPlaceholder={resourceHelpers.getCompanyContactsText('SORT_BY')}
        sortValue={sortOption}
        sortOptions={sortOptions}
        onSortChange={handleSortChange}
        itemCount={filteredData.length}
        itemTypeSingular="founder"
        itemTypePlural="founders"
        isSorted={!!sortOption}
      />

      <BaseTable<FounderData>
        title={resourceHelpers.getCompanyContactsText('COMPANY_FOUNDERS')}
        columns={columns}
        data={filteredData}
        loading={loading}
        rowKey="userId"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: total => resourceHelpers.getCompanyContactsText('TOTAL_FOUNDERS', { total }),
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        onTableChange={handleTableChange}
        emptyText={
          searchText
            ? resourceHelpers.getCompanyContactsText('NO_FOUNDERS_FOUND_MATCHING', { searchText })
            : resourceHelpers.getCompanyContactsText('NO_FOUNDERS_FOUND')
        }
        minWidth={1200}
        size="middle"
        enableMobileView={true}
      />
    </div>
  );
};

export default AllTabel;
