import { getDictionaryGenerator } from "./utils";

const en = {
  placeholder: "Select language",
};

const de: iDictionary = {
  placeholder: "Sprache auswählen",
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
