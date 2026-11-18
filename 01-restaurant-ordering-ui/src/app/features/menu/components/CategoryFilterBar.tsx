"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface MenuCategory {
  slug: string;
  label: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { slug: "all", label: "All" },
  { slug: "starters", label: "Starters" },
  { slug: "dum-biryani", label: "Dum Biryani" },
  { slug: "curries", label: "Curries" },
  { slug: "tandoor-breads", label: "Tandoor Breads" },
  { slug: "desserts", label: "Desserts" },
];

export function CategoryFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "all";
  const isPureVeg = searchParams.get("veg") === "true";

  const updateUrlParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const handleCategoryClick = (slug: string) => {
    updateUrlParam("category", slug === "all" ? null : slug);
  };

  const handleToggleVeg = () => {
    updateUrlParam("veg", isPureVeg ? null : "true");
  };

  return (
    <div
      id="menu-section"
      className="sticky top-16 z-30 mt-6 scroll-mt-20 border-y bg-background/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        {/* Horizontal Scrollable Category Pills */}
        <nav
          aria-label="Menu categories"
          className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:pb-0"
        >
          {MENU_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category.slug;
            return (
              <Button
                key={category.slug}
                type="button"
                size="sm"
                variant={isSelected ? "default" : "outline"}
                aria-pressed={isSelected}
                onClick={() => handleCategoryClick(category.slug)}
                className="shrink-0 rounded-full px-4 text-xs font-semibold transition-all"
              >
                {category.label}
              </Button>
            );
          })}
        </nav>

        {/* Right Side: Interactive Pure Veg Switch */}
        <div className="flex items-center justify-between border-t pt-2 sm:justify-end sm:border-t-0 sm:pt-0">
          <button
            type="button"
            role="switch"
            aria-checked={isPureVeg}
            aria-label="Filter Pure Veg dishes only"
            onClick={handleToggleVeg}
            className="inline-flex items-center gap-2.5 rounded-full px-2 py-1 text-left outline-none transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-emerald-600">
              <Leaf className="h-3 w-3 text-emerald-600" />
            </span>
            <span className="text-xs font-semibold text-foreground">
              Pure Veg
            </span>
            {/* Custom Accessible Pill Track */}
            <span
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ${
                isPureVeg ? "bg-emerald-600" : "bg-muted-foreground/30"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition-transform duration-200 ${
                  isPureVeg ? "translate-x-4.5" : "translate-x-1"
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
