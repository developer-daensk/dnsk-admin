export interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  department: string;
  status: string;
  hireDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFormData {
  name: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  department: string;
  status: string;
}

export interface EmployeeProps {
  locale: string;
  isEdit?: boolean;
  initialData?: Employee;
}

export interface EmployeeFormProps {
  locale: string;
  isEdit: boolean;
  initialData?: Employee;
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
}
