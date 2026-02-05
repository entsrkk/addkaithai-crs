"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";
import Image from "next/image";
import CountUp from "react-countup";
import { SHOP_INFO } from "../../../lib/constants";

const ScanQRCodeContent = () => {
  const searchParams = useSearchParams();
  const totalPrice = Number(searchParams.get("total")) || 0;
  const { PROMPTPAY_NUMBER, PROMPTPAY_NAME } = SHOP_INFO;
  const [svg, setSvg] = useState("");

  useEffect(() => {
    generateQR(totalPrice);
  }, [totalPrice]);

  const generateQR = (amount: number) => {
    const payload = generatePayload(PROMPTPAY_NUMBER, { amount });
    const options: QRCode.QRCodeToStringOptions = {
      type: "svg",
      margin: 0,
      scale: 10,
      color: { dark: "#000", light: "#fff" },
    };
    QRCode.toString(payload, options, (err, svg) => {
      if (err) {
        return; // Handle error silently or add UI feedback later
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
        <Image
          src="/images/prompt-pay-logo.png"
          alt="PromptPay Logo"
          width={144}
          height={100}
          className="w-36 h-auto"
          loading="eager"
          priority
        />
        {svg ? (
          <Image
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
            alt="PromptPay QR"
            width={224}
            height={224}
            className="w-56 h-56 my-4"
            unoptimized
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
            <p className="font-medium text-xl">{PROMPTPAY_NAME}</p>
            <p className="text-lg">{formatpromptpayNumber(PROMPTPAY_NUMBER)}</p>
          </div>
          <p className="text-zinc-400 text-base">
            ตรวจสอบชื่อและจำนวนเงินให้ถูกต้องก่อนชำระ
          </p>
        </div>
      </div>
      <div className="total-qr fixed bottom-0 left-0 w-full border-t border-stone-200 p-4">
        <div className="bg-blue-500 rounded-full h-14 content-center shadow-sm">
          <p className="text-center text-white font-semibold text-xl">
            <CountUp
              start={0}
              end={totalPrice}
              duration={1.25}
              separator=","
              prefix="฿"
              suffix=".00"
              preserveValue={true}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScanQRCodeContent;
