import mongoose, { Schema, model, models } from 'mongoose';

const BookingItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: false // เผื่อกรณีจองสินค้าที่ไม่มีในระบบ หรือใส่แค่ชื่อ
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const BookingSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    items: [BookingItemSchema],
}, {
    timestamps: true
});

const Booking = models.Booking || model('Booking', BookingSchema);

export default Booking;
