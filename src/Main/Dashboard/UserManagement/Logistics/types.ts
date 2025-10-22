import { iLocale } from "@/Components/Entity/Locale/types";

export interface LogisticsRow {
  id: string;
  logisticNr: string;
  name: string;
  type: "truck" | "alarm" | "location";
  region: number;
  location: number;
  tours: number;
  salesVolume: number;
}

export interface LogisticsProps {
  locale: iLocale;
}
