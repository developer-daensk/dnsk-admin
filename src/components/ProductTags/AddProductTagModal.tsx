import React, { useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { useResourceHelpers } from '@/utils/i18nBridge';
import { ProductTagsService } from '../../services/product-tags.service';
import { CreateProductTagDto, ProductTag } from '../../types/product-tags.types';
import { StyledModal } from './AddProductTagModal.styles';

interface AddProductTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: ProductTag;
}

const productTagsService = new ProductTagsService();

const AddProductTagModal: React.FC<AddProductTagModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editData,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const resourceHelpers = useResourceHelpers();

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        form.setFieldsValue({
          title: editData.title,
          description: editData.description,
        });
      } else {
        form.resetFields();
      }
    }
  }, [isOpen, editData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const createDto: CreateProductTagDto = {
        title: values.title,
        description: values.description || '',
        rank: editData?.rank || 0,
      };

      let response;
      if (editData) {
        response = await productTagsService.update(editData.id, createDto);
      } else {
        response = await productTagsService.create(createDto);
      }

      if (response.data) {
        message.success(
          editData
            ? resourceHelpers.getProductTagText('MODAL.EDIT_SUCCESS')
            : resourceHelpers.getProductTagText('MODAL.SUCCESS')
        );
        form.resetFields();
        onSuccess();
        onClose();
      } else {
        message.error(
          editData
            ? resourceHelpers.getProductTagText('ERRORS.UPDATE_FAILED')
            : resourceHelpers.getProductTagText('ERRORS.CREATE_FAILED')
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error(
          editData
            ? resourceHelpers.getProductTagText('ERRORS.UPDATE_FAILED')
            : resourceHelpers.getProductTagText('ERRORS.CREATE_FAILED')
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <StyledModal
      title={
        editData
          ? resourceHelpers.getProductTagText('MODAL.EDIT_TITLE')
          : resourceHelpers.getProductTagText('MODAL.TITLE')
      }
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="title"
          label={resourceHelpers.getProductTagText('MODAL.FIELDS.NAME.LABEL')}
          rules={[
            {
              required: true,
              message: resourceHelpers.getProductTagText('MODAL.FIELDS.NAME.REQUIRED'),
            },
          ]}
        >
          <Input placeholder={resourceHelpers.getProductTagText('MODAL.FIELDS.NAME.PLACEHOLDER')} />
        </Form.Item>

        <Form.Item
          name="description"
          label={resourceHelpers.getProductTagText('MODAL.FIELDS.DESCRIPTION.LABEL')}
        >
          <Input.TextArea
            placeholder={resourceHelpers.getProductTagText('MODAL.FIELDS.DESCRIPTION.PLACEHOLDER')}
            rows={4}
          />
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

export default AddProductTagModal;
