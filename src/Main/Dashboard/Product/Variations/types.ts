export interface ProductVariation {
  id: string;
  name: string;
  type: string;
  uiType: string;
  items: VariationItem[];
  createdAt: string;
  updatedAt: string;
}

export interface VariationItem {
  id: string;
  name: string;
  value: string;
}

export interface VariationFormData {
  name: string;
  type: string;
  uiType: string;
  items: VariationItem[];
}

export interface VariationsProps {
  locale: string;
}

export interface VariationFormProps {
  isEdit?: boolean;
  initialData?: VariationFormData;
  onSubmit: (data: VariationFormData) => void;
  onCancel: () => void;
  locale: string;
}
