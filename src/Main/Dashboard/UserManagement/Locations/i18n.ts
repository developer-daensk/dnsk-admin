import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Locations Management",
  searchPlaceholder: "Search locations...",
  quickSort: "Quick Sort",
  found: "{count} locations found",
  table: {
    code: "Location ID",
    user: "User",
    area: "Area",
    cover: "Cover",
    articles: "Articles",
    logistic: "Logistic",
    salesVolume: "Sales Volume",
    createdAt: "Date Created",
  },
  cover: { yes: "JA", no: "NE" },
  logistic: {
    express: "Express",
    standard: "Standard",
    premium: "Premium",
    economy: "Economy",
  },
};

const de: iDictionary = {
  title: "Standortverwaltung",
  searchPlaceholder: "Standorte suchen...",
  quickSort: "Schnellsortierung",
  found: "{count} Standorte gefunden",
  table: {
    code: "Standort-ID",
    user: "Benutzer",
    area: "Bereich",
    cover: "Abdeckung",
    articles: "Artikel",
    logistic: "Logistik",
    salesVolume: "Umsatz",
    createdAt: "Erstellt am",
  },
  cover: { yes: "JA", no: "NE" },
  logistic: {
    express: "Express",
    standard: "Standard",
    premium: "Premium",
    economy: "Economy",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
