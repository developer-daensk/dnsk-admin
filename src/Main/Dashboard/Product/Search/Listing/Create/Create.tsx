"use client";
import React from "react";
import { Button } from "@/Components/Shadcn/button";
import { useRouter, useParams } from "next/navigation";
import { appRoutes } from "@/lib/routes/appRoutes";
import { getDictionary } from "./i18n";
import { ProductListingCreateProps } from "./types";

const ProductListing: React.FC<ProductListingCreateProps> = ({ locale }) => {
  const dictionary = getDictionary(locale);
  const router = useRouter();
  const params = useParams();
  const id = params?.productId as string;

  const handleCreateListing = () => {
    router.push(appRoutes.dashboard.product.search.price.root(locale, id));
  };

  return (
    <>
      {/* Header */}
      <div className="p-6 ">
        <h1 className="text-2xl font-semibold text-foreground">
          {dictionary.title}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-6 max-w-md">
            {dictionary.description}
          </p>

          <Button
            className="px-6 py-3 text-base font-medium"
            onClick={handleCreateListing}
          >
            {dictionary.button.createListing}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
