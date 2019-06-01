
export const CUSTOMER_DATA = [
    { customerName: 'Deeapk', billId: 'B001', dateOfPurchase: '12/05/2019', emailId: 'deepak@gmial.com', mobileNo: 9867564320 },
    { customerName: 'Ankita', billId: 'B001', dateOfPurchase: '14/05/2019', emailId: 'ankit@gmial.com', mobileNo: 8975436778 },
    { customerName: 'Abhishek', billId: 'B003', dateOfPurchase: '11/05/2019', emailId: 'abhishek@gmial.com', mobileNo: 9089765435 },
    { customerName: 'Dheeraj', billId: 'B004', dateOfPurchase: '16/05/2019', emailId: 'dhiraj@gmial.com', mobileNo: 9712309875 },
    { customerName: 'Piyush', billId: 'B005', dateOfPurchase: '13/05/2019', emailId: 'piyush@gmial.com', mobileNo: 9086342367 },
    { customerName: 'Shubhanshu', billId: 'B006', dateOfPurchase: '10/05/2019', emailId: 'shubhanshu@gmial.com', mobileNo: 9045327865 },
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
        mobileNo: 9874563210,
        email: 'Piyu@kota.com',
        address: 'Room No.41,NMH Layout,Bhoomika Colony,Bhoomika Colony,Kirloskar,ChickBanavara',
        pincode: 560090
    }
];

export const INVENTORY_DATA = [
    {
        id: 'I001',
        name: 'xyz',
        quantity: 12,
        price: 12.90,
        type: 'stationary',
        expiryDate: '-'
    },
    {
        id: 'I002',
        name: 'asz',
        quantity: 18,
        price: 15.20,
        type: 'grocery',
        expiryDate: '21/12/2029'
    },
    {
        id: 'I003',
        name: 'sdf',
        quantity: 21,
        price: 34.60,
        type: 'retails',
        expiryDate: '21/12/2029'
    }
];


// export var ELEMENT_DATA=[];


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

]