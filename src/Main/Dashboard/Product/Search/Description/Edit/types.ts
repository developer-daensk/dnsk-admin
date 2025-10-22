export interface Specification {
  id: string;
  name: string;
  value: string;
}

export interface ProductDescriptionFormData {
  mainDescription: string;
  specifications: Specification[];
}

export interface ProductDescriptionFormProps {
  mainDescription: string;
  specifications: Specification[];
  onSave: (data: ProductDescriptionFormData) => void;
  onCancel: () => void;
}
