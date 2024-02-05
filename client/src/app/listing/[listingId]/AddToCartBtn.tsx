"use client";

import { useEffect, useRef } from "react";

import Counter from "@/components/layout/navigation/cart/Counter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useShoppingCartSlice } from "@/state/useShoppingCartSlice";
import { toast } from "sonner";

interface AddToCartBtn {
  article: any;
  listing: any;
}
export default function AddToCartBtn({ article, listing }: AddToCartBtn) {
  const { items, updateCount, increment, decrement, open, goToCheckout } =
    useShoppingCartSlice();

  const itemCount = items.filter((cartItem) => cartItem.id === article.id)[0]
    ? items.filter((cartItem) => cartItem.id === article.id)[0].count
    : 0;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (itemCount) inputRef.current!.value = itemCount;
  }, [items, article]);

  return (
    <>
      {!!itemCount && (
        <div className="flex w-full flex-wrap gap-2">
          <Button
            className="grow select-none"
            onClick={() => decrement(article)}
            variant="secondary"
          >
            -
          </Button>
          <Input
            ref={inputRef}
            type="number"
            onBlur={(e) => updateCount(article, e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                const target = e.target as HTMLInputElement;
                updateCount(article, target.value);
              }
            }}
            className="w-14 grow text-center"
          />
          <Button
            className="grow select-none"
            onClick={() => increment(article)}
            variant="secondary"
          >
            +
          </Button>
          <Button
            className="grow select-none"
            onClick={() => open(article)}
            variant="outline"
          >
            View Cart
          </Button>
          <Button
            className="grow select-none"
            onClick={() => goToCheckout()}
            variant="default"
          >
            To Checkout
          </Button>
        </div>
      )}
      {!itemCount && !!article.quantityInStock && (
        <Button
          onClick={() => {
            toast(`${listing.title} ligger nu i din kundvagn`, {
              description: (
                <div className=" mt-2 flex gap-2">
                  <Button>Öppna kundvagn</Button>
                  <Counter article={article} />
                </div>
              ),
              duration: 6000,
            });
            increment(article);
          }}
          className=" w-full uppercase"
        >
          add to cart
        </Button>
      )}
      {!article.quantityInStock && (
        <Button className=" w-full uppercase" disabled>
          can't buy that g
        </Button>
      )}

      {+itemCount > +article.quantityInStock && (
        <div className="text-red-400">We don't have that much in stock</div>
      )}
    </>
  );
  // return (
}
