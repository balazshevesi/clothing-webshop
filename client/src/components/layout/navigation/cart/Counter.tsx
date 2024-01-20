"use client";

import { useEffect, useRef, useState } from "react";
import React, { KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useShoppingCartSlice } from "@/state/useShoppingCartSlice";

export default function Counter({ article }: { article: any }) {
  const { items, updateCount, increment, decrement } = useShoppingCartSlice();
  const itemExistsInCart =
    items.filter((cartArticle) => cartArticle.id === article.id).length > 0;
  const itemCount = itemExistsInCart
    ? items.filter((cartArticle) => cartArticle.id === article.id)[0].count
    : 0;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.value = itemCount;
  }, [items]);

  return (
    <div className="flex gap-1">
      <Button
        className="select-none"
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
        className="w-14 text-center"
      />
      <Button
        className="select-none"
        onClick={() => increment(article)}
        variant="secondary"
      >
        +
      </Button>
    </div>
  );
}
