"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Check, Info, Loader2 } from "lucide-react";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";
import {
  useProductStore,
  mockProducts,
  type Product,
} from "@/store/productStore";
import { Button } from "@/Components/Shadcn/button";
import { Input } from "@/Components/Shadcn/input";
import { Label } from "@/Components/Shadcn/label";
import { RadioGroup, RadioGroupItem } from "@/Components/Shadcn/radio-group";
import { TooltipProvider } from "@/Components/Shadcn/tooltip";
import { toast } from "sonner";
import SearchResults from "./Components/SearchResults";
import { appRoutes } from "@/lib/routes/appRoutes";

export default function ProductSearch({ locale }: { locale: iLocale }) {
  const dictionary = getDictionary(locale);
  const router = useRouter();

  // Product store
  const {
    selectedProduct,
    searchResults,
    isLoading,
    setSelectedProduct,
    setSearchResults,
    setLoading,
  } = useProductStore();

  // Local state
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState<"title" | "identifier">("title");
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Search functionality with debouncing
  const handleSearch = useCallback(
    async (value: string) => {
      if (!value.trim()) {
        setSearchResults([]);
        setHasSearched(false);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      setLoading(true);
      setHasSearched(true);

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock search logic
        const filteredProducts = mockProducts.filter((product) => {
          const searchTerm = value.toLowerCase();

          if (searchType === "title") {
            return product.title.toLowerCase().includes(searchTerm);
          } else {
            // Search by identifiers
            return (
              product.ean?.toLowerCase().includes(searchTerm) ||
              product.gtin?.toLowerCase().includes(searchTerm) ||
              product.upc?.toLowerCase().includes(searchTerm) ||
              product.idin?.toLowerCase().includes(searchTerm)
            );
          }
        });

        setSearchResults(filteredProducts);
      } catch (error) {
        console.error("Search error:", error);
        toast.error(dictionary.searchError);
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    },
    [searchType, setSearchResults, setLoading, dictionary.searchError]
  );

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue.trim()) {
        handleSearch(searchValue);
      } else {
        setSearchResults([]);
        setHasSearched(false);
        setIsSearching(false);
      }
    }, 300); // 300ms delay for better UX

    return () => clearTimeout(timeoutId);
  }, [searchValue, searchType, handleSearch, setSearchResults]);

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    toast.success(dictionary.productSelected.replace("{title}", product.title));
  };

  // Handle continue with selected product
  const handleContinue = () => {
    if (selectedProduct) {
      router.replace(
        appRoutes.dashboard.product.search.listing.root(
          locale,
          selectedProduct.id
        )
      );
    }
  };

  // Handle continue without product
  const handleContinueWithoutProduct = () => {
    router.replace(appRoutes.dashboard.product.new(locale));
  };

  // Get search placeholder based on type
  const getSearchPlaceholder = () => {
    if (searchType === "title") {
      return dictionary.searchPlaceholderTitle;
    } else {
      return dictionary.searchPlaceholderIdentifier;
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setSearchValue(value);
      setSelectedProduct(null); // Clear selected product when search changes
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-[1960px] space-y-6">
        {/* Main Search Section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{dictionary.title}</h1>
          <p className="text-muted-foreground">{dictionary.description}</p>
        </div>

        {/* Search Type Toggle */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            {dictionary.searchTypeLabel}
          </Label>
          <RadioGroup
            value={searchType}
            onValueChange={(value: "title" | "identifier") =>
              setSearchType(value)
            }
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="title" id="title" />
              <Label htmlFor="title">{dictionary.searchTypeTitle}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="identifier" id="identifier" />
              <Label htmlFor="identifier">
                {dictionary.searchTypeIdentifier}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Search Input */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={getSearchPlaceholder()}
              value={searchValue}
              onChange={handleSearchChange}
              className="pl-10 pr-4"
              maxLength={100}
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin" />
            )}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {isSearching && searchValue.trim() && dictionary.searching}
            </span>
            <span>{searchValue.length}/100</span>
          </div>
        </div>

        {/* Search Results */}
        <SearchResults
          isLoading={isLoading}
          searchResults={searchResults}
          selectedProduct={selectedProduct}
          hasSearched={hasSearched}
          onProductSelect={handleProductSelect}
          dictionary={{
            searching: dictionary.searching,
            noProductsFound: dictionary.noProductsFound,
            selected: dictionary.selected,
          }}
        />

        {/* Action Buttons */}
        {hasSearched && (
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleContinueWithoutProduct}
              className="flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              {dictionary.continueWithoutProduct}
            </Button>

            <Button
              onClick={handleContinue}
              disabled={!selectedProduct}
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              {dictionary.continue}
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
