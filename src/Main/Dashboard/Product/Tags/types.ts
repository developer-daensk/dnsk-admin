export interface ProductTag {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface TagFormData {
  name: string;
  description: string;
}

export interface TagsProps {
  locale: string;
}

export interface TagFormProps {
  isEdit?: boolean;
  initialData?: TagFormData;
  onSubmit: (data: TagFormData) => void;
  onCancel: () => void;
  locale: string;
}
