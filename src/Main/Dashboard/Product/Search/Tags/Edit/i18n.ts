import { getDictionaryGenerator } from "@/Components/Entity/Locale/utils";

const en = {
  content: {
    title: "Tags",
    subtitle:
      "Tags are keywords that describe products and make it easier to search and find this article.",
    benefit:
      "The more detailed the tags you select, the better your article will be found.",
    requirements:
      "For the ideal article, you should provide at least 8 different tags that best describe the article.",
    minTags: "Minimum 8 tags",
    maxTags: "Maximum 40 tags",
  },
  form: {
    selectedTitle: "Selected Tags",
    noSelectedTags: "No tags selected",
    addTagTitle: "Add Tag",
    inputPlaceholder: "Enter tag name...",
    addButton: " Add",
    suggestionsTitle: "Suggestions",
    suggestionsInstruction: "Click to add",
    noSuggestions: "No suggestions available",
    maxTagsWarning: "Maximum 40 tags allowed",
    minTagsWarning: "Minimum 8 tags required",
    emptyTagWarning: "Please enter a tag name",
    duplicateTagWarning: "This tag already exists",
  },
  actions: {
    cancel: "Cancel",
    save: "Save",
  },
};

const de: iDictionary = {
  content: {
    title: "Tags",
    subtitle:
      "Tags sind Schlüsselwörter, die Produkte beschreiben und das Suchen und Finden dieses Artikels erleichtern.",
    benefit:
      "Je detaillierter die Tags sind, die Sie auswählen, desto besser wird Ihr Artikel gefunden.",
    requirements:
      "Für den idealen Artikel sollten Sie mindestens 8 verschiedene Tags angeben, die den Artikel am besten beschreiben.",
    minTags: "Mindestens 8 Tags",
    maxTags: "Maximal 40 Tags",
  },
  form: {
    selectedTitle: "Ausgewählte Tags",
    noSelectedTags: "Keine Tags ausgewählt",
    addTagTitle: "Tag hinzufügen",
    inputPlaceholder: "Tag-Namen eingeben...",
    addButton: "Hinzufügen",
    suggestionsTitle: "Vorschläge",
    suggestionsInstruction: "Klicken zum Hinzufügen",
    noSuggestions: "Keine Vorschläge verfügbar",
    maxTagsWarning: "Maximal 40 Tags erlaubt",
    minTagsWarning: "Mindestens 8 Tags erforderlich",
    emptyTagWarning: "Bitte geben Sie einen Tag-Namen ein",
    duplicateTagWarning: "Dieser Tag existiert bereits",
  },
  actions: {
    cancel: "Abbrechen",
    save: "Speichern",
  },
};

export type iDictionary = typeof en;
export const getDictionary = getDictionaryGenerator<typeof en>({ en, de });
