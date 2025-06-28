import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig } from 'antd/es/table';
import { DEFAULT_PAGINATION } from '../../lib/constants';
import { useResourceHelpers } from '@/utils/i18nBridge';
import { BaseTable } from '../common';
import { ProductVariationsService } from '../../services/product-variations.service';
import AddProductVariationModal from './AddProductVariationModal';
import DeleteProductVariationModal from './DeleteProductVariationModal';
import { StyledDropdown, ActionButton } from './ProductVariationsTable.styles';
import { ProductVariationType } from '@/types/product-variation.type';

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

const productVariationsService = new ProductVariationsService();

const ProductVariationsTable: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductVariationType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingVariation, setEditingVariation] = useState<ProductVariationType | undefined>();
  const [deletingVariation, setDeletingVariation] = useState<ProductVariationType | undefined>();
  const [pagination, setPagination] = useState<PaginationState>({
    current: DEFAULT_PAGINATION.PAGE,
    pageSize: DEFAULT_PAGINATION.LIMIT,
    total: 0,
  });

  const resourceHelpers = useResourceHelpers();

  const handleEdit = (record: ProductVariationType) => {
    setEditingVariation(record);
    setIsModalOpen(true);
  };

  const handleDelete = (record: ProductVariationType) => {
    setDeletingVariation(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingVariation) return;

    try {
      setLoading(true);
      await productVariationsService.remove(deletingVariation.id || '');
      message.success(resourceHelpers.getProductVariationText('TABLE.ACTIONS.DELETE_SUCCESS'));
      await fetchProductVariations();
    } catch (error) {
      message.error(resourceHelpers.getProductVariationText('ERRORS.DELETE_FAILED'));
      console.error('Error deleting product variation:', error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setDeletingVariation(undefined);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingVariation(undefined);
  };

  const handleModalSuccess = () => {
    fetchProductVariations();
  };

  const columns: ColumnsType<ProductVariationType> = [
    {
      title: resourceHelpers.getProductVariationText('TABLE.COLUMNS.NAME'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: resourceHelpers.getProductVariationText('TABLE.COLUMNS.DESCRIPTION'),
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: resourceHelpers.getProductVariationText('MODAL.FIELDS.UI_TYPE.LABEL'),
      dataIndex: 'uI_Type',
      key: 'uI_Type',
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: (_, record) => (
        <StyledDropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: resourceHelpers.getProductVariationText('TABLE.ACTIONS.EDIT'),
                icon: <EditOutlined />,
                onClick: () => handleEdit(record),
              },
              {
                key: 'delete',
                label: resourceHelpers.getProductVariationText('TABLE.ACTIONS.DELETE'),
                icon: <DeleteOutlined />,
                onClick: () => handleDelete(record),
              },
            ],
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <ActionButton
            type="text"
            icon={<MoreOutlined />}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
        </StyledDropdown>
      ),
    },
  ];

  const fetchProductVariations = async (
    page = pagination.current,
    pageSize = pagination.pageSize
  ) => {
    try {
      setLoading(true);
      const response = await productVariationsService.getAll();
      if (response.data) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = response.data.slice(start, end);

        setData(paginatedData);
        setPagination(prev => ({
          ...prev,
          total: response.data.length,
        }));
      } else {
        message.error(resourceHelpers.getProductVariationText('ERRORS.FETCH_FAILED'));
        console.error('Failed to fetch product variations:', response);
      }
    } catch (error) {
      message.error(resourceHelpers.getProductVariationText('ERRORS.FETCH_FAILED'));
      console.error('Error fetching product variations:', error);
      setData([]);
      setPagination(prev => ({
        ...prev,
        total: 0,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductVariations();
  }, []);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    const current = newPagination.current || 1;
    const pageSize = newPagination.pageSize || DEFAULT_PAGINATION.LIMIT;

    setPagination(prev => ({
      ...prev,
      current,
      pageSize,
    }));

    fetchProductVariations(current, pageSize);
  };

  const handleAddNew = () => {
    setEditingVariation(undefined);
    setIsModalOpen(true);
  };

  const pageSizeOptions = resourceHelpers
    .getProductVariationText('PAGINATION.PAGE_SIZE_OPTIONS')
    ?.split(',') || ['10', '20', '50'];

  return (
    <>
      <BaseTable<ProductVariationType>
        title={resourceHelpers.getProductVariationText('TITLE')}
        columns={columns}
        data={data}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: total =>
            resourceHelpers.getProductVariationText('TABLE.TOTAL_ITEMS', { total }),
          showQuickJumper: true,
          pageSizeOptions,
        }}
        onTableChange={handleTableChange}
        emptyText={resourceHelpers.getProductVariationText('TABLE.NO_RESULTS')}
        addButton={{
          text: resourceHelpers.getProductVariationText('TABLE.ACTIONS.ADD'),
          onClick: handleAddNew,
        }}
      />
      <AddProductVariationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        editData={editingVariation}
      />
      <DeleteProductVariationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingVariation(undefined);
        }}
        onConfirm={handleDeleteConfirm}
        variation={deletingVariation}
      />
    </>
  );
};

export default ProductVariationsTable;
