import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ร้านแอ๊ดไก่ไทย - CRS",
  description: "ระบบของร้านสำหรับร้านแอ๊ดไก่ไทย",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" data-theme="light">
      <body className={`${notoSansThai.variable} antialiased`}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
