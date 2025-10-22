const en = {
  title: "Listings",
  description:
    "Listings include price and inventory. Create your first listing now.",
  button: {
    createListing: "Create listing",
  },
};

const de = {
  title: "Listings",
  description:
    "Listings enthalten Preis und Bestand. Erstellen Sie jetzt Ihr erstes Listing.",
  button: {
    createListing: "Listing erstellen",
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
