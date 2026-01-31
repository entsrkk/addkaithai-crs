import React, {  Suspense } from "react";
import ScanQRCodeContent from "./component/ScanQRCodeContent";

const ScanQRcodePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScanQRCodeContent />
    </Suspense>
  );
};

export default ScanQRcodePage;
