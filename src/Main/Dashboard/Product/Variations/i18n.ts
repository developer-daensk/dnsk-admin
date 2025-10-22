import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Product Variations",
  createButton: "+ Add Product Variation",
  searchPlaceholder: "Search variations...",
  sortBy: "Sort By",
  foundText: "variations found",
  sortOptions: {
    name: "Variation Name",
    type: "Type",
    uiType: "UI Type",
    createdAt: "Created Date",
    updatedAt: "Updated Date",
  },
  tableHeaders: {
    name: "Variation Name",
    type: "Type",
    uiType: "UI Type",
    items: "Items",
    createdAt: "Created Date",
    updatedAt: "Updated Date",
    actions: "Actions",
  },
  actions: {
    edit: "Edit",
    delete: "Delete",
  },
  form: {
    title: "Add Product Variation",
    editTitle: "Edit Product Variation",
    variationName: "* Variation Name",
    type: "* Type",
    uiType: "* UI Type",
    enterVariationName: "Enter variation name",
    enterType: "Enter type",
    enterUiType: "Select UI type",
    items: "Items",
    itemName: "Item Name",
    itemValue: "Item Value",
    addItem: "Add Item",
    cancel: "Cancel",
    ok: "OK",
  },
  pagination: {
    total: "Total Variations",
    page: "page",
    perPage: "/ page",
  },
};

const de = {
  title: "Produktvariationen",
  createButton: "+ Produktvariation hinzufügen",
  searchPlaceholder: "Variationen suchen...",
  sortBy: "Sortieren nach",
  foundText: "Variationen gefunden",
  sortOptions: {
    name: "Variationsname",
    type: "Typ",
    uiType: "UI-Typ",
    createdAt: "Erstellungsdatum",
    updatedAt: "Aktualisierungsdatum",
  },
  tableHeaders: {
    name: "Variationsname",
    type: "Typ",
    uiType: "UI-Typ",
    items: "Elemente",
    createdAt: "Erstellungsdatum",
    updatedAt: "Aktualisierungsdatum",
    actions: "Aktionen",
  },
  actions: {
    edit: "Bearbeiten",
    delete: "Löschen",
  },
  form: {
    title: "Produktvariation hinzufügen",
    editTitle: "Produktvariation bearbeiten",
    variationName: "* Variationsname",
    type: "* Typ",
    uiType: "* UI-Typ",
    enterVariationName: "Variationsnamen eingeben",
    enterType: "Typ eingeben",
    enterUiType: "UI-Typ auswählen",
    items: "Elemente",
    itemName: "Elementname",
    itemValue: "Elementwert",
    addItem: "Element hinzufügen",
    cancel: "Abbrechen",
    ok: "OK",
  },
  pagination: {
    total: "Gesamt Variationen",
    page: "Seite",
    perPage: "/ Seite",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
