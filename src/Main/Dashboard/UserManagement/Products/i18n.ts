import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Products Management",
  searchPlaceholder: "Search products...",
  quickSort: "Quick Sort",
  found: "{count} products found",
  table: {
    artNr: "Art-Nr",
    pictures: "Pictures",
    title: "Title",
    location: "Location",
    crowd: "Crowd",
    salesVolume: "Sales Volume",
    status: "Status",
  },
  status: {
    active: "Active",
    inactive: "Inactive",
  },
};

const de: iDictionary = {
  title: "Produktverwaltung",
  searchPlaceholder: "Produkte suchen...",
  quickSort: "Schnellsortierung",
  found: "{count} Produkte gefunden",
  table: {
    artNr: "Art-Nr",
    pictures: "Bilder",
    title: "Titel",
    location: "Standort",
    crowd: "Menge",
    salesVolume: "Umsatz",
    status: "Status",
  },
  status: {
    active: "Aktiv",
    inactive: "Inaktiv",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
