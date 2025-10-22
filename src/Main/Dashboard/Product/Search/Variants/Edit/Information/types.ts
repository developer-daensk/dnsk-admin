export interface Specification {
  id: string;
  name: string;
  value: string;
}

export interface Identification {
  id: string;
  value: string;
}

export interface ProductVariantsInformationData {
  idin: string;
  variantDescription: string;
  condition: string;
  specifications: Specification[];
  identifications: Identification[];
  tags: string[];
  fileList: any[];
}

export interface ProductVariantsInformationProps {
  locale: string;
}
