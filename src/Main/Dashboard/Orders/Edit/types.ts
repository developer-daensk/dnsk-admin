import { iLocale } from "@/Components/Entity/Locale/types";

export interface EditOrderItem {
  id: string;
  productId: string;
  productName: string;
  variation?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface EditOrderData {
  orderNumber: string;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod:
    | "credit_card"
    | "paypal"
    | "bank_transfer"
    | "cash_on_delivery";
  trackingNumber?: string;
  notes?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerZipCode: string;
  customerCountry: string;
  items: EditOrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface OrdersEditProps {
  locale: iLocale;
}
