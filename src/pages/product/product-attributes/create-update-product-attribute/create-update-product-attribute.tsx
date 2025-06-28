import { Modal, Input, Form } from 'antd';

import { useCreateUpdateProductAttribute } from './use-create-update-product-attribute';
import { useResourceHelpers } from '@/utils/i18nBridge';

export const CreateUpdateProductAttribute = () => {
  const { isLoading, isOpen, form, handleModalOk, handleModalCancel, contextHolder } =
    useCreateUpdateProductAttribute();
  const resourceHelpers = useResourceHelpers();
  return (
    <>
      {contextHolder}
      <Modal
        title={resourceHelpers.getProductAttributeText('MODAL.TITLE')}
        open={isOpen}
        onOk={handleModalOk}
        cancelText={resourceHelpers.getProductAttributeText('MODAL.ACTIONS.CANCEL')}
        okText={resourceHelpers.getProductAttributeText('MODAL.ACTIONS.SAVE')}
        onCancel={handleModalCancel}
        confirmLoading={isLoading}
        // okButtonProps={{
        //   disabled:
        //     !form.isFieldsTouched() ||
        //     form.getFieldsError().filter(({ errors }) => errors.length).length > 0,
        // }}
      >
        <Form form={form} layout="vertical" requiredMark={customizeRequiredMark}>
          <Form.Item
            name="title"
            label={resourceHelpers.getProductAttributeText('MODAL.FIELDS.NAME.LABEL')}
            rules={[
              {
                required: true,
                message: resourceHelpers.getProductAttributeText('MODAL.FIELDS.NAME.REQUIRED'),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label={resourceHelpers.getProductAttributeText('MODAL.FIELDS.DESCRIPTION.LABEL')}
          >
            <Input.TextArea
              placeholder={resourceHelpers.getProductAttributeText(
                'MODAL.FIELDS.DESCRIPTION.PLACEHOLDER'
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
  <>
    {label}
    {required && <span style={{ color: 'red' }}>*</span>}
  </>
);
