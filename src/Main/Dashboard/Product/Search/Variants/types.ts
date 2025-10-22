import { ProductVariant } from "@/types/product.types";

export interface ProductVariantsOverviewProps {
  selectedVariants?: ProductVariant[];
  onEdit?: () => void;
  onContinue: (isVariantProduct: boolean) => void;
}
