"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Card from "./Card";
import Container from "./general/Container";
import Title2 from "./general/Title2";

export default function MostPopular({ products }: { products: any }) {
  return (
    <div>
      <Container>
        <Title2>most popular</Title2>
        <div className="flex w-full grid-cols-4 gap-8 overflow-auto py-4">
          {products.map((item: any) => {
            return <Card item={item} key={JSON.stringify(item)} />;
          })}
        </div>
        {/* <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {products.map((item: any, index: number) => (
              <CarouselItem key={index} className="basis-1/4">
                <Card item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> */}
      </Container>
    </div>
  );
}
