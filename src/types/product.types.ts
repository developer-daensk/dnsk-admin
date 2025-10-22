import { PRODUCT_VARIANT_STATUS } from "@/lib/constants/product";

// Main product type for detailed product information
export interface ProductType {
  name: string;
  description: string;
  extraInformation: string;
  excerpt: string;
  condition: string;
  idin: string;
  attributes: Record<string, unknown>[];
  variationItemIds: string[];
  images: string[];
  tags: string[];
  preparationTimeInHours: number;
  reservableSpanInHours: number;
  weight: number;
  weightUnit: string;
  defaultDischargeType: string;
  widthInMillimeter: number;
  heightInMillimeter: number;
  depthInMillimeter: number;
  epalInCent: number;
  ewpInCent: number;
  ldm: string;
  hasPallet: boolean;
  palletType: string;
  hasExchangeablePallet: boolean;
  palletCost: number;
  isDangerousGood: boolean;
  isFragile: boolean;
  stackable: boolean;
  neutralPackaging: boolean;
  minimumOrderQuantity: number;
  maximumQuantityPerOrder: number;
  maximumQuantityPerPallet: number;
  minimumQuantityPerOrder: number;
  maxStackableItemUnits: number;
  pricePerPackage: number;
  pricePerUnit: number;
  package: string;
  unit: string;
  isStackable: boolean;
  maxStackableUnits: number;
  productGroupId: string;
  productGroupSlug: string;
  ean: string;
  upc: string;
  quantityStepUnit: number;
  isTemperatureSensitive: boolean;
  maxTemperature: number;
  minTemperature: number;
  isDeliverySensitive: boolean;
  maxDeliveryTimeInHours: number;
  itemUnitQuantity: number;
  itemUnitPerPackage: number;
  batchId: string;
}

// Selected product type for search functionality
export interface SelectedProductType {
  id: string;
  title: string;
  ean?: string;
  gtin?: string;
  upc?: string;
  idin?: string;
  image?: string;
  category: string;
  price?: number;
  currency?: string;
  description?: string;
}

// Product variant interface
export interface ProductVariant {
  id: string;
  attribute: string;
  option: string;
  idin?: string;
  baseDataStatus:
    | typeof PRODUCT_VARIANT_STATUS.OPEN
    | typeof PRODUCT_VARIANT_STATUS.COMPLETED;
  specificationsStatus:
    | typeof PRODUCT_VARIANT_STATUS.OPEN
    | typeof PRODUCT_VARIANT_STATUS.COMPLETED;
  listingsStatus:
    | typeof PRODUCT_VARIANT_STATUS.OPEN
    | typeof PRODUCT_VARIANT_STATUS.COMPLETED;
}
