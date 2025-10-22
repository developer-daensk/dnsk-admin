import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Edit User",
  userID: {
    title: "User ID",
    description: "12-Digit Unique Identifier",
  },
  typeOfUser: {
    title: "Type of User",
    buyer: {
      title: "Buyer",
      description: "Can purchase products and place orders",
      status: "Active",
    },
    seller: {
      title: "Seller",
      description: "Can list products and manage sales",
      status: "Active",
    },
    logisticCompany: {
      title: "Logistic Company",
      description: "Handles shipping and logistics",
    },
    summary: "Active: Buyer, Seller",
  },
  notificationStatus: {
    title: "Notification / Status / Information",
    sellerApplication: {
      title: "Seller Application",
      subtitle: "Applied",
      status: "approved",
    },
    goodsListing: {
      title: "Goods Listing",
      subtitle: "142 items",
      status: "Active",
    },
    documents: {
      title: "Documents",
      subtitle: "8 docs",
      status: "Ready",
    },
  },
  tabs: {
    details: "Details",
    location: "Location",
    employees: "Employees",
    orderHistory: "Order History",
    salesHistory: "Sales History",
    offerings: "Offerings",
    organizationalChart: "Organizational Chart",
  },
};

const de = {
  title: "Benutzer bearbeiten",
  userID: {
    title: "Benutzer-ID",
    description: "12-stellige eindeutige Kennung",
  },
  typeOfUser: {
    title: "Benutzertyp",
    buyer: {
      title: "Käufer",
      description: "Kann Produkte kaufen und Bestellungen aufgeben",
      status: "Aktiv",
    },
    seller: {
      title: "Verkäufer",
      description: "Kann Produkte auflisten und Verkäufe verwalten",
      status: "Aktiv",
    },
    logisticCompany: {
      title: "Logistikunternehmen",
      description: "Behandelt Versand und Logistik",
    },
    summary: "Aktiv: Käufer, Verkäufer",
  },
  notificationStatus: {
    title: "Benachrichtigung / Status / Informationen",
    sellerApplication: {
      title: "Verkäuferantrag",
      subtitle: "Beworben",
      status: "genehmigt",
    },
    goodsListing: {
      title: "Warenauflistung",
      subtitle: "142 Artikel",
      status: "Aktiv",
    },
    documents: {
      title: "Dokumente",
      subtitle: "8 Dokumente",
      status: "Bereit",
    },
  },
  tabs: {
    details: "Details",
    location: "Standort",
    employees: "Mitarbeiter",
    orderHistory: "Bestellverlauf",
    salesHistory: "Verkaufsverlauf",
    offerings: "Angebote",
    organizationalChart: "Organisationsdiagramm",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
