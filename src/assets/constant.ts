
export const CUSTOMER_DATA = [
    { name: 'Deeapk', billId: 'B001', dateOfPurchase: '12/05/2019', email: 'deepak@gmial.com', mobileNo: 9867564320 },
    { name: 'Ankit', billId: 'B001', dateOfPurchase: '14/05/2019', email: 'ankit@gmial.com', mobileNo: 8975436778 },
    { name: 'Piyush', billId: 'B005', dateOfPurchase: '13/05/2019', email: 'piyush@gmial.com', mobileNo: 9086342367 }
];

export const CUSTOMERDATA = [
    {
        id: 32132,
        name: 'Piyush',
        primary: true,
        bill: [
            {
                id: 'B001',
                dateOfPurchase: '2019/05/29',
                discount: '50%',
                items: ['I001', 'I002', 'I003'],
                total: 100
            },
            {
                id: 'B002',
                dateOfPurchase: '2019/05/31',
                discount: '10%',
                items: ['I001', 'I003'],
                total: 10
            },
            {
                id: 'B003',
                dateOfPurchase: '2019/05/30',
                discount: '0%',
                items: ['I001', 'I006', 'I003', 'I016', 'I033'],
                total: 99
            }
        ],
        mobileNo: 9086342367,
        email: 'Piyu@kota.com',
        address: 'Room No.41,NMH Layout,Bhoomika Colony,Bhoomika Colony,Kirloskar,ChickBanavara',
        pincode: 560090
    },
    {
        id: 32133,
        name: 'Deepak',
        primary: false,
        bill: [
            {
                id: 'B001',
                dateOfPurchase: '2019/05/29',
                discount: '50%',
                items: ['I001', 'I002', 'I003'],
                total: 100
            }
        ],
        mobileNo: 9867564320,
        email: 'deepak@gmail.com',
        address: 'House No. 123 Aurimore, Anpara, Sonebhadra',
        pincode: 231225
    },
    {
        id: 32133,
        name: 'Ankit',
        primary: true,
        bill: [
            {
                id: 'B001',
                dateOfPurchase: '2019/05/29',
                discount: '50%',
                items: ['I001', 'I003'],
                total: 100
            },
            {
                id: 'B002',
                dateOfPurchase: '2019/05/29',
                discount: '50%',
                items: ['I001', 'I002', 'I003'],
                total: 100
            },
        ],
        mobileNo: 8975436778,
        email: 'ankit@gmail.com',
        address: 'CDAC Knowledge Park, Sadanandanagar, Bennigana Halli, Bengaluru, Karnatakax',
        pincode: 560038
    }
];

export let INVENTORY_DATA = [
    {
        inventoryId: 'I001',
        name: 'pencil',
        quantity: 12,
        price: 12.90,
        type: 'stationary',
        expiryDate: '-',
        discount: 0
    },
    {
        inventoryId: 'I002',
        name: 'bicuit',
        quantity: 18,
        price: 15.20,
        type: 'grocery',
        expiryDate: '2019-10-12',
        discount: 10
    },
    {
        inventoryId: 'I003',
        name: 'pencile-box',
        quantity: 21,
        price: 34.60,
        type: 'stationary',
        expiryDate: '21/12/2029',
        discount: 0
    },
    {
        inventoryId: 'I004',
        name: 'pen',
        quantity: 12,
        price: 16.90,
        type: 'stationary',
        expiryDate: '-',
        discount: 0
    },
    {
        inventoryId: 'I005',
        name: 'tea',
        quantity: 18,
        price: 30.20,
        type: 'grocery',
        expiryDate: '21/12/2029',
        discount: 10
    },
    {
        inventoryId: 'I006',
        name: 'book',
        quantity: 21,
        price: 120.60,
        type: 'stationary',
        expiryDate: '21/12/2029',
        discount: 0
    }
];

export const ELEMENT_DATA = [
    {
        itemid: 'I001',
        name: 'Pen',
        price: 10.99,
        quantity: 9,
        totalprice: 100
    },
    {
        itemid: 'I002',
        name: 'Pencil',
        price: 4.99,
        quantity: 10,
        totalprice: 100
    },
    {
        itemid: 'I003',
        name: 'Bread',
        price: 24.99,
        quantity: 5,
        totalprice: 100
    },
    {
        itemid: 'I004',
        name: 'Bread',
        price: 24.99,
        quantity: 5,
        totalprice: 100
    },
    {
        itemid: 'I005',
        name: 'Bread',
        price: 24.99,
        quantity: 5,
        totalprice: 100
    },
    {
        itemid: 'I006',
        name: 'Bread',
        price: 24.99,
        quantity: 5,
        totalprice: 100
    }

];

export const LOGINDATA = [
    { userId: '12345', pass: '12345' },
    { userId: 'admin', pass: 'admin' },
    { userId: 'deepak', pass: '12345' },
];
