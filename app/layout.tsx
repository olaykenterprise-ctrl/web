import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OlaYK Enterprise – Premium Products for a Better You",
  description: "Discover top-quality products for your home, lifestyle and everyday needs — all in one trusted store.",
};

import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import FacebookPixel from "@/components/FacebookPixel";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="antialiased"
    >
      <body className="flex flex-col min-h-screen bg-white">
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <div className="flex-grow">
          {children}
        </div>
        <WhatsAppButton />
      </body>
    </html>
  );
}
