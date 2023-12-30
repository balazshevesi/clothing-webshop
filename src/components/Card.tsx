"use client";

import Image from "next/image";
import Link from "next/link";

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

import Counter from "./layout/navigation/cart/Counter";
import { useShoppingCart } from "@/state/useShoppingCart";

export default function Card({ item }: { item: any }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { items, addItem, open } = useShoppingCart();

  const itemCount = items.filter((cartItem) => cartItem.id === item.id)[0]
    ? items.filter((cartItem) => cartItem.id === item.id)[0]
    : 0;

  return (
    <div className=" relative w-[24rem] min-w-[18rem] overflow-hidden whitespace-nowrap">
      <Image
        className="absolute left-0 top-0 z-0 h-full w-full overflow-hidden rounded opacity-40 blur-xl"
        width={200}
        height={200}
        src={item.images[0]}
        alt=""
      />

      <div className="relative z-10 flex w-full flex-col">
        <Link href={`/product/${item.id}`}>
          <Image
            className=" relative z-10 aspect-[1/1] w-full overflow-hidden rounded"
            width={200}
            height={200}
            src={item.images[0]}
            alt=""
          />
        </Link>

        <div className="p-2">
          <div className="p-2">
            <div className="mb-4 mt-2 max-w-full overflow-auto">
              <strong>{item.title}</strong>
            </div>
            <div className="mb-4 font-light">
              <strong>{item.price} SEK</strong>
            </div>
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
              <AlertDialogCancel onClick={() => open()}>
                Öppna kundvagn
              </AlertDialogCancel>
              <AlertDialogAction>Till kassan</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
