import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Search Products",
  description: "Search for existing products or create a new one",
  saveAndBack: "Save and Back",
  createNewProduct: "Create New Product",
  searchTypeLabel: "Search Type",
  searchTypeTitle: "Search by Title",
  searchTypeIdentifier: "Search by Identifier",
  searchPlaceholderTitle: "Search products by title...",
  searchPlaceholderIdentifier: "Search by EAN, GTIN, UPC, or IDIN...",
  searching: "Searching...",
  searchError: "Search failed. Please try again.",
  noProductsFound: "No products found",
  productSelected: "Product '{title}' selected",
  draftSaved: "Draft saved successfully",
  continue: "Continue",
  continueWithoutProduct: "Continue without Product",
  selected: "Selected",
};

const de: iDictionary = {
  title: "Produkte suchen",
  description: "Suche nach bestehenden Produkten oder erstelle ein neues",
  saveAndBack: "Speichern und Zurück",
  createNewProduct: "Neues Produkt erstellen",
  searchTypeLabel: "Suchtyp",
  searchTypeTitle: "Nach Titel suchen",
  searchTypeIdentifier: "Nach Kennung suchen",
  searchPlaceholderTitle: "Produkte nach Titel suchen...",
  searchPlaceholderIdentifier: "Nach EAN, GTIN, UPC oder IDIN suchen...",
  searching: "Suche läuft...",
  searchError: "Suche fehlgeschlagen. Bitte versuchen Sie es erneut.",
  noProductsFound: "Keine Produkte gefunden",
  productSelected: "Produkt '{title}' ausgewählt",
  draftSaved: "Entwurf erfolgreich gespeichert",
  continue: "Weiter",
  continueWithoutProduct: "Ohne Produkt fortfahren",
  selected: "Ausgewählt",
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
