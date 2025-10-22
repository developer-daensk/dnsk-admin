import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  saveAndBack: "Save and Back",
  createNewProduct: "Create New Product",
};

const de: iDictionary = {
  saveAndBack: "Speichern und Zurück",
  createNewProduct: "Neues Produkt erstellen",
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
