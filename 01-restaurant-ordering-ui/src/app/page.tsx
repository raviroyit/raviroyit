import { Suspense } from "react";
import { Header } from "./features/layout/components/Header";
import HeroBanner from "./features/home/components/HeroBanner";
import { MenuGrid } from "./features/menu/components/MenuGrid";
import { CategoryFilterBar } from "./features/menu/components/CategoryFilterBar";
import { Footer } from "./features/layout/components/Footer";
import { CartDrawer } from "./features/cart/components/CartDrawer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={<div className="h-16 w-full border-b bg-background" />}
      >
        <Header />
      </Suspense>
      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <HeroBanner />
        <Suspense
          fallback={<div className="mt-6 h-14 w-full border-y bg-background" />}
        >
          <CategoryFilterBar />
          <MenuGrid />
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
