import { ProductVariant } from "@/types/product.types";

export interface ProductVariantsFormData {
  selectedVariants: ProductVariant[];
}

export interface ProductVariantsFormProps {
  onSave: (data: ProductVariantsFormData) => void;
  onCancel: () => void;
}
