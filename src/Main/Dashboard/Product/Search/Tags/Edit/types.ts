export interface ProductTag {
  id: string;
  name: string;
}

export interface ProductTagsFormData {
  selectedTags: ProductTag[];
}

export interface ProductTagsFormProps {
  selectedTags: ProductTag[];
  availableTags: ProductTag[];
  onSave: (data: ProductTagsFormData) => void;
  onCancel: () => void;
}
