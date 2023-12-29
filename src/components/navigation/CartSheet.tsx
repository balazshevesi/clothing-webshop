"use client";

import { useMemo, useState } from "react";

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

import { Button } from "../ui/button";
import CartCount from "./CartCount";
import { useShoppingCart } from "@/state/useShoppingCart";

export default function CartSheet() {
  const cart = useShoppingCart((state: any) => state.items) as any;
  const removeItem = useShoppingCart((state: any) => state.removeItem) as any;
  const cartWorth = useMemo(() => {
    let worth = 0;
    cart.forEach((item: any) => {
      worth = worth + item.price * item.count;
    });
    return worth;
  }, [cart]);

  const [isOpen, setIsOpen] = useState(false);
  const flipOpenStateHandler = () => setIsOpen(!isOpen);
  return (
    <div>
      <Button variant="default" size="icon" onClick={flipOpenStateHandler}>
        <ShoppingBagIcon className="size-6" />
        <CartCount />
      </Button>
      <Sheet open={isOpen} onOpenChange={flipOpenStateHandler}>
        <SheetContent>
          <div className=" relative h-full w-full">
            <SheetHeader>
              <SheetTitle>Din kundvagn</SheetTitle>
              <SheetDescription>
                <div className=" flex flex-col gap-4">
                  {cart.map((item: any) => {
                    return (
                      <div key={JSON.stringify(item)}>
                        {item.title}
                        <Button size="icon" onClick={() => removeItem(item)}>
                          <TrashIcon className="size-6" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className=" absolute bottom-0 left-0 w-full gap-2">
              <div className="flex w-full flex-col justify-start gap-4">
                <div className=" flex justify-between">
                  <div>Värde:</div>
                  <div>{cartWorth}</div>
                </div>
                <Button>Gå till kassan</Button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
