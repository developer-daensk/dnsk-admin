import { PRODUCT_ATTRIBUTES } from '@/resources/product/productAttributes';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { message, Form } from 'antd';
import { useEffect } from 'react';
import { createProductAttribute } from '../services/create-product-attribute';
import { updateProductAttribute } from '../services/update-product-attribute';
import { useModal } from '../use-modal';

export const useCreateUpdateProductAttribute = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const refetch = () => queryClient.getQueryData(['product-attributes']);

  const { close, isOpen, data, isEditing } = useModal<any>('product-attribute-modal');

  const addMutation = useMutation({
    mutationFn: createProductAttribute,
    onSuccess: () => {
      refetch();
      messageApi.success(PRODUCT_ATTRIBUTES.TOAST.ADD_SUCCESS);
      form.resetFields();
      close();
    },
    onError: () => {
      messageApi.error(PRODUCT_ATTRIBUTES.TOAST.ADD_FAILED);
    },
  });

  const editMutation = useMutation({
    mutationFn: updateProductAttribute,
    onSuccess: () => {
      refetch();
      messageApi.success(PRODUCT_ATTRIBUTES.TOAST.EDIT_SUCCESS);
      form.resetFields();
      close();
    },
    onError: () => {
      messageApi.error(PRODUCT_ATTRIBUTES.TOAST.EDIT_FAILED);
    },
  });

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (isEditing && data) {
        editMutation.mutate({ ...values, value: values.title, id: data.id });
      } else {
        addMutation.mutate({ ...values, value: values.title });
      }
    });
  };

  const handleModalCancel = () => {
    close();
    form.resetFields();
  };

  useEffect(() => {
    if (isEditing) {
      form.setFieldsValue(data);
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [data, isEditing]);

  return {
    handleModalOk,
    handleModalCancel,
    contextHolder,
    isOpen,
    form,
    isLoading: addMutation.isPending || editMutation.isPending,
  };
};

const initialValues: Record<string, string | boolean> = {
  title: '',
  description: '',
};
