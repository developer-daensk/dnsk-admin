import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  selected: {
    title: "Selected Tags",
    noTags: "No tags selected",
  },
  actions: {
    edit: "Edit",
    continue: "Continue",
  },
};

const de: iDictionary = {
  selected: {
    title: "Ausgewählte Tags",
    noTags: "Keine Tags ausgewählt",
  },
  actions: {
    edit: "Bearbeiten",
    continue: "Weiter",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
