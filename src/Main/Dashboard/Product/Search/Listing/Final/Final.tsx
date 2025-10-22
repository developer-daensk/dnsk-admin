"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Plus, Edit, ArrowLeft, Package } from "lucide-react";
import { iLocale } from "@/Components/Entity/Locale/types";
import { getDictionary } from "./i18n";
import { Button } from "@/Components/Shadcn/button";
import { Card, CardContent } from "@/Components/Shadcn/card";
import { appRoutes } from "@/lib/routes/appRoutes";

interface ProductListing {
  id: string;
  listingNumber: string;
  status: "active" | "inactive" | "draft";
  location: string;
  productName: string;
  idin: string;
  netPricePerUnit: number;
  vatRate: number;
  grossPrice: number;
  unitOfMeasure: string;
  totalDimension: string;
  minimumQuantity: number;
  packagingUnit: number;
  typeOfGoods: string;
  loadingEquipment: string;
  loadingEquipmentExchange: boolean;
  priceWithoutExchange: number;
  availableQuantity: number;
  reserved: number;
  inTransit: number;
  warehouseId: string;
  sku: string;
  allowBackorder: boolean;
  backorderDuration: number;
  reservation: number;
  leadTime: number;
  neutralPackaging: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ListingProps {
  locale: iLocale;
}

const Final: React.FC<ListingProps> = ({ locale }) => {
  const router = useRouter();
  const params = useParams();
  const dictionary = getDictionary(locale);
  const productId = params?.productId as string;

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<ProductListing[]>([]);

  const handleCreateListing = () => {
    router.push(
      appRoutes.dashboard.product.search.listing.create(locale, productId)
    );
  };

  const handleEditListing = () => {
    // For now, redirect to create page with edit mode
    router.push(
      appRoutes.dashboard.product.search.listing.create(locale, productId)
    );
  };

  const handleBackToProduct = () => {
    router.push(
      appRoutes.dashboard.product.search.price.root(locale, productId)
    );
  };

  useEffect(() => {
    // Mock data for existing listings matching the image
    const mockListings: ProductListing[] = [
      {
        id: "1",
        listingNumber: "①",
        status: "active",
        location: "DK277 - Müller & Sohn GmbH - 22113 Hamburg, DE",
        productName: "Europalette 120x80x14,4 cm 1. Wahl Tauschfähig",
        idin: "54684846814864",
        netPricePerUnit: 8.99,
        vatRate: 19,
        grossPrice: 10.7,
        unitOfMeasure: "Ifdm",
        totalDimension: "35,96 Ifdm",
        minimumQuantity: 5,
        packagingUnit: 25,
        typeOfGoods: "palettiert",
        loadingEquipment: "Kunststoffpalette H1",
        loadingEquipmentExchange: true,
        priceWithoutExchange: 22.5,
        availableQuantity: 1000,
        reserved: 240,
        inTransit: 4200,
        warehouseId: "NJI054-DC5",
        sku: "65486468468",
        allowBackorder: true,
        backorderDuration: 2,
        reservation: 25,
        leadTime: 48,
        neutralPackaging: true,
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
      },
      {
        id: "2",
        listingNumber: "②",
        status: "active",
        location: "DK277 - Müller & Sohn GmbH - 22113 Hamburg, DE",
        productName: "Europalette 120x80x14,4 cm 1. Wahl Tauschfähig",
        idin: "54684846814864",
        netPricePerUnit: 9.99,
        vatRate: 19,
        grossPrice: 10.7,
        unitOfMeasure: "Ifdm",
        totalDimension: "35,96 Ifdm",
        minimumQuantity: 5,
        packagingUnit: 25,
        typeOfGoods: "palettiert",
        loadingEquipment: "Kunststoffpalette H1",
        loadingEquipmentExchange: true,
        priceWithoutExchange: 22.5,
        availableQuantity: 2000,
        reserved: 240,
        inTransit: 4200,
        warehouseId: "NJI054-DG5",
        sku: "65486468468",
        allowBackorder: true,
        backorderDuration: 2,
        reservation: 25,
        leadTime: 48,
        neutralPackaging: true,
        createdAt: "2024-01-10",
        updatedAt: "2024-01-18",
      },
    ];

    setLoading(false);
    setListings(mockListings);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{dictionary.title}</h1>
              <div className="max-w-2xl">
                <p className="text-muted-foreground mb-2">
                  {dictionary.description}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  {dictionary.descriptionTranslation}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleBackToProduct}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {dictionary.backToProduct}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Entries Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">{dictionary.entries}</h2>
            <p className="text-sm text-muted-foreground italic mb-1">
              {dictionary.entriesTranslation}
            </p>
            <p className="text-muted-foreground mb-2">
              {dictionary.entriesDescription}
            </p>
            <p className="text-sm text-muted-foreground italic">
              {dictionary.entriesDescriptionTranslation}
            </p>
          </div>
          <Button
            onClick={handleCreateListing}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {dictionary.createNewEntry}
          </Button>
        </div>

        {/* Listings */}
        {listings.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {dictionary.noListingsFound}
              </h3>
              <p className="text-sm text-muted-foreground italic mb-6">
                {dictionary.noListingsFoundTranslation}
              </p>
              <Button
                onClick={handleCreateListing}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {dictionary.createListing}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                <CardContent className="p-6">
                  {/* Header with Location, Product, and Status */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-blue-600 mb-2">
                          {listing.location}
                        </div>
                        <div className="font-medium text-lg mb-1">
                          {listing.productName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          IDIN: {listing.idin}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium mb-2">
                          {listing.listingNumber}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">
                            {dictionary.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price and Specifications Related Data */}
                  <div className="mb-6">
                    <h3 className="font-medium text-sm text-muted-foreground mb-3">
                      {dictionary.priceSpecSection}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.netPricePerUnit}:
                        </span>
                        <span className="font-medium">
                          €{listing.netPricePerUnit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.vat}:
                        </span>
                        <span className="font-medium">{listing.vatRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.grossPrice}:
                        </span>
                        <span className="font-medium">
                          €{listing.grossPrice}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.unitOfMeasure}:
                        </span>
                        <span className="font-medium">
                          {listing.unitOfMeasure}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.totalDimension}:
                        </span>
                        <span className="font-medium">
                          {listing.totalDimension}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.minimumQuantity}:
                        </span>
                        <span className="font-medium">
                          {listing.minimumQuantity}x
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.packagingUnit}:
                        </span>
                        <span className="font-medium">
                          {listing.packagingUnit}x
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.typeOfGoods}:
                        </span>
                        <span className="font-medium">
                          {listing.typeOfGoods}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.loadingEquipment}:
                        </span>
                        <span className="font-medium">
                          {listing.loadingEquipment}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.loadingEquipmentExchange}:
                        </span>
                        <span className="font-medium">
                          {listing.loadingEquipmentExchange
                            ? dictionary.yes
                            : "Nein"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.priceWithoutExchange}:
                        </span>
                        <span className="font-medium">
                          €{listing.priceWithoutExchange}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Inventory and Shipping Related Data */}
                  <div className="mb-6">
                    <h3 className="font-medium text-sm text-muted-foreground mb-3">
                      {dictionary.inventoryShippingSection}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.availableQuantity}:
                        </span>
                        <span className="font-medium">
                          {listing.availableQuantity.toLocaleString()}x
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.reserved}:
                        </span>
                        <span className="font-medium">{listing.reserved}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.inTransit}:
                        </span>
                        <span className="font-medium">
                          {listing.inTransit.toLocaleString()}x
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.warehouseId}:
                        </span>
                        <span className="font-medium">
                          {listing.warehouseId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.sku}:
                        </span>
                        <span className="font-medium">{listing.sku}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.allowBackorder}:
                        </span>
                        <span className="font-medium">
                          {listing.allowBackorder ? dictionary.yes : "Nein"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.backorderDuration}:
                        </span>
                        <span className="font-medium">
                          {listing.backorderDuration} {dictionary.days}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.reservation}:
                        </span>
                        <span className="font-medium">
                          {listing.reservation} {dictionary.days}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.leadTime}:
                        </span>
                        <span className="font-medium">
                          {listing.leadTime} {dictionary.hours}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dictionary.neutralPackaging}:
                        </span>
                        <span className="font-medium">
                          {listing.neutralPackaging ? dictionary.yes : "Nein"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditListing}
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-3 w-3" />
                      {dictionary.edit}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Final;
