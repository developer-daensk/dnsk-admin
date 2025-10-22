import { create } from "zustand";
import {
  ProductType,
  SelectedProductType,
  ProductVariant,
} from "@/types/product.types";

// Legacy Product interface for backward compatibility
export interface Product {
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

interface ProductState {
  // Main product state
  product: ProductType;
  selectedProduct: SelectedProductType | null;
  productVariants: ProductVariant[];

  // Main section state
  mainProduct: ProductType;

  // Legacy search state for backward compatibility
  searchResults: Product[];
  isLoading: boolean;

  // Actions for main product
  updateProduct: (updates: Partial<ProductType>) => void;
  resetProduct: () => void;
  setSelectedProduct: (product: SelectedProductType | null) => void;
  clearSelectedProduct: () => void;
  setProductVariants: (variants: ProductVariant[]) => void;
  addProductVariant: (variant: ProductVariant) => void;
  updateProductVariant: (id: string, updates: Partial<ProductVariant>) => void;
  removeProductVariant: (id: string) => void;
  clearProductVariants: () => void;

  // Actions for main section
  updateMainProduct: (updates: Partial<ProductType>) => void;
  resetMainProduct: () => void;
  setMainProduct: (product: ProductType) => void;

  // Legacy actions for backward compatibility
  setSearchResults: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  clearSearch: () => void;
}

// Initial product state
const initialProduct: ProductType = {
  name: "",
  description: "",
  extraInformation: "",
  excerpt: "",
  condition: "",
  idin: "",
  attributes: [],
  variationItemIds: [],
  images: [],
  tags: [],
  preparationTimeInHours: 0,
  reservableSpanInHours: 0,
  weight: 0,
  weightUnit: "",
  defaultDischargeType: "",
  widthInMillimeter: 0,
  heightInMillimeter: 0,
  depthInMillimeter: 0,
  epalInCent: 0,
  ewpInCent: 0,
  ldm: "",
  hasPallet: false,
  palletType: "",
  hasExchangeablePallet: false,
  palletCost: 0,
  isDangerousGood: false,
  isFragile: false,
  stackable: false,
  neutralPackaging: false,
  minimumOrderQuantity: 0,
  maximumQuantityPerOrder: 0,
  maximumQuantityPerPallet: 0,
  minimumQuantityPerOrder: 0,
  maxStackableItemUnits: 0,
  pricePerPackage: 0,
  pricePerUnit: 0,
  package: "",
  unit: "",
  isStackable: false,
  maxStackableUnits: 0,
  productGroupId: "",
  productGroupSlug: "",
  ean: "",
  upc: "",
  quantityStepUnit: 0,
  isTemperatureSensitive: false,
  maxTemperature: 0,
  minTemperature: 0,
  isDeliverySensitive: false,
  maxDeliveryTimeInHours: 0,
  itemUnitQuantity: 0,
  itemUnitPerPackage: 0,
  batchId: "",
};

export const useProductStore = create<ProductState>((set, get) => ({
  // Initial state
  product: initialProduct,
  selectedProduct: null,
  productVariants: [],
  mainProduct: initialProduct,
  searchResults: [],
  isLoading: false,

  // Main product actions
  updateProduct: (updates) =>
    set((state) => ({
      product: { ...state.product, ...updates },
    })),

  resetProduct: () => set({ product: initialProduct }),

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  clearSelectedProduct: () => set({ selectedProduct: null }),

  setProductVariants: (variants) => set({ productVariants: variants }),

  addProductVariant: (variant) =>
    set((state) => ({
      productVariants: [...state.productVariants, variant],
    })),

  updateProductVariant: (id, updates) =>
    set((state) => ({
      productVariants: state.productVariants.map((variant) =>
        variant.id === id ? { ...variant, ...updates } : variant
      ),
    })),

  removeProductVariant: (id) =>
    set((state) => ({
      productVariants: state.productVariants.filter(
        (variant) => variant.id !== id
      ),
    })),

  clearProductVariants: () => set({ productVariants: [] }),

  // Main section actions
  updateMainProduct: (updates) =>
    set((state) => ({
      mainProduct: { ...state.mainProduct, ...updates },
    })),

  resetMainProduct: () => set({ mainProduct: initialProduct }),

  setMainProduct: (product) => set({ mainProduct: product }),

  // Legacy actions for backward compatibility
  setSearchResults: (products) => set({ searchResults: products }),

  setLoading: (loading) => set({ isLoading: loading }),

  clearSearch: () => set({ searchResults: [], selectedProduct: null }),
}));

// Mock products data (legacy)
export const mockProducts: Product[] = [
  {
    id: "1",
    title: "iPhone 15 Pro Max",
    ean: "1234567890123",
    category: "Electronics",
    price: 1199,
    currency: "EUR",
    description: "Latest iPhone model with advanced features",
  },
  {
    id: "11",
    title: "iPhone 17 Pro Max",
    ean: "1234567890124",
    category: "Electronics",
    price: 1199,
    currency: "EUR",
    description: "Latest iPhone model with advanced features",
  },
  {
    id: "2",
    title: "Samsung Galaxy S24 Ultra",
    ean: "9876543210987",
    category: "Electronics",
    price: 1299,
    currency: "EUR",
    description: "Premium Android smartphone",
  },
  {
    id: "3",
    title: 'MacBook Pro 16"',
    ean: "4567891230456",
    category: "Computers",
    price: 2499,
    currency: "EUR",
    description: "Professional laptop for developers",
  },
  {
    id: "4",
    title: "Dell XPS 13",
    ean: "7891234560789",
    category: "Computers",
    price: 1499,
    currency: "EUR",
    description: "Ultrabook with premium design",
  },
  {
    id: "5",
    title: "Sony WH-1000XM5",
    ean: "3216549870321",
    category: "Audio",
    price: 349,
    currency: "EUR",
    description: "Premium noise-cancelling headphones",
  },
];
