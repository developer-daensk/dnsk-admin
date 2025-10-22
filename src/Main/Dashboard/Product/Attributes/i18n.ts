import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Product Attributes",
  createButton: "+ Create New Attribute",
  searchPlaceholder: "Search attributes...",
  sortBy: "Sort By",
  foundText: "attributes found",
  sortOptions: {
    name: "Attribute Name",
    description: "Description",
    createdAt: "Created Date",
    updatedAt: "Updated Date",
  },
  tableHeaders: {
    name: "Attribute Name",
    description: "Description",
    createdAt: "Created Date",
    updatedAt: "Updated Date",
    actions: "Actions",
  },
  actions: {
    edit: "Edit",
    delete: "Delete",
  },
  form: {
    title: "Product Attribute",
    editTitle: "Edit Product Attribute",
    attributeName: "Attribute Name*",
    attributeDescription: "Attribute Description",
    enterAttributeName: "Enter attribute name",
    enterAttributeDescription: "e.g. Product color",
    cancel: "Cancel",
    save: "Save",
  },
  pagination: {
    total: "Total Attributes",
    page: "page",
    perPage: "/ page",
  },
};

const de = {
  title: "Produktattribute",
  createButton: "+ Neues Attribut erstellen",
  searchPlaceholder: "Attribute suchen...",
  sortBy: "Sortieren nach",
  foundText: "Attribute gefunden",
  sortOptions: {
    name: "Attributname",
    description: "Beschreibung",
    createdAt: "Erstellungsdatum",
    updatedAt: "Aktualisierungsdatum",
  },
  tableHeaders: {
    name: "Attributname",
    description: "Beschreibung",
    createdAt: "Erstellungsdatum",
    updatedAt: "Aktualisierungsdatum",
    actions: "Aktionen",
  },
  actions: {
    edit: "Bearbeiten",
    delete: "Löschen",
  },
  form: {
    title: "Produktattribut",
    editTitle: "Produktattribut bearbeiten",
    attributeName: "Attributname*",
    attributeDescription: "Attributbeschreibung",
    enterAttributeName: "Attributnamen eingeben",
    enterAttributeDescription: "z.B. Produktfarbe",
    cancel: "Abbrechen",
    save: "Speichern",
  },
  pagination: {
    total: "Gesamt Attribute",
    page: "Seite",
    perPage: "/ Seite",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
