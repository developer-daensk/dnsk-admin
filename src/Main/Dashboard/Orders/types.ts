import { iLocale } from "@/Components/Entity/Locale/types";

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  address: string;
  total: number;
  quantity: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "rejected";
}

export interface iProps {
  orders: Order[];
  locale: iLocale;
  currentTab: string;
}
