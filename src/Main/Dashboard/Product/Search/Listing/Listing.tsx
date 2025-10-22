"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { CheckCircle, Plus, X } from "lucide-react";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";
import { PRODUCT } from "@/lib/constants/product";
import { Button } from "@/Components/Shadcn/button";
import { Card, CardContent } from "@/Components/Shadcn/card";
import { Badge } from "@/Components/Shadcn/badge";
import { toast } from "sonner";
import { appRoutes } from "@/lib/routes/appRoutes";

interface Product {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  specs: string[];
  idin: string;
}

interface ListingProps {
  locale: iLocale;
}

const Listing: React.FC<ListingProps> = ({ locale }) => {
  const router = useRouter();
  const params = useParams();
  const dictionary = getDictionary(locale);
  const id = params?.productId as string;

  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>(["Dachbaustoffe"]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const availableTags = [
    PRODUCT.TAGS.DACHBAUSTOFFE,
    PRODUCT.TAGS.HOLZLATTEN,
    PRODUCT.TAGS.BAUSTOFFE,
    PRODUCT.TAGS.NORDISCHE_FICHTE,
    PRODUCT.TAGS.RAHMENHOLZ,
  ];

  // Mock product data based on the image
  const productList: Product[] = [
    {
      id: "1",
      title: PRODUCT.PRODUCT_TITLES.EURO_PALLET_USED,
      subtitle: PRODUCT.PRODUCT_TITLES.EURO_PALLET_SUBTITLE,
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=180&h=180&fit=crop",
      specs: [
        PRODUCT.SPECS.USED,
        PRODUCT.SPECS.FIRST_CHOICE,
        PRODUCT.SPECS.EXCHANGEABLE,
        PRODUCT.SPECS.EPAL_ISMP_CERTIFIED,
        PRODUCT.SPECS.DIMENSIONS,
      ],
      idin: "12345678911",
    },
    {
      id: "2",
      title: PRODUCT.PRODUCT_TITLES.EURO_PALLET_USED,
      subtitle: PRODUCT.PRODUCT_TITLES.EURO_PALLET_SUBTITLE,
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=180&h=180&fit=crop",
      specs: [
        PRODUCT.SPECS.USED,
        PRODUCT.SPECS.FIRST_CHOICE,
        PRODUCT.SPECS.EXCHANGEABLE,
        PRODUCT.SPECS.EPAL_ISMP_CERTIFIED,
        PRODUCT.SPECS.DIMENSIONS,
      ],
      idin: "12345678912",
    },
    {
      id: "3",
      title: PRODUCT.PRODUCT_TITLES.EURO_PALLET_USED,
      subtitle: PRODUCT.PRODUCT_TITLES.EURO_PALLET_SUBTITLE,
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=180&h=180&fit=crop",
      specs: [
        PRODUCT.SPECS.USED,
        PRODUCT.SPECS.FIRST_CHOICE,
        PRODUCT.SPECS.EXCHANGEABLE,
        PRODUCT.SPECS.EPAL_ISMP_CERTIFIED,
        PRODUCT.SPECS.DIMENSIONS,
      ],
      idin: "12345678913",
    },
  ];

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleContinue = () => {
    if (selectedProduct) {
      toast.success(dictionary.productSelectedSuccess);
      router.push(
        appRoutes.dashboard.product.search.detail.root(locale, selectedProduct)
      );
    } else {
      toast.warning(dictionary.pleaseSelectProduct);
    }
  };

  const handleContinueWithoutProduct = () => {
    toast.success(dictionary.continueWithoutProductSuccess);
    router.push(appRoutes.dashboard.product.new(locale));
  };

  useEffect(() => {
    setLoading(false);
    // If an ID is provided in the URL, pre-select that product
    if (id) {
      setSelectedProduct(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-semibold m-0 mb-2">
          {dictionary.createNewProduct}
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-primary font-medium">
            {PRODUCT.PRODUCT_TITLES.EURO_PALLET_USED},{" "}
            {PRODUCT.PRODUCT_TITLES.EURO_PALLET_SUBTITLE}
          </p>
          <p className="text-muted-foreground text-sm">
            {dictionary.selectInstructionSubtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Column - Product Information */}
          <div className="p-6 border-r border-border overflow-y-auto">
            {/* Selected Tags */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                {dictionary.selectedTags}
              </h3>
              <div className="min-h-[50px] p-3 bg-muted rounded-lg">
                {selectedTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {dictionary.noTagsSelected}
                  </p>
                )}
              </div>
            </div>

            {/* Search Aids */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {dictionary.searchAids}
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer flex items-center gap-1 ${
                      selectedTags.includes(tag)
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {selectedTags.includes(tag) && (
                      <CheckCircle className="h-3 w-3" />
                    )}
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Selection */}
          <div className="p-6 flex flex-col h-full overflow-hidden">
            {/* Scrollable Product List */}
            <div className="flex-1 overflow-y-auto pr-2 min-h-0 p-4">
              <div className="space-y-4">
                {productList.map((product) => (
                  <Card
                    key={product.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedProduct === product.id
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleProductSelect(product.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4 items-start">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          {selectedProduct === product.id && (
                            <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center z-10">
                              <CheckCircle className="h-2.5 w-2.5 text-white" />
                            </div>
                          )}
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder-image.svg";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold mb-2">
                            {product.title}
                          </h4>
                          <p className="text-muted-foreground text-sm mb-2">
                            {product.subtitle}
                          </p>
                          <div className="mb-2">
                            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                              {product.specs.map((spec, index) => (
                                <li key={index}>{spec}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <Badge variant="outline" className="text-xs">
                              IDIN: {product.idin}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button Area */}
      <div className="p-6 border-t border-border bg-background flex justify-between items-center">
        <Button
          variant="outline"
          size="lg"
          onClick={handleContinueWithoutProduct}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {dictionary.continueWithoutProduct}
        </Button>
        <Button
          size="lg"
          disabled={!selectedProduct}
          onClick={handleContinue}
          className="flex items-center gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          {dictionary.continue}
        </Button>
      </div>
    </div>
  );
};

export default Listing;
