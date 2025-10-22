import { getDictionaryGenerator } from "../Locale/utils";

const en = {
  placeholder: "Search ...",
};

const de: iDictionary = {
  placeholder: "suchen...",
};
export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
