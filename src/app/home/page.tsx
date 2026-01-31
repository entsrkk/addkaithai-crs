import React from "react";
import Link from "next/link";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center pt-16 h-dvh">
      <h1 className="font-extrabold text-5xl text-center leading-16">
        ร้านแอ๊ด <br /> ไก่ต้มน้ำปลา
      </h1>
      <div className="flex flex-col gap-12 mt-20 px-4 w-full">
        <Link href="/calculate" className="btn btn-ghost btn-xl rounded-full h-26 border0 bg-linear-to-r from-blue-600 to-sky-500 text-white shadow-md">
          คิดเงิน
        </Link>
        <Link href="/booking" className="btn btn-ghost btn-xl rounded-full h-26 border-0 bg-linear-to-r from-blue-600 to-sky-500 text-white shadow-md">
          สั่งไก่
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
