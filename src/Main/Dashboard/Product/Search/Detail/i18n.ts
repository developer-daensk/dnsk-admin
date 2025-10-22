import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  productDetail: "Product Detail",
  productDetailDescription: "View and edit product information",
  back: "Back",
  createNewProduct: "Create New Product",
  productForm: "Product Form",
  title: "Title",
  condition: "Condition",
  idin: "IDIN",
  media: "Media",
  editProduct: "Edit Product",
  continue: "Continue",
  cancel: "Cancel",
  save: "Save",
  changesSavedSuccess: "Changes saved successfully",
  saveError: "Error saving changes",
  ean: "EAN",
  upc: "UPC",
};

const de: iDictionary = {
  productDetail: "Produktdetails",
  productDetailDescription: "Produktinformationen anzeigen und bearbeiten",
  back: "Zurück",
  createNewProduct: "Neues Produkt erstellen",
  productForm: "Produktformular",
  title: "Titel",
  condition: "Zustand",
  idin: "IDIN",
  media: "Medien",
  editProduct: "Produkt bearbeiten",
  continue: "Weiter",
  cancel: "Abbrechen",
  save: "Speichern",
  changesSavedSuccess: "Änderungen erfolgreich gespeichert",
  saveError: "Fehler beim Speichern der Änderungen",
  ean: "EAN",
  upc: "UPC",
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
