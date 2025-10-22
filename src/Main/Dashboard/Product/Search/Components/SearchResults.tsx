"use client";

import React from "react";
import { Search, Check, Info, ShoppingCart, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/Components/Shadcn/card";
import { Badge } from "@/Components/Shadcn/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/Components/Shadcn/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/Shadcn/tooltip";
import { type Product } from "@/store/productStore";

interface SearchResultsProps {
  isLoading: boolean;
  searchResults: Product[];
  selectedProduct: Product | null;
  hasSearched: boolean;
  onProductSelect: (product: Product) => void;
  dictionary: {
    searching: string;
    noProductsFound: string;
    selected: string;
  };
}

export default function SearchResults({
  isLoading,
  searchResults,
  selectedProduct,
  hasSearched,
  onProductSelect,
  dictionary,
}: SearchResultsProps) {
  if (!hasSearched) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p className="text-muted-foreground">{dictionary.searching}</p>
          </div>
        ) : (
          <>
            {searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {dictionary.noProductsFound}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((product) => (
                  <Card
                    key={product.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedProduct?.id === product.id
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => onProductSelect(product)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="relative">
                            <Avatar className="h-14 w-14">
                              <AvatarImage
                                src={product.image}
                                alt={product.title}
                              />
                              <AvatarFallback className="text-lg font-semibold">
                                {product.title.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {selectedProduct?.id === product.id && (
                              <div className="absolute -top-1 -right-1 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-2">
                            <h3 className="font-semibold text-lg">
                              {product.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                <Info className="h-3 w-3" />
                                {product.category}
                              </Badge>
                              {product.ean && (
                                <Badge variant="outline">
                                  EAN: {product.ean}
                                </Badge>
                              )}
                              {product.price && (
                                <Badge
                                  variant="default"
                                  className="flex items-center gap-1"
                                >
                                  <ShoppingCart className="h-3 w-3" />
                                  {product.price} {product.currency}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {selectedProduct?.id === product.id && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Check className="h-5 w-5 text-green-500 ml-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{dictionary.selected}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
