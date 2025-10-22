import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Variants",
  attribute: {
    title: "Attribute",
    placeholder: "Enter attribute name",
    example: "Example: Color",
    maxLength: "20",
  },
  option: {
    title: "Option",
    placeholder: "Enter option name",
    example: "Example: Red",
    maxLength: "20",
  },
  table: {
    attribute: "Attribute",
    option: "Option",
    action: "Action",
  },
  actions: {
    cancel: "Cancel",
    save: "Save",
  },
};

const de: iDictionary = {
  title: "Varianten",
  attribute: {
    title: "Attribut",
    placeholder: "Attributname eingeben",
    example: "Beispiel: Farbe",
    maxLength: "20",
  },
  option: {
    title: "Option",
    placeholder: "Optionsname eingeben",
    example: "Beispiel: Rot",
    maxLength: "20",
  },
  table: {
    attribute: "Attribut",
    option: "Option",
    action: "Aktion",
  },
  actions: {
    cancel: "Abbrechen",
    save: "Speichern",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
