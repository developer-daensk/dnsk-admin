import React from 'react';
import { ProductTag } from '../../types/product-tags.types';
import { StyledModal } from './DeleteProductTagModal.styles';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface DeleteProductTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  tag?: ProductTag;
}

const DeleteProductTagModal: React.FC<DeleteProductTagModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  tag,
}) => {
  const resourceHelpers = useResourceHelpers();
  return (
    <StyledModal
      title={resourceHelpers.getProductTagText('TABLE.ACTIONS.DELETE_CONFIRM_TITLE')}
      open={isOpen}
      onOk={onConfirm}
      onCancel={onClose}
      okText={resourceHelpers.getProductTagText('TABLE.ACTIONS.DELETE')}
      cancelText={resourceHelpers.getProductTagText('TABLE.ACTIONS.CANCEL')}
      okButtonProps={{ danger: true }}
    >
      <p>{resourceHelpers.getProductTagText('TABLE.ACTIONS.DELETE_CONFIRM_CONTENT')}</p>
      {tag && <p>Tag: {tag.title}</p>}
    </StyledModal>
  );
};

export default DeleteProductTagModal;
