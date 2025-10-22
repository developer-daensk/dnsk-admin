export interface ProductAttribute {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttributeFormData {
  name: string;
  description: string;
}

export interface AttributesProps {
  locale: string;
}

export interface AttributeFormProps {
  initialData?: AttributeFormData;
  onSubmit: (data: AttributeFormData) => void;
  onCancel: () => void;
  locale: string;
}
