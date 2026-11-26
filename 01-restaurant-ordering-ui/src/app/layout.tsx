import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./features/cart/context/CartContext";
import { Header } from "./features/layout/components/Header";
import { Footer } from "./features/layout/components/Footer";
import { CartDrawer } from "./features/cart/components/CartDrawer";
import { Suspense } from "react";

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
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="flex min-h-screen flex-col bg-background text-foreground">
              <Suspense
                fallback={
                  <div className="h-16 w-full border-b bg-background" />
                }
              >
                <Header />
              </Suspense>

              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
