import { iLocale } from "@/Components/Entity/Locale/types";

export interface UsersRow {
  id: string;
  userId: string;
  profileName: string;
  type: ("shopping" | "business" | "logistics")[];
  activeLocations: number;
  orders: number;
  totalPurchaseAmount: number;
  listedArticles: number;
  sales: number;
  totalSalesAmount: number;
  joinDate: string;
  status: "active" | "inactive" | "pending";
}

export interface UsersProps {
  locale: iLocale;
}
