import React from "react";

const ProductSkeleton = () => {
    return (
        <tr className="border-0 animate-pulse">
            <td className="pr-0">
                <div className="flex items-center gap-3">
                    <div className="w-15 h-15 bg-gray-200 rounded-lg"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </td>
            <td className="text-end px-0">
                <div className="join flex justify-end">
                    <div className="w-9 h-9 bg-gray-200 rounded-l-lg"></div>
                    <div className="w-11 h-9 bg-gray-200 mx-1"></div>
                    <div className="w-9 h-9 bg-gray-200 rounded-r-lg"></div>
                </div>
            </td>
            <td className="text-end pl-0">
                <div className="h-5 w-12 bg-gray-200 rounded ml-auto"></div>
            </td>
        </tr>
    );
};

export default ProductSkeleton;
