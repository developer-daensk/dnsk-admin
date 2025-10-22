export interface Sale {
  id: string;
  saleId: string;
  date: string;
  buyer: string;
  status: string;
  amount: number;
  items: number;
  productDetails: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalesHistoryProps {
  locale: string;
}

export interface SaleDetailProps {
  sale: Sale;
  locale: string;
}
