"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import CountUp from "react-countup";
import QRSkeleton from "../../components/skeleton/QRSkeleton";

const ScanQRCodeContent = () => {
  const searchParams = useSearchParams();
  const totalPrice = Number(searchParams.get("total")) || 0;

  const [svg, setSvg] = useState("");
  const [shopName, setShopName] = useState("");
  const [maskedNumber, setMaskedNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateQR(totalPrice);
  }, [totalPrice]);

  const generateQR = async (amount: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/generate-qr?amount=${amount}`);
      if (!res.ok) throw new Error("Failed to generate QR");

      const data = await res.json();
      setSvg(data.svg);
      setShopName(data.shopName);
      setMaskedNumber(data.maskedNumber);
    } catch (err) {
      console.error("QR Error:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full pt-8">
      <div className="flex flex-col items-center">
        {loading ? (
          <QRSkeleton />
        ) : (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="prompt-pay-logo">
              <Image
                src="/images/prompt-pay-logo.png"
                alt="PromptPay Logo"
                width={288}
                height={100}
                className="w-36 h-auto"
                priority
              />
            </div>
            <div className="prompt-pay-qr">
              <Image
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
                alt="PromptPay QR"
                width={240}
                height={240}
                className="w-56 h-56 my-4"
                unoptimized
              />
            </div>
            <div className="content-detail text-center space-y-1.5 mt-2">
              <p className="text-blue-500 text-xl font-semibold">
                แสกน QR เพื่อโอนเข้าบัญชี
              </p>
              <div className="name-phonenum">
                <p className="font-medium text-xl">{shopName}</p>
                <p className="text-lg">{maskedNumber}</p>
              </div>
              <p className="text-zinc-400 text-base">
                ตรวจสอบชื่อและจำนวนเงินให้ถูกต้องก่อนชำระ
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="total-qr fixed bottom-0 left-0 w-full border-t border-stone-200 p-4">
        <div className="bg-blue-500 rounded-full h-14 content-center shadow-sm">
          <p className="text-center text-white font-semibold text-xl">
            {loading ? (
              <span className="animate-pulse">กำลังโหลด...</span>
            ) : (
              <CountUp
                start={0}
                end={totalPrice}
                duration={1.25}
                separator=","
                prefix="฿"
                suffix=".00"
                preserveValue={true}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScanQRCodeContent;
