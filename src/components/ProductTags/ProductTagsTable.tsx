import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig } from 'antd/es/table';
import { DEFAULT_PAGINATION } from '../../lib/constants';
import { useResourceHelpers } from '@/utils/i18nBridge';
import { StyledDropdown, ActionButton } from './ProductTagsTable.styles';
import { ProductTagsService } from '../../services/product-tags.service';
import { ProductTag } from '../../types/product-tags.types';
import AddProductTagModal from './AddProductTagModal';
import DeleteProductTagModal from './DeleteProductTagModal';
import { BaseTable } from '../common';

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

const productTagsService = new ProductTagsService();

const ProductTagsTable: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductTag[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<ProductTag | undefined>();
  const [deletingTag, setDeletingTag] = useState<ProductTag | undefined>();
  const [pagination, setPagination] = useState<PaginationState>({
    current: DEFAULT_PAGINATION.PAGE,
    pageSize: DEFAULT_PAGINATION.LIMIT,
    total: 0,
  });

  const resourceHelpers = useResourceHelpers();

  const handleEdit = (record: ProductTag) => {
    setEditingTag(record);
    setIsModalOpen(true);
  };

  const handleDelete = (record: ProductTag) => {
    setDeletingTag(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTag) return;

    try {
      setLoading(true);
      await productTagsService.remove(deletingTag.id);
      message.success(resourceHelpers.getProductTagText('TABLE.ACTIONS.DELETE_SUCCESS'));
      await fetchProductTags();
    } catch (error) {
      message.error(resourceHelpers.getProductTagText('ERRORS.DELETE_FAILED'));
      console.error('Error deleting product tag:', error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setDeletingTag(undefined);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTag(undefined);
  };

  const handleModalSuccess = () => {
    fetchProductTags();
  };

  const columns: ColumnsType<ProductTag> = [
    {
      title: resourceHelpers.getProductTagText('TABLE.COLUMNS.NAME'),
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: resourceHelpers.getProductTagText('TABLE.COLUMNS.DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
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
                label: resourceHelpers.getProductTagText('TABLE.ACTIONS.EDIT'),
                icon: <EditOutlined />,
                onClick: () => handleEdit(record),
              },
              {
                key: 'delete',
                label: resourceHelpers.getProductTagText('TABLE.ACTIONS.DELETE'),
                icon: <DeleteOutlined />,
                onClick: () => handleDelete(record),
              },
            ],
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <ActionButton type="text" icon={<MoreOutlined />} onClick={e => e.stopPropagation()} />
        </StyledDropdown>
      ),
    },
  ];

  const fetchProductTags = async (page = pagination.current, pageSize = pagination.pageSize) => {
    try {
      setLoading(true);
      const response = await productTagsService.getAll();
      if (response.data) {
        // Calculate pagination
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = response.data.slice(start, end);

        setData(paginatedData);
        setPagination(prev => ({
          ...prev,
          total: response.data.length,
        }));
      } else {
        message.error(resourceHelpers.getProductTagText('ERRORS.FETCH_FAILED'));
        console.error('Failed to fetch product tags:', response);
      }
    } catch (error) {
      message.error(resourceHelpers.getProductTagText('ERRORS.FETCH_FAILED'));
      console.error('Error fetching product tags:', error);
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
    fetchProductTags();
  }, []);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    const current = newPagination.current || 1;
    const pageSize = newPagination.pageSize || DEFAULT_PAGINATION.LIMIT;

    setPagination(prev => ({
      ...prev,
      current,
      pageSize,
    }));

    fetchProductTags(current, pageSize);
  };

  const handleAddNew = () => {
    setEditingTag(undefined);
    setIsModalOpen(true);
  };

  // Convert page size options to strings for the BaseTable
  const pageSizeOptions = resourceHelpers
    .getProductTagText('PAGINATION.PAGE_SIZE_OPTIONS')
    ?.split(',') || ['10', '20', '50'];

  return (
    <>
      <BaseTable<ProductTag>
        title={resourceHelpers.getProductTagText('TITLE')}
        columns={columns}
        data={data}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: total => resourceHelpers.getProductTagText('TABLE.TOTAL_ITEMS', { total }),
          showQuickJumper: true,
          pageSizeOptions,
        }}
        onTableChange={handleTableChange}
        emptyText={resourceHelpers.getProductTagText('TABLE.NO_RESULTS')}
        addButton={{
          text: resourceHelpers.getProductTagText('TABLE.ACTIONS.ADD'),
          onClick: handleAddNew,
        }}
      />
      <AddProductTagModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        editData={editingTag}
      />
      <DeleteProductTagModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingTag(undefined);
        }}
        onConfirm={handleDeleteConfirm}
        tag={deletingTag}
      />
    </>
  );
};

export default ProductTagsTable;
