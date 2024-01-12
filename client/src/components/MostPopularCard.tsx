"use client";

//^ NOTE: cart items addded from this component will not have images
//^ modify enpoint to include them
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
import { useShoppingCartSlice } from "@/state/useShoppingCartSlice";

export default function MostPopularCard({ listing }: { listing: any }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { items, addItem, open } = useShoppingCartSlice();
  const itemCount = items.filter(
    (cartItem) => cartItem.id === listing.defaultArticle.id,
  )[0]
    ? items.filter((cartItem) => cartItem.id === listing.defaultArticle.id)[0]
    : 0;

  return (
    <div className="relative w-[22rem] min-w-[18rem] overflow-hidden whitespace-nowrap rounded">
      <Image
        className="absolute left-0 top-0 z-0 h-full w-full opacity-40 blur-xl"
        width={200}
        height={200}
        src={listing.imagePath}
        alt=""
      />
      <div className="relative z-10 flex w-full flex-col">
        <div className="p-4">
          <Link
            href={`/listing/${listing.id}?article=${listing.defaultArticle.id}`}
          >
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded">
              <Image
                className="relative z-10 w-full"
                width={200}
                height={200}
                src={listing.imagePath}
                alt=""
              />
            </div>
          </Link>
          <div className="p-2">
            <div className="mb-4 mt-2 max-w-full overflow-auto">
              <strong>{listing.title}</strong>
            </div>
            <div className="mb-4 font-light">
              <strong>{listing.defaultArticle.price} SEK</strong>
            </div>
          </div>
          <div className="mt-auto w-full">
            {!itemCount ? (
              <Button
                className="w-full"
                onClick={() => {
                  setModalIsOpen(true);
                  addItem(listing.defaultArticle);
                }}
              >
                KÖP
              </Button>
            ) : (
              <div className="flex w-full justify-center">
                <Counter item={listing.defaultArticle} />
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
                {listing.title} ligger nu i din kundvagn!
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
