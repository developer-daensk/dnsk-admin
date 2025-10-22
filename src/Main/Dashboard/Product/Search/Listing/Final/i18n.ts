import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  // Page Header
  title: "Artikel einstellen",
  titleTranslation: "Set up articles",
  description:
    "This page displays the individual listings seller has already created. The goal is to present the most important data in one place and make it accessible simple. At the same time, it should look good and be functional.",
  descriptionTranslation:
    'each listing is divided into two sections: "Price and Specification Related Data" and "Inventory and Shipping Related Data."',

  // Entries Section
  entries: "Einträge",
  entriesTranslation: "Listings",
  entriesDescription:
    "Legen Sie Ihre eigenen Einträge an und hinterlegen Inventarmengen, Standortdaten und Warenpreise.",
  entriesDescriptionTranslation:
    "Create your own entries and store inventory quantities, location data and product prices.",
  createNewEntry: "Eintrag anlegen",
  createNewEntryTranslation: "Create new listing",

  // Listing Management
  createNewListing: "Create New Listing",
  noListingsFound: "No listings found for this product",
  noListingsFoundTranslation: "Keine Anzeigen für dieses Produkt gefunden",

  // Company and Product Information
  company: "DK277",
  companyName: "Müller & Sohn GmbH",
  companyAddress: "22113 Hamburg, DE",
  productName: "Europalette 120x80x14,4 cm 1. Wahl Tauschfähig",
  idin: "IDIN",
  idinNumber: "54684846814864",
  totalValue: "11.273,46 €",
  totalValueDescription:
    "total value of the inventory multiplied by the selling price",

  // Price and Specification Related Data
  priceSpecSection: "price and specification related data",
  netPricePerUnit: "Nettopreis je Einheit",
  netPricePerUnitTranslation: "Net price per unit",
  basePrice: "0,25€/Ifdm",
  vat: "USt",
  vatTranslation: "VAT",
  grossPrice: "Bruttopreis",
  grossPriceTranslation: "Gross price",
  unitOfMeasure: "Maßeinheit",
  unitOfMeasureTranslation: "Unit of measure",
  totalDimension: "Gesamtmaß",
  totalDimensionTranslation: "Total dimension",
  minimumQuantity: "Mindestmenge",
  minimumQuantityTranslation: "Minimum quantity",
  packagingUnit: "Verpackungseinheit",
  packagingUnitTranslation: "Packaging unit",
  typeOfGoods: "Warenart",
  typeOfGoodsTranslation: "Type of goods",
  palletized: "palettiert",
  palletizedTranslation: "palletized",
  loadingEquipment: "Lademittel",
  loadingEquipmentTranslation: "Loading equipment",
  plasticPallet: "Kunststoffpalette H1",
  loadingEquipmentExchange: "Lademitteltausch",
  loadingEquipmentExchangeTranslation: "Loading equipment exchange",
  yes: "Ja",
  yesTranslation: "Yes",
  priceWithoutExchange: "Preis ohne Tausch",
  priceWithoutExchangeTranslation: "Price without exchange",

  // Inventory and Shipping Related Data
  inventoryShippingSection: "inventory and shipping related data",
  availableQuantity: "Verfügbare Menge",
  availableQuantityTranslation: "Available quantity",
  reserved: "Reserviert",
  reservedTranslation: "Reserved",
  inTransit: "In Zulauf",
  inTransitTranslation: "In transit/incoming",
  warehouseId: "Lager-ID",
  warehouseIdTranslation: "Warehouse ID",
  sku: "SKU",
  allowBackorder: "Erlaube Backorder",
  allowBackorderTranslation: "Allow backorder",
  backorderDuration: "Backorder Dauer",
  backorderDurationTranslation: "Backorder duration",
  days: "Tage",
  daysTranslation: "Days",
  reservation: "Reservierung",
  reservationTranslation: "Reservation",
  leadTime: "Vorlauf",
  leadTimeTranslation: "Lead time",
  hours: "Stunden",
  hoursTranslation: "Hours",
  neutralPackaging: "Neutralverp.",
  neutralPackagingTranslation: "Neutral packaging",

  // Status
  status: "Status",
  active: "Active",
  inactive: "Inactive",
  draft: "Draft",

  // Actions
  edit: "Edit",
  delete: "Delete",
  duplicate: "Duplicate",
  view: "View",

  // Buttons
  createListing: "Create Listing",
  backToProduct: "Back to Product",

  // Messages
  listingCreatedSuccess: "Listing created successfully",
  listingUpdatedSuccess: "Listing updated successfully",
  listingDeletedSuccess: "Listing deleted successfully",
  confirmDelete: "Are you sure you want to delete this listing?",
};

const de: iDictionary = {
  // Page Header
  title: "Artikel einstellen",
  titleTranslation: "Set up articles",
  description:
    "This page displays the individual listings seller has already created. The goal is to present the most important data in one place and make it accessible simple. At the same time, it should look good and be functional.",
  descriptionTranslation:
    'each listing is divided into two sections: "Price and Specification Related Data" and "Inventory and Shipping Related Data."',

  // Entries Section
  entries: "Einträge",
  entriesTranslation: "Listings",
  entriesDescription:
    "Legen Sie Ihre eigenen Einträge an und hinterlegen Inventarmengen, Standortdaten und Warenpreise.",
  entriesDescriptionTranslation:
    "Create your own entries and store inventory quantities, location data and product prices.",
  createNewEntry: "Eintrag anlegen",
  createNewEntryTranslation: "Create new listing",

  // Listing Management
  createNewListing: "Neue Anzeige erstellen",
  noListingsFound: "Keine Anzeigen für dieses Produkt gefunden",
  noListingsFoundTranslation: "No listings found for this product",

  // Company and Product Information
  company: "DK277",
  companyName: "Müller & Sohn GmbH",
  companyAddress: "22113 Hamburg, DE",
  productName: "Europalette 120x80x14,4 cm 1. Wahl Tauschfähig",
  idin: "IDIN",
  idinNumber: "54684846814864",
  totalValue: "11.273,46 €",
  totalValueDescription:
    "total value of the inventory multiplied by the selling price",

  // Price and Specification Related Data
  priceSpecSection: "price and specification related data",
  netPricePerUnit: "Nettopreis je Einheit",
  netPricePerUnitTranslation: "Net price per unit",
  basePrice: "0,25€/Ifdm",
  vat: "USt",
  vatTranslation: "VAT",
  grossPrice: "Bruttopreis",
  grossPriceTranslation: "Gross price",
  unitOfMeasure: "Maßeinheit",
  unitOfMeasureTranslation: "Unit of measure",
  totalDimension: "Gesamtmaß",
  totalDimensionTranslation: "Total dimension",
  minimumQuantity: "Mindestmenge",
  minimumQuantityTranslation: "Minimum quantity",
  packagingUnit: "Verpackungseinheit",
  packagingUnitTranslation: "Packaging unit",
  typeOfGoods: "Warenart",
  typeOfGoodsTranslation: "Type of goods",
  palletized: "palettiert",
  palletizedTranslation: "palletized",
  loadingEquipment: "Lademittel",
  loadingEquipmentTranslation: "Loading equipment",
  plasticPallet: "Kunststoffpalette H1",
  loadingEquipmentExchange: "Lademitteltausch",
  loadingEquipmentExchangeTranslation: "Loading equipment exchange",
  yes: "Ja",
  yesTranslation: "Yes",
  priceWithoutExchange: "Preis ohne Tausch",
  priceWithoutExchangeTranslation: "Price without exchange",

  // Inventory and Shipping Related Data
  inventoryShippingSection: "inventory and shipping related data",
  availableQuantity: "Verfügbare Menge",
  availableQuantityTranslation: "Available quantity",
  reserved: "Reserviert",
  reservedTranslation: "Reserved",
  inTransit: "In Zulauf",
  inTransitTranslation: "In transit/incoming",
  warehouseId: "Lager-ID",
  warehouseIdTranslation: "Warehouse ID",
  sku: "SKU",
  allowBackorder: "Erlaube Backorder",
  allowBackorderTranslation: "Allow backorder",
  backorderDuration: "Backorder Dauer",
  backorderDurationTranslation: "Backorder duration",
  days: "Tage",
  daysTranslation: "Days",
  reservation: "Reservierung",
  reservationTranslation: "Reservation",
  leadTime: "Vorlauf",
  leadTimeTranslation: "Lead time",
  hours: "Stunden",
  hoursTranslation: "Hours",
  neutralPackaging: "Neutralverp.",
  neutralPackagingTranslation: "Neutral packaging",

  // Status
  status: "Status",
  active: "Aktiv",
  inactive: "Inaktiv",
  draft: "Entwurf",

  // Actions
  edit: "Bearbeiten",
  delete: "Löschen",
  duplicate: "Duplizieren",
  view: "Anzeigen",

  // Buttons
  createListing: "Anzeige erstellen",
  backToProduct: "Zurück zum Produkt",

  // Messages
  listingCreatedSuccess: "Anzeige erfolgreich erstellt",
  listingUpdatedSuccess: "Anzeige erfolgreich aktualisiert",
  listingDeletedSuccess: "Anzeige erfolgreich gelöscht",
  confirmDelete: "Sind Sie sicher, dass Sie diese Anzeige löschen möchten?",
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
