import React, { useState, useEffect, useMemo } from 'react';
import { Tooltip, Button } from 'antd';
import {
  TruckOutlined,
  AlertOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig } from 'antd/es/table';
import { BaseTable, TableSearchAndFilter } from '../common';
import type { SortOption as TableSortOption } from '../common';
import { DEFAULT_PAGINATION } from '../../lib/constants';
import type {
  LogisticsData,
  LogisticsType,
  LogisticsSortOption,
  PaginationState,
} from '../../types/user-managment.types';
import LogisticsDetailsModal from './LogisticsDetailsModal';
import { useResourceHelpers } from '@/utils/i18nBridge';

const LogisticsTable: React.FC = () => {
  const resourceHelpers = useResourceHelpers();
  const [loading, setLoading] = useState(false);
  const [allLogistics, setAllLogistics] = useState<LogisticsData[]>([]);
  const [filteredLogistics, setFilteredLogistics] = useState<LogisticsData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState<LogisticsSortOption>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    current: DEFAULT_PAGINATION.PAGE,
    pageSize: DEFAULT_PAGINATION.LIMIT,
    total: 0,
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLogistics, setSelectedLogistics] = useState<LogisticsData | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchLogistics();
  }, []);

  // Filter and sort logistics
  useEffect(() => {
    let filtered = allLogistics;

    // Apply search filter
    if (searchText.trim()) {
      filtered = allLogistics.filter(
        logistics =>
          logistics.logisticNr.toLowerCase().includes(searchText.toLowerCase()) ||
          logistics.name.toLowerCase().includes(searchText.toLowerCase()) ||
          logistics.type.toLowerCase().includes(searchText.toLowerCase()) ||
          logistics.address?.toLowerCase().includes(searchText.toLowerCase()) ||
          logistics.email?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortOption) {
          case 'newest':
            return new Date(b.establishedDate).getTime() - new Date(a.establishedDate).getTime();
          case 'oldest':
            return new Date(a.establishedDate).getTime() - new Date(b.establishedDate).getTime();
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'sales-high':
            return b.salesVolume - a.salesVolume;
          case 'sales-low':
            return a.salesVolume - b.salesVolume;
          case 'tours-high':
            return b.tours - a.tours;
          case 'tours-low':
            return a.tours - b.tours;
          case 'regions-high':
            return b.regions - a.regions;
          case 'regions-low':
            return a.regions - b.regions;
          default:
            return 0;
        }
      });
    }

    setFilteredLogistics(filtered);
  }, [searchText, allLogistics, sortOption]);

  // Update pagination when filtered data changes
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      total: filteredLogistics.length,
      current: 1, // Reset to first page when filtering
    }));
  }, [filteredLogistics]);

  const fetchLogistics = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockData: LogisticsData[] = [
        {
          id: '1',
          logisticNr: '1234567890',
          name: 'DHL Express Service',
          type: 'General Cargo',
          regions: 15,
          locations: 127,
          tours: 1842,
          salesVolume: 2845670.5,
          address: '123 Logistics Avenue, 10115 Berlin, Germany',
          phone: '+49 30 12345678',
          email: 'info@dhl-express.com',
          establishedDate: '2020-03-15',
          lastActivity: '2024-01-16 14:30',
          status: 'active',
        },
        {
          id: '2',
          logisticNr: '2345678901',
          name: 'UPS Premium Logistics',
          type: 'Special Cargo',
          regions: 8,
          locations: 89,
          tours: 956,
          salesVolume: 1567890.25,
          address: '456 Transport Street, 80331 München, Germany',
          phone: '+49 89 87654321',
          email: 'premium@ups-logistics.com',
          establishedDate: '2021-07-22',
          lastActivity: '2024-01-15 10:45',
          status: 'active',
        },
        {
          id: '3',
          logisticNr: '3456789012',
          name: 'FedEx International',
          type: 'Regional Delivery',
          regions: 22,
          locations: 245,
          tours: 2367,
          salesVolume: 3912456.75,
          address: '789 Delivery Plaza, 20359 Hamburg, Germany',
          phone: '+49 40 11223344',
          email: 'international@fedex.com',
          establishedDate: '2019-11-08',
          lastActivity: '2024-01-16 16:20',
          status: 'active',
        },
        {
          id: '4',
          logisticNr: '4567890123',
          name: 'Regional Express GmbH',
          type: 'Regional Delivery',
          regions: 5,
          locations: 34,
          tours: 456,
          salesVolume: 678923.4,
          address: '321 Regional Road, 60313 Frankfurt, Germany',
          phone: '+49 69 99887766',
          email: 'service@regional-express.de',
          establishedDate: '2022-02-14',
          lastActivity: '2024-01-14 09:15',
          status: 'maintenance',
        },
      ];

      setAllLogistics(mockData);
      setLoading(false);
    }, 1000);
  };

  // Get paginated data
  const paginatedData = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return filteredLogistics.slice(start, end);
  }, [filteredLogistics, pagination.current, pagination.pageSize]);

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
    setSortOption(value as LogisticsSortOption);
  };

  // Handle view logistics details
  const handleViewLogisticsDetails = (logistics: LogisticsData) => {
    setSelectedLogistics(logistics);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLogistics(null);
  };

  // Format euro amount
  const formatEuroAmount = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Get sales volume color based on amount
  const getSalesVolumeColor = (amount: number) => {
    if (amount === 0) return '#d9d9d9';
    if (amount < 1000000) return '#fa8c16';
    if (amount < 3000000) return '#1890ff';
    return '#52c41a';
  };

  // Get tours color based on count
  const getToursColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 1000) return '#fa8c16';
    if (count < 2000) return '#1890ff';
    return '#52c41a';
  };

  // Get regions color based on count
  const getRegionsColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 10) return '#fa8c16';
    if (count < 20) return '#1890ff';
    return '#52c41a';
  };

  // Get locations color based on count
  const getLocationsColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 50) return '#fa8c16';
    if (count < 150) return '#1890ff';
    return '#52c41a';
  };

  // Get icon and color for logistics type
  const getTypeIcon = (type: LogisticsType) => {
    switch (type) {
      case 'General Cargo':
        return <TruckOutlined style={{ color: '#1890ff', fontSize: '16px' }} />;
      case 'Special Cargo':
        return <AlertOutlined style={{ color: '#fa8c16', fontSize: '16px' }} />;
      case 'Regional Delivery':
        return <EnvironmentOutlined style={{ color: '#52c41a', fontSize: '16px' }} />;
      default:
        return null;
    }
  };

  // Get logistics sort options
  const getSortOptions = (): TableSortOption[] => [
    {
      value: 'newest',
      label: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.SORT_OPTIONS.NEWEST_FIRST'),
      icon: <SortDescendingOutlined />,
    },
    {
      value: 'oldest',
      label: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.SORT_OPTIONS.OLDEST_FIRST'),
      icon: <SortAscendingOutlined />,
    },
    {
      value: 'sales-high',
      label: resourceHelpers.getUserManagementText(
        'LOGISTICS_TABLE.SORT_OPTIONS.SALES_HIGH_TO_LOW'
      ),
    },
    {
      value: 'sales-low',
      label: resourceHelpers.getUserManagementText(
        'LOGISTICS_TABLE.SORT_OPTIONS.SALES_LOW_TO_HIGH'
      ),
    },
    {
      value: 'tours-high',
      label: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.SORT_OPTIONS.MOST_TOURS'),
    },
    {
      value: 'tours-low',
      label: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.SORT_OPTIONS.FEWEST_TOURS'),
    },
    {
      value: 'regions-high',
      label: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.SORT_OPTIONS.MOST_REGIONS'),
    },
    {
      value: 'regions-low',
      label: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.SORT_OPTIONS.FEWEST_REGIONS'),
    },
    {
      value: 'name-asc',
      label: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.SORT_OPTIONS.NAME_A_TO_Z'),
    },
    {
      value: 'name-desc',
      label: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.SORT_OPTIONS.NAME_Z_TO_A'),
    },
  ];

  const columns: ColumnsType<LogisticsData> = [
    {
      title: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.COLUMNS.LOGISTIC_NR'),
      dataIndex: 'logisticNr',
      key: 'logisticNr',
      width: 150,
      sorter: (a, b) => a.logisticNr.localeCompare(b.logisticNr),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText(
          'LOGISTICS_TABLE.TOOLTIPS.SORT_BY_LOGISTIC_NR'
        ),
      },
      render: (logisticNr: string) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{logisticNr}</span>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.COLUMNS.NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.TOOLTIPS.SORT_BY_NAME'),
      },
      render: (name: string) => <span style={{ fontWeight: 500 }}>{name}</span>,
    },
    {
      title: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.COLUMNS.TYPE'),
      dataIndex: 'type',
      key: 'type',
      width: 120,
      align: 'center',
      render: (type: LogisticsType) => <Tooltip title={type}>{getTypeIcon(type)}</Tooltip>,
      filters: [
        { text: 'General Cargo', value: 'General Cargo' },
        { text: 'Special Cargo', value: 'Special Cargo' },
        { text: 'Regional Delivery', value: 'Regional Delivery' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.COLUMNS.REGION'),
      dataIndex: 'regions',
      key: 'regions',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.regions - b.regions,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.TOOLTIPS.SORT_BY_REGIONS'),
      },
      render: (regions: number) => (
        <Tooltip title={`Covers ${regions} regions`}>
          <span
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: getRegionsColor(regions),
              cursor: 'help',
            }}
          >
            {regions}
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.COLUMNS.LOCATION'),
      dataIndex: 'locations',
      key: 'locations',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.locations - b.locations,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.TOOLTIPS.SORT_BY_LOCATIONS'),
      },
      render: (locations: number) => (
        <Tooltip title={`Covers ${locations} locations`}>
          <span
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: getLocationsColor(locations),
              cursor: 'help',
            }}
          >
            {locations}
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.COLUMNS.TOURS'),
      dataIndex: 'tours',
      key: 'tours',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.tours - b.tours,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.TOOLTIPS.SORT_BY_TOURS'),
      },
      render: (tours: number) => (
        <Tooltip title={`${tours.toLocaleString()} tours completed`}>
          <span
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: getToursColor(tours),
              cursor: 'help',
            }}
          >
            {tours.toLocaleString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('LOGISTICS_TABLE.COLUMNS.SALES_VOLUME'),
      dataIndex: 'salesVolume',
      key: 'salesVolume',
      width: 140,
      align: 'right',
      sorter: (a, b) => a.salesVolume - b.salesVolume,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText(
          'LOGISTICS_TABLE.TOOLTIPS.SORT_BY_SALES_VOLUME'
        ),
      },
      render: (salesVolume: number) => (
        <Tooltip title={`Total revenue: ${formatEuroAmount(salesVolume)} €`}>
          <span
            style={{
              fontWeight: 600,
              color: getSalesVolumeColor(salesVolume),
              fontSize: '14px',
              fontFamily: 'monospace',
              cursor: 'help',
            }}
          >
            {formatEuroAmount(salesVolume)} €
          </span>
        </Tooltip>
      ),
    },
    {
      key: 'actions',
      fixed: 'right' as const,
      width: 80,
      align: 'center' as const,
      render: (value: LogisticsData, record: LogisticsData) => (
        <Tooltip
          title={resourceHelpers.getUserManagementText(
            'LOGISTICS_TABLE.TOOLTIPS.VIEW_LOGISTICS_DETAILS'
          )}
        >
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewLogisticsDetails(record)}
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

  return (
    <div>
      <TableSearchAndFilter
        searchPlaceholder={resourceHelpers.getUserManagementText(
          'LOGISTICS_TABLE.SEARCH.PLACEHOLDER'
        )}
        searchValue={searchText}
        onSearch={handleSearch}
        sortPlaceholder={resourceHelpers.getUserManagementText('LOGISTICS_TABLE.SEARCH.QUICK_SORT')}
        sortValue={sortOption}
        sortOptions={getSortOptions()}
        onSortChange={handleSortChange}
        itemCount={filteredLogistics.length}
        itemTypeSingular={resourceHelpers.getUserManagementText(
          'LOGISTICS_TABLE.PAGINATION.LOGISTICS_SINGULAR'
        )}
        itemTypePlural={resourceHelpers.getUserManagementText(
          'LOGISTICS_TABLE.PAGINATION.LOGISTICS_PLURAL'
        )}
        isSorted={!!sortOption}
      />

      <BaseTable<LogisticsData>
        title={resourceHelpers.getUserManagementText('LOGISTICS_TABLE.TITLE')}
        columns={columns}
        data={paginatedData}
        rowKey="id"
        loading={loading}
        size="small"
        minWidth={1200}
        enableMobileView={true}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} logistics carrier${total !== 1 ? 's' : ''}`,
          showQuickJumper: true,
          pageSizeOptions,
        }}
        onTableChange={handleTableChange}
        emptyText={
          searchText
            ? `No logistics carriers found matching "${searchText}"`
            : resourceHelpers.getUserManagementText(
                'LOGISTICS_TABLE.EMPTY_STATE.NO_LOGISTICS_FOUND'
              )
        }
      />

      {selectedLogistics && (
        <LogisticsDetailsModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          logistics={selectedLogistics}
        />
      )}
    </div>
  );
};

export default LogisticsTable;
