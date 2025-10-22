import { iLocale } from "@/Components/Entity/Locale/types";

export interface UserFormData {
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

export interface CreateUserProps {
  locale: iLocale;
}

export interface CreateUserFormData {
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
