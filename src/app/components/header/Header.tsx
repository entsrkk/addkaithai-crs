"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  const prevUrl = useRouter().back;
  const pageTitle: Record<string, string> = {
    "/calculate": "คิดเงิน",
    "/booking": "สั่งไก่",
    "/scan-qrcode": "QR Code",
  };

  const title = pageTitle[pathname] || "";

  return (
    <div className="grid grid-cols-[0.5fr_1fr_0.5fr] py-4 border-b border-stone-200 bg-white sticky top-0 z-50">
      <div className="content-center">
        <button
          onClick={() => prevUrl()}
          className="btn btn-link no-underline border-0 text-sm text-blue-500"
        >
          <svg
            className="h-10 w-10 fill-current rtl:rotate-180 "
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
          </svg>
        </button>
      </div>
      <div className="content-center text-center">
        <h2 className="text-xl font-semibold text-nowrap">{title}</h2>
      </div>
    </div>
  );
};

export default Header;
