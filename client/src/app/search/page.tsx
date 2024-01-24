import Container from "@/components/general/Container";
import Title1 from "@/components/general/Title1";

import Content from "./Content";

export default async function Page({ searchParams }: { searchParams?: any }) {
  // { fromPrice: '0', toPrice: '4000', brands: '3' }
  const {
    fromPrice,
    toPrice,
    brands,
    showOnlyInStock,
    orderBy,
    page,
    searchWords,
  } = searchParams;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/articles/search`,
    {
      method: "post",
      cache: "no-store",
      body: JSON.stringify({
        searchWords: searchWords || "",
        categoryId: null,
        brandIds: brands ? brands.split(",") : null,
        fromPrice: fromPrice,
        toPrice: toPrice,
        color: null,
        page: page || 1,
        showOnlyInStock: !!showOnlyInStock && JSON.parse(showOnlyInStock),
        orderBy: orderBy,
      }),
    },
  );
  const data = await response.json();
  const content = data.content;

  const countResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/articles/count`,
  );
  const countData = await countResponse.json();
  const count = countData.content[0].value;

  return (
    <Container>
      <Title1>Search for items</Title1>
      <Content articleCount={count} initialContent={content}></Content>
    </Container>
  );
}
