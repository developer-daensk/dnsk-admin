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
    edit: "Edit",
  },
  specifications: {
    title: "Specifications",
  },
  actions: {
    continue: "Continue",
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
    edit: "Bearbeiten",
  },
  specifications: {
    title: "Spezifikationen",
  },
  actions: {
    continue: "Weiter",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
