"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import BookingSkeleton from "../components/skeleton/BookingSkeleton";
import { Booking } from "@/types";
import BookingCard from "./component/BookingCard";

const BookingPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState("ทั้งหมด");
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const tabs = ["ทั้งหมด", "ยังไม่มารับ", "มารับแล้ว"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/mockup_bookings.json");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data: Booking[] = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };
    fetchData();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === "ทั้งหมด") return true;
    if (activeTab === "มารับแล้ว") return booking.isPickedUp;
    if (activeTab === "ยังไม่มารับ") return !booking.isPickedUp;
    return true;
  });

  const handleTogglePickup = (index: number) => {
    const newBookings = [...bookings];
    const targetBooking = filteredBookings[index];
    const originalIndex = bookings.findIndex(b => b === targetBooking);

    if (originalIndex !== -1) {
      newBookings[originalIndex] = {
        ...newBookings[originalIndex],
        isPickedUp: !newBookings[originalIndex].isPickedUp
      };
      setBookings(newBookings);
    }
  };

  return (
    <div className="booking-page p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className={`sticky top-18 z-20 -mx-4 px-4 py-2 bg-white/80 backdrop-blur-md mb-4 transition-all duration-300 ${isScrolled ? "border-b border-stone-200/60 shadow-xs" : "border-b border-transparent"}`}>
        <Tabs
          color="var(--color-blue-500)"
          variant="pills"
          defaultValue="ทั้งหมด"
          value={activeTab}
          onChange={(value) => setActiveTab(value || "ทั้งหมด")}
          className="booking-page__tabs"
        >
          <Tabs.List grow justify="space-between" className="booking-page__tabs-list bg-stone-100 p-1.5 rounded-xl font-medium border border-stone-200/50">
            {tabs.map((tab) => (
              <Tabs.Tab key={tab} value={tab} className="booking-page__tab rounded-lg! text-xs sm:text-sm">
                {tab}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </div>

      {loading ? (
        <BookingSkeleton />
      ) : filteredBookings.length === 0 ? (
        <div className="booking-page__empty text-center py-20 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
          <p className="text-stone-400">ยังไม่มีรายการสั่งจองในขณะนี้</p>
        </div>
      ) : (
        <div className="booking-page__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking, index) => (
            <BookingCard
              key={index}
              booking={booking}
              index={index}
              onTogglePickup={handleTogglePickup}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPage;
