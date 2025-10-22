import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Logistics Management",
  searchPlaceholder: "Search logistics carriers...",
  quickSort: "Quick Sort",
  found: "{count} logistics carriers found",
  table: {
    logisticNr: "Logistic Nr",
    name: "Name",
    type: "Type",
    region: "Region",
    location: "Location",
    tours: "Tours",
    salesVolume: "Sales Volume",
  },
  type: {
    truck: "Truck",
    alarm: "Alarm",
    location: "Location",
  },
};

const de: iDictionary = {
  title: "Logistikverwaltung",
  searchPlaceholder: "Logistikunternehmen suchen...",
  quickSort: "Schnellsortierung",
  found: "{count} Logistikunternehmen gefunden",
  table: {
    logisticNr: "Logistik-Nr",
    name: "Name",
    type: "Typ",
    region: "Region",
    location: "Standort",
    tours: "Touren",
    salesVolume: "Umsatz",
  },
  type: {
    truck: "LKW",
    alarm: "Alarm",
    location: "Standort",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
