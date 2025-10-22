import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: {
    editArticles: "Edit Articles",
  },
  subtitle: {
    editArticles: "Adjust and complete article data",
  },
  noVariants: "No variants available. Please create variants first.",
  clickToToggle: "Click to toggle status",
  editVariant: "Edit variant",
  table: {
    attribute: "Attribute",
    option: "Option",
    baseData: "Base Data",
    specifications: "Specifications",
    listings: "Listings",
  },
  status: {
    completed: "Completed",
    open: "Open",
  },
  button: {
    editArticles: "Edit Articles",
  },
};

const de: iDictionary = {
  title: {
    editArticles: "Artikel bearbeiten",
  },
  subtitle: {
    editArticles: "Artikeldaten anpassen und fertigstellen",
  },
  noVariants:
    "Keine Varianten verfügbar. Bitte erstellen Sie zuerst Varianten.",
  clickToToggle: "Klicken Sie, um den Status zu ändern",
  editVariant: "Variante bearbeiten",
  table: {
    attribute: "Attribut",
    option: "Option",
    baseData: "Stammdaten",
    specifications: "Spezifikationen",
    listings: "Listings",
  },
  status: {
    completed: "erledigt",
    open: "offen",
  },
  button: {
    editArticles: "Artikel bearbeiten",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
