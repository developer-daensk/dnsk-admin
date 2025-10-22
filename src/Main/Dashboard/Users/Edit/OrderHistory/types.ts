export interface Order {
  id: string;
  orderId: string;
  status: string;
  date: string;
  totalAmount: number;
  items: number;
  customerName: string;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderHistoryProps {
  locale: string;
}

export interface OrderDetailProps {
  order: Order;
  locale: string;
}
