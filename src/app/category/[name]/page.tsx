import Image from "next/image";

import MostPopular from "@/components/MostPopular";
import MostPopularCard from "@/components/MostPopularCard";
import Reviews from "@/components/Reviews";
import ViewingAllItemsCard from "@/components/ViewingAllItemsCard";
import Container from "@/components/general/Container";
import Seperator from "@/components/general/Seperator";
import Title1 from "@/components/general/Title1";

import Filter from "./Filter";

export default async function Caregory({
  params,
}: {
  params: { name: string };
}) {
  const categoryName = params.name.replace("-", " ");
  const responsee: any = await fetch(`${process.env.HOST}/api/products`, {
    method: "post",
    body: JSON.stringify({
      page: "1",
      sort: "alphabetical",
      priceRange: [0, 9999],
      category: "",
    }),
  });
  const products = (await responsee.json()).content;

  return (
    <>
      <Container>
        <Title1>{categoryName}</Title1>
        <Filter />
        <div className="grid grid-cols-3">
          {products.map((item: any) => {
            return (
              <ViewingAllItemsCard
                key={item.id}
                item={item}
              ></ViewingAllItemsCard>
            );
          })}
        </div>
      </Container>
    </>
  );
}
