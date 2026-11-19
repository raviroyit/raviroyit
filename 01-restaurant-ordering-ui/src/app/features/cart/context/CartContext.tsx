"use client";

import React, { createContext, useContext, useState } from "react";
import type { MenuItem } from "../../menu/data/menu-items";
import type {
  PortionSize,
  SpiceLevel,
} from "../../menu/components/DishDetailsModal";

export interface CartItem {
  cartKey: string; // e.g., "paneer-tikka-lababdar::regular::medium"
  dish: MenuItem;
  portion: PortionSize;
  spiceLevel: SpiceLevel;
  unitPrice: number;
  quantity: number;
}

interface AddToCartPayload {
  dish: MenuItem;
  portion?: PortionSize;
  spiceLevel?: SpiceLevel;
  unitPrice?: number;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (payload: AddToCartPayload) => void;
  incrementByCartKey: (cartKey: string) => void;
  decrementByCartKey: (cartKey: string) => void;
  decrementDishDefault: (dishId: string) => void;
  getDishTotalQuantity: (dishId: string) => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addItem = ({
    dish,
    portion = "regular",
    spiceLevel = "medium",
    unitPrice = dish.price,
  }: AddToCartPayload) => {
    const cartKey = `${dish.id}::${portion}::${spiceLevel}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartKey === cartKey);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }

      return [
        ...prev,
        {
          cartKey,
          dish,
          portion,
          spiceLevel,
          unitPrice,
          quantity: 1,
        },
      ];
    });
  };

  const incrementByCartKey = (cartKey: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decrementByCartKey = (cartKey: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Used by MenuGrid's quick "-" stepper on a dish card
  const decrementDishDefault = (dishId: string) => {
    setItems((prev) => {
      const targetIndex = [...prev]
        .reverse()
        .findIndex((item) => item.dish.id === dishId);

      if (targetIndex === -1) return prev;

      const actualIndex = prev.length - 1 - targetIndex;
      const targetItem = prev[actualIndex];

      if (targetItem.quantity <= 1) {
        return prev.filter((_, idx) => idx !== actualIndex);
      }

      const updated = [...prev];
      updated[actualIndex] = {
        ...targetItem,
        quantity: targetItem.quantity - 1,
      };
      return updated;
    });
  };

  const getDishTotalQuantity = (dishId: string) => {
    return items
      .filter((item) => item.dish.id === dishId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addItem,
        incrementByCartKey,
        decrementByCartKey,
        decrementDishDefault,
        getDishTotalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
