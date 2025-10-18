"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();

  const pageTitle: Record<string, string> = {
    "/calculate": "คิดเงิน",
    "/booking": "สั่งไก่",
  };

  const title = pageTitle[pathname] || "";

  return (
    <div className="grid grid-cols-[0.5fr_1fr_0.5fr] py-4 border-b border-stone-200 bg-white sticky top-0 z-50">
      <div className="content-center">
        <Link
          href="/"
          className="btn btn-link no-underline border-0 text-base text-stone-600"
        >
          ย้อนกลับ
        </Link>
      </div>
      <div className="content-center text-center">
        <h2 className="text-xl font-semibold text-nowrap">{title}</h2>
      </div>
    </div>
  );
};

export default Header;
