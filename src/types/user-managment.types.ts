/**
 * User Management System Type Definitions
 * This file contains all type definitions for the user management system.
 */

// =============== Base Types ===============
/** User role types in the system */
export type UserType = 'Buyer' | 'Seller' | 'Logistic (carrier)';

/** Types of logistics services */
export type LogisticsType = 'General Cargo' | 'Special Cargo' | 'Regional Delivery';

/** Possible status values for users */
export type UserStatus = 'active' | 'inactive' | 'pending';

/** Possible status values for locations */
export type LocationStatus = 'active' | 'inactive' | 'maintenance';

/** Possible status values for contacts */
export type ContactStatus = 'active' | 'inactive';

/** Possible status values for seller applications */
export type SellerApplicationStatus = 'pending' | 'approved' | 'rejected' | null;

/** Common status type that can be used across the application */
export type CommonStatus = UserStatus | LocationStatus | ContactStatus;

/** Possible status values for employees */
export type EmployeeStatus = 'active' | 'inactive';

// =============== Base Interfaces ===============
/** Base interface for all location-related data */
export interface BaseLocation {
  locationId: string;
  name: string;
  address: string;
  status: LocationStatus;
  type: string;
}

/** Base interface for all user-related data */
export interface BaseUser {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: UserStatus;
  department: string;
  location: string;
  userTypes: UserType[];
}

/** Base interface for all entities with timestamps */
export interface Timestamped {
  createdDate?: string;
  lastUpdated?: string;
  lastActivity?: string;
}

/** Base interface for all entities with contact information */
export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

// =============== Extended Interfaces ===============
/** Interface for creating a new user location */
export interface CreateUserLocation extends BaseLocation {
  key: string;
}

/** Interface for location data with extended information */
export interface Location extends BaseLocation, ContactInfo, Timestamped {
  userProfileName: string;
  area: string;
  cover: 'ja' | 'ne';
  logistic: string;
  articles: number;
  salesVolume: number;
  activeTypes: string[];
  managerId: string;
}

/** Interface for user data with extended information */
export interface User extends BaseUser, Timestamped {
  userId: string;
  profileName: string;
  activeWarehouses: string[];
  orderCount: number;
  totalPurchaseAmount: number;
  listedArticles: number;
  salesCount: number;
  totalSalesAmount: number;
  joinDate: string;
  lastLogin: string;
  registrationDate: string;
}

/** Interface for editing user form data */
export interface EditUserFormData extends BaseUser {
  profileName: string;
}

/** Interface for user status information */
export interface UserStatusInfo {
  hasSellerApplication: boolean;
  sellerApplicationStatus: SellerApplicationStatus;
  listsGoods: boolean;
  goodsCount: number;
  hasDocuments: boolean;
  documentsCount: number;
  pendingDocumentReview: boolean;
}

/** Interface for contact person data */
export interface CreateUserContactPerson extends ContactInfo {
  key: string;
  contactId: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  status: ContactStatus;
}

/** Interface for company data */
export interface CompanyData extends ContactInfo {
  companyName: string;
  companyId: string;
  companyPhone: string;
  companyFax?: string;
  companyType?: string;
  companyWebsite?: string;
  companyDescription?: string;
  companyAddress?: string;
}

/** Interface for creating a new user */
export interface CreateUserFormData {
  userDetails: {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    phone?: string;
    status: UserStatus;
  };
  companyData: CompanyData;
  locations: CreateUserLocation[];
  contactPersons: CreateUserContactPerson[];
}

/** Interface for product data */
export interface Product extends Timestamped {
  id: string;
  artNr: string;
  pictures: string[] | number;
  title: string;
  locations: number;
  crowd: number;
  salesVolume: number;
  status: 'active' | 'inactive';
  description?: string;
  category?: string;
  manufacturer?: string;
  unitPrice?: number;
}

/** Interface for logistics data */
export interface LogisticsData extends ContactInfo, Timestamped {
  id: string;
  logisticNr: string;
  name: string;
  type: LogisticsType;
  regions: number;
  locations: number;
  tours: number;
  salesVolume: number;
  status: LocationStatus;
}

/** Interface for employee data */
export interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  locationId: string;
  locationName: string;
  status: EmployeeStatus;
}

/** Interface for employee modal props */
export interface EmployeeModalProps {
  visible: boolean;
  mode: 'add' | 'edit';
  employee?: Employee;
  locations: CreateUserLocation[];
  onOk: (values: Partial<Employee>) => void;
  onCancel: () => void;
}

// =============== Table Related Types ===============
/** Base interface for pagination state */
export interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

/** Type for user table sort options */
export type UserSortOption =
  | 'newest'
  | 'oldest'
  | 'name-asc'
  | 'name-desc'
  | 'purchase-high'
  | 'purchase-low'
  | 'sales-high'
  | 'sales-low'
  | 'orders-high'
  | 'orders-low'
  | null;

/** Type for location table sort options */
export type LocationSortOption =
  | 'newest'
  | 'oldest'
  | 'name-asc'
  | 'name-desc'
  | 'sales-high'
  | 'sales-low'
  | 'articles-high'
  | 'articles-low'
  | null;

/** Type for logistics table sort options */
export type LogisticsSortOption =
  | 'newest'
  | 'oldest'
  | 'name-asc'
  | 'name-desc'
  | 'sales-high'
  | 'sales-low'
  | 'tours-high'
  | 'tours-low'
  | 'regions-high'
  | 'regions-low'
  | null;

/** Type for product table sort options */
export type ProductSortOption =
  | 'sales-high'
  | 'sales-low'
  | 'locations-high'
  | 'locations-low'
  | 'quantity-high'
  | 'quantity-low'
  | 'pictures-high'
  | 'pictures-low'
  | 'title-asc'
  | 'title-desc'
  | 'art-nr-asc'
  | 'art-nr-desc'
  | null;

/** Base interface for table filters */
export interface BaseTableFilters {
  searchText?: string;
  dateRange?: [string, string];
}

/** Interface for user table filters */
export interface UserTableFilters extends BaseTableFilters {
  status?: UserStatus[];
  userType?: UserType[];
}

/** Interface for location table filters */
export interface LocationTableFilters extends BaseTableFilters {
  status?: LocationStatus[];
  type?: string[];
}

/** Interface for contact table filters */
export interface ContactTableFilters {
  status?: ContactStatus[];
  department?: string[];
  searchText?: string;
}

// =============== Modal Types ===============
/** Type for modal operations */
export type ModalType = 'add' | 'edit' | 'assign' | 'view';

/** Interface for modal props */
export interface ModalProps<T = unknown> {
  modalType: ModalType;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  data?: T;
}

// =============== API Response Types ===============
/** Interface for API response */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

/** Interface for paginated API response */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// =============== Form Validation Types ===============
/** Interface for form validation rules */
export interface ValidationRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  type?: string;
  validator?: (rule: ValidationRule, value: unknown) => Promise<void>;
}

// =============== Type Guards ===============
/** Type guard to check if an object is a User */
export const isUser = (obj: unknown): obj is User => {
  return (
    typeof obj === 'object' && obj !== null && 'userId' in obj && 'name' in obj && 'email' in obj
  );
};

/** Type guard to check if an object is a Location */
export const isLocation = (obj: unknown): obj is Location => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'locationId' in obj &&
    'name' in obj &&
    'address' in obj
  );
};

/** Type guard to check if a status is a valid UserStatus */
export const isValidUserStatus = (status: unknown): status is UserStatus => {
  return typeof status === 'string' && ['active', 'inactive', 'pending'].includes(status);
};
