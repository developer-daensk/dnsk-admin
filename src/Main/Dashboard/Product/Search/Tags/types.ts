export interface ProductTag {
  id: string;
  name: string;
}

export interface ProductTagsOverviewProps {
  selectedTags: ProductTag[];
  onEdit: () => void;
  onContinue: () => void;
}
