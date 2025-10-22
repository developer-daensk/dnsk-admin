import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  content: {
    title: "Content",
    subtitle:
      "The higher the quality of the article data, the higher the sales chances.",
    guidelines: {
      titleWithoutFiller: "Title with few filler words",
      titleWithKeywords: "Title with many keywords",
      imagesWithoutBackground: "Images without background",
      uniqueImages: "Unique images",
    },
  },
  description: {
    title: "Description",
    mainPlaceholder: "Enter the main description of your product...",
  },
  specifications: {
    title: "Specifications",
    namePlaceholder: "Specification name",
    valuePlaceholder: "Specification value",
    addMore: "Add more specification",
    deleteWarning: "At least one specification is required",
  },
  actions: {
    cancel: "Cancel",
    save: "Save",
    validationError: "Please check your input and try again",
  },
};

const de: iDictionary = {
  content: {
    title: "Inhalt",
    subtitle:
      "Je höher die Qualität der Artikeldaten, desto höher die Verkaufschancen.",
    guidelines: {
      titleWithoutFiller: "Titel mit wenigen Füllwörtern",
      titleWithKeywords: "Titel mit vielen Keywords",
      imagesWithoutBackground: "Bilder ohne Hintergrund",
      uniqueImages: "Einzigartige Bilder",
    },
  },
  description: {
    title: "Beschreibung",
    mainPlaceholder: "Geben Sie die Hauptbeschreibung Ihres Produkts ein...",
  },
  specifications: {
    title: "Spezifikationen",
    namePlaceholder: "Spezifikationsname",
    valuePlaceholder: "Spezifikationswert",
    addMore: "Weitere Spezifikation hinzufügen",
    deleteWarning: "Mindestens eine Spezifikation ist erforderlich",
  },
  actions: {
    cancel: "Abbrechen",
    save: "Speichern",
    validationError:
      "Bitte überprüfen Sie Ihre Eingabe und versuchen Sie es erneut",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
