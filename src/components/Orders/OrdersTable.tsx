import React, { useState, useEffect } from 'react';
import { message, Tabs, Space, Tooltip, Input } from 'antd';
import { EyeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig } from 'antd/es/table';
import { DEFAULT_PAGINATION, ROUTES } from '@/lib/constants';
import { BaseTable } from '../common';
import { OrdersService } from '@/services/orders.service';
import { Order } from '@/types/order.types';
import { ActionButton, StyledTag, TabsWrapper, AddressText } from './OrdersTable.styles';
import OrderDetailsModal from './OrderDetailsModal';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

const ordersService = new OrdersService();

const OrdersTable: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Order[]>([]);
  const [allData, setAllData] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    current: DEFAULT_PAGINATION.PAGE,
    pageSize: DEFAULT_PAGINATION.LIMIT,
    total: 0,
  });
  const navigate = useNavigate();

  // Get reactive translation helpers that update when language changes
  const resourceHelpers = useResourceHelpers();

  const handleView = (record: Order) => {
    setSelectedOrder(record);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const handleEdit = (record: Order) => {
    navigate(ROUTES.ORDER_EDIT.replace(':id', record.id));
  };

  const columns: ColumnsType<Order> = [
    {
      title: resourceHelpers.getOrderText('TABLE.COLUMNS.ORDER_NUMBER'),
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 120,
      render: (text: string) => <strong>{text}</strong>,
      sorter: (a, b) => a.orderNumber.localeCompare(b.orderNumber),
    },
    {
      title: resourceHelpers.getOrderText('TABLE.COLUMNS.DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
    },
    {
      title: resourceHelpers.getOrderText('TABLE.COLUMNS.ADDRESS'),
      dataIndex: 'customer',
      key: 'address',
      width: 250,
      render: (customer: Order['customer']) => (
        <AddressText>
          {customer.address}, {customer.city}, {customer.state} {customer.zipCode}
        </AddressText>
      ),
      sorter: (a, b) => {
        const addressA = `${a.customer.address}, ${a.customer.city}, ${a.customer.state} ${a.customer.zipCode}`;
        const addressB = `${b.customer.address}, ${b.customer.city}, ${b.customer.state} ${b.customer.zipCode}`;
        return addressA.localeCompare(addressB);
      },
    },
    {
      title: resourceHelpers.getOrderText('TABLE.COLUMNS.TOTAL'),
      dataIndex: 'total',
      key: 'total',
      width: 100,
      render: (total: number) => <strong>${total.toFixed(2)}</strong>,
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: resourceHelpers.getOrderText('TABLE.COLUMNS.QUANTITY'),
      dataIndex: 'items',
      key: 'quantity',
      width: 80,
      render: (items: Order['items']) => {
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        return totalQuantity;
      },
      sorter: (a, b) => {
        const aQty = a.items.reduce((sum, item) => sum + item.quantity, 0);
        const bQty = b.items.reduce((sum, item) => sum + item.quantity, 0);
        return aQty - bQty;
      },
    },
    {
      title: resourceHelpers.getOrderText('TABLE.COLUMNS.STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: Order['status']) => {
        const statusLabels = {
          pending: resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.PENDING'),
          processing: resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.PROCESSING'),
          shipped: resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.SHIPPED'),
          delivered: resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.DELIVERED'),
          cancelled: resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.CANCELLED'),
          refunded: resourceHelpers.getOrderText('ORDER_FORM.STATUS_OPTIONS.REFUNDED'),
        };
        return <StyledTag $status={status}>{statusLabels[status] || status}</StyledTag>;
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: '',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title={resourceHelpers.getOrderText('TABLE.ACTIONS.VIEW')}>
            <ActionButton
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
              className="view-action"
            />
          </Tooltip>
          <Tooltip title={resourceHelpers.getOrderText('TABLE.ACTIONS.EDIT')}>
            <ActionButton
              type="text"
              icon={<InfoCircleOutlined />}
              onClick={() => handleEdit(record)}
              className="edit-action"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    setSearchTerm(trimmedValue);
    const resetPagination = {
      current: DEFAULT_PAGINATION.PAGE,
      pageSize: pagination.pageSize,
      total: 0,
    };
    setPagination(prev => ({
      ...prev,
      current: DEFAULT_PAGINATION.PAGE,
    }));
    applyFiltersWithPagination(trimmedValue, activeTab, allData, resetPagination);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    const resetPagination = {
      current: DEFAULT_PAGINATION.PAGE,
      pageSize: pagination.pageSize,
      total: 0,
    };
    setPagination(prev => ({
      ...prev,
      current: DEFAULT_PAGINATION.PAGE,
    }));
    // Apply filters with empty search to restore full tab list
    applyFiltersWithPagination('', activeTab, allData, resetPagination);
  };

  const applyFilters = (search: string, tabFilter: string, sourceData = allData) => {
    applyFiltersWithPagination(search, tabFilter, sourceData, pagination);
  };

  const applyFiltersWithPagination = (
    search: string,
    tabFilter: string,
    sourceData: Order[],
    paginationConfig: PaginationState
  ) => {
    let filteredData = [...sourceData];

    // Apply tab filter first - this determines which orders are available for search
    if (tabFilter === 'in_progress') {
      // Show orders that are pending or being processed
      filteredData = filteredData.filter(
        order => order.status === 'pending' || order.status === 'processing'
      );
    } else if (tabFilter === 'in_delivery') {
      // Show orders that are currently shipped/in transit
      filteredData = filteredData.filter(order => order.status === 'shipped');
    } else if (tabFilter === 'rejected') {
      // Show orders that were cancelled or refunded
      filteredData = filteredData.filter(
        order => order.status === 'cancelled' || order.status === 'refunded'
      );
    }
    // 'overview' tab shows all orders (no additional filtering)
    // This includes delivered orders and any other statuses

    // Apply search filter within the current tab's context
    // Search works across all visible orders in the active tab
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(order => {
        // Basic order info
        const matchesOrderNumber = order.orderNumber.toLowerCase().includes(searchLower);
        const matchesStatus = order.status.toLowerCase().includes(searchLower);
        const matchesTrackingNumber = order.trackingNumber?.toLowerCase().includes(searchLower);
        const matchesPaymentMethod = order.paymentMethod.toLowerCase().includes(searchLower);

        // Customer info
        const matchesCustomerName = order.customer.name.toLowerCase().includes(searchLower);
        const matchesCustomerEmail = order.customer.email.toLowerCase().includes(searchLower);
        const matchesCustomerPhone = order.customer.phone.toLowerCase().includes(searchLower);
        const matchesAddress = order.customer.address.toLowerCase().includes(searchLower);
        const matchesCity = order.customer.city.toLowerCase().includes(searchLower);
        const matchesState = order.customer.state.toLowerCase().includes(searchLower);
        const matchesZipCode = order.customer.zipCode.toLowerCase().includes(searchLower);

        // Product info
        const matchesProductName = order.items.some(item =>
          item.productName.toLowerCase().includes(searchLower)
        );

        // Date info (formatted as displayed in table)
        const formattedDate = dayjs(order.createdAt).format('MMM DD, YYYY').toLowerCase();
        const matchesDate = formattedDate.includes(searchLower);

        // Amount info (search by dollar amount)
        const matchesTotal =
          order.total.toString().includes(search.trim()) ||
          `$${order.total.toFixed(2)}`.includes(search.trim());

        return (
          matchesOrderNumber ||
          matchesStatus ||
          matchesTrackingNumber ||
          matchesPaymentMethod ||
          matchesCustomerName ||
          matchesCustomerEmail ||
          matchesCustomerPhone ||
          matchesAddress ||
          matchesCity ||
          matchesState ||
          matchesZipCode ||
          matchesProductName ||
          matchesDate ||
          matchesTotal
        );
      });
    }

    const start = (paginationConfig.current - 1) * paginationConfig.pageSize;
    const end = start + paginationConfig.pageSize;
    const paginatedData = filteredData.slice(start, end);

    setData(paginatedData);
    setPagination(prev => ({
      ...prev,
      total: filteredData.length,
    }));
  };

  const fetchOrders = async (tabFilter?: string) => {
    try {
      setLoading(true);

      const response = await ordersService.getAll({});

      if (response.data) {
        setAllData(response.data);
        applyFilters(searchTerm, tabFilter || activeTab, response.data);
      } else {
        message.error(resourceHelpers.getOrderText('ERRORS.FETCH_FAILED'));
      }
    } catch (error) {
      message.error(resourceHelpers.getOrderText('ERRORS.FETCH_FAILED'));
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(activeTab);
  }, [activeTab]);

  const handleTableChange = (
    newPagination: TablePaginationConfig,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _filters?: unknown,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _sorter?: unknown
  ) => {
    const current = newPagination.current || 1;
    const pageSize = newPagination.pageSize || DEFAULT_PAGINATION.LIMIT;

    setPagination(prev => ({
      ...prev,
      current,
      pageSize,
    }));

    // Re-apply current filters with new pagination
    // Note: Ant Design handles sorting automatically through the sorter functions
    applyFilters(searchTerm, activeTab);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setPagination(prev => ({
      ...prev,
      current: DEFAULT_PAGINATION.PAGE,
    }));
    applyFilters(searchTerm, key);
  };

  const tabItems = [
    { key: 'overview', label: resourceHelpers.getOrderText('TABS.OVERVIEW') },
    { key: 'in_progress', label: resourceHelpers.getOrderText('TABS.IN_PROGRESS') },
    { key: 'in_delivery', label: resourceHelpers.getOrderText('TABS.IN_DELIVERY') },
    { key: 'rejected', label: resourceHelpers.getOrderText('TABS.REJECTED') },
  ];

  // Handle pagination options - fallback to default if not available as array
  const pageSizeOptions = [10, 20, 50, 100].map(size => size.toString());

  return (
    <>
      <Input.Search
        placeholder={resourceHelpers.getOrderText('TABLE.PLACEHOLDERS.SEARCH')}
        value={searchTerm}
        onSearch={handleSearch}
        onChange={e => handleSearch(e.target.value)}
        onClear={handleClearSearch}
        style={{
          marginBottom: 24,
          maxWidth: 400,
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
        }}
        allowClear
      />

      <TabsWrapper>
        <Tabs activeKey={activeTab} onChange={handleTabChange} items={tabItems} />
      </TabsWrapper>
      <BaseTable<Order>
        columns={columns}
        data={data}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total: number, range: [number, number]) => {
            // Create translated pagination text
            const currentLanguage =
              resourceHelpers.getText('common.loading') === 'Loading...' ? 'en' : 'de';
            if (currentLanguage === 'de') {
              return `Zeige ${range[0]}-${range[1]} von ${total} Bestellungen`;
            } else {
              return `Showing ${range[0]}-${range[1]} of ${total} orders`;
            }
          },
          showQuickJumper: true,
          pageSizeOptions,
        }}
        onTableChange={handleTableChange}
        emptyText={resourceHelpers.getOrderText('TABLE.NO_RESULTS')}
      />

      <OrderDetailsModal open={modalOpen} order={selectedOrder} onClose={handleCloseModal} />
    </>
  );
};

export default OrdersTable;
