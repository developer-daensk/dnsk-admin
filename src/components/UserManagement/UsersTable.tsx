import React, { useState, useEffect, useMemo } from 'react';
import { Tooltip, Button, Tag } from 'antd';
import {
  ShoppingCartOutlined,
  ShopOutlined,
  TruckOutlined,
  EyeOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  EditOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig } from 'antd/es/table';
import { BaseTable, TableSearchAndFilter } from '../common';
import type { SortOption as TableSortOption } from '../common';
import { DEFAULT_PAGINATION } from '../../lib/constants';
import UserDetailsModal from './UserDetailsModal';
import type {
  User,
  UserType,
  UserSortOption,
  PaginationState,
} from '../../types/user-managment.types';
import { useResourceHelpers } from '@/utils/i18nBridge';
import { useNavigate } from 'react-router-dom';

const UsersTable: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState<UserSortOption>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    current: DEFAULT_PAGINATION.PAGE,
    pageSize: DEFAULT_PAGINATION.LIMIT,
    total: 0,
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Get reactive resource helpers
  const resourceHelpers = useResourceHelpers();

  // Mock data - replace with your API call
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter and sort users
  useEffect(() => {
    let filtered = allUsers;

    // Apply search filter
    if (searchText.trim()) {
      filtered = allUsers.filter(
        user =>
          user.userId.toLowerCase().includes(searchText.toLowerCase()) ||
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.profileName.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase()) ||
          user.department.toLowerCase().includes(searchText.toLowerCase()) ||
          user.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortOption) {
          case 'newest':
            return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
          case 'oldest':
            return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'purchase-high':
            return b.totalPurchaseAmount - a.totalPurchaseAmount;
          case 'purchase-low':
            return a.totalPurchaseAmount - b.totalPurchaseAmount;
          case 'sales-high':
            return b.totalSalesAmount - a.totalSalesAmount;
          case 'sales-low':
            return a.totalSalesAmount - b.totalSalesAmount;
          case 'orders-high':
            return b.orderCount - a.orderCount;
          case 'orders-low':
            return a.orderCount - b.orderCount;
          default:
            return 0;
        }
      });
    }

    setFilteredUsers(filtered);
  }, [searchText, allUsers, sortOption]);

  // Update pagination when filtered data changes
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      total: filteredUsers.length,
      current: 1, // Reset to first page when filtering
    }));
  }, [filteredUsers]);

  const fetchUsers = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockUsers: User[] = [
        {
          userId: '100234567890',
          name: 'John Doe',
          profileName: 'john_admin',
          userTypes: ['Buyer', 'Seller'],
          activeWarehouses: ['NYC Warehouse A', 'NYC Warehouse B', 'Brooklyn Storage'],
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
          registrationDate: '2023-01-15',
        },
        {
          userId: '100234567891',
          name: 'Jane Smith',
          profileName: 'jane_marketing',
          userTypes: ['Buyer'],
          activeWarehouses: ['LA Main Warehouse'],
          orderCount: 89,
          totalPurchaseAmount: 12345.5,
          listedArticles: 0,
          salesCount: 0,
          totalSalesAmount: 0,
          email: 'jane.smith@example.com',
          phone: '+1 234 567 8901',
          role: 'User',
          status: 'active',
          joinDate: '2023-02-20',
          lastLogin: '2024-01-14 15:45',
          department: 'Marketing',
          location: 'Los Angeles',
          registrationDate: '2023-02-20',
        },
        {
          userId: '100234567892',
          name: 'Bob Johnson',
          profileName: 'bob_sales_mgr',
          userTypes: ['Buyer', 'Seller', 'Logistic (carrier)'],
          activeWarehouses: [
            'Chicago Hub',
            'Chicago South',
            'Midwest Distribution',
            "O'Hare Logistics",
          ],
          orderCount: 156,
          totalPurchaseAmount: 28750.25,
          listedArticles: 67,
          salesCount: 134,
          totalSalesAmount: 43621.75,
          email: 'bob.johnson@example.com',
          phone: '+1 234 567 8902',
          role: 'Manager',
          status: 'inactive',
          joinDate: '2023-03-10',
          lastLogin: '2024-01-10 09:15',
          department: 'Sales',
          location: 'Chicago',
          registrationDate: '2023-03-10',
        },
        {
          userId: '100234567893',
          name: 'Alice Brown',
          profileName: 'alice_hr',
          userTypes: ['Buyer', 'Seller', 'Logistic (carrier)'],
          activeWarehouses: ['Miami Central', 'South Beach Storage'],
          orderCount: 23,
          totalPurchaseAmount: 3456.75,
          listedArticles: 8,
          salesCount: 12,
          totalSalesAmount: 2890.25,
          email: 'alice.brown@example.com',
          phone: '+1 234 567 8903',
          role: 'User',
          status: 'pending',
          joinDate: '2024-01-01',
          lastLogin: 'Never',
          department: 'HR',
          location: 'Miami',
          registrationDate: '2024-01-01',
        },
        {
          userId: '100234567894',
          name: 'Charlie Wilson',
          profileName: 'charlie_it_admin',
          userTypes: ['Buyer', 'Logistic (carrier)'],
          activeWarehouses: [],
          orderCount: 0,
          totalPurchaseAmount: 0,
          listedArticles: 0,
          salesCount: 0,
          totalSalesAmount: 0,
          email: 'charlie.wilson@example.com',
          phone: '+1 234 567 8904',
          role: 'Admin',
          status: 'active',
          joinDate: '2022-12-05',
          lastLogin: '2024-01-15 14:20',
          department: 'IT',
          location: 'Seattle',
          registrationDate: '2022-12-05',
        },
      ];

      setAllUsers(mockUsers);
      setLoading(false);
    }, 1000);
  };

  // Get paginated data
  const paginatedData = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, pagination.current, pagination.pageSize]);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(prev => ({
      ...prev,
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || DEFAULT_PAGINATION.LIMIT,
    }));
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleSortChange = (value: string | null) => {
    setSortOption(value as UserSortOption);
  };

  // View user details handler - opens modal
  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Edit user handler - navigates to edit page
  const handleEdit = (user: User) => {
    navigate(`/user-management/edit-user/${user.userId}`);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Get icon for user type
  const getTypeIcon = (type: UserType) => {
    switch (type) {
      case 'Buyer':
        return <ShoppingCartOutlined style={{ color: '#52c41a', fontSize: '16px' }} />;
      case 'Seller':
        return <ShopOutlined style={{ color: '#1890ff', fontSize: '16px' }} />;
      case 'Logistic (carrier)':
        return <TruckOutlined style={{ color: '#fa8c16', fontSize: '16px' }} />;
      default:
        return null;
    }
  };

  // Render user types with icons and tooltips
  const renderUserTypes = (userTypes: UserType[]) => {
    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {userTypes.map((type, index) => (
          <Tooltip key={index} title={type}>
            {getTypeIcon(type)}
          </Tooltip>
        ))}
      </div>
    );
  };

  // Format euro amount
  const formatEuroAmount = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Get date color based on how recent
  const getDateColor = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 365) return '#52c41a'; // Green for recent (less than 1 year)
    if (diffDays < 730) return '#1890ff'; // Blue for medium (1-2 years)
    return '#fa8c16'; // Orange for older (2+ years)
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Get color based functions
  const getOrderCountColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 50) return '#fa8c16';
    if (count < 150) return '#1890ff';
    return '#52c41a';
  };

  const getPurchaseAmountColor = (amount: number) => {
    if (amount === 0) return '#d9d9d9';
    if (amount < 5000) return '#fa8c16';
    if (amount < 20000) return '#1890ff';
    return '#52c41a';
  };

  const getListedArticlesColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 25) return '#fa8c16';
    if (count < 100) return '#1890ff';
    return '#52c41a';
  };

  const getSalesCountColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 30) return '#fa8c16';
    if (count < 100) return '#1890ff';
    return '#52c41a';
  };

  const getSalesAmountColor = (amount: number) => {
    if (amount === 0) return '#d9d9d9';
    if (amount < 10000) return '#fa8c16';
    if (amount < 30000) return '#1890ff';
    return '#52c41a';
  };

  // Enhanced columns array with improved sorting
  const columns: ColumnsType<User> = [
    {
      title: resourceHelpers.getUserManagementText('USERS_TABLE.COLUMNS.USER_ID'),
      dataIndex: 'userId',
      key: 'userId',
      width: 120,
      sorter: (a, b) => a.userId.localeCompare(b.userId),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: { title: 'Sort by User ID' },
      render: (userId: string) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{userId}</span>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('USERS_TABLE.COLUMNS.PROFILE_NAME'),
      dataIndex: 'profileName',
      key: 'profileName',
      width: 150,
      sorter: (a, b) => a.profileName.localeCompare(b.profileName),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: { title: 'Sort by Profile Name' },
      render: (profileName: string) => (
        <span
          style={{
            fontWeight: 600,
            color: '#1890ff',
            fontFamily: 'monospace',
          }}
        >
          @{profileName}
        </span>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('USERS_TABLE.COLUMNS.TYPE'),
      dataIndex: 'userTypes',
      key: 'userTypes',
      width: 100,
      render: (userTypes: UserType[]) => renderUserTypes(userTypes),
      filters: [
        {
          text: resourceHelpers.getUserManagementText('USERS_TABLE.FILTERS.BUYER'),
          value: 'Buyer',
        },
        {
          text: resourceHelpers.getUserManagementText('USERS_TABLE.FILTERS.SELLER'),
          value: 'Seller',
        },
        {
          text: resourceHelpers.getUserManagementText('USERS_TABLE.FILTERS.LOGISTIC_CARRIER'),
          value: 'Logistic (carrier)',
        },
      ],
      onFilter: (value, record) => record.userTypes.includes(value as UserType),
    },
    {
      title: resourceHelpers.getUserManagementText('USERS_TABLE.COLUMNS.ACTIVE_LOCATIONS'),
      dataIndex: 'activeWarehouses',
      key: 'activeWarehouses',
      width: 130,
      align: 'center',
      sorter: (a, b) => a.activeWarehouses.length - b.activeWarehouses.length,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: { title: 'Sort by Active Locations Count' },
      render: (activeWarehouses: string[]) => (
        <Tooltip
          title={
            activeWarehouses.length > 0
              ? resourceHelpers
                  .getUserManagementText('USERS_TABLE.TOOLTIPS.WAREHOUSES')
                  .replace('{warehouses}', activeWarehouses.join(', '))
              : resourceHelpers.getUserManagementText('USERS_TABLE.TOOLTIPS.NO_ACTIVE_WAREHOUSES')
          }
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: activeWarehouses.length > 0 ? '#52c41a' : '#d9d9d9',
              cursor: 'help',
            }}
          >
            {activeWarehouses.length}
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('USERS_TABLE.COLUMNS.ORDERS'),
      dataIndex: 'orderCount',
      key: 'orderCount',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.orderCount - b.orderCount,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: { title: 'Sort by Order Count' },
      render: (orderCount: number) => (
        <Tooltip
          title={resourceHelpers
            .getUserManagementText('USERS_TABLE.TOOLTIPS.COMPLETED_PURCHASES')
            .replace('{count}', orderCount.toString())}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: getOrderCountColor(orderCount),
              cursor: 'help',
            }}
          >
            {orderCount.toLocaleString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('USERS_TABLE.COLUMNS.TOTAL_PURCHASE_AMOUNT'),
      dataIndex: 'totalPurchaseAmount',
      key: 'totalPurchaseAmount',
      width: 160,
      align: 'right',
      sorter: (a, b) => a.totalPurchaseAmount - b.totalPurchaseAmount,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: { title: 'Sort by Purchase Amount' },
      render: (amount: number) => (
        <Tooltip
          title={resourceHelpers
            .getUserManagementText('USERS_TABLE.TOOLTIPS.TOTAL_SPENT')
            .replace('{amount}', formatEuroAmount(amount))}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: getPurchaseAmountColor(amount),
              cursor: 'help',
              fontFamily: 'monospace',
            }}
          >
            {formatEuroAmount(amount)} €
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('USERS_TABLE.COLUMNS.LISTED_ARTICLES'),
      dataIndex: 'listedArticles',
      key: 'listedArticles',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.listedArticles - b.listedArticles,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: { title: 'Sort by Listed Articles' },
      render: (listedArticles: number) => (
        <Tooltip
          title={resourceHelpers
            .getUserManagementText('USERS_TABLE.TOOLTIPS.LISTED_ARTICLES_COUNT')
            .replace('{count}', listedArticles.toString())}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: getListedArticlesColor(listedArticles),
              cursor: 'help',
            }}
          >
            {listedArticles.toLocaleString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('USERS_TABLE.COLUMNS.SALES'),
      dataIndex: 'salesCount',
      key: 'salesCount',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.salesCount - b.salesCount,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: { title: 'Sort by Sales Count' },
      render: (salesCount: number) => (
        <Tooltip
          title={resourceHelpers
            .getUserManagementText('USERS_TABLE.TOOLTIPS.SALES_COMPLETED')
            .replace('{count}', salesCount.toString())}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: getSalesCountColor(salesCount),
              cursor: 'help',
            }}
          >
            {salesCount.toLocaleString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('USERS_TABLE.COLUMNS.TOTAL_SALES_AMOUNT'),
      dataIndex: 'totalSalesAmount',
      key: 'totalSalesAmount',
      width: 160,
      align: 'right',
      sorter: (a, b) => a.totalSalesAmount - b.totalSalesAmount,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: { title: 'Sort by Sales Amount' },
      render: (amount: number) => (
        <Tooltip
          title={resourceHelpers
            .getUserManagementText('USERS_TABLE.TOOLTIPS.TOTAL_REVENUE')
            .replace('{amount}', formatEuroAmount(amount))}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: getSalesAmountColor(amount),
              cursor: 'help',
              fontFamily: 'monospace',
            }}
          >
            {formatEuroAmount(amount)} €
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('USERS_TABLE.COLUMNS.JOIN_DATE'),
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 110,
      align: 'center',
      sorter: (a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: { title: 'Sort by Join Date (Oldest/Newest)' },
      render: (joinDate: string) => (
        <Tooltip title={`Joined: ${formatDate(joinDate)}`}>
          <span
            style={{
              fontWeight: 500,
              color: getDateColor(joinDate),
              fontSize: '13px',
              fontFamily: 'monospace',
            }}
          >
            {formatDate(joinDate)}
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('USERS_TABLE.COLUMNS.STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: { title: 'Sort by Status' },
      render: (status: string) => (
        <Tag color={getStatusColor(status)} style={{ textTransform: 'capitalize' }}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Pending', value: 'pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      key: 'actions',
      fixed: 'right',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Tooltip
          title={resourceHelpers.getUserManagementText('USERS_TABLE.TOOLTIPS.VIEW_USER_DETAILS')}
        >
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{
              color: '#1890ff',
              fontSize: '16px',
            }}
            size="small"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{
              color: '#1890ff',
              fontSize: '16px',
            }}
            size="small"
          />
        </Tooltip>
      ),
    },
  ];

  const pageSizeOptions = ['10', '20', '50', '100'];

  // Get user sort options
  const getSortOptions = (): TableSortOption[] => [
    {
      value: 'newest',
      label: 'Newest First',
      icon: <SortDescendingOutlined />,
    },
    {
      value: 'oldest',
      label: 'Oldest First',
      icon: <SortAscendingOutlined />,
    },
    {
      value: 'purchase-high',
      label: 'Purchase Amount (High to Low)',
    },
    {
      value: 'purchase-low',
      label: 'Purchase Amount (Low to High)',
    },
    {
      value: 'sales-high',
      label: 'Sales Amount (High to Low)',
    },
    {
      value: 'sales-low',
      label: 'Sales Amount (Low to High)',
    },
    {
      value: 'orders-high',
      label: 'Most Orders',
    },
    {
      value: 'orders-low',
      label: 'Fewest Orders',
    },
    {
      value: 'name-asc',
      label: 'Name (A-Z)',
    },
    {
      value: 'name-desc',
      label: 'Name (Z-A)',
    },
  ];

  return (
    <div>
      <TableSearchAndFilter
        searchPlaceholder="Search users..."
        searchValue={searchText}
        onSearch={handleSearch}
        sortPlaceholder="Quick Sort"
        sortValue={sortOption}
        sortOptions={getSortOptions()}
        onSortChange={handleSortChange}
        itemCount={filteredUsers.length}
        itemTypeSingular="user"
        itemTypePlural="user"
        isSorted={!!sortOption}
      />

      <BaseTable<User>
        title={resourceHelpers.getUserManagementText('USERS_TABLE.TITLE')}
        columns={columns}
        data={paginatedData}
        rowKey="userId"
        loading={loading}
        size="small"
        minWidth={1600}
        enableMobileView={true}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} user${total !== 1 ? 's' : ''}`,
          showQuickJumper: true,
          pageSizeOptions,
        }}
        onTableChange={handleTableChange}
        emptyText={
          searchText
            ? `No users found matching "${searchText}"`
            : resourceHelpers.getUserManagementText('USERS_TABLE.EMPTY_STATE.NO_USERS_FOUND')
        }
        addButton={{
          text: resourceHelpers.getUserManagementText('USERS_TABLE.ADD_USER'),
          onClick: () => {
            navigate('/user-management/add-user');
          },
        }}
      />

      <UserDetailsModal isOpen={isModalOpen} user={selectedUser} onClose={handleCloseModal} />
    </div>
  );
};

export default UsersTable;
