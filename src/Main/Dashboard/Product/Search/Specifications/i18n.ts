const en = {
  title: "Product Specifications",
  dimensions: {
    unit: {
      label: "Unit",
      placeholder: "Select unit",
      options: {
        CM: "Centimeter (cm)",
        MM: "Millimeters (mm)",
        M: "Meters (m)",
        INCH: "Inches (in)",
        FT: "Feet (ft)",
      },
    },
    volume: "Volume",
    length: {
      label: "Length",
      placeholder: "Enter length",
    },
    width: {
      label: "Width",
      placeholder: "Enter width",
    },
    height: {
      label: "Height",
      placeholder: "Enter height",
    },
  },
  weight: {
    weight: {
      label: "Weight",
      placeholder: "Enter weight",
    },
    unit: {
      label: "Unit",
      placeholder: "Select weight unit",
      options: {
        MG: "Milligrams (mg)",
        G: "Grams (g)",
        KG: "Kilogram (kg)",
        T: "Tons (t)",
      },
    },
  },
  checkboxes: {
    stackable: {
      label: "Stackable?",
      description:
        'Stackable" are items if additional load can be stacked on them during transport or storage.',
    },
    fragile: {
      label: "Fragile?",
      description:
        "This item is fragile and must be handled with extreme care.",
    },
    hazardous: {
      label: "Dangerous goods?",
      description:
        "Hazardous goods are all goods that fall under the definition of § 2 Abs. 1 of the Hazardous Goods Transport Act. This includes substances and objects that pose dangers to public safety and to the life and health of humans and animals.",
    },
  },
  regulatory: {
    specialRegulations: {
      label: "* Special Regulations",
      placeholder: "Enter special regulations",
    },
    tunnelCode: {
      label: "* Tunnel Code",
      placeholder: "Enter tunnel code",
    },
    unIdNumber: {
      label: "* UN/ID Number",
      placeholder: "Enter UN/ID number",
    },
    labelNumber: {
      label: "* Label Number",
      placeholder: "Select label number",
    },
    packagingGroup: {
      label: "* Packaging Group",
      placeholder: "Select packaging group",
    },
    euroWasteCode: {
      label: "* Euro. Waste Code",
      placeholder: "Enter Euro waste code",
    },
    nem: {
      label: "* NEM",
      placeholder: "Enter NEM",
    },
    transportCategory: {
      label: "* Transport Category",
      placeholder: "Enter transport category",
    },
    environmentallyHazardous: {
      label:
        "Environmentally hazardous / water-polluting according to safety data sheet",
    },
  },
  temperature: {
    minTemperature: {
      label: "Minimum Temperature",
    },
    cooling: {
      label: "Cooling",
    },
  },
  delivery: {
    expressNecessary: {
      label: "Express necessary",
    },
  },
  buttons: {
    continue: "Continue",
  },
};

const de = {
  title: "Produktspezifikationen",
  dimensions: {
    unit: {
      label: "Einheit",
      placeholder: "Einheit auswählen",
      options: {
        CM: "Zentimeter (cm)",
        MM: "Millimeter (mm)",
        M: "Meter (m)",
        INCH: "Zoll (in)",
        FT: "Fuß (ft)",
      },
    },
    volume: "Volumen",
    length: {
      label: "Länge",
      placeholder: "Länge eingeben",
    },
    width: {
      label: "Breite",
      placeholder: "Breite eingeben",
    },
    height: {
      label: "Höhe",
      placeholder: "Höhe eingeben",
    },
  },
  weight: {
    weight: {
      label: "Gewicht",
      placeholder: "Gewicht eingeben",
    },
    unit: {
      label: "Einheit",
      placeholder: "Gewichtseinheit auswählen",
      options: {
        MG: "Milligramm (mg)",
        G: "Gramm (g)",
        KG: "Kilogramm (kg)",
        T: "Tonne (t)",
      },
    },
  },
  checkboxes: {
    stackable: {
      label: "Stapelbar?",
      description:
        'Stapelbar" sind Gegenstände, wenn während des Transports oder der Lagerung zusätzliche Last auf sie gestapelt werden kann.',
    },
    fragile: {
      label: "Empfindlich?",
      description:
        "Dieser Artikel ist empfindlich und muss mit äußerster Vorsicht behandelt werden.",
    },
    hazardous: {
      label: "Gefahrgut?",
      description:
        "Gefahrgut sind alle Güter, die unter die Definition von § 2 Abs. 1 des Gefahrgutbeförderungsgesetzes fallen. Dazu gehören Stoffe und Gegenstände, die Gefahren für die öffentliche Sicherheit und für das Leben und die Gesundheit von Menschen und Tieren darstellen.",
    },
  },
  regulatory: {
    specialRegulations: {
      label: "* Besondere Vorschriften",
      placeholder: "Besondere Vorschriften eingeben",
    },
    tunnelCode: {
      label: "* Tunnel Code",
      placeholder: "Tunnel Code eingeben",
    },
    unIdNumber: {
      label: "* UN/ID Nummer",
      placeholder: "UN/ID Nummer eingeben",
    },
    labelNumber: {
      label: "* Kennzeichnungsnummer",
      placeholder: "Kennzeichnungsnummer auswählen",
    },
    packagingGroup: {
      label: "* Verpackungsgruppe",
      placeholder: "Verpackungsgruppe auswählen",
    },
    euroWasteCode: {
      label: "* Euro Abfall Code",
      placeholder: "Euro Abfall Code eingeben",
    },
    nem: {
      label: "* NEM",
      placeholder: "NEM eingeben",
    },
    transportCategory: {
      label: "* Transport Kategorie",
      placeholder: "Transport Kategorie eingeben",
    },
    environmentallyHazardous: {
      label: "Umweltgefährlich / wassergefährdend gemäß Sicherheitsdatenblatt",
    },
  },
  temperature: {
    minTemperature: {
      label: "Mindesttemperatur",
    },
    cooling: {
      label: "Kühlung",
    },
  },
  delivery: {
    expressNecessary: {
      label: "Express notwendig",
    },
  },
  buttons: {
    continue: "Weiter",
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
