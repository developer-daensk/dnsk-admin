import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  mainTitle: "Marketplace",
  userRoleInfo: {
    switcherTitle: "Select Organizations",
  },
  profile: "Profile",
  settings: "Settings",
  dashboard: "Dashboard",
  orders: "Orders",
  userManagement: "User Management",
  contactPersons: "Contact Persons",
  contactPersonsCompanyFounders: "Company Founders",
  product: {
    root: "Product",
    search: "Search",
    attributes: "Attributes",
    tags: "Tags",
    variations: "Variations",
  },
  roles: "Roles",
  actions: {
    logOut: "Log out",
  },
};

const de: iDictionary = {
  mainTitle: "Marketplace",
  userRoleInfo: {
    switcherTitle: "Organisationen auswählen",
  },
  profile: "Profil",
  settings: "Einstellungen",
  dashboard: "Dashboard",
  orders: "Bestellungen",
  userManagement: "Benutzerverwaltung",
  contactPersons: "Kontaktpersonen",
  contactPersonsCompanyFounders: "Unternehmer",
  product: {
    root: "Produkt",
    search: "Suche",
    attributes: "Attribute",
    tags: "Tags",
    variations: "Varianten",
  },
  roles: "Rollen",
  actions: {
    logOut: "Abmelden",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<iDictionary>({ en, de });
