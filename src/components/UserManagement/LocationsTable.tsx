import React, { useState, useEffect, useMemo } from 'react';
import { Tooltip, Button, Tag } from 'antd';
import { EyeOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig } from 'antd/es/table';
import { BaseTable, TableSearchAndFilter } from '../common';
import type { SortOption as TableSortOption } from '../common';
import { DEFAULT_PAGINATION } from '../../lib/constants';
import type {
  Location,
  LocationSortOption,
  PaginationState,
} from '../../types/user-managment.types';
import LocationDetailsModal from './LocationDetailsModal';
import { useResourceHelpers } from '@/utils/i18nBridge';

// Helper function for text substitution
const substituteText = (
  template: string,
  substitutions: Record<string, string | number>
): string => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return substitutions[key]?.toString() || match;
  });
};

const LocationsTable: React.FC = () => {
  const resourceHelpers = useResourceHelpers();
  const [loading, setLoading] = useState(false);
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState<LocationSortOption>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    current: DEFAULT_PAGINATION.PAGE,
    pageSize: DEFAULT_PAGINATION.LIMIT,
    total: 0,
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Mock data - replace with your API call
  useEffect(() => {
    fetchLocations();
  }, []);

  // Filter and sort locations
  useEffect(() => {
    let filtered = allLocations;

    // Apply search filter
    if (searchText.trim()) {
      filtered = allLocations.filter(
        location =>
          location.locationId.toLowerCase().includes(searchText.toLowerCase()) ||
          location.userProfileName.toLowerCase().includes(searchText.toLowerCase()) ||
          location.area.toLowerCase().includes(searchText.toLowerCase()) ||
          location.logistic.toLowerCase().includes(searchText.toLowerCase())
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
            return a.userProfileName.localeCompare(b.userProfileName);
          case 'name-desc':
            return b.userProfileName.localeCompare(a.userProfileName);
          case 'sales-high':
            return b.salesVolume - a.salesVolume;
          case 'sales-low':
            return a.salesVolume - b.salesVolume;
          case 'articles-high':
            return b.articles - a.articles;
          case 'articles-low':
            return a.articles - b.articles;
          default:
            return 0;
        }
      });
    }

    setFilteredLocations(filtered);
  }, [searchText, allLocations, sortOption]);

  // Update pagination when filtered data changes
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      total: filteredLocations.length,
      current: 1, // Reset to first page when filtering
    }));
  }, [filteredLocations]);

  const fetchLocations = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Sample mock data with location IDs and placeholder values
      const mockLocations: Location[] = [
        {
          locationId: 'LOC-001',
          userProfileName: 'john_admin',
          area: 'DE_22',
          cover: 'ja',
          logistic: 'Express',
          articles: 45,
          salesVolume: 125670.5,
          address: '123 Hauptstraße, 10115 Berlin, Germany',
          phone: '+49 30 12345678',
          email: 'berlin.warehouse@company.com',
          activeTypes: ['Electronics', 'Books', 'Clothing'],
          managerId: 'MGR-001',
          establishedDate: '2022-03-15',
          lastActivity: '2024-01-15 14:30',
          status: 'active',
        },
        {
          locationId: 'LOC-002',
          userProfileName: 'jane_marketing',
          area: 'DE_25',
          cover: 'ne',
          logistic: 'Standard',
          articles: 0,
          salesVolume: 0,
          address: '456 Münchener Str, 80331 München, Germany',
          phone: '+49 89 87654321',
          email: 'munich.storage@company.com',
          activeTypes: [],
          managerId: 'MGR-002',
          establishedDate: '2023-01-10',
          lastActivity: '2024-01-10 09:15',
          status: 'inactive',
        },
        {
          locationId: 'LOC-003',
          userProfileName: 'bob_sales_mgr',
          area: 'DE_26',
          cover: 'ja',
          logistic: 'Premium',
          articles: 127,
          salesVolume: 287340.25,
          address: '789 Hafenstraße, 20359 Hamburg, Germany',
          phone: '+49 40 11223344',
          email: 'hamburg.hub@company.com',
          activeTypes: ['Electronics', 'Sports', 'Home & Garden'],
          managerId: 'MGR-003',
          establishedDate: '2021-08-22',
          lastActivity: '2024-01-16 11:45',
          status: 'active',
        },
        {
          locationId: 'LOC-004',
          userProfileName: 'alice_hr',
          area: 'DE_27',
          cover: 'ne',
          logistic: 'Economy',
          articles: 23,
          salesVolume: 45210.8,
          address: '321 Königsallee, 40212 Düsseldorf, Germany',
          phone: '+49 211 55667788',
          email: 'duesseldorf.center@company.com',
          activeTypes: ['Fashion', 'Beauty'],
          managerId: 'MGR-004',
          establishedDate: '2023-06-05',
          lastActivity: '2024-01-12 16:20',
          status: 'maintenance',
        },
        {
          locationId: 'LOC-005',
          userProfileName: 'charlie_it_admin',
          area: 'DE_28',
          cover: 'ja',
          logistic: 'Express',
          articles: 89,
          salesVolume: 198760.15,
          address: '654 Zeil, 60313 Frankfurt am Main, Germany',
          phone: '+49 69 99887766',
          email: 'frankfurt.depot@company.com',
          activeTypes: ['Electronics', 'Books', 'Office Supplies'],
          managerId: 'MGR-005',
          establishedDate: '2022-11-18',
          lastActivity: '2024-01-16 13:10',
          status: 'active',
        },
      ];

      setAllLocations(mockLocations);
      setLoading(false);
    }, 1000);
  };

  // Get paginated data
  const paginatedData = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return filteredLocations.slice(start, end);
  }, [filteredLocations, pagination.current, pagination.pageSize]);

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
    setSortOption(value as LocationSortOption);
  };

  // Handle view location details
  const handleViewLocationDetails = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
  };

  // Handle location ID click (for hyperlink)
  const handleLocationClick = (locationId: string) => {
    console.log(
      resourceHelpers.getUserManagementText('LOCATIONS_TABLE.CONSOLE_MESSAGES.LOCATION_ID_CLICKED'),
      locationId
    );
    // TODO: Navigate to location details page or open modal
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

  // Get sales volume color based on amount
  const getSalesVolumeColor = (amount: number) => {
    if (amount === 0) return '#d9d9d9';
    if (amount < 50000) return '#fa8c16';
    if (amount < 150000) return '#1890ff';
    return '#52c41a';
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

  // Get location sort options
  const getSortOptions = (): TableSortOption[] => [
    {
      value: 'newest',
      label: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.SORT_OPTIONS.NEWEST_FIRST'),
      icon: <SortDescendingOutlined />,
    },
    {
      value: 'oldest',
      label: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.SORT_OPTIONS.OLDEST_FIRST'),
      icon: <SortAscendingOutlined />,
    },
    {
      value: 'sales-high',
      label: resourceHelpers.getUserManagementText(
        'LOCATIONS_TABLE.SORT_OPTIONS.SALES_HIGH_TO_LOW'
      ),
    },
    {
      value: 'sales-low',
      label: resourceHelpers.getUserManagementText(
        'LOCATIONS_TABLE.SORT_OPTIONS.SALES_LOW_TO_HIGH'
      ),
    },
    {
      value: 'articles-high',
      label: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.SORT_OPTIONS.MOST_ARTICLES'),
    },
    {
      value: 'articles-low',
      label: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.SORT_OPTIONS.FEWEST_ARTICLES'),
    },
    {
      value: 'name-asc',
      label: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.SORT_OPTIONS.USER_NAME_A_TO_Z'),
    },
    {
      value: 'name-desc',
      label: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.SORT_OPTIONS.USER_NAME_Z_TO_A'),
    },
  ];

  // Columns array with improved design and enhanced sorting
  const columns: ColumnsType<Location> = [
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.LOCATION_ID'),
      dataIndex: 'locationId',
      key: 'locationId',
      width: 100,
      sorter: (a, b) => a.locationId.localeCompare(b.locationId),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText(
          'LOCATIONS_TABLE.TOOLTIPS.SORT_BY_LOCATION_ID'
        ),
      },
      render: (locationId: string) => (
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            handleLocationClick(locationId);
          }}
          style={{
            fontFamily: 'monospace',
            fontWeight: 600,
            color: '#1890ff',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          {locationId}
        </a>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.USER'),
      dataIndex: 'userProfileName',
      key: 'userProfileName',
      width: 140,
      sorter: (a, b) => a.userProfileName.localeCompare(b.userProfileName),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.TOOLTIPS.SORT_BY_USER_NAME'),
      },
      render: (userProfileName: string) => (
        <span
          style={{
            fontWeight: 600,
            color: '#1890ff',
            fontFamily: 'monospace',
          }}
        >
          @{userProfileName}
        </span>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.AREA'),
      dataIndex: 'area',
      key: 'area',
      width: 100,
      sorter: (a, b) => a.area.localeCompare(b.area),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.TOOLTIPS.SORT_BY_AREA'),
      },
      render: (area: string) => (
        <Tag color="blue" style={{ fontFamily: 'monospace', fontWeight: 500 }}>
          {area}
        </Tag>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.COVER'),
      dataIndex: 'cover',
      key: 'cover',
      width: 90,
      align: 'center',
      sorter: (a, b) => a.cover.localeCompare(b.cover),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.TOOLTIPS.SORT_BY_COVERAGE'),
      },
      render: (cover: 'ja' | 'ne') => (
        <Tag
          color={cover === 'ja' ? 'success' : 'error'}
          style={{ fontWeight: 600, textTransform: 'uppercase' }}
        >
          {cover}
        </Tag>
      ),
      filters: [
        {
          text: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.FILTERS.COVER_YES'),
          value: 'ja',
        },
        {
          text: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.FILTERS.COVER_NO'),
          value: 'ne',
        },
      ],
      onFilter: (value, record) => record.cover === value,
    },
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.ARTICLES'),
      dataIndex: 'articles',
      key: 'articles',
      width: 90,
      align: 'center',
      sorter: (a, b) => a.articles - b.articles,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText(
          'LOCATIONS_TABLE.TOOLTIPS.SORT_BY_ARTICLE_COUNT'
        ),
      },
      render: (articles: number) => (
        <span
          style={{
            fontWeight: 600,
            color: articles === 0 ? '#d9d9d9' : '#52c41a',
            fontSize: '14px',
          }}
        >
          {articles.toLocaleString()}
        </span>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.LOGISTIC'),
      dataIndex: 'logistic',
      key: 'logistic',
      width: 110,
      sorter: (a, b) => a.logistic.localeCompare(b.logistic),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText(
          'LOCATIONS_TABLE.TOOLTIPS.SORT_BY_LOGISTIC_TYPE'
        ),
      },
      render: (logistic: string) => {
        const colorMap: { [key: string]: string } = {
          Express: 'red',
          Premium: 'purple',
          Standard: 'blue',
          Economy: 'green',
        };
        return <Tag color={colorMap[logistic] || 'default'}>{logistic}</Tag>;
      },
    },
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.SALES_VOLUME'),
      dataIndex: 'salesVolume',
      key: 'salesVolume',
      width: 130,
      align: 'right',
      sorter: (a, b) => a.salesVolume - b.salesVolume,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText(
          'LOCATIONS_TABLE.TOOLTIPS.SORT_BY_SALES_VOLUME'
        ),
      },
      render: (salesVolume: number) => (
        <Tooltip
          title={substituteText(
            resourceHelpers.getUserManagementText('LOCATIONS_TABLE.TOOLTIPS.TOTAL_REVENUE'),
            {
              amount: formatEuroAmount(salesVolume),
            }
          )}
        >
          <span
            style={{
              fontWeight: 600,
              color: getSalesVolumeColor(salesVolume),
              fontSize: '14px',
              fontFamily: 'monospace',
            }}
          >
            {formatEuroAmount(salesVolume)} €
          </span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('LOCATIONS_TABLE.COLUMNS.DATE_CREATED'),
      dataIndex: 'establishedDate',
      key: 'establishedDate',
      width: 110,
      align: 'center',
      sorter: (a, b) =>
        new Date(a.establishedDate).getTime() - new Date(b.establishedDate).getTime(),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText(
          'LOCATIONS_TABLE.TOOLTIPS.SORT_BY_CREATION_DATE'
        ),
      },
      render: (establishedDate: string) => (
        <Tooltip
          title={substituteText(
            resourceHelpers.getUserManagementText('LOCATIONS_TABLE.TOOLTIPS.ESTABLISHED'),
            {
              date: formatDate(establishedDate),
            }
          )}
        >
          <span
            style={{
              fontWeight: 500,
              color: getDateColor(establishedDate),
              fontSize: '13px',
              fontFamily: 'monospace',
            }}
          >
            {formatDate(establishedDate)}
          </span>
        </Tooltip>
      ),
    },
    {
      key: 'actions',
      fixed: 'right',
      width: 80,
      align: 'center',
      render: (_, record: Location) => (
        <Tooltip
          title={resourceHelpers.getUserManagementText(
            'LOCATIONS_TABLE.TOOLTIPS.VIEW_LOCATION_DETAILS'
          )}
        >
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewLocationDetails(record)}
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
          'LOCATIONS_TABLE.SEARCH.PLACEHOLDER'
        )}
        searchValue={searchText}
        onSearch={handleSearch}
        sortPlaceholder={resourceHelpers.getUserManagementText('LOCATIONS_TABLE.SEARCH.QUICK_SORT')}
        sortValue={sortOption}
        sortOptions={getSortOptions()}
        onSortChange={handleSortChange}
        itemCount={filteredLocations.length}
        itemTypeSingular="location"
        itemTypePlural="location"
        isSorted={!!sortOption}
      />

      <BaseTable<Location>
        title={resourceHelpers.getUserManagementText('LOCATIONS_TABLE.TITLE')}
        columns={columns}
        data={paginatedData}
        rowKey="locationId"
        loading={loading}
        size="small"
        minWidth={1300}
        enableMobileView={true}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return substituteText(
              resourceHelpers.getUserManagementText('LOCATIONS_TABLE.PAGINATION.SHOWING_TEXT'),
              {
                start: range[0].toString(),
                end: range[1].toString(),
                total: total.toString(),
                s: total === 1 ? '' : 's',
              }
            );
          },
          showQuickJumper: true,
          pageSizeOptions,
        }}
        onTableChange={handleTableChange}
        emptyText={
          searchText
            ? substituteText(
                resourceHelpers.getUserManagementText(
                  'LOCATIONS_TABLE.EMPTY_STATE.NO_LOCATIONS_MATCHING'
                ),
                {
                  search: searchText,
                }
              )
            : resourceHelpers.getUserManagementText(
                'LOCATIONS_TABLE.EMPTY_STATE.NO_LOCATIONS_FOUND'
              )
        }
      />

      {selectedLocation && (
        <LocationDetailsModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          location={selectedLocation}
        />
      )}
    </div>
  );
};

export default LocationsTable;
