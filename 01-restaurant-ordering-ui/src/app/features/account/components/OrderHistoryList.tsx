"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Clock, MapPin, Receipt, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../../cart/context/CartContext";

export function OrderHistoryList() {
  const { orders, reorderItems } = useCart();

  return (
    <section
      aria-labelledby="orders-heading"
      className="rounded-2xl border bg-card p-6 shadow-2xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Receipt className="h-5 w-5" />
          </span>
          <div>
            <h2 id="orders-heading" className="text-base font-bold">
              Past Orders ({orders.length})
            </h2>
            <p className="text-xs text-muted-foreground">
              Review itemized bills or reorder your favorite customizations in
              one click
            </p>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            No orders placed yet.
          </p>
          <Button size="sm" className="mt-4 rounded-full px-5">
            <Link href="/">Explore Menu</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {orders.map((order) => {
            const isPreparing = order.status === "Preparing in Kitchen";

            return (
              <article
                key={order.id}
                className="rounded-2xl border bg-background p-4 transition-colors hover:border-muted-foreground/35 sm:p-5"
              >
                {/* Order Top Row: ID, Timestamp & Status Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold tracking-tight text-foreground sm:text-sm">
                        {order.id}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        • {order.placedAt}
                      </span>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="line-clamp-1">
                        {order.deliveryAddressLabel}
                      </span>
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      isPreparing
                        ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                        : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                    }`}
                  >
                    {isPreparing ? (
                      <Clock className="h-3.5 w-3.5" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    )}
                    <span>{order.status}</span>
                  </span>
                </div>

                {/* Itemized Dishes List */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {order.items.map((item) => (
                    <span
                      key={item.cartKey}
                      className="inline-flex items-center gap-1.5 rounded-xl border bg-muted/45 px-3 py-1.5 text-xs text-foreground"
                    >
                      <span aria-hidden="true">{item.dish.emoji}</span>
                      <span className="font-semibold">
                        {item.quantity}× {item.dish.name}
                      </span>
                      <span className="capitalize text-muted-foreground">
                        ({item.portion.replace("-", " ")}, {item.spiceLevel})
                      </span>
                    </span>
                  ))}
                </div>

                {/* Bottom Row: Total Paid & Reorder CTA */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                  <div className="text-xs text-muted-foreground">
                    <span>Paid: </span>
                    <strong className="text-sm font-bold text-foreground tabular-nums">
                      ₹{order.grandTotal}
                    </strong>
                    <span className="ml-1.5 tabular-nums">
                      (incl. ₹{order.gstAmount} GST
                      {order.deliveryFee === 0
                        ? " • Free Delivery"
                        : ` • ₹${order.deliveryFee} Delivery`}
                      )
                    </span>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    onClick={() => reorderItems(order.id)}
                    className="gap-1.5 rounded-full px-4 text-xs font-semibold"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reorder</span>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
