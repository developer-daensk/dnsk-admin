import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  title: "Organizational Chart",
  subtitle: "Visual representation of company structure and hierarchy",
  noData: "No organizational data available",
  loading: "Loading organizational chart...",
  error: "Error loading organizational chart",
  departments: {
    it: "IT",
    hr: "Human Resources",
    sales: "Sales",
    marketing: "Marketing",
    finance: "Finance",
    operations: "Operations",
    engineering: "Engineering",
  },
  positions: {
    ceo: "CEO",
    manager: "Manager",
    developer: "Developer",
    analyst: "Analyst",
    specialist: "Specialist",
    coordinator: "Coordinator",
    director: "Director",
    assistant: "Assistant",
  },
};

const de = {
  title: "Organisationsdiagramm",
  subtitle: "Visuelle Darstellung der Unternehmensstruktur und Hierarchie",
  noData: "Keine Organisationsdaten verfügbar",
  loading: "Organisationsdiagramm wird geladen...",
  error: "Fehler beim Laden des Organisationsdiagramms",
  departments: {
    it: "IT",
    hr: "Personalwesen",
    sales: "Vertrieb",
    marketing: "Marketing",
    finance: "Finanzen",
    operations: "Betrieb",
    engineering: "Entwicklung",
  },
  positions: {
    ceo: "Geschäftsführer",
    manager: "Manager",
    developer: "Entwickler",
    analyst: "Analyst",
    specialist: "Spezialist",
    coordinator: "Koordinator",
    director: "Direktor",
    assistant: "Assistent",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
