"use client";

import MostPopularCard from "./MostPopularCard";
import Container from "./general/Container";
import Title2 from "./general/Title2";

export default function MostPopular({ products }: { products: any }) {
  return (
    <div>
      <Container>
        <Title2>most popular</Title2>
        <div className="flex w-full grid-cols-4 gap-8 overflow-auto py-4">
          {products.map((item: any) => {
            return <MostPopularCard item={item} key={JSON.stringify(item)} />;
          })}
        </div>
      </Container>
    </div>
  );
}
