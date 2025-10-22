"use client";

import React, { useState } from "react";
import { Button } from "@/Components/Shadcn/button";
import { Input } from "@/Components/Shadcn/input";
import { Badge } from "@/Components/Shadcn/badge";
import { Separator } from "@/Components/Shadcn/separator";
import { Plus, X } from "lucide-react";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";
import { ProductTag } from "./types";
import { appRoutes } from "@/lib/routes/appRoutes";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface iProps {
  locale: iLocale;
}

const ProductTagsForm: React.FC<iProps> = ({ locale }) => {
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const params = useParams();
  const id = params?.productId as string;
  const [selectedTags, setSelectedTags] = useState<ProductTag[]>([
    { id: "1", name: "Paletten" },
    { id: "2", name: "Ladungsträger" },
    { id: "3", name: "EPAL zertifiziert" },
    { id: "4", name: "ISPM zertifiziert" },
    { id: "5", name: "Europaletten gebraucht" },
  ]);
  const [newTagInput, setNewTagInput] = useState<string>("");

  // Default tags if none provided
  const defaultSelectedTags: ProductTag[] = [
    { id: "1", name: "Paletten" },
    { id: "2", name: "Ladungsträger" },
    { id: "3", name: "EPAL zertifiziert" },
    { id: "4", name: "ISPM zertifiziert" },
    { id: "5", name: "Europaletten gebraucht" },
  ];

  const defaultAvailableTags: ProductTag[] = [
    { id: "6", name: "Holzpaletten" },
    { id: "7", name: "Industriepaletten" },
    { id: "8", name: "Transportpaletten" },
  ];

  // Use defaults if no data provided
  const currentSelectedTags =
    selectedTags.length > 0 ? selectedTags : defaultSelectedTags;
  const currentAvailableTags =
    defaultAvailableTags.length > 0
      ? defaultAvailableTags
      : defaultAvailableTags;

  // Get available tags that are not already selected
  const unselectedTags = currentAvailableTags.filter(
    (tag) =>
      !currentSelectedTags.some((selectedTag) => selectedTag.id === tag.id)
  );

  // Handle adding a tag from suggestions
  const handleAddTag = (tag: ProductTag) => {
    if (currentSelectedTags.length >= 40) {
      console.warn(dictionary.form.maxTagsWarning);
      return;
    }

    if (!currentSelectedTags.some((selectedTag) => selectedTag.id === tag.id)) {
      setSelectedTags([...currentSelectedTags, tag]);
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagId: string) => {
    if (currentSelectedTags.length <= 8) {
      console.warn(dictionary.form.minTagsWarning);
      return;
    }

    setSelectedTags(currentSelectedTags.filter((tag) => tag.id !== tagId));
  };

  // Handle adding a custom tag
  const handleAddCustomTag = () => {
    const trimmedInput = newTagInput.trim();

    if (!trimmedInput) {
      console.warn(dictionary.form.emptyTagWarning);
      return;
    }

    if (currentSelectedTags.length >= 40) {
      console.warn(dictionary.form.maxTagsWarning);
      return;
    }

    if (
      currentSelectedTags.some(
        (tag) => tag.name.toLowerCase() === trimmedInput.toLowerCase()
      )
    ) {
      console.warn(dictionary.form.duplicateTagWarning);
      return;
    }

    const newTag: ProductTag = {
      id: `custom_${Date.now()}`,
      name: trimmedInput,
    };

    setSelectedTags([...currentSelectedTags, newTag]);
    setNewTagInput("");
  };

  // Handle save
  const handleSave = () => {
    console.log(currentSelectedTags);
    router.push(appRoutes.dashboard.product.search.tags.root(locale, id));
  };

  const onCancel = () => {
    router.push(appRoutes.dashboard.product.search.tags.root(locale, id));
  };

  return (
    <div className="space-y-8">
      {/* Content and Tags Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Tags Information */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {dictionary.content.title}
            </h3>
            <p className="text-base text-foreground leading-relaxed">
              {dictionary.content.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-foreground leading-relaxed">
              {dictionary.content.benefit}
            </p>

            <div className="space-y-2">
              <p className="text-sm text-foreground leading-relaxed">
                {dictionary.content.requirements}
              </p>
              <ul className="space-y-1 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-foreground mt-1">•</span>
                  <span>{dictionary.content.minTags}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground mt-1">•</span>
                  <span>{dictionary.content.maxTags}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Tag Management */}
        <div className="lg:col-span-2 space-y-8">
          {/* Selected Tags */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              {dictionary.form.selectedTitle}
            </h3>

            <div className="bg-muted/30 rounded-lg p-6 border border-border min-h-[120px]">
              {currentSelectedTags.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {currentSelectedTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="text-base px-4 py-2 bg-muted text-muted-foreground border border-border group hover:bg-muted/80"
                    >
                      <span className="mr-2">{tag.name}</span>
                      <button
                        onClick={() => handleRemoveTag(tag.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center">
                  {dictionary.form.noSelectedTags}
                </p>
              )}
            </div>
          </div>

          {/* Add Tag */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              {dictionary.form.addTagTitle}
            </h3>

            <div className="flex gap-2">
              <Input
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                placeholder={dictionary.form.inputPlaceholder}
                onKeyDown={(e) => e.key === "Enter" && handleAddCustomTag()}
                maxLength={40}
                className="flex-1"
              />
              <Button
                onClick={handleAddCustomTag}
                disabled={!newTagInput.trim()}
                className="px-6"
              >
                <Plus className="h-4 w-4 mr-2" />
                {dictionary.form.addButton}
              </Button>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                {newTagInput.length}/40
              </p>
            </div>
          </div>

          {/* Suggestions */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              {dictionary.form.suggestionsTitle}
            </h3>
            <p className="text-sm text-foreground">
              {dictionary.form.suggestionsInstruction}
            </p>

            <div className="bg-muted/30 rounded-lg p-6 border border-border">
              {unselectedTags.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {unselectedTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      onClick={() => handleAddTag(tag)}
                      className="text-base px-4 py-2 bg-muted text-muted-foreground border border-border cursor-pointer hover:bg-muted/80 transition-colors"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center">
                  {dictionary.form.noSuggestions}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel}>
          {dictionary.actions.cancel}
        </Button>
        <Button onClick={handleSave}>{dictionary.actions.save}</Button>
      </div>
    </div>
  );
};

export default ProductTagsForm;
