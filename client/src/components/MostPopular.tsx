import MostPopularCard from "./MostPopularCard";
import Container from "./general/Container";
import Title2 from "./general/Title2";

export default async function MostPopular() {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/listings/most-popular`,
    { cache: "no-store" },
  );

  const products = (await response.json()).content;

  return (
    <div>
      <Container>
        <Title2>most popular</Title2>
        <div className="flex w-full grid-cols-4 gap-8 overflow-auto py-4">
          {products.map((item: any) => {
            return (
              <MostPopularCard listing={item} key={JSON.stringify(item)} />
            );
          })}
        </div>
      </Container>
    </div>
  );
}
