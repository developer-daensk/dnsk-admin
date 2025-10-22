import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Dashboard",
  timeRanges: {
    last7Days: "Last 7 days",
    last30Days: "Last 30 days",
    last90Days: "Last 90 days",
  },
  charts: {
    visitors: {
      title: "Visitors (New vs. Returning)",
      newVisitors: "New Visitors",
      returningVisitors: "Returning Visitors",
    },
    newSellers: {
      title: "New Sellers Registration",
    },
    newBuyers: {
      title: "New Buyers Registration",
    },
    activeOrders: {
      title: "Active Orders",
    },
  },
  actions: {
    refresh: "Refresh",
  },
};

const de = {
  title: "Dashboard",
  timeRanges: {
    last7Days: "Letzte 7 Tage",
    last30Days: "Letzte 30 Tage",
    last90Days: "Letzte 90 Tage",
  },
  charts: {
    visitors: {
      title: "Besucher (Neu vs. Wiederkehrend)",
      newVisitors: "Neue Besucher",
      returningVisitors: "Wiederkehrende Besucher",
    },
    newSellers: {
      title: "Neue Verkäufer Registrierungen",
    },
    newBuyers: {
      title: "Neue Käufer Registrierungen",
    },
    activeOrders: {
      title: "Aktive Bestellungen",
    },
  },
  actions: {
    refresh: "Aktualisieren",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
