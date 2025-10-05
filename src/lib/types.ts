
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  vehicleIds: string[];
}

export interface Vehicle {
  id: string;
  clientId: string;
  nickname: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  currentMileage: number;
  notes?: string;
}

export type CatalogItemType = 'Part' | 'Labor';

export interface CatalogItem {
  id: string;
  name: string;
  type: CatalogItemType;
  costPrice: number;
  salePrice: number;
  taxRate: number; // as a percentage, e.g., 5 for 5%
}

export interface InvoiceLineItem {
  itemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
}

export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Void';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  vehicleId: string;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
}
