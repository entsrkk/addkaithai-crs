"use client";
import React, { useState } from "react";
import { Booking } from "@/types";
import { Collapse } from "@mantine/core";

interface BookingCardProps {
    booking: Booking;
    index: number;
    onTogglePickup: (index: number) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, index, onTogglePickup }) => {
    const [isOpen, setIsOpen] = useState(false);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('th-TH', options);
    };

    const formatPhoneNumber = (phone: string) => {
        const cleaned = phone.replace("+66", "0").replace(/\D/g, "");
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        return phone;
    };

    const bookingTotal = booking.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="booking-card bg-white rounded-2xl shadow-sm border border-stone-200/50 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
            <div className="booking-card__body p-4 flex flex-col h-full">
                <div className="booking-card__header flex justify-between items-center mb-2">
                    <div className="booking-card__customer grow min-w-0">
                        <h3 className="booking-card__name font-bold text-lg text-stone-800 truncate leading-tight">
                            #{index + 1} {booking.customerName}
                        </h3>
                        <a
                            href={`tel:${booking.phoneNumber}`}
                            className="booking-card__phone text-blue-500 font-medium hover:underline transition-all duration-200"
                        >
                            {formatPhoneNumber(booking.phoneNumber)}
                        </a>
                    </div>
                    <div className="booking-card__price-tag text-right ml-2">
                        <span className="block text-xs text-stone-400 font-semibold uppercase tracking-wider leading-none mb-1">ยอดรวม</span>
                        <span className="text-lg font-extrabold text-blue-500 leading-none">
                            ฿{bookingTotal.toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4 mt-1 bg-stone-50/50 p-2 rounded-lg border border-stone-100">
                    <div className="booking-card__date flex items-center gap-1.5 text-stone-500 text-xs font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(booking.bookingDate)} น.</span>
                    </div>
                    {booking.isPickedUp ? (
                        <div className="booking-card__badge badge bg-emerald-100/50 text-emerald-600 border-emerald-600/40 text-xs font-semibold h-6 px-2.5">
                            มารับแล้ว
                        </div>
                    ) : (
                        <div className="booking-card__badge badge bg-rose-100/50 text-rose-600 border-rose-600/40 text-xs font-semibold h-6 px-2.5">
                            ยังไม่มารับ
                        </div>
                    )}
                </div>

                <div className="booking-card__items space-y-2.5 grow">
                    {booking.items.map((item, i) => (
                        <div key={i} className="booking-card__item flex justify-between items-center text-sm">
                            <div className="booking-card__item-info flex items-center gap-2">
                                <span className="booking-card__item-quantity w-6 h-6 flex items-center justify-center bg-stone-100 rounded text-stone-600 text-xs font-black">
                                    {item.quantity}x
                                </span>
                                <span className="booking-card__item-name font-semibold text-stone-800">{item.name}</span>
                            </div>
                            <span className="booking-card__item-price font-bold text-stone-600 text-sm">
                                ฿{(item.price * item.quantity).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>

                <div
                    className="booking-card__toggle-footer mt-3 pt-2 border-t border-stone-100 flex items-center justify-center cursor-pointer transition-colors text-stone-400 hover:text-blue-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-7 w-7 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>

                <Collapse in={isOpen}>
                    <div>
                        {!booking.isPickedUp ? (
                            <button
                                onClick={() => onTogglePickup(index)}
                                className="booking-card__action-btn mt-3 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all active:scale-[0.97]"
                            >
                                รับสินค้าแล้ว
                            </button>
                        ) : (
                            <button
                                onClick={() => onTogglePickup(index)}
                                className="booking-card__undo-btn mt-3 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all active:scale-[0.97]"
                            >
                                ยกเลิก
                            </button>
                        )}
                    </div>
                </Collapse>
            </div>
        </div>
    );
};

export default BookingCard;
