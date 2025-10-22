import { getDictionaryGenerator } from "../Locale/utils";

const en = {
  title: "Organization Address",
  description:
    "A brief overview of how to effectively manage administrative roles and streamline address searches within your organization.",
  label: "Address",
  search: {
    placeholder: "Search for address...",
    noResults: "No results found.",
  },
  form: {
    street: {
      label: "Street",
      placeholder: "Enter street address",
      required: "Street is required",
    },
    houseNumber: {
      label: "House Number",
      placeholder: "Enter house number",
      required: "House number is required",
    },
    postalCode: {
      label: "Postal Code",
      placeholder: "Enter postal code",
      required: "Postal code is required",
    },
    city: {
      label: "City",
      placeholder: "Enter city",
      required: "City is required",
    },
    state: {
      label: "State",
      placeholder: "Enter state",
      required: "State is required",
    },
    country: {
      label: "Country",
      placeholder: "Select country",
      required: "Country is required",
    },
  },
};

const de: iDictionary = {
  title: "Organisationsadresse",
  description:
    "Ein kurzer Überblick darüber, wie administrative Rollen effektiv verwaltet und Adresssuchen in Ihrer Organisation optimiert werden können.",
  label: "Adresse",
  search: {
    placeholder: "Nach Adresse suchen...",
    noResults: "Keine Ergebnisse gefunden.",
  },
  form: {
    street: {
      label: "Straße",
      placeholder: "Straßenadresse eingeben",
      required: "Straße ist erforderlich",
    },
    houseNumber: {
      label: "Hausnummer",
      placeholder: "Hausnummer eingeben",
      required: "Hausnummer ist erforderlich",
    },
    postalCode: {
      label: "Postleitzahl",
      placeholder: "Postleitzahl eingeben",
      required: "Postleitzahl ist erforderlich",
    },
    city: {
      label: "Stadt",
      placeholder: "Stadt eingeben",
      required: "Stadt ist erforderlich",
    },
    state: {
      label: "Bundesland",
      placeholder: "Bundesland eingeben",
      required: "Bundesland ist erforderlich",
    },
    country: {
      label: "Land",
      placeholder: "Land auswählen",
      required: "Land ist erforderlich",
    },
  },
};
export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
