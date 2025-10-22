import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Order History",
  subtitle: "All past and current orders",
  searchPlaceholder: "Search orders...",
  found: "Found {count} orders",
  totalOrders: "Total {count} orders",
  sortOptions: {
    newestFirst: "Newest First",
    oldestFirst: "Oldest First",
    highestAmount: "Highest Amount",
    lowestAmount: "Lowest Amount",
  },
  table: {
    orderId: "Order ID",
    status: "Status",
    date: "Date",
    totalAmount: "Total Amount",
    items: "Items",
    customerName: "Customer",
    shippingInformation: "Shipping Information",
    address: "Address",
    paymentMethod: "Payment Method",
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
    noOrders: "No orders found",
    error: "An error occurred while loading orders",
  },
};

const de = {
  title: "Bestellverlauf",
  subtitle: "Alle vergangenen und aktuellen Bestellungen",
  searchPlaceholder: "Bestellungen suchen...",
  found: "{count} Bestellungen gefunden",
  totalOrders: "Insgesamt {count} Bestellungen",
  sortOptions: {
    newestFirst: "Neueste zuerst",
    oldestFirst: "Älteste zuerst",
    highestAmount: "Höchster Betrag",
    lowestAmount: "Niedrigster Betrag",
  },
  table: {
    orderId: "Bestell-ID",
    status: "Status",
    date: "Datum",
    totalAmount: "Gesamtbetrag",
    items: "Artikel",
    customerName: "Kunde",
    shippingInformation: "Versandinformationen",
    address: "Adresse",
    paymentMethod: "Zahlungsmethode",
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
    noOrders: "Keine Bestellungen gefunden",
    error: "Ein Fehler ist beim Laden der Bestellungen aufgetreten",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
