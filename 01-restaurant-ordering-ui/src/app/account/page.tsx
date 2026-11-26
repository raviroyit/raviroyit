"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Leaf,
  MapPin,
  Pencil,
  Plus,
  ShoppingBag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useCart,
  type SavedAddress,
} from "../features/cart/context/CartContext";
import { CartDrawer } from "../features/cart/components/CartDrawer";
import { OrderHistoryList } from "../features/account/components/OrderHistoryList";
export default function AccountPage() {
  const {
    totalCount,
    openDrawer,
    profile,
    updateProfile,
    addresses,
    selectedAddressId,
    selectAddress,
    addAddress,
  } = useCart();

  // Inline profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [draftProfile, setDraftProfile] = useState(profile);

  // Inline new address form state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newLabel, setNewLabel] = useState<SavedAddress["label"]>("Home");
  const [newRecipient, setNewRecipient] = useState(profile.name);
  const [newPhone, setNewPhone] = useState(profile.phone);
  const [newStreet, setNewStreet] = useState("");

  const handleStartEditProfile = () => {
    setDraftProfile(profile);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftProfile.name.trim()) return;
    updateProfile(draftProfile);
    setIsEditingProfile(false);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;

    addAddress({
      label: newLabel,
      recipientName: newRecipient.trim() || profile.name,
      phone: newPhone.trim() || profile.phone,
      fullAddress: newStreet.trim(),
    });

    setNewStreet("");
    setShowAddAddress(false);
  };

  return (
    <div>
      {/* Main Content */}
      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        {/* Page Heading */}
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
            My Account &amp; Orders
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Manage your Patna delivery addresses, dietary preferences, and past
            handi orders.
          </p>
        </div>

        {/* Top 2-Column Grid: Profile Card + Saved Addresses */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Column 1: Profile & Preferences (5 cols) */}
          <section
            aria-labelledby="profile-heading"
            className="rounded-2xl border bg-card p-6 shadow-2xs lg:col-span-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <User className="h-5 w-5" />
                </span>
                <div>
                  <h2 id="profile-heading" className="text-base font-bold">
                    Guest Profile
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Zaffran Rewards Member
                  </p>
                </div>
              </div>

              {!isEditingProfile && (
                <button
                  type="button"
                  onClick={handleStartEditProfile}
                  className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Pencil className="h-3 w-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="mt-5 space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={draftProfile.name}
                    onChange={(e) =>
                      setDraftProfile({ ...draftProfile, name: e.target.value })
                    }
                    className="w-full rounded-xl border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={draftProfile.phone}
                    onChange={(e) =>
                      setDraftProfile({
                        ...draftProfile,
                        phone: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    value={draftProfile.email}
                    onChange={(e) =>
                      setDraftProfile({
                        ...draftProfile,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <label className="flex cursor-pointer items-center gap-2 pt-1 text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={draftProfile.preferPureVeg}
                    onChange={(e) =>
                      setDraftProfile({
                        ...draftProfile,
                        preferPureVeg: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded accent-emerald-600"
                  />
                  <span>Prefer Pure Veg Menu by Default</span>
                </label>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    size="sm"
                    className="rounded-full px-4 font-semibold"
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingProfile(false)}
                    className="rounded-full"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="mt-5 space-y-3 text-sm">
                <div className="rounded-xl bg-muted/50 p-3.5">
                  <p className="font-bold text-foreground">{profile.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                    {profile.phone}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {profile.email}
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-xl border p-3">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-semibold">
                      {profile.preferPureVeg
                        ? "Pure Veg Preference Active"
                        : "Standard Menu (Veg & Non-Veg)"}
                    </span>
                  </div>
                  <Link
                    href={profile.preferPureVeg ? "/?veg=true" : "/"}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Open Menu
                  </Link>
                </div>
              </div>
            )}
          </section>

          {/* Column 2: Saved Delivery Addresses (7 cols) */}
          <section
            aria-labelledby="addresses-heading"
            className="rounded-2xl border bg-card p-6 shadow-2xs lg:col-span-7"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h2 id="addresses-heading" className="text-base font-bold">
                    Saved Delivery Addresses
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Select default drop location for checkout
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAddAddress((prev) => !prev)}
                className="gap-1 rounded-full text-xs font-semibold"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add New</span>
              </Button>
            </div>

            {/* Inline New Address Form */}
            {showAddAddress && (
              <form
                onSubmit={handleCreateAddress}
                className="mt-4 space-y-3 rounded-xl border bg-muted/40 p-4"
              >
                <div className="flex flex-wrap gap-2">
                  {(["Home", "Work", "Other"] as const).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setNewLabel(tag)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                        newLabel === tag
                          ? "bg-primary text-primary-foreground"
                          : "border bg-background text-muted-foreground"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Recipient name"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    className="rounded-xl border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Phone number"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="rounded-xl border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none"
                  />
                </div>

                <input
                  type="text"
                  placeholder="House/Flat, Landmark, Area in Patna (e.g., Kankarbagh Main Rd)"
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  required
                  className="w-full rounded-xl border bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none"
                />

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    size="sm"
                    className="rounded-full px-4 text-xs font-semibold"
                  >
                    Save &amp; Select
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddAddress(false)}
                    className="rounded-full text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {/* Saved Address List */}
            <div className="mt-4 space-y-2.5">
              {addresses.map((addr) => {
                const isSelected = addr.id === selectedAddressId;
                return (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => selectAddress(addr.id)}
                    className={`flex w-full items-start justify-between gap-3 rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/8 ring-1 ring-primary/30"
                        : "bg-background hover:border-muted-foreground/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                          {addr.label}
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {addr.recipientName}
                        </span>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          • {addr.phone}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {addr.fullAddress}
                      </p>
                    </div>

                    {isSelected && (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Piece 3 Slot: Order History & One-Click Reorder */}
        <OrderHistoryList />
      </main>
    </div>
  );
}
