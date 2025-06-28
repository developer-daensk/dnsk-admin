import { BaseService } from './base.service';
import { ApiResponse } from '../types';
import { ProductVariationType } from '../types/product-variation.type';

export class ProductVariationsService extends BaseService {
  constructor() {
    super('product-variation-templates');
  }

  async getAll(): Promise<ApiResponse<ProductVariationType[]>> {
    return this.get<ProductVariationType[]>('');
  }

  async getById(id: string): Promise<ApiResponse<ProductVariationType>> {
    return this.get<ProductVariationType>(`/${id}`);
  }

  async create(data: ProductVariationType): Promise<ApiResponse<ProductVariationType>> {
    return this.post<ProductVariationType>('', data);
  }

  async update(id: string, data: ProductVariationType): Promise<ApiResponse<ProductVariationType>> {
    return this.put<ProductVariationType>(`/${id}`, data);
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    return this.delete<null>(`/${id}`);
  }
}
