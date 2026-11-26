"use client";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Minus, Plus, SearchX, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MENU_ITEMS, type MenuItem } from "../data/menu-items";
import DishDetailsModal from "./DishDetailsModal";
import { useCart } from "../../cart/context/CartContext";

export function MenuGrid() {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = (searchParams.get("q") ?? "").trim().toLowerCase();
  const selectedCategory = searchParams.get("category") ?? "all";
  const isPureVegOnly = searchParams.get("veg") === "true";

  const { addItem, decrementDishDefault, getDishTotalQuantity } = useCart();

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesVeg = !isPureVegOnly || item.isVeg;
      const matchesSearch =
        query === "" ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesVeg && matchesSearch;
    });
  }, [selectedCategory, isPureVegOnly, query]);

  const handleResetFilters = () => {
    router.replace(pathname, { scroll: false });
  };
  return (
    <section
      aria-label="Restaurant menu"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className=" text-2xl font-bold tracking-tight text-foreground">
          Signature Menu
        </h2>
        <span className="text-xs font-medium text-muted-foreground">
          <span className="text-xs font-medium text-muted-foreground">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "dish" : "dishes"} available
          </span>
        </span>
      </div>

      {/* Responsive 3-Column Bento Grid */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/60 px-6 py-14 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground/70" />
          <h3 className="mt-3 font-serif text-lg font-bold text-foreground">
            No matching dishes found
          </h3>
          <p className="mt-1 max-w-md text-xs text-muted-foreground sm:text-sm">
            Try clearing your search term, switching back to All categories, or
            turning off the Pure Veg filter.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="mt-4 rounded-full px-5"
          >
            Reset all filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const qty = getDishTotalQuantity(item.id);
            return (
              <article
                key={item.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border bg-card shadow-xs transition-shadow hover:shadow-md"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedDish(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedDish(item);
                    }
                  }}
                  aria-label={`View details and customize ${item.name}`}
                  className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                >
                  {/* Dish Visual Placeholder */}
                  <div className="relative flex aspect-[16/10] w-full items-center justify-center bg-muted/50 text-6xl">
                    {item.bestseller && (
                      <Badge className="absolute top-3 left-3 rounded-full bg-amber-500/95 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-950 shadow-xs hover:bg-amber-500">
                        Bestseller
                      </Badge>
                    )}
                    <span role="img" aria-label={item.name}>
                      {item.emoji}
                    </span>
                  </div>

                  {/* Dish Text Content */}
                  <div className="space-y-2 p-5">
                    {/* Metadata Row: FSSAI Veg/Non-Veg Mark + Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          aria-label={
                            item.isVeg ? "Vegetarian" : "Non-vegetarian"
                          }
                          title={item.isVeg ? "Pure Veg" : "Non-Veg"}
                          className={`inline-flex h-4 w-4 items-center justify-center rounded-[3px] border ${
                            item.isVeg
                              ? "border-emerald-600 dark:border-emerald-500"
                              : "border-red-600 dark:border-red-500"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              item.isVeg
                                ? "bg-emerald-600 dark:bg-emerald-500"
                                : "bg-red-600 dark:bg-red-500"
                            }`}
                          />
                        </span>
                        <span className="text-[11px] font-medium text-muted-foreground">
                          {item.isVeg ? "Veg" : "Non-Veg"}
                        </span>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-700 tabular-nums dark:text-amber-400">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold leading-snug text-foreground">
                      {item.name}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Slot */}
                <div className="flex items-center justify-between border-t border-border/50 px-5 py-3.5">
                  <span className="text-base font-bold text-foreground tabular-nums">
                    ₹{item.price}
                  </span>
                  {qty === 0 ? (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addItem({ dish: item })}
                      aria-label={`Add ${item.name} to cart`}
                      className="h-9 rounded-full px-4 text-xs font-semibold shadow-xs"
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      Add
                    </Button>
                  ) : (
                    <div
                      role="group"
                      aria-label={`Quantity controls for ${item.name}`}
                      className="inline-flex h-9 items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-1"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => decrementDishDefault(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="h-7 w-7 rounded-full text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>

                      <span
                        aria-live="polite"
                        className="min-w-[22px] text-center text-xs font-bold text-primary tabular-nums"
                      >
                        {qty}
                      </span>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => addItem({ dish: item })}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="h-7 w-7 rounded-full text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <DishDetailsModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToOrder={(selection) => addItem(selection)}
      />
    </section>
  );
}
