import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Variants",
  checkboxLabel: "Create variant item",
  question: "Is this a product that has variants?",
  example: "Example:",
  description:
    "You sell an item that you offer in different colors or fill quantities.",
  actions: {
    continue: "Continue",
  },
};

const de: iDictionary = {
  title: "Varianten",
  checkboxLabel: "Variantenartikel erstellen",
  question: "Ist dies ein Produkt, das Varianten hat?",
  example: "Beispiel:",
  description:
    "Sie verkaufen einen Artikel, den Sie in verschiedenen Farben oder Füllmengen anbieten.",
  actions: {
    continue: "Weiter",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
