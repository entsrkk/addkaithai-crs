import React from "react";

const Homepage = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-28">
      <h1 className="text-center text-5xl leading-16 font-bold">
        ร้านแอ๊ด
        <br />
        ไก่ต้มน้ำปลา
      </h1>
      <div className="flex flex-col gap-11 mt-20 px-4 w-full">
        <a href="/booking" className="btn btn-ghost btn-xl rounded-full h-26 border-0 bg-linear-to-r from-blue-500 to-sky-400 text-white">
          คิดเงิน
        </a>
        <a className="btn btn-ghost btn-xl rounded-full h-26 border-0 bg-linear-to-r from-blue-500 to-sky-400 text-white">
          สั่งไก่
        </a>
      </div>
    </div>
  );
};

export default Homepage;
