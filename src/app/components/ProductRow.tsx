"use client";
import React from "react";

interface ProductRowProps {
  product: {
    product_id: number;
    product_name: string;
    product_price: number;
    product_image?: string;
  };

  quantity: { [key: number]: number };
  handleIncrease: (productId: number) => void;
  handleDecrease: (productId: number) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  quantity,
  handleIncrease,
  handleDecrease,
}) => {
  const subTotalByID =
    product.product_price * (quantity[product.product_id] || 0);

  return (
    <tr key={product.product_id} className="border-0">
      <td className="pr-0">
        <div className="flex items-center gap-3">
          <div className="w-15 h-15">
            <img
              src={product.product_image || "/images/placeholder-image.png"}
              alt={product.product_name}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="font-semibold">
              ชื่อ: <span className="font-normal">{product.product_name}</span>
            </p>
            <p className="font-semibold">
              ราคา: <span className="font-normal">{product.product_price}</span>
            </p>
          </div>
        </div>
      </td>
      <td className="text-end px-0">
        <div className="join">
          <button
            className="btn join-item w-8 h-8.5"
            onClick={() => handleDecrease(product.product_id)}
          >
            -
          </button>
          <input
            className="input join-item w-10 h-8.5 p-0 border ring-0 border-gray-200 bg-white outline-0 text-center"
            value={quantity[product.product_id] || 0}
            readOnly
          />
          <button
            className="btn join-item w-8 h-8.5"
            onClick={() => handleIncrease(product.product_id)}
          >
            +
          </button>
        </div>
      </td>
      <td className="text-end pl-0">
        <p className="font-medium text-base">
          ฿{subTotalByID.toLocaleString("th-TH")}
        </p>
      </td>
    </tr>
  );
};

export default ProductRow;
