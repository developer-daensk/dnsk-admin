import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  saveAndBack: "Save and Back",
  createNewProduct: "Create listing",
  selectedTags: "Selected Tags",
  noTagsSelected: "No tags selected",
  searchAids: "Search aids (multiple selection)",
  selectInstructionSubtitle:
    'or create a new product by "continue without product"',
  productSelectedSuccess: "Product selected successfully",
  pleaseSelectProduct: "Please select a product first",
  continueWithoutProductSuccess: "Continuing without product",
  continueWithoutProduct: "Continue without Product",
  continue: "Continue",
  used: "Used",
  firstChoice: "1st Choice",
  exchangeable: "Exchangeable",
  epalIsmpCertified: "EPAL & ISMP certified",
  dimensions: "1200 x 800 x 144 mm",
  euroPalletUsed: "Euro pallet used 1st choice, exchangeable",
  euroPalletSubtitle: "1200 x 800 x 144 mm, EPAL-certified",
  dachbaustoffe: "Dachbaustoffe",
  holzlatten: "Wooden Laths",
  baustoffe: "Building Materials",
  nordischeFichte: "Nordic Spruce",
  rahmenholz: "Frame Wood",
};

const de: iDictionary = {
  saveAndBack: "Speichern und Zurück",
  createNewProduct: "Anzeige erstellen",
  selectedTags: "Ausgewählte Tags",
  noTagsSelected: "Keine Tags ausgewählt",
  searchAids: "Suchhilfen (Mehrfachauswahl)",
  selectInstructionSubtitle:
    'oder erstellen Sie ein neues Produkt durch "ohne Produkt fortfahren"',
  productSelectedSuccess: "Produkt erfolgreich ausgewählt",
  pleaseSelectProduct: "Bitte wählen Sie zuerst ein Produkt aus",
  continueWithoutProductSuccess: "Ohne Produkt fortfahren",
  continueWithoutProduct: "Ohne Produkt fortfahren",
  continue: "Weiter",
  used: "Gebraucht",
  firstChoice: "1. Wahl",
  exchangeable: "Austauschbar",
  epalIsmpCertified: "EPAL & ISMP zertifiziert",
  dimensions: "1200 x 800 x 144 mm",
  euroPalletUsed: "Euro Palette gebraucht 1. Wahl, austauschbar",
  euroPalletSubtitle: "1200 x 800 x 144 mm, EPAL-zertifiziert",
  dachbaustoffe: "Dachbaustoffe",
  holzlatten: "Holzlatten",
  baustoffe: "Baustoffe",
  nordischeFichte: "Nordische Fichte",
  rahmenholz: "Rahmenholz",
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
