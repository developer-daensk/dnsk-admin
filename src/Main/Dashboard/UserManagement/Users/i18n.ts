import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "User Management",
  searchPlaceholder: "Search users...",
  quickSort: "Quick Sort",
  found: "{count} users found",
  addUser: "Add User",
  table: {
    userId: "User ID",
    profileName: "Profile Name",
    type: "Type",
    activeLocations: "Active Locations",
    orders: "Orders",
    totalPurchaseAmount: "Total Purchase Amount",
    listedArticles: "Listed Articles",
    sales: "Sales",
    totalSalesAmount: "Total Sales Amount",
    joinDate: "Join Date",
    status: "Status",
  },
  type: {
    shopping: "Shopping",
    business: "Business",
    logistics: "Logistics",
  },
  status: {
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
  },
};

const de: iDictionary = {
  title: "Benutzerverwaltung",
  searchPlaceholder: "Benutzer suchen...",
  quickSort: "Schnellsortierung",
  found: "{count} Benutzer gefunden",
  addUser: "Benutzer hinzufügen",
  table: {
    userId: "Benutzer-ID",
    profileName: "Profilname",
    type: "Typ",
    activeLocations: "Aktive Standorte",
    orders: "Bestellungen",
    totalPurchaseAmount: "Gesamtkaufbetrag",
    listedArticles: "Gelistete Artikel",
    sales: "Verkäufe",
    totalSalesAmount: "Gesamtverkaufsbetrag",
    joinDate: "Beitrittsdatum",
    status: "Status",
  },
  type: {
    shopping: "Einkauf",
    business: "Geschäft",
    logistics: "Logistik",
  },
  status: {
    active: "Aktiv",
    inactive: "Inaktiv",
    pending: "Ausstehend",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
