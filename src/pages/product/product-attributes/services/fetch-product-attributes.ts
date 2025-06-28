import api from '@/services/api';
import { Attribute } from '../types';

export const fetchProductAttributes = async (): Promise<Attribute[]> => {
  const response = await api.get('/product-attributes');
  return response?.data?.data;
};
