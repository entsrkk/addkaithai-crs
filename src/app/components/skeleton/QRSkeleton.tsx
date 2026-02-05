import React from "react";

const QRSkeleton = () => {
    return (
        <div className="flex flex-col items-center animate-pulse">
            <div className="w-36 h-12 bg-gray-200 rounded-md mb-2"></div>

            <div className="w-56 h-56 bg-gray-200 rounded-lg my-4"></div>

            <div className="flex flex-col items-center space-y-3 mt-2 w-full">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>

                <div className="flex flex-col items-center space-y-2">
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                    <div className="h-5 w-40 bg-gray-200 rounded"></div>
                </div>
                
                <div className="h-4 w-64 bg-gray-200 rounded mt-2"></div>
            </div>
        </div>
    );
};

export default QRSkeleton;
