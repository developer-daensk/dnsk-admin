import { Button, Flex, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ProductAttributesTable } from './product-attributes-table';
import { CreateUpdateProductAttribute } from './create-update-product-attribute/create-update-product-attribute';
import { useModal } from './use-modal';
import { useResourceHelpers } from '@/utils/i18nBridge';

const ProductAttributes = () => {
  const resourceHelpers = useResourceHelpers();
  const { open } = useModal('product-attribute-modal');

  const handleAddClick = () => {
    open();
  };

  return (
    <>
      <Flex justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={3}>
          {resourceHelpers.getProductAttributeText('TITLE')}
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
          {resourceHelpers.getProductAttributeText('TABLE.ACTIONS.ADD')}
        </Button>
      </Flex>

      <ProductAttributesTable />
      <CreateUpdateProductAttribute />
    </>
  );
};

export default ProductAttributes;
