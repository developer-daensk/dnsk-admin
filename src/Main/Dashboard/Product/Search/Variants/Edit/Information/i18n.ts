import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Variant Information",
  subtitle: "Enter detailed information about this product variant",
  idin: {
    label: "IDIN",
    existsMessage: "This IDIN already exists in the system",
  },
  variantDescription: {
    label: "Variant Description",
    placeholder: "Enter a detailed description of this variant...",
  },
  media: {
    label: "Media",
  },
  condition: {
    label: "Condition",
    placeholder: "Select condition",
    options: {
      new: "New",
      refurbished: "Refurbished",
      used: "Used",
      damaged: "Damaged",
    },
  },
  specifications: {
    label: "Specifications",
    nameLabel: "Name",
    valueLabel: "Value",
    addMore: "Add more specification",
  },
  identification: {
    label: "Identification",
    addMore: "Add more identification",
  },
  tags: {
    label: "Tags",
    addTag: "Add a new tag",
    addButton: "Add",
  },
  button: {
    next: "Continue",
  },
};

const de = {
  title: "Varianten-Information",
  subtitle: "Geben Sie detaillierte Informationen zu dieser Produktvariante ein",
  idin: {
    label: "IDIN",
    existsMessage: "Diese IDIN existiert bereits im System",
  },
  variantDescription: {
    label: "Varianten-Beschreibung",
    placeholder: "Geben Sie eine detaillierte Beschreibung dieser Variante ein...",
  },
  media: {
    label: "Medien",
  },
  condition: {
    label: "Zustand",
    placeholder: "Zustand auswählen",
    options: {
      new: "Neu",
      refurbished: "Aufbereitet",
      used: "Gebraucht",
      damaged: "Beschädigt",
    },
  },
  specifications: {
    label: "Spezifikationen",
    nameLabel: "Name",
    valueLabel: "Wert",
    addMore: "Weitere Spezifikation hinzufügen",
  },
  identification: {
    label: "Identifikation",
    addMore: "Weitere Identifikation hinzufügen",
  },
  tags: {
    label: "Tags",
    addTag: "Neuen Tag hinzufügen",
    addButton: "Hinzufügen",
  },
  button: {
    next: "Weiter",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
