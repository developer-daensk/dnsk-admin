export interface SortOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TableSearchAndFilterProps {
  // Search props
  searchPlaceholder?: string;
  searchValue?: string;
  onSearch: (value: string) => void;

  // Sort props
  sortPlaceholder?: string;
  sortValue?: string | null;
  sortOptions: SortOption[];
  onSortChange: (value: string | null) => void;

  // Status display props
  itemCount: number;
  itemTypeSingular: string;
  itemTypePlural: string;
  isSorted?: boolean;

  // Styling props
  searchWidth?: number;
  sortWidth?: number;
}
