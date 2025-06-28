export interface ProductTag {
  id: string;
  title: string;
  description: string;
  rank: number;
}

export interface CreateProductTagDto {
  title: string;
  description: string;
  rank: number;
}

export interface UpdateProductTagDto {
  title?: string;
  description?: string;
  rank?: number;
}
