"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface LeftSectoin {
  listing: any;
  currentArticle: any;
}

export default function LeftSectoin({ listing, currentArticle }: LeftSectoin) {
  return (
    <div>
      <Carousel className="relative grow overflow-hidden rounded">
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