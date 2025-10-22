export interface Specification {
  id: string;
  name: string;
  value: string;
}

export interface ProductDescriptionOverviewProps {
  mainDescription: string;
  specifications: Specification[];
  onEdit: () => void;
  onContinue: () => void;
}
