"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function LeftSectoin({ product }: { product: any }) {
  return (
    <Carousel className="relative w-full overflow-hidden rounded">
      <CarouselContent>
        {product.images.map((image: any, index: number) => (
          <CarouselItem key={index} className=" px-0">
            <Image
              alt=""
              height={1000}
              width={1000}
              src={image}
              className=" aspect-square object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" absolute left-2" />
      <CarouselNext className=" absolute right-2" />
    </Carousel>
  );
}

// <div className="p-1">
// {product.images.map((image: string, i: number) => (
//   <Image key={i} alt="" height={1000} width={1000} src={image} />
// ))}
// </div>
