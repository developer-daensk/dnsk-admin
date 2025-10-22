"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/Components/Shadcn/button";
import { Badge } from "@/Components/Shadcn/badge";
import { Edit } from "lucide-react";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";
import { appRoutes } from "@/lib/routes/appRoutes";

interface ProductDetailProps {
  locale: iLocale;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ locale }) => {
  const router = useRouter();
  const dictionary = getDictionary(locale);
  const params = useParams();
  const id = params?.productId as string;
  // Sample product data
  const productData = {
    title: "Samsung Galaxy S23 Ultra",
    condition: "New",
    ean: "8806092221234",
    upc: "8806092221234",
    idin: "SAMSUNG-GALAXY-S23-ULTRA-256GB",
    mediaCount: 1,
    maxMedia: 20,
    titleMaxLength: 100,
    eanMaxLength: 24,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=600&fit=crop",
  };

  // Handle edit mode toggle
  const handleEditToggle = () => {
    router.push(appRoutes.dashboard.product.search.detail.edit(locale, id));
  };

  // Handle continue to overall base data
  const handleContinue = () => {
    router.push(
      appRoutes.dashboard.product.search.description.root(locale, id)
    );
  };

  return (
    <div className="w-full max-w-[1960px] space-y-6">
      {/* Main Content Section */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Product Image */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-80 h-96 bg-muted rounded-lg overflow-hidden">
            <Image
              src={productData.image}
              alt={productData.title}
              width={320}
              height={384}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {productData.title}
              </h2>
              <Badge
                variant="secondary"
                className="bg-success text-success-foreground border-success"
              >
                {productData.condition}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="font-medium text-muted-foreground">
                  {dictionary.ean}
                </span>
                <span className="text-right font-mono">{productData.ean}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="font-medium text-muted-foreground">
                  {dictionary.upc}
                </span>
                <span className="text-right font-mono">{productData.upc}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-muted-foreground">
                  {dictionary.idin}
                </span>
                <span className="text-right font-mono text-sm">
                  {productData.idin}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleEditToggle}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              {dictionary.editProduct}
            </Button>
            <Button onClick={handleContinue} className="flex-1">
              {dictionary.continue}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
