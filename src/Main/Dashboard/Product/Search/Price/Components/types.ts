export interface PricingFormData {
  // Preise (Pricing) Section
  nettopreis: number | null; // Nettopreis (Net Price)
  enthaltUst: number | null; // Enth. USt. (VAT included)
  bruttopreis: number | null; // Bruttopreis (Gross Price)
  ust: string; // USt. (VAT percentage)
  additionalPrice: number | null; // Additional price per unit
  additionalPriceUnit: string; // Unit for additional price (e.g., "Ifdm")
  gesamtmaß: number | null; // Gesamtmaß (Total dimension)
  gesamtmaßUnit: string; // Unit for total dimension
  basismaß: number | null; // Basismaß (Base dimension)
  basismaßUnit: string; // Unit for base dimension

  // Inventar (Inventory) Section
  standort: string; // Standort (Location)
  verfügbareMenge: number | null; // Verfügbare Menge (Available quantity)
  verfügbareMengeUnit: string; // Unit for available quantity
  sku: string; // SKU (optional)
  lagerId: string; // Lager-ID (Warehouse ID) (optional)

  // Vorlauf- und Vorbereitungsdauer (Lead and Preparation Time)
  dauer: number | null; // Dauer (Duration)
  dauerUnit: string; // Unit for duration (e.g., "Tage")
  backorderErlauben: boolean; // Backorder erlauben (Allow backorders)
  zusätzlicherVorlauf: number | null; // Zusätzlicher Vorlauf (Additional lead time)
  zusätzlicherVorlaufUnit: string; // Unit for additional lead time

  // Mindestmengen (Minimum Quantities)
  mindestverkaufsmenge: number | null; // Mindestverkaufsmenge (Minimum sales quantity)
  mindestverkaufsmengeUnit: string; // Unit for minimum sales quantity

  // Verpackungseinheit (VE) (Packaging Unit)
  ve: number | null; // VE (Packaging unit)
  veUnit: string; // Unit for packaging unit
  enthaltenIm: string; // enthalten im (contained in)

  // Lademittel (Loading Equipment)
  loseWare: boolean; // Handelt es sich um Lose Ware
  zweiMannHandling: boolean; // 2-Mann Handling
  palettiert: boolean; // Ist der Artikel palettiert
  verwendeteLademittel: string; // Verwendete Lademittel
  lademitteltausch: boolean; // Lademitteltausch bei Verladung möglich
  stückpreisOhneTausch: number | null; // Stückpreis ohne Tausch

  // Neutralverpackung (Neutral Packaging)
  neutralverpackung: boolean; // Neutralverpackung
}

export interface VATRate {
  value: string;
  label: string;
  rate: number;
}

export const VAT_RATES: VATRate[] = [
  { value: "0", label: "0% (Steuerbefreit)", rate: 0 },
  { value: "7", label: "7% (Ermäßigter Satz)", rate: 7 },
  { value: "19", label: "19% (Regelsatz)", rate: 19 },
];

export const DIMENSION_UNITS = [
  { value: "Ifdm", label: "Ifdm" },
  { value: "m", label: "Meter" },
  { value: "cm", label: "Zentimeter" },
  { value: "mm", label: "Millimeter" },
  { value: "Stück", label: "Stück" },
];

export const TIME_UNITS = [
  { value: "Tage", label: "Tage" },
  { value: "Stunden", label: "Stunden" },
  { value: "Wochen", label: "Wochen" },
];

export const PACKAGING_UNITS = [
  { value: "Stück", label: "Stück" },
  { value: "Karton", label: "Karton" },
  { value: "Palette", label: "Palette" },
  { value: "Paket", label: "Paket" },
];

export const LOADING_EQUIPMENT = [
  {
    value: "Kunststoffpalette H1 (tauschfähig)",
    label: "Kunststoffpalette H1 (tauschfähig)",
  },
  { value: "Europalette", label: "Europalette" },
  { value: "Industriepalette", label: "Industriepalette" },
  { value: "Keine", label: "Keine" },
];

export const CONTAINER_TYPES = [
  { value: "Karton", label: "Karton" },
  { value: "Paket", label: "Paket" },
  { value: "Kiste", label: "Kiste" },
  { value: "Sack", label: "Sack" },
];
