"use client";

import { useMemo } from "react";

import { useShoppingCart } from "@/state/useShoppingCart";

export default function CartCount() {
  const cart = useShoppingCart((state: any) => state.items) as any;
  const cartCount = useMemo(() => {
    let count = 0;
    cart.forEach((item: any) => {
      count = count + item.count;
    });
    return count;
  }, [cart]);

  return (
    <div className="absolute bottom-0 left-0 flex size-6 -translate-x-1/3 translate-y-1/3 items-center justify-center rounded-full bg-red-500 p-1 shadow">
      {cartCount}
    </div>
  );
}
