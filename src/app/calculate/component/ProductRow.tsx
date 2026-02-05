"use client";
import React, { memo } from "react";
import CountUp from "react-countup";
import Image from "next/image";
import { Product } from "@/types";

interface ProductRowProps {
  product: Product;
  count: number;
  handleIncrease: (productId: number) => void;
  handleDecrease: (productId: number) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  count,
  handleIncrease,
  handleDecrease,
}) => {
  const subTotalByID = product.product_price * count;

  return (
    <tr key={product.product_id} className="border-0">
      <td className="pr-0">
        <div className="flex items-center gap-3">
          <div className="w-15 h-15 relative">
            <Image
              src={product.product_image || "/images/product_image/placeholder-image.png"}
              alt={product.product_name}
              width={120}
              height={120}
              className="rounded-lg object-cover w-15 h-15"
            />
          </div>
          <div>
            <p className="font-semibold">
              ชื่อ: <span className="font-normal">{product.product_name}</span>
            </p>
            <p className="font-semibold">
              ราคา: <span className="font-normal">฿{product.product_price}</span>
            </p>
          </div>
        </div>
      </td>
      <td className="text-end px-0">
        <div className="join">
          <button
            className="btn join-item w-9 h-9 text-lg"
            onClick={() => handleDecrease(product.product_id)}
          >
            -
          </button>
          <input
            className="input join-item w-11 h-9 p-0 border ring-0 border-gray-200 bg-white outline-0 text-center text-base"
            value={count}
            readOnly
          />
          <button
            className="btn join-item w-9 h-9 text-lg"
            onClick={() => handleIncrease(product.product_id)}
          >
            +
          </button>
        </div>
      </td>
      <td className="text-end pl-0">
        <p className="font-medium text-base">
          <CountUp
            start={0}
            end={subTotalByID}
            duration={1.25}
            separator=","
            prefix="฿"
            preserveValue={true}
          />
        </p>
      </td>
    </tr>
  );
};

export default memo(ProductRow);
