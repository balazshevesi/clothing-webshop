"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

import { useFavsSlice } from "@/state/useFavsSlice";

interface LeftSectoin {
  listing: any;
  currentArticle: any;
}

export default function LeftSectoin({ listing, currentArticle }: LeftSectoin) {
  const { favArticles, toggleFav } = useFavsSlice();

  return (
    <div>
      <Carousel className="relative grow overflow-hidden rounded">
        <button
          onClick={() => toggleFav(currentArticle)}
          className="absolute right-0 top-0 z-40 p-4 drop-shadow"
        >
          {favArticles.filter(
            (articleState) => +articleState.id === +currentArticle.id,
          ).length > 0 ? (
            <StarIconSolid className="size-8 stroke-2" />
          ) : (
            <StarIconOutline className="size-8 stroke-2" />
          )}
        </button>
        <CarouselContent>
          {/* {product.images.map((image: any, index: number) => (
            <CarouselItem key={index} className=" px-0">
              <Image
                alt=""
                height={1000}
                width={1000}
                src={image}
                className=" aspect-square object-cover"
              />
            </CarouselItem>
          ))} */}
          {currentArticle.articleImages.map((imageObj: any, i: number) => (
            <CarouselItem key={i} className=" px-0">
              <Image
                alt=""
                height={1000}
                width={1000}
                src={imageObj.imagePath}
                className=" aspect-square object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" absolute left-2" />
        <CarouselNext className=" absolute right-2" />
      </Carousel>
    </div>
  );
}

// <div className="p-1">
// {product.images.map((image: string, i: number) => (
//   <Image key={i} alt="" height={1000} width={1000} src={image} />
// ))}
// </div>
