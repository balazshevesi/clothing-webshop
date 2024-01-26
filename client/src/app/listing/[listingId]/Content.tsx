"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import MostPopular from "@/components/MostPopular";
import Reviews from "@/components/Reviews";
import SelectArticle from "@/components/SelectArticle";
import Container from "@/components/general/Container";
import Seperator from "@/components/general/Seperator";
import Title1 from "@/components/general/Title1";
import Counter from "@/components/layout/navigation/cart/Counter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import AddToCartBtn from "./AddToCartBtn";
import LeftSectoin from "./LeftSectoin";
import { useQueryState } from "nuqs";

export default function Content({ listing }: { listing: any }) {
  const searchParams = useSearchParams();
  const article = searchParams.get("article");

  const [selectedArticleParam, setSelectedArticleParam] =
    useQueryState("article");

  const [selectedArticleId, setSelectedArticleId] = useState(
    article ? article : listing.articles.id,
  );
  useEffect(() => {
    setSelectedArticleParam(selectedArticleId);
  }, [selectedArticleId]);

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("scrollToTopHelper")!.scrollIntoView();
    }, 0);
  }, []);

  const currentArticle = listing.articleListingRelations.filter(
    (articleListingRelation: any) =>
      +articleListingRelation.articles.id === +selectedArticleId!,
  )[0].articles;

  return (
    <>
      <Container className="pt-14">
        {/* <div className="flex items-stretch gap-8 bg-fuchsia-500 py-20 md:flex-row">
          <div className=" flex aspect-square grow items-center justify-center bg-pink-400">
            image
          </div>
          <div className=" w-[22rem] bg-pink-400">titleee</div>
        </div> */}

        <div className="flex flex-col items-stretch gap-8 lg:flex-row">
          <LeftSectoin currentArticle={currentArticle!} listing={listing} />
          <div className="w-full shrink-0 lg:w-[22rem]">
            <div className="mb-10">
              <Title1 className="mb-4">{listing.title}</Title1>
              {/* <Title1 className="mb-4">{currentArticle.brands.name}</Title1> */}
              <p className="mb-6 text-xl">{currentArticle.price} SEK</p>
              <p>{listing.description}</p>
            </div>
            {/* <div className=" mb-6">S</div> */}
            <SelectArticle
              selectedArticleId={selectedArticleId}
              setSelectedArticle={setSelectedArticleId}
              listing={listing}
            />
            <div className=" mb-10 w-full">
              <AddToCartBtn listing={listing} article={currentArticle} />
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="uppercase">
                  article description
                </AccordionTrigger>
                <AccordionContent>
                  {currentArticle.description}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="uppercase">
                  garment care
                </AccordionTrigger>
                <AccordionContent>
                  {currentArticle.garmentCare}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="uppercase">
                  shipping
                </AccordionTrigger>
                <AccordionContent>
                  Shipps within 5 working days
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Container>
      <Seperator />
      <Reviews />
      <Seperator />
    </>
  );
}
