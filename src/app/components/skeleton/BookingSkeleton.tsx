"use client";
import React from "react";

const BookingSkeleton = () => {
    return (
        <div className="booking-page__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="booking-card bg-white rounded-2xl shadow-sm border border-stone-200 p-6 h-[350px] animate-pulse">
                    <div className="flex justify-between mb-4">
                        <div className="flex-1 space-y-3">
                            <div className="h-6 bg-stone-200 rounded-md w-3/4"></div>
                            <div className="h-4 bg-stone-100 rounded-md w-1/2"></div>
                        </div>
                        <div className="h-8 bg-stone-200 rounded-full w-20"></div>
                    </div>

                    <div className="h-4 bg-stone-100 rounded-md w-1/3 mb-8"></div>

                    <div className="space-y-4 mb-8">
                        <div className="h-3 bg-stone-100 rounded-md w-1/4"></div>
                        <div className="flex justify-between">
                            <div className="h-5 bg-stone-200 rounded-md w-1/2"></div>
                            <div className="h-5 bg-stone-200 rounded-md w-1/4"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-5 bg-stone-200 rounded-md w-2/5"></div>
                            <div className="h-5 bg-stone-200 rounded-md w-1/4"></div>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-stone-100 flex justify-between items-center">
                        <div className="h-6 bg-stone-100 rounded-md w-1/3"></div>
                        <div className="h-8 bg-blue-50 rounded-md w-1/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingSkeleton;
