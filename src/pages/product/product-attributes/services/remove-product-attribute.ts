import api from '@/services/api';

export const removeProductAttribute = async (id: string) => {
  const response = await api.delete(`/product-attributes/${id}`);
  return response?.data?.data;
};
