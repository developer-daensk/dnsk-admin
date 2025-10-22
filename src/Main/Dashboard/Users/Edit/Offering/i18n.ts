import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Current Offerings",
  subtitle: "All current offerings with their respective quantities",
  searchPlaceholder: "Search offerings...",
  found: "Found {count} offerings",
  totalOfferings: "Total {count} offerings",
  metrics: {
    totalItems: "Total Items",
    totalQuantity: "Total Quantity",
  },
  table: {
    name: "Name",
    category: "Category",
    quantity: "Quantity",
    price: "Price",
    location: "Location",
    date: "Date",
    status: "Status",
    actions: "Actions",
  },
  status: {
    active: "Active",
    inactive: "Inactive",
    outOfStock: "Out of Stock",
    pending: "Pending",
    discontinued: "Discontinued",
  },
  categories: {
    fruits: "Fruits",
    dairy: "Dairy",
    bakery: "Bakery",
    vegetables: "Vegetables",
    meat: "Meat",
    beverages: "Beverages",
    snacks: "Snacks",
  },
  actions: {
    viewDetails: "View Details",
    edit: "Edit",
  },
  messages: {
    noOfferings: "No offerings found",
    error: "An error occurred while loading offerings",
  },
};

const de = {
  title: "Aktuelle Angebote",
  subtitle: "Alle aktuellen Angebote mit ihren jeweiligen Mengen",
  searchPlaceholder: "Angebote suchen...",
  found: "{count} Angebote gefunden",
  totalOfferings: "Insgesamt {count} Angebote",
  metrics: {
    totalItems: "Gesamtartikel",
    totalQuantity: "Gesamtmenge",
  },
  table: {
    name: "Name",
    category: "Kategorie",
    quantity: "Menge",
    price: "Preis",
    location: "Standort",
    date: "Datum",
    status: "Status",
    actions: "Aktionen",
  },
  status: {
    active: "Aktiv",
    inactive: "Inaktiv",
    outOfStock: "Nicht auf Lager",
    pending: "Ausstehend",
    discontinued: "Eingestellt",
  },
  categories: {
    fruits: "Obst",
    dairy: "Milchprodukte",
    bakery: "Bäckerei",
    vegetables: "Gemüse",
    meat: "Fleisch",
    beverages: "Getränke",
    snacks: "Snacks",
  },
  actions: {
    viewDetails: "Details anzeigen",
    edit: "Bearbeiten",
  },
  messages: {
    noOfferings: "Keine Angebote gefunden",
    error: "Ein Fehler ist beim Laden der Angebote aufgetreten",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
