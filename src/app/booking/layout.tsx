import React from "react";
import Header from "../components/header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="h-[calc(100dvh-64px)]">
        {children}
      </div>
    </div>
  );
}
