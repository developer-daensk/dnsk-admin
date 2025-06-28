import { BaseService } from './base.service';
import { ApiResponse } from '../types';
import { ProductTag, CreateProductTagDto, UpdateProductTagDto } from '../types/product-tags.types';

export class ProductTagsService extends BaseService {
  constructor() {
    super('product-tags');
  }

  async getAll(): Promise<ApiResponse<ProductTag[]>> {
    return this.get<ProductTag[]>('');
  }

  async getById(id: string): Promise<ApiResponse<ProductTag>> {
    return this.get<ProductTag>(`/${id}`);
  }

  async create(data: CreateProductTagDto): Promise<ApiResponse<ProductTag>> {
    return this.post<ProductTag>('', data);
  }

  async update(id: string, data: UpdateProductTagDto): Promise<ApiResponse<ProductTag>> {
    return this.put<ProductTag>(`/${id}`, data);
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    return this.delete<null>(`/${id}`);
  }
}
