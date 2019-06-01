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
