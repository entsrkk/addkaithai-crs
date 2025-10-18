import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ร้านแอ๊ดไก่ไทย - POS",
  description: "ระบบของร้านสำหรับร้านแอ๊ดไก่ไทย",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={`${notoSansThai.variable} antialiased px-4 py-2 h-lvh`}>
        {children}
      </body>
    </html>
  );
}
