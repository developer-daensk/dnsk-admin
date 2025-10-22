export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar?: string;
  subordinates?: Employee[];
}

export interface Location {
  id: string;
  name: string;
  key: string;
  employees: Employee[];
  isHeadLocation?: boolean;
}

export interface OrganisationalChartProps {
  locale: string;
  locations?: Location[];
}

export interface NodeData {
  id: string;
  type: "head" | "branch" | "employee";
  label: string;
  position?: string;
  department?: string;
  avatar?: string;
}
