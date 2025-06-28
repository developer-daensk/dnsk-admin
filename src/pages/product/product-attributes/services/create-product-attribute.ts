import api from '@/services/api';
import { Attribute } from '../types';

export const createProductAttribute = async (newValue: Attribute) => {
  const response = await api.post(`/product-attributes`, newValue);
  return response?.data?.data;
};
