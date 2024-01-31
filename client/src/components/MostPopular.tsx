import ArticleCard from "./ArticleCard";
import MostPopularCard from "./MostPopularCard";
import Container from "./general/Container";
import Title2 from "./general/Title2";

function FetchFailed() {
  return (
    <Container>
      <Title2>something went wrong</Title2>
    </Container>
  );
}

export default async function MostPopular() {
  let products: any;

  try {
    const response: any = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/listings/most-popular`,
      { cache: "no-store" },
    );

    if (!response.ok) return <FetchFailed />;
    const data = await response.json();
    products = data.content;
  } catch {
    return <FetchFailed />;
  }

  return (
    <Container>
      <Title2>most popular</Title2>
      <div className="flex w-full grid-cols-4 gap-8 overflow-auto py-4">
        {products.map((listing: any) => {
          return (
            <ArticleCard
              title={listing.title}
              image={listing.imagePath}
              price={listing.defaultArticle.price}
              href={`/listing/${listing.id}?article=${listing.defaultArticle.id}`}
              article={listing.defaultArticle}
              key={JSON.stringify(listing)}
            />
          );
        })}
      </div>
    </Container>
  );
}
