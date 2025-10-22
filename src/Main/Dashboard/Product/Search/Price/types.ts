export interface PriceData {
  price: number | null;
  currency: string;
  inventory: number | null;
  unit: string;
}

export interface PriceFormErrors {
  price?: string;
  inventory?: string;
}
