import ViewingAllItemsCard from "@/components/ViewingAllItemsCard";
import Container from "@/components/general/Container";
import Title1 from "@/components/general/Title1";

import Filter from "./Filter";

export default async function Caregory({
  params,
}: {
  params: { name: string };
}) {
  const categoryName = params.name.replace("-", " ");
  const responsee: any = await fetch(
    "https://api.escuelajs.co/api/v1/products",
  );
  const demoProducts = (await responsee.json()).map((item: any) => {
    const newItem = item;
    newItem.count = 0;
    return newItem;
  });

  return (
    <>
      <Container>
        <Title1>{categoryName}</Title1>
        <Filter />
        <div className="grid grid-cols-3">
          {demoProducts.map((item: any) => {
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
