"use client";

import Image from "next/image";

import { useEffect, useMemo, useState } from "react";
import React from "react";

import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { Button } from "../../../ui/button";
import CartCount from "./CartCount";
import Counter from "./Counter";
import { useShoppingCartSlice } from "@/state/useShoppingCartSlice";

function CartItem({ item }: { item: any }) {
  const updateCount = useShoppingCartSlice(
    (state: any) => state.updateCount,
  ) as any;
  const decrement = useShoppingCartSlice(
    (state: any) => state.decrement,
  ) as any;
  const items = useShoppingCartSlice((state: any) => state.items) as any;

  const [itemCount, setItemCount] = useState(item.count);

  useEffect(() => {
    //don't let it go below 1
    if (itemCount <= 0) setItemCount(1);
    //only update the count if it has actually changed (useEffect always runs on mount)
    if (
      itemCount !==
      items.filter((itemState: any) => itemState.id === item.id)[0].count
    )
      updateCount(item, itemCount);
  }, [itemCount]);

  return (
    <div
      key={JSON.stringify(item)}
      className=" relative flex items-center gap-2 rounded bg-black p-5 shadow"
    >
      <Button
        size={"icon"}
        variant="ghost"
        className=" absolute right-0 top-0 size-6"
        onClick={() => {
          updateCount(item, 0);
        }}
      >
        <XMarkIcon className="size-4" />
      </Button>

      <Image
        alt={`picture of ${item.name}`}
        width={50}
        height={50}
        src={item.articleImages[0].imagePath}
        className=" aspect-square size-14"
      />
      <div className="flex grow flex-col overflow-auto whitespace-nowrap">
        <div>{item.name}</div>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <div className="flex w-full"></div>
        <Counter article={item} />
      </div>
    </div>
  );
}

export default function CartSheet() {
  const cart = useShoppingCartSlice((state: any) => state.items) as any;
  const cartWorth = useMemo(() => {
    let worth = 0;
    cart.forEach((item: any) => {
      const itemPrice =
        item.articlePlannedSalesRelations &&
        item.articlePlannedSalesRelations.length > 0
          ? item.articlePlannedSalesRelations[0].newPrice
          : item.price;
      worth = worth + itemPrice * item.count;
    });
    return worth;
  }, [cart]);
  const cartCount = useMemo(() => {
    let count = 0;
    cart.forEach((item: any) => {
      count = count + +item.count;
    });
    return count;
  }, [cart]);

  const isOpen = useShoppingCartSlice((state: any) => state.isOpen);
  const open = useShoppingCartSlice((state: any) => state.open);
  const close = useShoppingCartSlice((state: any) => state.close);
  const { goToCheckout } = useShoppingCartSlice();

  return (
    <div>
      <Button variant="default" size="icon" onClick={open}>
        <ShoppingBagIcon className="size-6" />
        <CartCount />
      </Button>
      <Sheet open={isOpen} onOpenChange={close}>
        <SheetContent className="max-w-none border-none bg-slate-900 p-0">
          <div className=" relative flex h-full w-full flex-col">
            <SheetHeader className=" bg-black p-4 shadow">
              <SheetTitle className=" uppercase">
                din kundvagn <span className=" opacity-75">({cartCount})</span>
              </SheetTitle>
              {/* <SheetDescription className=" h-full"></SheetDescription> */}
            </SheetHeader>
            <div className="w-full grow overflow-auto p-4">
              <div className="flex flex-col gap-4 ">
                {cart.map((item: any) => {
                  return <CartItem item={item} key={item.id} />;
                })}
              </div>
            </div>
            <SheetFooter className="w-full gap-2 bg-black p-4">
              <div className="flex w-full flex-col justify-start gap-4">
                <div className=" flex justify-between">
                  <div>Värde:</div>
                  <div>{cartWorth}:-</div>
                </div>
                <Button onClick={() => goToCheckout()}>Gå till kassan</Button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
