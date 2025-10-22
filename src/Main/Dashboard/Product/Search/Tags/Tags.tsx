"use client";

import React from "react";
import { Button } from "@/Components/Shadcn/button";
import { Badge } from "@/Components/Shadcn/badge";
import { Edit } from "lucide-react";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { appRoutes } from "@/lib/routes/appRoutes";
import { ProductTag } from "./types";

interface iProps {
  locale: iLocale;
}

const ProductTagsOverview: React.FC<iProps> = ({ locale }) => {
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const params = useParams();
  const id = params?.productId as string;
  const selectedTags: ProductTag[] = [
    {
      id: "1",
      name: "Dachbaustoffe",
    },
    {
      id: "2",
      name: "Holzlatt",
    },
    {
      id: "3",
      name: "Baustoffe",
    },
    {
      id: "4",
      name: "Nordische Fichte",
    },
    {
      id: "5",
      name: "Rahmenholz",
    },
  ];
  const onEdit = () => {
    router.push(appRoutes.dashboard.product.search.tags.edit(locale, id));
  };

  const onContinue = () => {
    router.push(appRoutes.dashboard.product.search.variants.root(locale, id));
  };
  return (
    <div className="flex flex-col h-full">
      {/* Tags Section - 80% */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">
              {dictionary.selected.title}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit()}
              className="text-primary hover:text-primary/80"
            >
              <Edit className="h-4 w-4 mr-2" />
              {dictionary.actions.edit}
            </Button>
          </div>

          {/* Tags Display */}
          <div className="min-h-[200px]">
            {selectedTags.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {selectedTags.map((tag: ProductTag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="text-base px-4 py-2 bg-muted text-muted-foreground border border-border"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-center">
                  {dictionary.selected.noTags}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons - 20% */}
      <div className="flex items-center justify-end p-4 border-t border-border">
        <Button
          onClick={() => onContinue()}
          className="px-8 py-2 text-base font-medium"
        >
          {dictionary.actions.continue}
        </Button>
      </div>
    </div>
  );
};

export default ProductTagsOverview;
