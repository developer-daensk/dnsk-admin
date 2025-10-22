import { getDictionaryGenerator } from "../../Components/Entity/Locale/utils";

const en = {
  seo: {
    title: "B2B Dashboard",
    description: "A solution for easy control of complex operations",
  },
};

const de: iDictionary = {
  seo: {
    title: "B2B Dashboard",
    description: "Eine Lösung zur einfachen Steuerung komplexer Vorgänge",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
