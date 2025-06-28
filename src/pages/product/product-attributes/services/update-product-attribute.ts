import api from '@/services/api';
import { Attribute } from '../types';

export const updateProductAttribute = async (newValue: Attribute) => {
  const response = await api.put(`/product-attributes/${newValue.id}`, newValue);
  return response?.data?.data;
};
