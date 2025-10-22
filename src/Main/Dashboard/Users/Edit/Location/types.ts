export interface Location {
  id: string;
  locationId: string;
  name: string;
  address: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface LocationFormData {
  name: string;
  address: string;
  type: string;
  status: string;
}

export interface LocationProps {
  locale: string;
  isEdit?: boolean;
  initialData?: Location;
}

export interface LocationFormProps {
  locale: string;
  isEdit: boolean;
  initialData?: Location;
  onSubmit: (data: LocationFormData) => void;
  onCancel: () => void;
}

export interface AssignLocationFormData {
  locationId: string;
  assignmentType: string;
}

export interface AssignLocationFormProps {
  locale: string;
  locations: Location[];
  onSubmit: (data: AssignLocationFormData) => void;
  onCancel: () => void;
}
