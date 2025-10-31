"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";

const ScanQRcodePage = ({ searchParams }: { searchParams: { total?: string } }) => {
  const totalPrice = Number(searchParams.total) || 0;
  const promptpayNumber = "0813585417";
  const promptpayName = "ปัทมา สุระคงคา";
  const [svg, setSvg] = useState("");

  useEffect(() => {
    generateQR(totalPrice);
  }, [totalPrice]);

  const generateQR = (amount: number) => {
    const payload = generatePayload(promptpayNumber, { amount });
    const options: QRCode.QRCodeToStringOptions = {
      type: "svg",
      margin: 0,
      scale: 10,
      color: { dark: "#000", light: "#fff" },
    };
    QRCode.toString(payload, options, (err, svg) => {
      if (err) {
        return console.log(err);
      }
      setSvg(svg);
    });
  };

  const formatpromptpayNumber = (phone: string) => {
    return phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-xxx-$3");
  };

  return (
    <div className="flex flex-col justify-between h-full pt-8">
      <div className="flex flex-col items-center">
        <img
          src="/images/prompt-pay-logo.png"
          alt="prompt-pay-logo"
          className="w-36"
        />
        {svg ? (
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
            alt="PromptPay QR"
            className="w-56 h-56 my-4"
          />
        ) : (
          <p className="h-56 content-center text-center text-xl font-medium">
            กำลังสร้าง QR Code...
          </p>
        )}
        <div className="content-detail text-center space-y-1.5">
          <p className="text-blue-500 text-xl font-semibold">
            แสกน QR เพื่อโอนเข้าบัญชี
          </p>
          <div className="name-phonenum">
            <p className="font-medium text-xl">{promptpayName}</p>
            <p className="text-lg">{formatpromptpayNumber(promptpayNumber)}</p>
            {/* <p className="font-medium text-lg text-gradient">จำนวน {totalPrice.toLocaleString("th-TH")}.00 บาท</p> */}
          </div>
          <p className="text-zinc-400 text-base">
            ตรวจสอบชื่อและจำนวนเงินให้ถูกต้องก่อนชำระ
          </p>
        </div>
      </div>
      <div className="total-qr fixed bottom-0 left-0 w-full border-t border-stone-200 p-4">
        <div className="bg-blue-500 rounded-full h-14 content-center shadow-sm">
          <p className="text-center text-white font-semibold text-xl">
            ฿{totalPrice.toLocaleString("th-TH")}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScanQRcodePage;
