"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  product_image?: string;
}

const Calculatepage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/product.json");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="h-96 overflow-y-scroll border-b border-gray-200 shadow-inset-bottom-sm">
        <table className="table table-zebra">
          <thead>
            <tr className="border-b-0 text-base">
              <th className="pb-0 text-black">รายการ</th>
              <th className="pb-0 font-medium"></th>
              <th className="pb-0 text-end text-black">ราคา</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-0">
                <th>
                  <div className="flex items-center gap-3">
                    <div className="w-15 h-15">
                      <img
                        src={
                          product.product_image ||
                          "/images/placeholder-image.png"
                        }
                        alt={product.product_name}
                        className="rounded-lg object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">
                        ชื่อ:{" "}
                        <span className="font-normal">
                          {product.product_name}
                        </span>
                      </p>
                      <p className="font-semibold">
                        ราคา:{" "}
                        <span className="font-normal">
                          {product.product_price}
                        </span>
                      </p>
                    </div>
                  </div>
                </th>
                <td className="text-end px-0">
                  <div className="join">
                    <button className="btn join-item w-8 h-8.5">-</button>
                    <input
                      className="input join-item w-10 h-8.5 p-0 border-gray-200 text-center"
                      value={20}
                      readOnly
                    />
                    <button className="btn join-item w-8 h-8.5">+</button>
                  </div>
                </td>
                <td className="text-end">
                  <p className="font-medium text-base">฿170</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="w-full p-4 border-b border-gray-200">
          <input
            type="number"
            className="input rounded-lg w-full h-11"
            placeholder="รับเงินมา"
          />
        </div>
        <div className="w-full p-4 border-b border-gray-200 space-y-1">
          <div className="flex justify-between">
            <p className="font-bold text-lg">ยอดรวม</p>
            <p className="font-bold text-lg">฿3,400</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-base">เงินลูกค้า</p>
            <p className="font-semibold text-base">฿4,000</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-base">เงินทอน</p>
            <p className="font-semibold text-base">฿600</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between space-x-2 py-2 px-4">
        <div className="w-full">
          <Link
            href="/"
            className="btn btn-ghost btn-lg w-full rounded-full border0 bg-blue-500 text-white"
          >
            สแกน QR Code
          </Link>
        </div>
        <div>
          <button className="btn btn-ghost btn-lg w-20 rounded-full border0 bg-blue-100 text-blue-500">
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculatepage;
