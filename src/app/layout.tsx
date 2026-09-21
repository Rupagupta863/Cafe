import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import "./globals.css";
import { CAFE_NAME, CAFE_TAGLINE } from "@/constants";
import { Toaster } from "react-hot-toast";
import { OfferPopup } from "@/components/ui/OfferPopup";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${CAFE_NAME} | ${CAFE_TAGLINE}`,
  description: "A premium cafe experience offering artisanal coffee, fresh pastries, and a warm atmosphere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${inter.variable} font-fredoka antialiased text-coffee-dark bg-white m-0 p-0`}>
        <Toaster position="bottom-right" />
        <OfferPopup />
        {children}
      </body>
    </html>
  );
}
