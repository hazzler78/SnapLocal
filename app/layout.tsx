import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SharedNav from "@/components/shared-nav";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnapLocal",
  description: "AI one-click website builder for local businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <SharedNav />
        {children}
      </body>
    </html>
  );
}
