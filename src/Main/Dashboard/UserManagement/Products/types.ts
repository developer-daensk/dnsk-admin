import { iLocale } from "@/Components/Entity/Locale/types";

export interface ProductsRow {
  id: string;
  artNr: string;
  pictures: number;
  title: string;
  location: number;
  crowd: number;
  salesVolume: number;
  status: "active" | "inactive";
}

export interface ProductsProps {
  locale: iLocale;
}
