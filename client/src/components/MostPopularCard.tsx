"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

import Counter from "./layout/navigation/cart/Counter";
import { useFavsSlice } from "@/state/useFavsSlice";
import { useShoppingCartSlice } from "@/state/useShoppingCartSlice";
import { toast } from "sonner";

export default function MostPopularCard({ listing }: { listing: any }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { items, open, increment } = useShoppingCartSlice();
  const { favArticles, toggleFav } = useFavsSlice();

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
            <div className="flex items-center">
              <div className="mb-4 mt-2 max-w-full overflow-auto">
                <strong>{listing.title}</strong>
              </div>
              <button
                className="ml-auto"
                onClick={() => toggleFav(listing.defaultArticle)}
              >
                {favArticles.filter(
                  (articleState) =>
                    articleState.id === listing.defaultArticle.id,
                ).length > 0 ? (
                  <StarIconSolid className="size-6 stroke-2" />
                ) : (
                  <StarIconOutline className="size-6 stroke-2" />
                )}
              </button>
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
                  // setModalIsOpen(true);
                  toast(`${listing.title} ligger nu i din kundvagn`, {
                    description: (
                      <div className=" mt-2 flex gap-2">
                        <Button>Öppna kundvagn</Button>{" "}
                        <Counter article={listing.defaultArticle} />
                      </div>
                    ),
                    duration: 6000,
                  });

                  increment(listing.defaultArticle);
                }}
              >
                KÖP
              </Button>
            ) : (
              <div className="flex w-full justify-center">
                <Counter article={listing.defaultArticle} />
              </div>
            )}
          </div>
        </div>
        {/* <AlertDialog
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
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Fortsätt handla</AlertDialogCancel>
              <AlertDialogCancel onClick={() => open()}>
                Öppna kundvagn
              </AlertDialogCancel>
              <AlertDialogAction>Till kassan</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </div>
    </div>
  );
}
