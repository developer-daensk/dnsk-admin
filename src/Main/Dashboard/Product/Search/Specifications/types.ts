export interface ProductSpecificationsData {
  dimensions: {
    unit: string;
    length: number | null;
    width: number | null;
    height: number | null;
    volume?: number;
  };
  weight: {
    weight: number | null;
    unit: string;
  };
  checkboxes: {
    stackable: boolean;
    fragile: boolean;
    hazardous: boolean;
  };
  regulatory: {
    specialRegulations: string;
    tunnelCode: string;
    unIdNumber: string;
    labelNumber: string;
    packagingGroup: string;
    euroWasteCode: string;
    nem: string;
    transportCategory: string;
    environmentallyHazardous: boolean;
  };
  temperature: {
    minTemperatureEnabled: boolean;
    minTemperature: number | null;
    coolingEnabled: boolean;
    maxTemperature: number | null;
  };
  delivery: {
    expressNecessary: boolean;
    maxTransportDuration: number | null;
  };
}

export interface ProductSpecificationsProps {
  locale: string;
  onSpecificationsChange?: (specifications: ProductSpecificationsData) => void;
  initialValues?: ProductSpecificationsData;
  onNext?: (
    specifications: ProductSpecificationsData,
    skipVariants?: boolean
  ) => void;
}
