import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Button, Tooltip } from 'antd';
import { EyeOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig } from 'antd/es/table';
import { BaseTable, TableSearchAndFilter } from '../common';
import type { SortOption as TableSortOption } from '../common';
import { DEFAULT_PAGINATION } from '../../lib/constants';
import ProductDetailsModal from './ProductDetailsModal';
import { Product, ProductSortOption, PaginationState } from '../../types/user-managment.types';
import { useResourceHelpers } from '@/utils/i18nBridge';

const ProductsTable: React.FC = () => {
  const resourceHelpers = useResourceHelpers();
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState<ProductSortOption>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    current: DEFAULT_PAGINATION.PAGE,
    pageSize: DEFAULT_PAGINATION.LIMIT,
    total: 0,
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mock data - replace with your API call
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = allProducts;

    // Apply search filter
    if (searchText.trim()) {
      filtered = allProducts.filter(
        product =>
          product.artNr.toLowerCase().includes(searchText.toLowerCase()) ||
          product.title.toLowerCase().includes(searchText.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchText.toLowerCase()) ||
          product.manufacturer?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortOption) {
          case 'sales-high':
            return b.salesVolume - a.salesVolume;
          case 'sales-low':
            return a.salesVolume - b.salesVolume;
          case 'locations-high':
            return b.locations - a.locations;
          case 'locations-low':
            return a.locations - b.locations;
          case 'quantity-high':
            return b.crowd - a.crowd;
          case 'quantity-low':
            return a.crowd - b.crowd;
          case 'pictures-high': {
            const countA = Array.isArray(a.pictures) ? a.pictures.length : a.pictures || 0;
            const countB = Array.isArray(b.pictures) ? b.pictures.length : b.pictures || 0;
            return countB - countA;
          }
          case 'pictures-low': {
            const countA2 = Array.isArray(a.pictures) ? a.pictures.length : a.pictures || 0;
            const countB2 = Array.isArray(b.pictures) ? b.pictures.length : b.pictures || 0;
            return countA2 - countB2;
          }
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'title-desc':
            return b.title.localeCompare(a.title);
          case 'art-nr-asc':
            return a.artNr.localeCompare(b.artNr);
          case 'art-nr-desc':
            return b.artNr.localeCompare(a.artNr);
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [searchText, allProducts, sortOption]);

  // Update pagination when filtered data changes
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      total: filteredProducts.length,
      current: 1, // Reset to first page when filtering
    }));
  }, [filteredProducts]);

  const fetchProducts = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          id: '1',
          artNr: '12345678',
          pictures: 3,
          title: 'Premium Steel Wrench Set',
          locations: 12,
          crowd: 145,
          salesVolume: 28500.75,
          status: 'active',
          description: 'High-quality steel wrench set for professional use',
          category: 'Hand Tools',
          manufacturer: 'ProTools Inc.',
          unitPrice: 89.99,
          createdDate: '2023-01-15',
          lastUpdated: '2024-01-10',
        },
        {
          id: '2',
          artNr: '87654321',
          pictures: ['image1.jpg', 'image2.jpg'],
          title: 'Industrial Safety Helmet',
          locations: 8,
          crowd: 67,
          salesVolume: 15200.3,
          status: 'active',
          description: 'OSHA certified safety helmet with adjustable fit',
          category: 'Safety Equipment',
          manufacturer: 'SafetyFirst Corp.',
          unitPrice: 45.5,
          createdDate: '2023-02-20',
          lastUpdated: '2024-01-08',
        },
        {
          id: '3',
          artNr: '11223344',
          pictures: 0,
          title: 'Electric Motor 220V',
          locations: 5,
          crowd: 23,
          salesVolume: 45300.0,
          status: 'inactive',
          description: '1.5HP electric motor, 220V single phase',
          category: 'Electric Motors',
          manufacturer: 'ElectroMotors Ltd.',
          unitPrice: 299.99,
          createdDate: '2023-03-10',
          lastUpdated: '2023-12-15',
        },
        {
          id: '4',
          artNr: '99887766',
          pictures: 1,
          title: 'Hydraulic Pump Assembly',
          locations: 15,
          crowd: 89,
          salesVolume: 67850.25,
          status: 'active',
          description: 'High-pressure hydraulic pump for industrial applications',
          category: 'Hydraulic Equipment',
          manufacturer: 'HydrauliCorp',
          unitPrice: 1250.0,
          createdDate: '2023-04-05',
          lastUpdated: '2024-01-12',
        },
        {
          id: '5',
          artNr: '55443322',
          pictures: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'],
          title: 'Professional Tool Cabinet with Drawers',
          locations: 3,
          crowd: 12,
          salesVolume: 8750.5,
          status: 'active',
          description: 'Heavy-duty tool cabinet with 12 drawers and ball-bearing slides',
          category: 'Storage Solutions',
          manufacturer: 'OrganizePro',
          unitPrice: 899.99,
          createdDate: '2023-05-12',
          lastUpdated: '2024-01-05',
        },
      ];

      setAllProducts(mockProducts);
      setLoading(false);
    }, 1000);
  };

  // Get paginated data
  const paginatedData = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, pagination.current, pagination.pageSize]);

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
    setSortOption(value as ProductSortOption);
  };

  // View product details handler - opens modal
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleStatusChange = (productId: string, checked: boolean) => {
    const newStatus = checked ? 'active' : 'inactive';
    setAllProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, status: newStatus } : product
      )
    );
  };

  // Color functions
  const getSalesVolumeColor = (amount: number) => {
    if (amount === 0) return '#d9d9d9';
    if (amount < 20000) return '#fa8c16';
    if (amount < 50000) return '#1890ff';
    return '#52c41a';
  };

  const getCrowdColor = (count: number) => {
    if (count === 0) return '#f5222d'; // Red for out of stock
    if (count < 50) return '#fa8c16'; // Orange for low stock
    if (count < 100) return '#1890ff'; // Blue for medium stock
    return '#52c41a'; // Green for high stock
  };

  const getLocationsColor = (count: number) => {
    if (count === 0) return '#d9d9d9';
    if (count < 5) return '#fa8c16';
    if (count < 10) return '#1890ff';
    return '#52c41a';
  };

  const getPicturesColor = (count: number) => {
    if (count === 0) return '#f5222d'; // Red for no pictures
    if (count < 3) return '#fa8c16'; // Orange for few pictures
    if (count < 5) return '#1890ff'; // Blue for good amount
    return '#52c41a'; // Green for many pictures
  };

  // Format euro amount
  const formatEuroAmount = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Enhanced columns array
  const columns: ColumnsType<Product> = [
    {
      title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.COLUMNS.ART_NR'),
      dataIndex: 'artNr',
      key: 'artNr',
      width: 80,
      sorter: (a, b) => a.artNr.localeCompare(b.artNr),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.TOOLTIPS.SORT_BY_ART_NR'),
      },
      render: (artNr: string) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{artNr}</span>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.COLUMNS.PICTURES'),
      dataIndex: 'pictures',
      key: 'pictures',
      width: 60,
      align: 'center',
      sorter: (a, b) => {
        const countA = Array.isArray(a.pictures) ? a.pictures.length : a.pictures || 0;
        const countB = Array.isArray(b.pictures) ? b.pictures.length : b.pictures || 0;
        return countA - countB;
      },
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.TOOLTIPS.SORT_BY_PICTURES'),
      },
      render: (pictures: string[] | number) => {
        const count = Array.isArray(pictures) ? pictures.length : pictures || 0;
        const color = getPicturesColor(count);
        const pluralS = count === 1 ? '' : 's';
        return (
          <Tooltip
            title={resourceHelpers
              .getUserManagementText('PRODUCTS_TABLE.TOOLTIPS.PICTURES_COUNT')
              .replace('{count}', count.toString())
              .replace('{s}', pluralS)}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color,
                cursor: 'help',
              }}
            >
              {count}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.COLUMNS.TITLE'),
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.TOOLTIPS.SORT_BY_TITLE'),
      },
      render: (title: string) => (
        <Tooltip title={title}>
          <span style={{ fontWeight: 500 }}>{title}</span>
        </Tooltip>
      ),
    },
    {
      title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.COLUMNS.LOCATION'),
      dataIndex: 'locations',
      key: 'locations',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.locations - b.locations,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.TOOLTIPS.SORT_BY_LOCATIONS'),
      },
      render: (locations: number) => {
        const color = getLocationsColor(locations);
        const pluralS = locations === 1 ? '' : 's';
        return (
          <Tooltip
            title={resourceHelpers
              .getUserManagementText('PRODUCTS_TABLE.TOOLTIPS.AVAILABLE_IN_LOCATIONS')
              .replace('{count}', locations.toString())
              .replace('{s}', pluralS)}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color,
                cursor: 'help',
              }}
            >
              {locations}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.COLUMNS.CROWD'),
      dataIndex: 'crowd',
      key: 'crowd',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.crowd - b.crowd,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.TOOLTIPS.SORT_BY_QUANTITY'),
      },
      render: (crowd: number) => {
        const color = getCrowdColor(crowd);
        return (
          <Tooltip
            title={resourceHelpers
              .getUserManagementText('PRODUCTS_TABLE.TOOLTIPS.QUANTITY_AVAILABLE')
              .replace('{count}', crowd.toString())}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color,
                cursor: 'help',
              }}
            >
              {crowd.toLocaleString()}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.COLUMNS.SALES_VOLUME'),
      dataIndex: 'salesVolume',
      key: 'salesVolume',
      width: 130,
      align: 'right',
      sorter: (a, b) => a.salesVolume - b.salesVolume,
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText(
          'PRODUCTS_TABLE.TOOLTIPS.SORT_BY_SALES_VOLUME'
        ),
      },
      render: (value: number) => {
        const color = getSalesVolumeColor(value);
        return (
          <Tooltip
            title={resourceHelpers
              .getUserManagementText('PRODUCTS_TABLE.TOOLTIPS.TOTAL_REVENUE')
              .replace('{amount}', formatEuroAmount(value))}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color,
                cursor: 'help',
                fontFamily: 'monospace',
              }}
            >
              {formatEuroAmount(value)} €
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.COLUMNS.STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: {
        title: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.TOOLTIPS.SORT_BY_STATUS'),
      },
      render: (status: 'active' | 'inactive', record: Product) => (
        <Tooltip
          title={
            status === 'active'
              ? resourceHelpers.getUserManagementText('PRODUCTS_TABLE.TOOLTIPS.STATUS_ACTIVE')
              : resourceHelpers.getUserManagementText('PRODUCTS_TABLE.TOOLTIPS.STATUS_INACTIVE')
          }
        >
          <Switch
            checked={status === 'active'}
            onChange={checked => handleStatusChange(record.id, checked)}
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            size="small"
          />
        </Tooltip>
      ),
      filters: [
        {
          text: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.FILTERS.STATUS_ACTIVE'),
          value: 'active',
        },
        {
          text: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.FILTERS.STATUS_INACTIVE'),
          value: 'inactive',
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      key: 'actions',
      fixed: 'right',
      width: 80,
      align: 'center',
      render: (_, record: Product) => (
        <Tooltip
          title={resourceHelpers.getUserManagementText(
            'PRODUCTS_TABLE.TOOLTIPS.VIEW_PRODUCT_DETAILS'
          )}
        >
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
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

  // Get product sort options
  const getSortOptions = (): TableSortOption[] => [
    {
      value: 'sales-high',
      label: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.SORT_OPTIONS.SALES_HIGH_TO_LOW'),
      icon: <SortDescendingOutlined />,
    },
    {
      value: 'sales-low',
      label: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.SORT_OPTIONS.SALES_LOW_TO_HIGH'),
      icon: <SortAscendingOutlined />,
    },
    {
      value: 'locations-high',
      label: resourceHelpers.getUserManagementText(
        'PRODUCTS_TABLE.SORT_OPTIONS.LOCATIONS_HIGH_TO_LOW'
      ),
    },
    {
      value: 'locations-low',
      label: resourceHelpers.getUserManagementText(
        'PRODUCTS_TABLE.SORT_OPTIONS.LOCATIONS_LOW_TO_HIGH'
      ),
    },
    {
      value: 'quantity-high',
      label: resourceHelpers.getUserManagementText(
        'PRODUCTS_TABLE.SORT_OPTIONS.QUANTITY_HIGH_TO_LOW'
      ),
    },
    {
      value: 'quantity-low',
      label: resourceHelpers.getUserManagementText(
        'PRODUCTS_TABLE.SORT_OPTIONS.QUANTITY_LOW_TO_HIGH'
      ),
    },
    {
      value: 'pictures-high',
      label: resourceHelpers.getUserManagementText(
        'PRODUCTS_TABLE.SORT_OPTIONS.PICTURES_HIGH_TO_LOW'
      ),
    },
    {
      value: 'pictures-low',
      label: resourceHelpers.getUserManagementText(
        'PRODUCTS_TABLE.SORT_OPTIONS.PICTURES_LOW_TO_HIGH'
      ),
    },
    {
      value: 'title-asc',
      label: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.SORT_OPTIONS.TITLE_A_TO_Z'),
    },
    {
      value: 'title-desc',
      label: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.SORT_OPTIONS.TITLE_Z_TO_A'),
    },
    {
      value: 'art-nr-asc',
      label: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.SORT_OPTIONS.ART_NR_A_TO_Z'),
    },
    {
      value: 'art-nr-desc',
      label: resourceHelpers.getUserManagementText('PRODUCTS_TABLE.SORT_OPTIONS.ART_NR_Z_TO_A'),
    },
  ];

  return (
    <div>
      <TableSearchAndFilter
        searchPlaceholder={resourceHelpers.getUserManagementText(
          'PRODUCTS_TABLE.SEARCH.PLACEHOLDER'
        )}
        searchValue={searchText}
        onSearch={handleSearch}
        sortPlaceholder={resourceHelpers.getUserManagementText('PRODUCTS_TABLE.SEARCH.QUICK_SORT')}
        sortValue={sortOption}
        sortOptions={getSortOptions()}
        onSortChange={handleSortChange}
        itemCount={filteredProducts.length}
        itemTypeSingular={resourceHelpers.getUserManagementText(
          'PRODUCTS_TABLE.PAGINATION.PRODUCT_SINGULAR'
        )}
        itemTypePlural={resourceHelpers.getUserManagementText(
          'PRODUCTS_TABLE.PAGINATION.PRODUCT_PLURAL'
        )}
        isSorted={!!sortOption}
      />

      <BaseTable<Product>
        title={resourceHelpers.getUserManagementText('PRODUCTS_TABLE.TITLE')}
        columns={columns}
        data={paginatedData}
        rowKey="id"
        loading={loading}
        size="small"
        minWidth={1400}
        enableMobileView={true}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total, range) =>
            resourceHelpers
              .getUserManagementText('PRODUCTS_TABLE.PAGINATION.SHOWING_TEXT')
              .replace('{start}', range[0].toString())
              .replace('{end}', range[1].toString())
              .replace('{total}', total.toString())
              .replace('{s}', total === 1 ? '' : 's'),
          showQuickJumper: true,
          pageSizeOptions,
        }}
        onTableChange={handleTableChange}
        emptyText={
          searchText
            ? resourceHelpers
                .getUserManagementText('PRODUCTS_TABLE.EMPTY_STATE.NO_PRODUCTS_MATCHING')
                .replace('{search}', searchText)
            : resourceHelpers.getUserManagementText('PRODUCTS_TABLE.EMPTY_STATE.NO_PRODUCTS_FOUND')
        }
      />

      <ProductDetailsModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProductsTable;
