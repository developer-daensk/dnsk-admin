export interface IdentificationItem {
  id: string;
  type: string;
  value: string;
  isDeletable: boolean;
}

export interface ProductFormData {
  title: string;
  condition: string;
  ean: string;
  idin: string;
  mediaCount: number;
  maxMedia: number;
  titleMaxLength: number;
  eanMaxLength: number;
  identifications?: IdentificationItem[];
}

export interface ProductFormProps {
  initialValues?: ProductFormData;
  onSave: (values: ProductFormData) => void;
  onCancel: () => void;
  isEditMode?: boolean;
}
