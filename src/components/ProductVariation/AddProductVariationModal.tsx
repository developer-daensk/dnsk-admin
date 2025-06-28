import React from 'react';
import { Modal, Form, Input, Select, Row, Col, Button } from 'antd';
import { ProductVariationType } from '@/types/product-variation.type';
import { DeleteOutlined } from '@ant-design/icons';
import { ProductVariationsService } from '@/services/product-variations.service';
import { useResourceHelpers } from '@/utils/i18nBridge';

interface AddProductVariationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: ProductVariationType;
}

const AddProductVariationModal: React.FC<AddProductVariationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editData,
}) => {
  const [form] = Form.useForm();
  const resourceHelpers = useResourceHelpers();

  React.useEffect(() => {
    if (isOpen) {
      if (editData) {
        form.setFieldsValue(editData);
      } else {
        form.resetFields();
      }
    } else {
      form.resetFields();
    }
  }, [isOpen, editData, form]);

  const handleOk = () => {
    form.validateFields().then(values => {
      // Prepare submission values
      const submissionValues = {
        ...values,
        aliases: values.aliases || [''],
        items: values.items.map((item: { name: string; value: string }) => ({
          ...item,
          image: '',
          icon: '',
        })),
      };
      console.log('Form values:', submissionValues);
      const productVariationsService = new ProductVariationsService();
      const apiCall =
        editData && editData.id
          ? productVariationsService.update(editData.id, submissionValues)
          : productVariationsService.create(submissionValues);
      apiCall
        .then(() => {
          form.resetFields();
          onSuccess();
          onClose();
        })
        .catch(error => {
          console.error('Error saving product variation:', error);
        });
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        editData
          ? resourceHelpers.getProductVariationText('MODAL.EDIT_TITLE')
          : resourceHelpers.getProductVariationText('MODAL.TITLE')
      }
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={resourceHelpers.getProductVariationText('MODAL.FIELDS.NAME.LABEL')}
          rules={[
            {
              required: true,
              message: resourceHelpers.getProductVariationText('MODAL.FIELDS.NAME.REQUIRED'),
            },
          ]}
        >
          <Input
            placeholder={resourceHelpers.getProductVariationText('MODAL.FIELDS.NAME.PLACEHOLDER')}
          />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please enter the type' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="uI_Type"
          label={resourceHelpers.getProductVariationText('MODAL.FIELDS.UI_TYPE.LABEL')}
          rules={[
            {
              required: true,
              message: resourceHelpers.getProductVariationText('MODAL.FIELDS.UI_TYPE.REQUIRED'),
            },
          ]}
        >
          <Select>
            <Select.Option value="button">
              {resourceHelpers.getProductVariationText('MODAL.FIELDS.UI_TYPE.OPTIONS.BUTTON')}
            </Select.Option>
            <Select.Option value="image-button">
              {resourceHelpers.getProductVariationText('MODAL.FIELDS.UI_TYPE.OPTIONS.IMAGE_BUTTON')}
            </Select.Option>
            <Select.Option value="captioned-button">
              {resourceHelpers.getProductVariationText(
                'MODAL.FIELDS.UI_TYPE.OPTIONS.CAPTIONED_BUTTON'
              )}
            </Select.Option>
            <Select.Option value="dropdown">
              {resourceHelpers.getProductVariationText('MODAL.FIELDS.UI_TYPE.OPTIONS.DROPDOWN')}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.List name="items">
          {(fields, { add, remove }) => {
            if (fields.length === 0) {
              add();
            }
            return (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Row
                    key={key || name}
                    gutter={16}
                    align="middle"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Col span={11}>
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        fieldKey={[fieldKey || name, 'name']}
                        rules={[
                          {
                            required: true,
                            message: resourceHelpers.getProductVariationText(
                              'MODAL.FIELDS.ITEMS.NAME.REQUIRED'
                            ),
                          },
                        ]}
                      >
                        <Input
                          placeholder={resourceHelpers.getProductVariationText(
                            'MODAL.FIELDS.ITEMS.NAME.PLACEHOLDER'
                          )}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        fieldKey={[fieldKey || name, 'value']}
                        rules={[
                          {
                            required: true,
                            message: resourceHelpers.getProductVariationText(
                              'MODAL.FIELDS.ITEMS.VALUE.REQUIRED'
                            ),
                          },
                        ]}
                      >
                        <Input
                          placeholder={resourceHelpers.getProductVariationText(
                            'MODAL.FIELDS.ITEMS.VALUE.PLACEHOLDER'
                          )}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <DeleteOutlined
                        onClick={() => remove(name)}
                        style={{ color: 'red', fontSize: '16px', cursor: 'pointer' }}
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} style={{ width: '100%' }}>
                    {resourceHelpers.getProductVariationText('MODAL.FIELDS.ITEMS.ADD_BUTTON')}
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddProductVariationModal;
