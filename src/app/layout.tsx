import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "@mantine/core/styles.css";
import "./globals.css";
import { MantineProvider, createTheme } from "@mantine/core";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: `ร้านแอ๊ดไก่ไทย`,
  description: "ระบบของร้านสำหรับร้านแอ๊ดไก่ไทย CRS",
};

const theme = createTheme({
  fontFamily: 'inherit',
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" data-theme="light">
      <body className={`${notoSansThai.variable} antialiased`}>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
