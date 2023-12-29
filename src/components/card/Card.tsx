"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import { useShoppingCart } from "@/state/useShoppingCart";

export default function Card({ item }: { item: any }) {
  const addItem = useShoppingCart((state: any) => state.addItem);

  return (
    <div
      key={JSON.stringify(item)}
      className=" flex h-[22rem] w-[12rem] flex-col overflow-hidden whitespace-nowrap rounded bg-white p-4 shadow"
    >
      <Image
        className="size-70 aspect-square"
        width={200}
        height={200}
        src={item.image}
        alt=""
      />
      <div className=" max-w-full overflow-auto">
        <strong>{item.title}</strong>
      </div>
      <div>
        <strong>{item.price}:-</strong>
      </div>
      <Button onClick={() => addItem(item)} className="mt-auto">
        KÖP
      </Button>
    </div>
  );
}
