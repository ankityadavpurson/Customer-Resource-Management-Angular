export interface BillingDetails {
    itemid?: string;
    name?: string;
    price?: number;
    quantity?: number;
    discount?: number;
    totalprice?: number;
}

export interface UserData {
    mobileNo: number;
    name: string;
    type: boolean;
    email: string;
}

export interface Bill {
    billId: number;
    user: UserData;
    billDetails: BillingDetails[];
    discount?: number;
    grandTotal: number;
}

// Interfaces for app

export interface CustomerData {
    id: string;
    mobileNo: number;
    name: string;
    email: string;
    customerType: CustomerType;
    address?: string;
    pincode?: number;
    bills: BillData[];
}

enum CustomerType {
    'Guest',
    'Primary'
}

export interface BillData {
    id: string;
    mobileNo?: number;
    name?: string;
    email?: string;
    dateOfPurchase: Date;
    discount: number;
    itemsPurchase: ItemsPurchased[];
}

export interface ItemsPurchased {
    id: string;
    quantity: number;
    price: number;
    discount: number;
}

export interface InventoryData {
    id: string;
    name: string;
    quantity: number;
    price: number;
    itemIype: ItemIype;
    discount: number;
    expiryDate?: Date;
}

enum ItemIype {
    'Stationary',
    'Grocery'
}
