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

interface ArticleCard {
  title: string;
  image: string;
  price: string | number;
  href: string;
  article: any;
}
export default function ArticleCard({
  title,
  image,
  price,
  href,
  article,
}: ArticleCard) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { items, open, increment } = useShoppingCartSlice();
  const { favArticles, toggleFav } = useFavsSlice();

  const articleCount = items.filter((cartItem) => cartItem.id === article.id)[0]
    ? items.filter((cartItem) => cartItem.id === +article.id)[0]
    : 0;

  const now = new Date();
  const articleIsOnSale =
    article.articlePlannedSalesRelations &&
    article.articlePlannedSalesRelations.length > 0 &&
    article.articlePlannedSalesRelations[0].plannedSales &&
    new Date(article.articlePlannedSalesRelations[0].plannedSales.startTime) <
      now &&
    now <
      new Date(article.articlePlannedSalesRelations[0].plannedSales.endTime);

  return (
    <div className="relative min-w-56 max-w-xs overflow-hidden whitespace-nowrap rounded">
      <Image
        className="absolute left-0 top-0 z-0 h-full w-full opacity-40 blur-xl"
        width={200}
        height={200}
        src={image}
        alt=""
      />
      <div className="relative z-10 flex h-full w-full flex-col p-4">
        <Link
          href={href || ""}
          // href={`/listing/${article.articleListingRelations[0].listings.id}?article=${article.id}`}
        >
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded">
            <Image
              className="relative z-10 w-full"
              width={200}
              height={200}
              src={image}
              alt=""
            />
          </div>
        </Link>
        <div className="grow p-2">
          <div className="flex items-center">
            <div className="mb-4 mt-2 max-w-full overflow-auto">
              <strong>{title}</strong>
            </div>
            <button className="ml-auto" onClick={() => toggleFav(article)}>
              {favArticles.filter(
                (articleState) => articleState.id === article.id,
              ).length > 0 ? (
                <StarIconSolid className="size-6 stroke-2" />
              ) : (
                <StarIconOutline className="size-6 stroke-2" />
              )}
            </button>
          </div>
          <div className="mb-4 font-light">
            {!articleIsOnSale && <div>{price} SEK</div>}
            {articleIsOnSale && (
              <div className="flex flex-col">
                <div className=" opacity-80">
                  <strong className="text-sm font-medium line-through">
                    {price} SEK
                  </strong>{" "}
                  <strong className="rounded bg-white px-1 py-0.5 text-sm font-medium uppercase text-black">
                    save{" "}
                    {100 -
                      Math.round(
                        (article.articlePlannedSalesRelations[0].newPrice /
                          article.price) *
                          100,
                      )}
                    %
                  </strong>
                </div>
                <strong>
                  {article.articlePlannedSalesRelations[0].newPrice} SEK
                </strong>
              </div>
            )}
          </div>
        </div>
        <div className="mt-auto w-full">
          {!articleCount ? (
            <Button
              className="w-full"
              onClick={() => {
                // setModalIsOpen(true);
                toast(`${title} ligger nu i din kundvagn`, {
                  description: (
                    <div className=" mt-2 flex gap-2">
                      <Button
                        onClick={() => {
                          open();
                        }}
                      >
                        Öppna kundvagn
                      </Button>{" "}
                      <Counter article={article} />
                    </div>
                  ),
                  duration: 6000,
                });

                increment(article);
              }}
            >
              KÖP
            </Button>
          ) : (
            <div className="flex w-full justify-center">
              <Counter article={article} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
