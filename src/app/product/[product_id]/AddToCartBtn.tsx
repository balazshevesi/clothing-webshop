"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useShoppingCartSlice } from "@/state/useShoppingCartSlice";

export default function AddToCartBtn({ item }: { item: any }) {
  const { items, updateCount, increment, decrement, addItem, open } =
    useShoppingCartSlice();
  const itemCount = items.filter((cartItem) => cartItem.id === item.id)[0]
    ? items.filter((cartItem) => cartItem.id === item.id)[0].count
    : 0;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (itemCount) {
      console.log("itemCount", itemCount);
      inputRef.current!.value = itemCount;
    }
  }, [items]);
  itemCount;

  return (
    <>
      {itemCount ? (
        <div className="flex w-full flex-wrap gap-2">
          <Button
            className="grow select-none"
            onClick={() => decrement(item)}
            variant="secondary"
          >
            -
          </Button>
          <Input
            ref={inputRef}
            type="number"
            onBlur={(e) => updateCount(item, e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                const target = e.target as HTMLInputElement;
                updateCount(item, target.value);
              }
            }}
            className="w-14 grow text-center"
          />
          <Button
            className="grow select-none"
            onClick={() => increment(item)}
            variant="secondary"
          >
            +
          </Button>
          <Button
            className="grow select-none"
            onClick={() => open(item)}
            variant="outline"
          >
            View Cart
          </Button>
          <Button
            className="grow select-none"
            onClick={() => increment(item)}
            variant="default"
          >
            To Checkout
          </Button>
        </div>
      ) : (
        <Button onClick={() => addItem(item)} className=" w-full uppercase">
          add to cart
        </Button>
      )}
    </>
  );
  // return (
}
