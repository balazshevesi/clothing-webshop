"use client";

import { tree } from "next/dist/build/templates/app-page";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import Counter from "../navigation/cart/Counter";
import { useShoppingCart } from "@/state/useShoppingCart";

export default function Card({ item }: { item: any }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { items, addItem, open } = useShoppingCart();

  const itemCount = items.filter((cartItem) => cartItem.id === item.id)[0]
    ? items.filter((cartItem) => cartItem.id === item.id)[0]
    : 0;

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
      <div className="mt-auto w-full">
        {!itemCount ? (
          <Button
            className="w-full"
            onClick={() => {
              setModalIsOpen(true);
              addItem(item);
            }}
          >
            KÖP
          </Button>
        ) : (
          <div className="flex w-full justify-center">
            <Counter item={item} />
          </div>
        )}
      </div>
      <AlertDialog
        open={modalIsOpen}
        onOpenChange={() => {
          setModalIsOpen(false);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {item.title} ligger nu i din kundvagn!
            </AlertDialogTitle>
            {/* <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription> */}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fortsätt handla</AlertDialogCancel>
            <AlertDialogCancel onClick={open}>Öppna kundvagn</AlertDialogCancel>
            <AlertDialogAction>Till kassan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
