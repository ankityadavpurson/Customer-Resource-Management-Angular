import { CustomerData, InventoryData } from './models';

export const LOGINDATA = [
    { userId: '12345', pass: '12345' },
    { userId: 'admin', pass: 'admin' },
    { userId: 'deepak', pass: '12345' },
];

export let CUSTOMER_DATA: CustomerData[] = [
    {
        id: 'C001',
        mobileNo: 9089786756,
        name: 'Piyush',
        email: 'piyu@kota.com',
        customerType: 1,
        address: 'Room No.41,NMH Layout,Bhoomika Colony,Bhoomika Colony,Kirloskar,ChickBanavara',
        pincode: 560090,
        bills: [
            {
                id: 'B001',
                dateOfPurchase: new Date('2019-06-02T17:58:35.865Z'),
                discount: 20,
                itemsPurchase: [
                    {
                        id: 'I001',
                        quantity: 12,
                        price: 12.90,
                        discount: 0
                    },
                    {
                        id: 'I002',
                        quantity: 1,
                        price: 10.11,
                        discount: 0
                    },
                    {
                        id: 'I003',
                        quantity: 2,
                        price: 3.89,
                        discount: 0
                    }
                ]
            },
            {
                id: 'B002',
                dateOfPurchase: new Date('2019-06-02T19:08:34.738Z'),
                discount: 5,
                itemsPurchase: [
                    {
                        id: 'I002',
                        quantity: 1,
                        price: 10.11,
                        discount: 0
                    },
                    {
                        id: 'I003',
                        quantity: 2,
                        price: 14.89,
                        discount: 0,
                    }
                ]
            }
        ]
    },
    {
        id: 'C002',
        mobileNo: 9876543210,
        name: 'Deepak',
        email: 'deepak@gmail.com',
        customerType: 0,
        address: 'Aurimore, Sonebhadra UP',
        pincode: 231225,
        bills: [
            {
                id: 'B002',
                dateOfPurchase: new Date('2019-06-02T19:08:34.738Z'),
                discount: 5,
                itemsPurchase: [
                    {
                        id: 'I002',
                        quantity: 1,
                        price: 10.11,
                        discount: 0
                    },
                    {
                        id: 'I003',
                        quantity: 2,
                        price: 14.89,
                        discount: 0,
                    }
                ]
            }
        ]
    }
];

export let INVENTORY_DATA: InventoryData[] = [
    {
        id: 'I001',
        name: 'pen',
        quantity: 102,
        price: 12.90,
        discount: 0,
        itemIype: 0,
        expiryDate: new Date('2019-06-02T19:08:34.738Z')
    },
    {
        id: 'I002',
        name: 'Pencil',
        quantity: 100,
        price: 10.11,
        discount: 0,
        itemIype: 0,
        expiryDate: new Date('2019-06-02T19:08:34.738Z')
    },
    {
        id: 'I003',
        name: 'Box',
        quantity: 50,
        price: 14.89,
        discount: 0,
        itemIype: 0,
        expiryDate: new Date('2019-06-02T19:08:34.738Z')
    }
];

export const BILLS = (): any[] => {
    const array = [];

    CUSTOMER_DATA.forEach(customData => {
        customData.bills.forEach(bill => {
            array.push(bill);
        });
    });

    console.log(array);

    return array;
};
