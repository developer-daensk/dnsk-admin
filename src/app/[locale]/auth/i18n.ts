import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  welcome: "Welcome to Dashboard Platform",
  description: "Your comprehensive business analytics solution",
};

const de: iDictionary = {
  welcome: "Willkommen bei Dashboard Platform",
  description: "Ihre umfassende Business-Analytik-Lösung",
};
export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
