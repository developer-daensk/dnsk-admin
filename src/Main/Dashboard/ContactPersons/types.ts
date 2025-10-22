export interface ContactPerson {
  id: string;
  userId: string;
  location: string;
  role: string;
  email: string;
  phone: string;
  mobilePhone: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
  firstName: string;
  lastName: string;
  address: string;
  companyId?: string;
  locationId?: string;
}

export interface ContactPersonFormData {
  companyId: string;
  locationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobilePhone: string;
  address: string;
}

export interface ContactPersonsProps {
  locale: string;
}

export interface ContactPersonFormProps {
  initialData?: ContactPersonFormData;
  onSubmit: (data: ContactPersonFormData) => void;
  onCancel: () => void;
  locale: string;
}
