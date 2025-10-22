const en = {
  title: "Preis und Inventar",
  titleTranslation: "Price and inventory",
  description:
    "Legen Sie hier Ihre eigenen Verkaufsdate fest. Diese Daten beziehen sich rein auf Ihren eigenen Verkauf.",
  descriptionTranslation:
    "Set your own sales dates here. These dates relate solely to your own sales.",

  // Pricing Section
  preise: {
    title: "Preise",
    nettopreis: {
      label: "Nettopreis",
      labelTranslation: "Netprice (VAT excluded)",
      placeholder: "Enter net price",
    },
    enthaltUst: {
      label: "Enth. USt.",
      labelTranslation: "incl. VAT",
      placeholder: "VAT amount",
    },
    bruttopreis: {
      label: "Bruttopreis",
      labelTranslation: "Grossprice",
      placeholder: "Gross price",
    },
    ust: {
      label: "USt.",
      labelTranslation: "VAT",
      placeholder: "Select VAT rate",
      dropdownNote: "Dropdown (19%, 7%)",
    },
    additionalPrice: {
      label: "0,25 €/Ifdm",
      labelTranslation: "base price (totalunit / netprice)",
      placeholder: "Additional price per unit",
    },
    gesamtmaß: {
      label: "Gesamtmaß",
      labelTranslation: "total unit",
      placeholder: "Total dimension",
    },
    gesamtmaßUnit: {
      label: "Einheit",
      labelTranslation: "unit",
      placeholder: "Select unit",
    },
    basismaß: {
      label: "Basismaß",
      labelTranslation: "base unit",
      placeholder: "Base dimension",
    },
    basismaßUnit: {
      label: "Einheit",
      labelTranslation: "unit",
      placeholder: "Select unit",
    },
    example:
      "example: total unit is kilogramm, then base unit can only be: kg, g, mg",
  },

  // Inventory Section
  inventar: {
    title: "Inventar",
    titleTranslation: "Inventory",
    standort: {
      label: "Standort",
      labelTranslation: "Choose Location",
      change: "ändern",
    },
    verfügbareMenge: {
      label: "Verfügbare Menge",
      labelTranslation: "total available quantity",
      placeholder: "Available quantity",
    },
    sku: {
      label: "SKU",
      labelTranslation: "internal number for warehouse identification (seller)",
      placeholder: "SKU",
      optional: "optional",
    },
    lagerId: {
      label: "Lager-ID",
      placeholder: "Warehouse ID",
      optional: "optional",
    },
  },

  // Lead Time and Preparation Duration Section
  vorlauf: {
    title: "Vorlauf- und Vorbereitungsdauer",
    titleTranslation: "Lead time and preparation time",
    description:
      "Wie lange benötigen Sie den Artikel vorzubereiten? Ist der Artikel verfügbar wäre eine kurze Dauer für das Einpacken angebracht. Muss der Artikel hergestellt werden, geben Sie die Herstellungsdauer an.",
    descriptionTranslation:
      "How long do you need to prepare the item? If the item is available, a short packing time would be appropriate. If the item needs to be manufactured, please specify the production time.",
    dauer: {
      label: "Dauer",
      labelTranslation: "time",
      placeholder: "Duration",
    },
    dauerUnit: {
      label: "Einheit",
      labelTranslation: "unit (dropdown: hours, days, weeks)",
      placeholder: "Select unit",
    },
    backorderErlauben: {
      label: "Backorder erlauben",
      labelTranslation: "allow backorder?",
      description:
        "Soll der Artikel zum letzten angegebenen Preis weiterhin zum Verkauf angeboten werden, auch wenn der Warenbestand auf 0 fällt? Dies bietet sich an bei Waren, die regelmäßig neu eintreffen und erhöhen die Verkaufschancen. Eine Bereitstellung der Waren in der angegebenen Zeit ist verbindlich.",
      descriptionTranslation:
        "Should the item continue to be offered for sale at the last listed price even if the inventory drops to zero? This is a good option for items that arrive regularly and increases the chances of selling. Availability of the items within the specified time is mandatory.",
    },
    zusätzlicherVorlauf: {
      label: "Zusätzlicher Vorlauf",
      labelTranslation: "additional lead time",
      placeholder: "Additional lead time",
      unit: "Tage",
      unitTranslation: "days",
    },
  },

  // Minimum Quantities Section
  mindestmengen: {
    title: "Mindestmengen",
    titleTranslation: "minimum quantities",
    description:
      "Welche Menge soll mindestens von diesem Artikel in einem Auftrag verkauft werden?",
    descriptionTranslation:
      "What is the minimum quantity of this item that should be sold in one order?",
    mindestverkaufsmenge: {
      label: "Mindestverkaufsmenge",
      placeholder: "Minimum sales quantity",
      unit: "Stück",
      unitTranslation: "piece",
    },
  },

  // Packaging Unit Section
  verpackungseinheit: {
    title: "Verpackungseinheit (VE)",
    titleTranslation: "Packing Unit",
    description:
      "In welchen Verpackungseinheiten und -intervallen soll dieser Artikel verkauft werden?",
    descriptionTranslation:
      "In which packaging units and intervals should this item be sold?",
    ve: {
      label: "VE",
      labelTranslation: "QTY",
      placeholder: "Packaging unit",
    },
    veUnit: {
      label: "Einheit",
      labelTranslation: "Unit",
      placeholder: "Select unit",
    },
    enthaltenIm: {
      label: "enthalten im",
      labelTranslation: "included in",
      placeholder: "contained in",
      unit: "unit",
    },
  },

  // Loading Equipment Section
  lademittel: {
    title: "Lademittel",
    titleTranslation: "Loading Equipment",
    note: "only one of the three can be selected",
    loseWare: {
      label:
        "Handelt es sich um Lose Ware (z.B. Schüttgut)? Beladeoption an Ihrem Standort muss gegeben sein.",
      labelTranslation:
        "Is the shipment loose (e.g, bulk)? Loading options must be available at your location,",
    },
    zweiMannHandling: {
      label:
        "Handelt es sich um Ware die im 2-Mann Handling bearbeitet werden muss?",
      labelTranslation: "Is this goods that requires two-person handling?",
    },
    palettiert: {
      label: "Ist der Artikel palettiert oder kann palettiert werden?",
      labelTranslation: "Is the item palletized or can it be palletized?",
      conditionalLogic: "conditional logic",
    },
    verwendeteLademittel: {
      label: "Verwendete Lademittel",
      labelTranslation: "loading equipment used",
      placeholder: "Kunststoffpalette H1 (tauschfähig)",
    },
    lademitteltausch: {
      label: "Lademitteltausch bei Verladung möglich?",
      labelTranslation: "is a pallet exchange possible here?",
    },
    stückpreisOhneTausch: {
      label: "Stückpreis ohne Tausch (zzgl. USt.)",
      labelTranslation: "price per piece without exchange (excl. VAT)",
      placeholder: "Unit price without exchange",
    },
  },

  // Neutral Packaging Section
  neutralverpackung: {
    title: "Neutralverpackung",
    titleTranslation: "neutral packaging?",
    label: "Neutralverpackung",
    labelTranslation: "neutral packaging?",
    description:
      "Kann der Artikel neu verpackt und ohne Angabe Ihrer Firmeninformationen angeboten werden? Die Information, ob der Artikel neutral verpackt werden muss, wird bei Auftragseingang übermittelt.",
    descriptionTranslation:
      "Can the item be repackaged and offered without providing your company information? Information about whether the item requires neutral packaging will be provided upon receipt of the order.",
  },

  currency: "EUR",
  buttons: {
    weiter: "Weiter",
    zurück: "Zurück",
  },
  errors: {
    required: "This field is required",
    invalidNumber: "Please enter a valid number",
    minValue: "Value must be greater than 0",
  },
};

const de = {
  title: "Preis und Inventar",
  titleTranslation: "Price and inventory",
  description:
    "Legen Sie hier Ihre eigenen Verkaufsdate fest. Diese Daten beziehen sich rein auf Ihren eigenen Verkauf.",
  descriptionTranslation:
    "Set your own sales dates here. These dates relate solely to your own sales.",

  // Preise (Pricing) Section
  preise: {
    title: "Preise",
    nettopreis: {
      label: "Nettopreis",
      labelTranslation: "Netprice (VAT excluded)",
      placeholder: "Nettopreis eingeben",
    },
    enthaltUst: {
      label: "Enth. USt.",
      labelTranslation: "incl. VAT",
      placeholder: "USt.-Betrag",
    },
    bruttopreis: {
      label: "Bruttopreis",
      labelTranslation: "Grossprice",
      placeholder: "Bruttopreis",
    },
    ust: {
      label: "USt.",
      labelTranslation: "VAT",
      placeholder: "USt.-Satz auswählen",
      dropdownNote: "Dropdown (19%, 7%)",
    },
    additionalPrice: {
      label: "0,25 €/Ifdm",
      labelTranslation: "base price (totalunit / netprice)",
      placeholder: "Zusätzlicher Preis pro Einheit",
    },
    gesamtmaß: {
      label: "Gesamtmaß",
      labelTranslation: "total unit",
      placeholder: "Gesamtmaß",
    },
    gesamtmaßUnit: {
      label: "Einheit",
      labelTranslation: "unit",
      placeholder: "Einheit auswählen",
    },
    basismaß: {
      label: "Basismaß",
      labelTranslation: "base unit",
      placeholder: "Basismaß",
    },
    basismaßUnit: {
      label: "Einheit",
      labelTranslation: "unit",
      placeholder: "Einheit auswählen",
    },
    example:
      "example: total unit is kilogramm, then base unit can only be: kg, g, mg",
  },

  // Inventar (Inventory) Section
  inventar: {
    title: "Inventar",
    titleTranslation: "Inventory",
    standort: {
      label: "Standort",
      labelTranslation: "Choose Location",
      change: "ändern",
    },
    verfügbareMenge: {
      label: "Verfügbare Menge",
      labelTranslation: "total available quantity",
      placeholder: "Verfügbare Menge",
    },
    sku: {
      label: "SKU",
      labelTranslation: "internal number for warehouse identification (seller)",
      placeholder: "SKU",
      optional: "optional",
    },
    lagerId: {
      label: "Lager-ID",
      placeholder: "Lager-ID",
      optional: "optional",
    },
  },

  // Vorlauf- und Vorbereitungsdauer Section
  vorlauf: {
    title: "Vorlauf- und Vorbereitungsdauer",
    titleTranslation: "Lead time and preparation time",
    description:
      "Wie lange benötigen Sie den Artikel vorzubereiten? Ist der Artikel verfügbar wäre eine kurze Dauer für das Einpacken angebracht. Muss der Artikel hergestellt werden, geben Sie die Herstellungsdauer an.",
    descriptionTranslation:
      "How long do you need to prepare the item? If the item is available, a short packing time would be appropriate. If the item needs to be manufactured, please specify the production time.",
    dauer: {
      label: "Dauer",
      labelTranslation: "time",
      placeholder: "Dauer",
    },
    dauerUnit: {
      label: "Einheit",
      labelTranslation: "unit (dropdown: hours, days, weeks)",
      placeholder: "Einheit auswählen",
    },
    backorderErlauben: {
      label: "Backorder erlauben",
      labelTranslation: "allow backorder?",
      description:
        "Soll der Artikel zum letzten angegebenen Preis weiterhin zum Verkauf angeboten werden, auch wenn der Warenbestand auf 0 fällt? Dies bietet sich an bei Waren, die regelmäßig neu eintreffen und erhöhen die Verkaufschancen. Eine Bereitstellung der Waren in der angegebenen Zeit ist verbindlich.",
      descriptionTranslation:
        "Should the item continue to be offered for sale at the last listed price even if the inventory drops to zero? This is a good option for items that arrive regularly and increases the chances of selling. Availability of the items within the specified time is mandatory.",
    },
    zusätzlicherVorlauf: {
      label: "Zusätzlicher Vorlauf",
      labelTranslation: "additional lead time",
      placeholder: "Zusätzlicher Vorlauf",
      unit: "Tage",
      unitTranslation: "days",
    },
  },

  // Mindestmengen Section
  mindestmengen: {
    title: "Mindestmengen",
    titleTranslation: "minimum quantities",
    description:
      "Welche Menge soll mindestens von diesem Artikel in einem Auftrag verkauft werden?",
    descriptionTranslation:
      "What is the minimum quantity of this item that should be sold in one order?",
    mindestverkaufsmenge: {
      label: "Mindestverkaufsmenge",
      placeholder: "Mindestverkaufsmenge",
      unit: "Stück",
      unitTranslation: "piece",
    },
  },

  // Verpackungseinheit Section
  verpackungseinheit: {
    title: "Verpackungseinheit (VE)",
    titleTranslation: "Packing Unit",
    description:
      "In welchen Verpackungseinheiten und -intervallen soll dieser Artikel verkauft werden?",
    descriptionTranslation:
      "In which packaging units and intervals should this item be sold?",
    ve: {
      label: "VE",
      labelTranslation: "QTY",
      placeholder: "Verpackungseinheit",
    },
    veUnit: {
      label: "Einheit",
      labelTranslation: "Unit",
      placeholder: "Einheit auswählen",
    },
    enthaltenIm: {
      label: "enthalten im",
      labelTranslation: "included in",
      placeholder: "enthalten im",
      unit: "unit",
    },
  },

  // Lademittel Section
  lademittel: {
    title: "Lademittel",
    titleTranslation: "Loading Equipment",
    note: "only one of the three can be selected",
    loseWare: {
      label:
        "Handelt es sich um Lose Ware (z.B. Schüttgut)? Beladeoption an Ihrem Standort muss gegeben sein.",
      labelTranslation:
        "Is the shipment loose (e.g, bulk)? Loading options must be available at your location,",
    },
    zweiMannHandling: {
      label:
        "Handelt es sich um Ware die im 2-Mann Handling bearbeitet werden muss?",
      labelTranslation: "Is this goods that requires two-person handling?",
    },
    palettiert: {
      label: "Ist der Artikel palettiert oder kann palettiert werden?",
      labelTranslation: "Is the item palletized or can it be palletized?",
      conditionalLogic: "conditional logic",
    },
    verwendeteLademittel: {
      label: "Verwendete Lademittel",
      labelTranslation: "loading equipment used",
      placeholder: "Kunststoffpalette H1 (tauschfähig)",
    },
    lademitteltausch: {
      label: "Lademitteltausch bei Verladung möglich?",
      labelTranslation: "is a pallet exchange possible here?",
    },
    stückpreisOhneTausch: {
      label: "Stückpreis ohne Tausch (zzgl. USt.)",
      labelTranslation: "price per piece without exchange (excl. VAT)",
      placeholder: "Stückpreis ohne Tausch",
    },
  },

  // Neutralverpackung Section
  neutralverpackung: {
    title: "Neutralverpackung",
    titleTranslation: "neutral packaging?",
    label: "Neutralverpackung",
    labelTranslation: "neutral packaging?",
    description:
      "Kann der Artikel neu verpackt und ohne Angabe Ihrer Firmeninformationen angeboten werden? Die Information, ob der Artikel neutral verpackt werden muss, wird bei Auftragseingang übermittelt.",
    descriptionTranslation:
      "Can the item be repackaged and offered without providing your company information? Information about whether the item requires neutral packaging will be provided upon receipt of the order.",
  },

  currency: "EUR",
  buttons: {
    weiter: "Weiter",
    zurück: "Zurück",
  },
  errors: {
    required: "Dieses Feld ist erforderlich",
    invalidNumber: "Bitte geben Sie eine gültige Zahl ein",
    minValue: "Wert muss größer als 0 sein",
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
