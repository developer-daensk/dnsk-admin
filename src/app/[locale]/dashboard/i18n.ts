import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  seo: {
    title: "marketplace app",
    description: "marketplace app description",
  },
};

const de: iDictionary = {
  seo: {
    title: "marketplace app",
    description: "marketplace app description",
  },
};
export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
