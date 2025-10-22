"use client";

import React, { useState } from "react";
import { Button } from "@/Components/Shadcn/button";
import { Checkbox } from "@/Components/Shadcn/checkbox";
import { Label } from "@/Components/Shadcn/label";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";
import { appRoutes } from "@/lib/routes/appRoutes";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useProductStore } from "@/store/productStore";

interface iProps {
  locale: iLocale;
}

const ProductVariantsOverview: React.FC<iProps> = ({ locale }) => {
  const [isVariantProduct, setIsVariantProduct] = useState<boolean>(false);
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const params = useParams();
  const id = params?.productId as string;

  // Zustand store
  const { clearProductVariants, clearSelectedProduct } = useProductStore();

  const onContinue = () => {
    // Clear any existing product data when starting fresh
    if (isVariantProduct) {
      clearProductVariants();
      clearSelectedProduct();
      router.push(
        appRoutes.dashboard.product.search.variants.edit.root(locale, id)
      );
    } else {
      clearProductVariants();
      clearSelectedProduct();
      router.push(
        appRoutes.dashboard.product.search.listing.create(locale, id)
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Variants Section - Main */}
      <div className="flex-1  p-6">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">
            {dictionary.title}
          </h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="variant-checkbox"
                checked={isVariantProduct}
                onCheckedChange={(checked) =>
                  setIsVariantProduct(checked as boolean)
                }
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="variant-checkbox"
                className="text-base font-medium text-foreground cursor-pointer"
              >
                {dictionary.checkboxLabel}
              </Label>
            </div>

            <div className="ml-8 space-y-3">
              <p className="text-sm text-foreground">{dictionary.question}</p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {dictionary.example}
                </p>
                <p className="text-sm text-muted-foreground">
                  {dictionary.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end pt-6">
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

export default ProductVariantsOverview;
