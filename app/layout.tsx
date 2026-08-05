import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OlaYK Enterprise – Powerbanks, Cables & Accessories",
  description: "Your one-stop shop for premium powerbanks, cables, and mobile accessories.",
};

import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-grow">
          {children}
        </div>
        <WhatsAppButton />
      </body>
    </html>
  );
}
