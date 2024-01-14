"use client";

import { useEffect, useRef } from "react";

import Counter from "@/components/layout/navigation/cart/Counter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useShoppingCartSlice } from "@/state/useShoppingCartSlice";
import { toast } from "sonner";

export default function AddToCartBtn({
  item,
  listing,
}: {
  item: any;
  listing: any;
}) {
  const { items, updateCount, increment, decrement, open } =
    useShoppingCartSlice();

  const itemCount = items.filter((cartItem) => cartItem.id === item.id)[0]
    ? items.filter((cartItem) => cartItem.id === item.id)[0].count
    : 0;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (itemCount) {
      inputRef.current!.value = itemCount;
    }
  }, [items, item]);

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
        <Button
          onClick={() => {
            toast(`${listing.title} ligger nu i din kundvagn`, {
              description: (
                <div className=" mt-2 flex gap-2">
                  <Button>Öppna kundvagn</Button>
                  <Counter item={item} />
                </div>
              ),
              duration: 6000,
            });
            increment(item);
          }}
          className=" w-full uppercase"
        >
          add to cart
        </Button>
      )}
    </>
  );
  // return (
}
