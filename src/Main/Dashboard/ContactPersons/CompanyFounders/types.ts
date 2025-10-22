export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  companyName: string;
  companyAddress: string;
  email: string;
  registrationDate: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
}

export interface ContactPersonsProps {
  locale: string;
}
