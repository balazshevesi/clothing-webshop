"use client";

import { useEffect, useRef, useState } from "react";
import React, { KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useShoppingCart } from "@/state/useShoppingCart";

export default function Counter({ item }: { item: any }) {
  const { items, updateCount, increment, decrement } = useShoppingCart();
  const itemCount = items.filter((cartItem) => cartItem.id === item.id)[0]
    .count;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.value = itemCount;
  }, [items]);

  return (
    <div className="flex gap-1">
      <Button
        className="select-none"
        onClick={() => {
          decrement(item);
        }}
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
        className="w-14 text-center"
      />
      <Button
        className="select-none"
        onClick={() => {
          increment(item);
        }}
        variant="secondary"
      >
        +
      </Button>
    </div>
  );
}
