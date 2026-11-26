"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Utensils,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, type OrderRecord } from "../context/CartContext";

const FREE_DELIVERY_THRESHOLD = 499;
const STANDARD_DELIVERY_FEE = 40;
const GST_RATE = 0.05;

export function CartDrawer() {
  const {
    items,
    totalCount,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    incrementByCartKey,
    decrementByCartKey,
    clearCart,
    addresses,
    selectedAddressId,
    placeOrder,
  } = useCart();

  const [placedOrder, setPlacedOrder] = useState<OrderRecord | null>(null);

  const activeAddress =
    addresses.find((a) => a.id === selectedAddressId) ?? addresses[0];

  const gstAmount = Math.round(subtotal * GST_RATE);
  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : STANDARD_DELIVERY_FEE;
  const grandTotal = subtotal + gstAmount + deliveryFee;
  const amountForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleClose = () => {
    setPlacedOrder(null);
    closeDrawer();
  };

  const handlePlaceOrder = () => {
    const created = placeOrder({
      subtotal,
      gstAmount,
      deliveryFee,
      grandTotal,
    });
    setPlacedOrder(created);
  };

  return (
    <Sheet
      open={isDrawerOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
        {/* Drawer Header */}
        <SheetHeader className="border-b px-6 py-4 text-left">
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <SheetTitle className="font-serif text-xl font-bold text-foreground">
                {placedOrder ? "Order Confirmed" : `Your Order (${totalCount})`}
              </SheetTitle>
            </div>

            {items.length > 0 && !placedOrder && (
              <button
                type="button"
                onClick={clearCart}
                aria-label="Clear all items from cart"
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
          <SheetDescription className="text-xs text-muted-foreground">
            Zaffran Kitchen • Boring Road, Patna
          </SheetDescription>
        </SheetHeader>

        {/* State 1: Order Confirmation Receipt */}
        {placedOrder ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <span className="mt-4 rounded-full bg-muted px-3 py-1 font-mono text-xs font-bold text-foreground">
              {placedOrder.id}
            </span>
            <h3 className="mt-2 font-serif text-2xl font-bold text-foreground">
              Shukriya! Order Received
            </h3>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Our chefs at Boring Road have started preparing your fresh handi
              order. Estimated delivery in{" "}
              <span className="font-semibold text-foreground">30–35 mins</span>.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <Button
                onClick={handleClose}
                className="rounded-full px-5 font-semibold"
              >
                <Link href="/account">View in My Orders</Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="rounded-full px-5 font-semibold"
              >
                Back to Menu
              </Button>
            </div>
          </div>
        ) : items.length === 0 ? (
          /* State 2: Empty Cart */
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Utensils className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-serif text-lg font-bold text-foreground">
              Your thali is empty
            </h3>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Explore our slow-cooked dum biryanis, charcoal kebabs, and fresh
              tandoor breads to start your order.
            </p>
            <Button
              type="button"
              onClick={handleClose}
              className="mt-6 rounded-full px-6 font-semibold"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          /* State 3: Active Cart Items + Address + Bill Summary */
          <>
            {/* Free Delivery Progress Banner */}
            <div className="border-b bg-primary/8 px-6 py-2.5 text-xs font-medium text-foreground">
              {amountForFreeDelivery === 0 ? (
                <span className="text-emerald-700 dark:text-emerald-400">
                  🎉 You unlocked <strong>FREE doorstep delivery</strong>!
                </span>
              ) : (
                <span>
                  Add{" "}
                  <strong className="tabular-nums">
                    ₹{amountForFreeDelivery}
                  </strong>{" "}
                  more for <strong>FREE delivery</strong>
                </span>
              )}
            </div>

            {/* Scrollable Line Items */}
            <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <div
                  key={item.cartKey}
                  className="flex items-center justify-between gap-3 rounded-2xl border bg-card p-3.5 shadow-2xs"
                >
                  <div className="flex items-start gap-3">
                    <span
                      role="img"
                      aria-label={item.dish.name}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted/70 text-2xl"
                    >
                      {item.dish.emoji}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {item.dish.name}
                      </h4>
                      <p className="mt-0.5 text-xs capitalize text-muted-foreground">
                        {item.portion.replace("-", " ")} • {item.spiceLevel}{" "}
                        spice
                      </p>
                      <p className="mt-1.5 text-sm font-bold text-foreground tabular-nums">
                        ₹{item.unitPrice * item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Quantity Stepper */}
                  <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-1.5 py-1">
                    <button
                      type="button"
                      onClick={() => decrementByCartKey(item.cartKey)}
                      aria-label={`Decrease quantity of ${item.dish.name}`}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-5 text-center text-xs font-bold text-foreground tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => incrementByCartKey(item.cartKey)}
                      aria-label={`Increase quantity of ${item.dish.name}`}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Delivery Address + Bill Summary + Place Order Footer */}
            <div className="space-y-3 border-t bg-card/90 px-6 py-4">
              {/* Active Delivery Address Strip */}
              {activeAddress && (
                <div className="flex items-start justify-between gap-2 rounded-xl border bg-muted/40 px-3 py-2 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <div>
                      <span className="font-semibold text-foreground">
                        Delivering to {activeAddress.label}
                      </span>
                      <p className="line-clamp-1 text-[11px] text-muted-foreground">
                        {activeAddress.fullAddress}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/account"
                    onClick={closeDrawer}
                    className="shrink-0 font-semibold text-primary hover:underline"
                  >
                    Change
                  </Link>
                </div>
              )}

              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Item Total</span>
                  <span className="tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (5%)</span>
                  <span className="tabular-nums">₹{gstAmount}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span className="tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        FREE
                      </span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-bold text-foreground">
                  <span>To Pay</span>
                  <span className="tabular-nums">₹{grandTotal}</span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full rounded-full py-5 text-sm font-semibold shadow-sm"
              >
                Place Order • ₹{grandTotal}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
