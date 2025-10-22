import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Sales History",
  subtitle: "All past and current sales",
  searchPlaceholder: "Search sales...",
  found: "Found {count} sales",
  totalSales: "Total {count} sales",
  metrics: {
    completedSales: "Completed Sales",
    totalRevenue: "Total Revenue",
  },
  sortOptions: {
    newestFirst: "Newest First",
    oldestFirst: "Oldest First",
    highestAmount: "Highest Amount",
    lowestAmount: "Lowest Amount",
  },
  table: {
    saleId: "Sale ID",
    date: "Date",
    buyer: "Buyer",
    status: "Status",
    amount: "Amount",
    items: "Items",
    productName: "Product",
    transactionDetails: "Transaction Details",
    paymentMethod: "Payment Method",
    shippingAddress: "Shipping Address",
    summary: "Summary",
    actions: "Actions",
  },
  status: {
    delivered: "Delivered",
    shipped: "Shipped",
    processing: "Processing",
    pending: "Pending",
    cancelled: "Cancelled",
    refunded: "Refunded",
  },
  actions: {
    viewDetails: "View Details",
  },
  messages: {
    noSales: "No sales found",
    error: "An error occurred while loading sales",
  },
};

const de = {
  title: "Verkaufsverlauf",
  subtitle: "Alle vergangenen und aktuellen Verkäufe",
  searchPlaceholder: "Verkäufe suchen...",
  found: "{count} Verkäufe gefunden",
  totalSales: "Insgesamt {count} Verkäufe",
  metrics: {
    completedSales: "Abgeschlossene Verkäufe",
    totalRevenue: "Gesamtumsatz",
  },
  sortOptions: {
    newestFirst: "Neueste zuerst",
    oldestFirst: "Älteste zuerst",
    highestAmount: "Höchster Betrag",
    lowestAmount: "Niedrigster Betrag",
  },
  table: {
    saleId: "Verkaufs-ID",
    date: "Datum",
    buyer: "Käufer",
    status: "Status",
    amount: "Betrag",
    items: "Artikel",
    productName: "Produkt",
    transactionDetails: "Transaktionsdetails",
    paymentMethod: "Zahlungsmethode",
    shippingAddress: "Versandadresse",
    summary: "Zusammenfassung",
    actions: "Aktionen",
  },
  status: {
    delivered: "Geliefert",
    shipped: "Versendet",
    processing: "In Bearbeitung",
    pending: "Ausstehend",
    cancelled: "Storniert",
    refunded: "Erstattet",
  },
  actions: {
    viewDetails: "Details anzeigen",
  },
  messages: {
    noSales: "Keine Verkäufe gefunden",
    error: "Ein Fehler ist beim Laden der Verkäufe aufgetreten",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
