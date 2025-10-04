import type { Customer, Vehicle, CatalogItem, Invoice } from '@/lib/types';

export const customers: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234', avatarUrl: 'https://picsum.photos/seed/1/200/200', vehicleIds: ['101', '102'] },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678', avatarUrl: 'https://picsum.photos/seed/2/200/200', vehicleIds: ['103'] },
  { id: '3', name: 'Mike Johnson', email: 'mike.j@example.com', phone: '555-8765', avatarUrl: 'https://picsum.photos/seed/3/200/200', vehicleIds: [] },
  { id: '4', name: 'Emily Davis', email: 'emily.d@example.com', phone: '555-4321', avatarUrl: 'https://picsum.photos/seed/4/200/200', vehicleIds: ['104'] },
];

export const vehicles: Vehicle[] = [
  { id: '101', clientId: '1', nickname: 'Daily Driver', vin: '123ABC456DEF789G', make: 'Honda', model: 'Civic', year: 2020, licensePlate: 'ABC-123', currentMileage: 45000 },
  { id: '102', clientId: '1', nickname: "Dad's Truck", vin: '789GHI012JKL345M', make: 'Ford', model: 'F-150', year: 2018, licensePlate: 'TRUCK-1', currentMileage: 89000 },
  { id: '103', clientId: '2', nickname: 'Roadster', vin: '345MNO678PQR901S', make: 'Mazda', model: 'MX-5 Miata', year: 2022, licensePlate: 'FUN-RIDE', currentMileage: 12000 },
  { id: '104', clientId: '4', nickname: 'Family SUV', vin: '901STU234VWX567Y', make: 'Toyota', model: 'RAV4', year: 2021, licensePlate: 'FAM-SUV', currentMileage: 32000 },
];

export const catalogItems: CatalogItem[] = [
  { id: 'P1', name: 'Brake Pads (Set)', type: 'Part', costPrice: 45.00, salePrice: 75.00, taxRate: 8.25 },
  { id: 'P2', name: 'Oil Filter', type: 'Part', costPrice: 8.00, salePrice: 15.00, taxRate: 8.25 },
  { id: 'P3', name: 'Synthetic Oil (Quart)', type: 'Part', costPrice: 7.50, salePrice: 12.00, taxRate: 8.25 },
  { id: 'P4', name: 'Wiper Blade', type: 'Part', costPrice: 12.00, salePrice: 25.00, taxRate: 8.25 },
  { id: 'L1', name: 'Standard Labor', type: 'Labor', costPrice: 0, salePrice: 120.00, taxRate: 0 },
  { id: 'L2', name: 'Diagnostic Check', type: 'Labor', costPrice: 0, salePrice: 75.00, taxRate: 0 },
  { id: 'L3', name: 'Brake Pad Replacement', type: 'Labor', costPrice: 0, salePrice: 240.00, taxRate: 0 },
  { id: 'L4', name: 'Oil Change Service', type: 'Labor', costPrice: 0, salePrice: 60.00, taxRate: 0 },
];

export const invoices: Invoice[] = [
  {
    id: 'INV-001',
    invoiceNumber: '2024-001',
    customerId: '1',
    vehicleId: '101',
    date: '2024-07-15',
    dueDate: '2024-08-14',
    status: 'Paid',
    lineItems: [
      { itemId: 'L4', description: 'Oil Change Service', quantity: 1, unitPrice: 60.00, tax: 0, total: 60.00 },
      { itemId: 'P2', description: 'Oil Filter', quantity: 1, unitPrice: 15.00, tax: 1.24, total: 16.24 },
      { itemId: 'P3', description: 'Synthetic Oil (Quart)', quantity: 5, unitPrice: 12.00, tax: 4.95, total: 64.95 },
    ],
    subtotal: 135.00,
    tax: 6.19,
    total: 141.19,
    notes: 'Customer requested tire pressure check as well. All good.'
  },
  {
    id: 'INV-002',
    invoiceNumber: '2024-002',
    customerId: '2',
    vehicleId: '103',
    date: '2024-07-18',
    dueDate: '2024-08-17',
    status: 'Sent',
    lineItems: [
      { itemId: 'L2', description: 'Diagnostic Check for engine light', quantity: 1, unitPrice: 75.00, tax: 0, total: 75.00 },
    ],
    subtotal: 75.00,
    tax: 0.00,
    total: 75.00,
  },
    {
    id: 'INV-003',
    invoiceNumber: '2024-003',
    customerId: '1',
    vehicleId: '102',
    date: '2024-07-20',
    dueDate: '2024-08-19',
    status: 'Draft',
    lineItems: [
      { itemId: 'L3', description: 'Brake Pad Replacement - Front', quantity: 1, unitPrice: 240.00, tax: 0, total: 240.00 },
      { itemId: 'P1', description: 'Brake Pads (Set)', quantity: 2, unitPrice: 75.00, tax: 12.38, total: 162.38 },
    ],
    subtotal: 390.00,
    tax: 12.38,
    total: 402.38,
  },
];
