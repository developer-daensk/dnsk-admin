import { getDictionaryGenerator } from "../Locale/utils";

const en = {
  previous: "Previous",
  next: "Next",
  details: "Showing {from}-{to} of {total}",
};

const de: iDictionary = {
  previous: "Zurück",
  next: "Weiter",
  details: "Zeige {von}-{bis} von {total}",
};
export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
