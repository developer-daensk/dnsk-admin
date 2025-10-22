export interface Offering {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  location: string;
  date: string;
  status: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OfferingProps {
  locale: string;
}

export interface OfferingDetailProps {
  offering: Offering;
  locale: string;
}
