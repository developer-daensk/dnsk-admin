import { iLocale } from "@/Components/Entity/Locale/types";

export interface LocationRow {
  id: string;
  code: string; // Location ID, e.g., LOC-001
  user: string; // username/handle
  area: string; // region code, e.g., DE_22
  cover: "JA" | "NE"; // yes/no badge
  articles: number;
  logistic: "Express" | "Standard" | "Premium" | "Economy";
  salesVolume: number; // store in cents for formatting or number in euros
  createdAt: string; // ISO or formatted date
}

export interface LocationsProps {
  locale: iLocale;
}
