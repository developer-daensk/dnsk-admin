import { BaseService } from './base.service';
import { ApiResponse } from '../types';
import { ProductType } from '../types/product.types';

export class ProductService extends BaseService {
  constructor() {
    super('products');
  }

  async getAll(): Promise<ApiResponse<ProductType[]>> {
    return this.get<ProductType[]>('');
  }

  async getById(id: string): Promise<ApiResponse<ProductType>> {
    return this.get<ProductType>(`/${id}`);
  }

  async create(data: ProductType): Promise<ApiResponse<ProductType>> {
    return this.post<ProductType>('', data);
  }

  async update(id: string, data: ProductType): Promise<ApiResponse<ProductType>> {
    return this.put<ProductType>(`/${id}`, data);
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    return this.delete<null>(`/${id}`);
  }
}
