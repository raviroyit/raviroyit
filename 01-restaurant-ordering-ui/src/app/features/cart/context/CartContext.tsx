"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { MENU_ITEMS, type MenuItem } from "../../menu/data/menu-items";
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

export interface OrderRecord {
  id: string;
  placedAt: string;
  status: "Preparing in Kitchen" | "Delivered";
  items: CartItem[];
  subtotal: number;
  gstAmount: number;
  deliveryFee: number;
  grandTotal: number;
  deliveryAddressLabel: string;
}

export interface SavedAddress {
  id: string;
  label: "Home" | "Work" | "Other";
  recipientName: string;
  phone: string;
  fullAddress: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  preferPureVeg: boolean;
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
  // User Account & Orders state
  profile: UserProfile;
  updateProfile: (updated: UserProfile) => void;
  addresses: SavedAddress[];
  selectedAddressId: string;
  selectAddress: (id: string) => void;
  addAddress: (address: Omit<SavedAddress, "id">) => void;
  orders: OrderRecord[];
  placeOrder: (summary: {
    subtotal: number;
    gstAmount: number;
    deliveryFee: number;
    grandTotal: number;
  }) => OrderRecord;
  reorderItems: (orderId: string) => void;
}

const STORAGE_KEY = "zaffran_kitchen_state_v1";

const DEFAULT_PROFILE: UserProfile = {
  name: "Ravi Roy",
  phone: "+91 98350 41290",
  email: "ravi.patna@example.com",
  preferPureVeg: false,
};

const DEFAULT_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-home-1",
    label: "Home",
    recipientName: "Ravi Roy",
    phone: "+91 98350 41290",
    fullAddress: "Flat 302, Shanti Enclave, Boring Road Crossing, Patna 800001",
  },
  {
    id: "addr-work-2",
    label: "Work",
    recipientName: "Ravi Roy",
    phone: "+91 98350 41290",
    fullAddress:
      "4th Floor, Fraser Road Tech Hub, Near Dakbunglow, Patna 800001",
  },
];

function createInitialSampleOrder(): OrderRecord {
  const sampleDishA = MENU_ITEMS[0];
  const sampleDishB = MENU_ITEMS[1] ?? MENU_ITEMS[0];

  const sampleItems: CartItem[] = [
    {
      cartKey: `${sampleDishA.id}::regular::medium`,
      dish: sampleDishA,
      portion: "regular",
      spiceLevel: "medium",
      unitPrice: sampleDishA.price,
      quantity: 1,
    },
    {
      cartKey: `${sampleDishB.id}::regular::mild`,
      dish: sampleDishB,
      portion: "regular",
      spiceLevel: "mild",
      unitPrice: sampleDishB.price,
      quantity: 2,
    },
  ];

  const subtotal = sampleItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const gstAmount = Math.round(subtotal * 0.05);
  const deliveryFee = subtotal >= 499 ? 0 : 40;

  return {
    id: "ZK-2026-8419",
    placedAt: "24 Nov 2026, 8:15 PM",
    status: "Delivered",
    items: sampleItems,
    subtotal,
    gstAmount,
    deliveryFee,
    grandTotal: subtotal + gstAmount + deliveryFee,
    deliveryAddressLabel: "Home • Boring Road Crossing, Patna",
  };
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [addresses, setAddresses] = useState<SavedAddress[]>(DEFAULT_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    DEFAULT_ADDRESSES[0].id,
  );
  const [orders, setOrders] = useState<OrderRecord[]>(() => [
    createInitialSampleOrder(),
  ]);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Hydrate persisted state cleanly on client mount
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.items)) setItems(parsed.items);
          if (parsed.profile) setProfile(parsed.profile);
          if (Array.isArray(parsed.addresses) && parsed.addresses.length > 0) {
            setAddresses(parsed.addresses);
          }
          if (typeof parsed.selectedAddressId === "string") {
            setSelectedAddressId(parsed.selectedAddressId);
          }
          if (Array.isArray(parsed.orders) && parsed.orders.length > 0) {
            setOrders(parsed.orders);
          }
        }
      } catch {
        // Ignore malformed localStorage
      } finally {
        setHasHydrated(true);
      }
    });
  }, []);

  // Persist changes back to localStorage after initial hydration
  useEffect(() => {
    if (!hasHydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items,
          profile,
          addresses,
          selectedAddressId,
          orders,
        }),
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [hasHydrated, items, profile, addresses, selectedAddressId, orders]);

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

  const updateProfile = (updated: UserProfile) => {
    setProfile(updated);
  };

  const selectAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  const addAddress = (newAddr: Omit<SavedAddress, "id">) => {
    const created: SavedAddress = {
      ...newAddr,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => [created, ...prev]);
    setSelectedAddressId(created.id);
  };

  const placeOrder = (summary: {
    subtotal: number;
    gstAmount: number;
    deliveryFee: number;
    grandTotal: number;
  }): OrderRecord => {
    const activeAddress =
      addresses.find((a) => a.id === selectedAddressId) ?? addresses[0];

    const formattedTime = new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date());

    const newOrder: OrderRecord = {
      id: `ZK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      placedAt: formattedTime,
      status: "Preparing in Kitchen",
      items: [...items],
      subtotal: summary.subtotal,
      gstAmount: summary.gstAmount,
      deliveryFee: summary.deliveryFee,
      grandTotal: summary.grandTotal,
      deliveryAddressLabel: activeAddress
        ? `${activeAddress.label} • ${activeAddress.fullAddress}`
        : "Boring Road, Patna",
    };

    setOrders((prev) => [newOrder, ...prev]);
    setItems([]);
    return newOrder;
  };

  const reorderItems = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;
    setItems(target.items.map((item) => ({ ...item })));
    setIsDrawerOpen(true);
  };

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
        profile,
        updateProfile,
        addresses,
        selectedAddressId,
        selectAddress,
        addAddress,
        orders,
        placeOrder,
        reorderItems,
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
