import { BaseService } from './base.service';
import { ApiResponse } from '../types';
import { ProductAttributeType } from '../types/product.types';

export class ProductAttributesService extends BaseService {
  constructor() {
    super('product-attributes');
  }

  async getAll(): Promise<ApiResponse<ProductAttributeType[]>> {
    return this.get<ProductAttributeType[]>('');
  }
}
