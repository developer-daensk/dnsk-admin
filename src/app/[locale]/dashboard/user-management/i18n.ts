import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  userManagement: "User Management",
  tabs: {
    overview: "Overview",
    orders: "Orders",
    users: "Users",
    products: "Products",
    locations: "Locations",
    logistics: "Logistics",
  },
};

const de: iDictionary = {
  userManagement: "Benutzerverwaltung",
  tabs: {
    overview: "Überblick",
    orders: "Bestellungen",
    users: "Benutzer",
    products: "Produkte",
    locations: "Standorte",
    logistics: "Logistik",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
