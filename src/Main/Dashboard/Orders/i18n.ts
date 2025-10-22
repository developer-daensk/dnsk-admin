const en = {
  title: "Orders Management",
  seo: {
    title: "Orders Management",
    description: "Manage and track your orders",
  },
  actions: {
    yourTruck: "Your truck",
    close: "Close",
    save: "Save",
  },
  postalCode: {
    label: "Postal Code",
    placeholder: "Enter postal code",
  },
  city: {
    label: "City",
    placeholder: "Enter city",
  },
  search: {
    placeholder: "Search within current tab by order number, cus...",
  },
  tabs: {
    overview: "Overview",
    inProgress: "In Progress",
    inDelivery: "In Delivery",
    rejected: "Rejected",
  },
  table: {
    orderNumber: "Order Number",
    date: "Date",
    address: "Address",
    total: "Total",
    quantity: "Quantity",
    status: "Status",
    actions: "Actions",
  },
  status: {
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    rejected: "Rejected",
  },
  pagination: {
    showing: (start: number, end: number, total: number) =>
      `Showing ${start}-${end} of ${total} orders`,
  },
};

const de = {
  title: "Auftragsverwaltung",
  seo: {
    title: "Auftragsverwaltung",
    description: "Verwalten und verfolgen Sie Ihre Aufträge",
  },
  actions: {
    yourTruck: "Ihr LKW",
    close: "Schließen",
    save: "Speichern",
  },
  postalCode: {
    label: "Postleitzahl",
    placeholder: "Postleitzahl eingeben",
  },
  city: {
    label: "Stadt",
    placeholder: "Stadt eingeben",
  },
  search: {
    placeholder: "Suchen Sie im aktuellen Tab nach Auftragsnummer, Kunde...",
  },
  tabs: {
    overview: "Übersicht",
    inProgress: "In Bearbeitung",
    inDelivery: "In Lieferung",
    rejected: "Abgelehnt",
  },
  table: {
    orderNumber: "Auftragsnummer",
    date: "Datum",
    address: "Adresse",
    total: "Gesamt",
    quantity: "Menge",
    status: "Status",
    actions: "Aktionen",
  },
  status: {
    pending: "Ausstehend",
    processing: "In Bearbeitung",
    shipped: "Versendet",
    delivered: "Geliefert",
    rejected: "Abgelehnt",
  },
  pagination: {
    showing: (start: number, end: number, total: number) =>
      `Zeige ${start}-${end} von ${total} Aufträgen`,
  },
};

export type iDictionary = typeof en;

export const getDictionary = (locale: string) => {
  const dictionaries = {
    en,
    de,
  };

  return dictionaries[locale as keyof typeof dictionaries] || en;
};
