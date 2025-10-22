import { getDictionaryGenerator } from "../Locale/utils";

const en = {
  uploadNewPhoto: "Upload New Photo",
};

const de: iDictionary = {
  uploadNewPhoto: "Neues Foto hochladen",
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
