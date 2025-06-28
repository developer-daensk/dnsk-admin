import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProductAttributes } from '../services/fetch-product-attributes';
import { TableColumnsType, MenuProps, Dropdown, Button } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';

import { removeProductAttribute } from '../services/remove-product-attribute';
import { Attribute } from '../types';
import { useModal } from '../use-modal';
import { useResourceHelpers } from '@/utils/i18nBridge';

export const useProductAttributesTable = () => {
  const queryClient = useQueryClient();
  const resourceHelpers = useResourceHelpers();
  const { open } = useModal('product-attribute-modal');

  const { data: productAttributes, isPending } = useQuery({
    queryKey: ['product-attributes'],
    queryFn: fetchProductAttributes,
  });

  const { mutate: remove } = useMutation({
    mutationFn: removeProductAttribute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-attributes'] });
    },
  });

  const columns: TableColumnsType<Attribute> = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      width: 50,
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: e => handleActionClick(record, e),
          }}
          trigger={['click']}
          placement="bottomLeft"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  function handleActionClick(record: Attribute, e: MenuInfo): void {
    if (e.key === 'delete') {
      remove(record.id);
    } else if (e.key === 'edit') {
      open({ data: record, isEditing: true });
    }
  }

  const items: MenuProps['items'] = [
    {
      label: resourceHelpers.getProductAttributeText('TABLE.ACTIONS.DELETE'),
      key: 'delete',
      icon: <DeleteOutlined />,
    },
    {
      label: resourceHelpers.getProductAttributeText('TABLE.ACTIONS.EDIT'),
      key: 'edit',
      icon: <EditOutlined />,
    },
  ];

  return {
    productAttributes,
    isPending,
    columns,
  };
};
