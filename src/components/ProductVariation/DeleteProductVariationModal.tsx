import React from 'react';
import { Modal } from 'antd';
import { ProductVariationType } from '@/types/product-variation.type';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface DeleteProductVariationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  variation?: ProductVariationType;
}

const DeleteProductVariationModal: React.FC<DeleteProductVariationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  variation,
}) => {
  const resourceHelpers = useResourceHelpers();

  return (
    <Modal
      title={resourceHelpers.getProductVariationText('TABLE.ACTIONS.DELETE_CONFIRM_TITLE')}
      visible={isOpen}
      onOk={onConfirm}
      onCancel={onClose}
      okText={resourceHelpers.getProductVariationText('TABLE.ACTIONS.DELETE')}
      cancelText={resourceHelpers.getProductVariationText('TABLE.ACTIONS.CANCEL')}
    >
      <p>
        {resourceHelpers
          .getProductVariationText('TABLE.ACTIONS.DELETE_CONFIRM_CONTENT')
          .replace('{variationName}', variation?.name || '')}
      </p>
    </Modal>
  );
};

export default DeleteProductVariationModal;
