import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Company Founders",
  searchPlaceholder: "Search Founders",
  sortBy: "Sort By",
  foundText: "founders found",
  sortOptions: {
    name: "Name - Last Name",
    role: "Role",
    companyName: "Company Name",
    companyAddress: "Company Address",
    email: "Email",
    registrationDate: "Registration Date",
    status: "Status",
  },
  tableHeaders: {
    name: "Name - Last Name",
    role: "Role",
    companyName: "Company Name",
    companyAddress: "Company Address",
    email: "Email",
    registrationDate: "Registration Date",
    status: "Status",
    actions: "Actions",
  },
  statuses: {
    ACTIVE: "ACTIVE",
    PENDING: "PENDING",
    INACTIVE: "INACTIVE",
  },
  actions: {
    edit: "Edit",
  },
  pagination: {
    total: "Total Founders",
    page: "page",
    perPage: "/ page",
  },
};

const de = {
  title: "Unternehmensgründer",
  searchPlaceholder: "Gründer suchen",
  sortBy: "Sortieren nach",
  foundText: "Gründer gefunden",
  sortOptions: {
    name: "Name - Nachname",
    role: "Rolle",
    companyName: "Firmenname",
    companyAddress: "Firmenadresse",
    email: "E-Mail",
    registrationDate: "Registrierungsdatum",
    status: "Status",
  },
  tableHeaders: {
    name: "Name - Nachname",
    role: "Rolle",
    companyName: "Firmenname",
    companyAddress: "Firmenadresse",
    email: "E-Mail",
    registrationDate: "Registrierungsdatum",
    status: "Status",
    actions: "Aktionen",
  },
  statuses: {
    ACTIVE: "AKTIV",
    PENDING: "AUSSTEHEND",
    INACTIVE: "INAKTIV",
  },
  actions: {
    edit: "Bearbeiten",
  },
  pagination: {
    total: "Gesamt Gründer",
    page: "Seite",
    perPage: "/ Seite",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
