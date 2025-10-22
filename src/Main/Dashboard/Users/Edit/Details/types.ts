import { iLocale } from "@/Components/Entity/Locale/types";

export interface DetailsProps {
  locale: iLocale;
}

export interface UserDetailsFormData {
  firstName: string;
  profileName: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  location: string;
  companyName: string;
  companyId: string;
  companyPhone: string;
  companyFax: string;
  companyEmail: string;
  address: string;
}
