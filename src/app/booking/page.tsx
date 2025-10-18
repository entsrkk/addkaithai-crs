import Link from "next/link";
import React from "react";

const Bookingpage = () => {
  return (
    <div className="grid grid-cols-3 py-4 ">
      <div>
        <Link
          href="/"
          className="btn btn-link no-underline border-0 text-sm text-stone-700"
        >
          Back
        </Link>
      </div>
      <div className="content-center text-center">
        <h2 className="text-base">Booking Page</h2>
      </div>
    </div>
  );
};

export default Bookingpage;
