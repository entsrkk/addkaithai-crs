"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductRow from "../components/ProductRow";
import { get } from "http";

interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
  product_image?: string;
}

const Calculatepage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<{ [key: number]: number }>({});
  const [getMoney, setGetMoney] = useState<number>(0);

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

    const handleIncrease = (productId: number) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleDecrease = (productId: number) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }));
  };

  const total = products.reduce((total, product) => {
    const productQuantity = quantity[product.product_id] || 0;
    return total + product.product_price * productQuantity;
  }, 0);

  const customerChange = Math.max(getMoney - total, 0);

  const reset = () => {
    setQuantity({});
    setGetMoney(0);
  }

  return (
    <div>
      <div className="h-fit overflow-y-scroll border-b border-gray-200 shadow-inset-bottom-sm">
        <table className="table table-zebra">
          <thead>
            <tr className="border-b-0 text-base">
              <th className="pr-0 pb-0 text-black">รายการ</th>
              <th className="pb-0 px-0 font-medium"></th>
              <th className="w-[76px] pb-0 pl-0 text-end text-black">ราคา</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.product_id}
                product={product}
                quantity={quantity}
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="w-full p-4 border-b border-gray-200">
          <input
            type="number"
            inputMode="numeric"
            className="input rounded-lg w-full h-11 border-gray-300 outline-0 ring-0 focus:border-gray-400 duration-300 ease-in-out"
            placeholder="รับเงินมา"
            value={getMoney === 0 ? "" : getMoney}
            onChange={(e) => setGetMoney(Number(e.target.value))}
            disabled={total === 0}
          />
        </div>
        <div className="w-full p-4 border-b border-gray-200 space-y-2">
          <div className="flex justify-between">
            <p className="font-bold text-lg">ยอดรวม</p>
            <p className="font-bold text-lg">
              ฿{total.toLocaleString("th-TH")}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-base">เงินลูกค้า</p>
            <p className="font-semibold text-base">
              ฿{getMoney.toLocaleString("th-TH")}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-base">เงินทอน</p>
            <p className="font-semibold text-base">
              ฿{total == 0 ? 0 : customerChange.toLocaleString("th-TH")}
            </p>
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
          <button className="btn btn-ghost btn-lg w-20 rounded-full border-0 bg-blue-100 text-blue-500" onClick={reset}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculatepage;
