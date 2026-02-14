export interface Product {
    _id: string;
    product_name: string;
    product_price: number;
    product_image?: string;
}

export interface BookingItem {
    productId?: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Booking {
    customerName: string;
    phoneNumber: string;
    bookingDate: string;
    items: BookingItem[];
    isPickedUp: boolean;
}
