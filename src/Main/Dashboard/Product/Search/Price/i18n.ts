const en = {
  title: "Price and Inventory",
  description:
    "Set your own sales data here. This data refers purely to your own sale.",
  price: {
    label: "Price",
    placeholder: "Enter price",
    currency: "EUR",
  },
  inventory: {
    label: "Inventory",
    placeholder: "Enter quantity",
    unit: "pieces",
  },
  buttons: {
    continue: "Continue",
    back: "Back",
  },
};

const de = {
  title: "Preis und Inventar",
  description:
    "Legen Sie hier Ihre eigenen Verkaufsdate fest. Diese Daten beziehen sich rein auf Ihren eigenen Verkauf.",
  price: {
    label: "Preis",
    placeholder: "Preis eingeben",
    currency: "EUR",
  },
  inventory: {
    label: "Inventar",
    placeholder: "Menge eingeben",
    unit: "Stück",
  },
  buttons: {
    continue: "Weiter",
    back: "Zurück",
  },
};

export type iDictionary = typeof en;

export const getDictionary = (locale: string) => {
  const dictionaries = {
    en,
    de,
  };

  return dictionaries[locale as keyof typeof dictionaries] || en;
};
