import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  seo: {
    title: "User Management",
    userManagement: "User Management",
    description: "User Management",
  },
};

const de: iDictionary = {
  seo: {
    title: "Benutzerverwaltung",
    userManagement: "Benutzerverwaltung",
    description: "Benutzerverwaltung",
  },
};
export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
