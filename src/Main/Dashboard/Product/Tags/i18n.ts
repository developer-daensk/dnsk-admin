import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Product Tags",
  createButton: "+ Add Product Tag",
  searchPlaceholder: "Search tags...",
  sortBy: "Sort By",
  foundText: "tags found",
  sortOptions: {
    name: "Tag Name",
    description: "Description",
    createdAt: "Created Date",
    updatedAt: "Updated Date",
  },
  tableHeaders: {
    name: "Tag Name",
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
    title: "Add Product Tag",
    editTitle: "Edit Product Tag",
    tagName: "Tag Name",
    tagDescription: "Tag Description",
    enterTagName: "Enter tag name",
    enterTagDescription: "Enter tag description (optional)",
    cancel: "Cancel",
    ok: "OK",
  },
  pagination: {
    total: "Total Tags",
    page: "page",
    perPage: "/ page",
  },
};

const de = {
  title: "Produkt-Tags",
  createButton: "+ Produkt-Tag hinzufügen",
  searchPlaceholder: "Tags suchen...",
  sortBy: "Sortieren nach",
  foundText: "Tags gefunden",
  sortOptions: {
    name: "Tag-Name",
    description: "Beschreibung",
    createdAt: "Erstellungsdatum",
    updatedAt: "Aktualisierungsdatum",
  },
  tableHeaders: {
    name: "Tag-Name",
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
    title: "Produkt-Tag hinzufügen",
    editTitle: "Produkt-Tag bearbeiten",
    tagName: "Tag-Name",
    tagDescription: "Tag-Beschreibung",
    enterTagName: "Tag-Namen eingeben",
    enterTagDescription: "Tag-Beschreibung eingeben (optional)",
    cancel: "Abbrechen",
    ok: "OK",
  },
  pagination: {
    total: "Gesamt Tags",
    page: "Seite",
    perPage: "/ Seite",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
