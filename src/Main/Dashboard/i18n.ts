import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  helloWorld: "Hello World",
};

const de: iDictionary = {
  helloWorld: "Hallo Welt",
};
export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
