"use client";

import { useState } from "react";
import { Flame, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MenuItem } from "../data/menu-items";

export type PortionSize = "regular" | "handi-full";
export type SpiceLevel = "mild" | "medium" | "fiery";

export interface CustomizedDishSelection {
  dish: MenuItem;
  portion: PortionSize;
  spiceLevel: SpiceLevel;
  unitPrice: number;
}

const PORTION_OPTIONS: {
  id: PortionSize;
  label: string;
  serves: string;
  extraPrice: number;
}[] = [
  { id: "regular", label: "Regular", serves: "Serves 1", extraPrice: 0 },
  {
    id: "handi-full",
    label: "Handi Full",
    serves: "Serves 2–3",
    extraPrice: 140,
  },
];

const SPICE_LEVELS: { id: SpiceLevel; label: string }[] = [
  { id: "mild", label: "Mild" },
  { id: "medium", label: "Medium" },
  { id: "fiery", label: "Fiery" },
];
interface DishDetailsModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToOrder: (selection: CustomizedDishSelection) => void;
}
export default function DishDetailsModal({
  dish,
  onClose,
  onAddToOrder,
}: DishDetailsModalProps) {
  const [portion, setPortion] = useState<PortionSize>("regular");
  const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>("medium");

  const activePortion =
    PORTION_OPTIONS.find((opt) => opt.id === portion) ?? PORTION_OPTIONS[0];
  const totalPrice = dish ? dish.price + activePortion.extraPrice : 0;

  const handleConfirmOrder = () => {
    if (!dish) return;
    onAddToOrder({
      dish,
      portion,
      spiceLevel,
      unitPrice: totalPrice,
    });
    setPortion("regular");
    setSpiceLevel("medium");
    onClose();
  };
  return (
    <Dialog
      open={dish !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setPortion("regular");
          setSpiceLevel("medium");
          onClose();
        }
      }}
    >
      <DialogContent className="overflow-hidden rounded-3xl p-0 sm:max-w-lg">
        {dish && (
          <div key={dish.id}>
            {/* Top Visual Banner */}
            <div className="relative flex aspect-[16/9] w-full items-center justify-center bg-muted/60 text-7xl">
              {dish.bestseller && (
                <Badge className="absolute top-4 left-4 rounded-full bg-amber-500/95 px-3 py-0.5 text-xs font-semibold text-zinc-950">
                  Bestseller
                </Badge>
              )}
              <span role="img" aria-label={dish.name}>
                {dish.emoji}
              </span>
            </div>

            {/* Dish Info & Customization Body */}
            <div className="space-y-5 p-6">
              <DialogHeader className="space-y-2 text-left">
                <div className="flex items-center justify-between">
                  {/* FSSAI Dietary Indicator */}
                  <div className="flex items-center gap-1.5">
                    <span
                      aria-label={dish.isVeg ? "Vegetarian" : "Non-vegetarian"}
                      className={`inline-flex h-4 w-4 items-center justify-center rounded-[3px] border ${
                        dish.isVeg
                          ? "border-emerald-600 dark:border-emerald-500"
                          : "border-red-600 dark:border-red-500"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          dish.isVeg
                            ? "bg-emerald-600 dark:bg-emerald-500"
                            : "bg-red-600 dark:bg-red-500"
                        }`}
                      />
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {dish.isVeg ? "Pure Veg" : "Non-Veg"}
                    </span>
                  </div>

                  {/* Rating Pill */}
                  <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-700 tabular-nums dark:text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span>{dish.rating.toFixed(1)}</span>
                  </div>
                </div>

                <DialogTitle className=" text-2xl font-bold text-foreground">
                  {dish.name}
                </DialogTitle>

                <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                  {dish.description}
                </DialogDescription>
              </DialogHeader>

              {/* Portion Size Selector */}
              <div className="space-y-2">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Portion Size
                </span>
                <div
                  role="radiogroup"
                  aria-label="Choose portion size"
                  className="grid grid-cols-2 gap-3"
                >
                  {PORTION_OPTIONS.map((option) => {
                    const isSelected = portion === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setPortion(option.id)}
                        className={`flex flex-col items-start rounded-2xl border p-3.5 text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-xs"
                            : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">
                            {option.label}
                          </span>
                          <span className="text-xs font-semibold text-primary tabular-nums">
                            {option.extraPrice === 0
                              ? "Included"
                              : `+₹${option.extraPrice}`}
                          </span>
                        </div>
                        <span className="mt-0.5 text-xs text-muted-foreground">
                          {option.serves}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Spice Level Selector */}
              <div className="space-y-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Flame className="h-3.5 w-3.5 text-primary" />
                  Spice Preference
                </span>
                <div
                  role="group"
                  aria-label="Choose spice level"
                  className="flex items-center gap-2"
                >
                  {SPICE_LEVELS.map((level) => {
                    const isSelected = spiceLevel === level.id;
                    return (
                      <Button
                        key={level.id}
                        type="button"
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        aria-pressed={isSelected}
                        onClick={() => setSpiceLevel(level.id)}
                        className="flex-1 rounded-full text-xs font-semibold"
                      >
                        {level.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Footer: Dynamic Total Price + Action Button */}
              <DialogFooter className="flex-row items-center justify-between border-t pt-4 sm:justify-between">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">
                    Total Price
                  </span>
                  <span className="text-xl font-bold text-foreground tabular-nums">
                    ₹{totalPrice}
                  </span>
                </div>

                <Button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="rounded-full px-6 font-semibold shadow-sm"
                >
                  Add to Order • ₹{totalPrice}
                </Button>
              </DialogFooter>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
