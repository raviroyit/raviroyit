import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./features/cart/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

// Configure Sans-serif for body & UI interface
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Zaffran Kitchen | Royal Dum & Tandoor, Patna",
  description: "Authentic, freshly crafted Dum Biryani & Tandoor delicacies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
