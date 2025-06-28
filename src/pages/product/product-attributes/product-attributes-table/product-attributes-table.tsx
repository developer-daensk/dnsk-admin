import { Table } from 'antd';

import { useProductAttributesTable } from './use-product-attributes-table';
import { DEFAULT_PAGINATION } from '@/lib/constants';
import { useResourceHelpers } from '@/utils/i18nBridge';

export const ProductAttributesTable = () => {
  const resourceHelpers = useResourceHelpers();
  const { productAttributes, isPending, columns } = useProductAttributesTable();

  return (
    <Table
      dataSource={productAttributes}
      columns={columns}
      loading={isPending}
      locale={{
        emptyText: resourceHelpers.getProductAttributeText('TABLE.NO_RESULTS'),
      }}
      pagination={{
        pageSize: DEFAULT_PAGINATION.LIMIT,
      }}
    />
  );
};
