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
    categories,
    showListings,
  } = searchParams;

  const body = {
    searchWords: searchWords || "",
    categoryIds: categories
      ? categories.split(",").map((id: number) => +id)
      : null,
    brandIds: brands ? brands.split(",").map((id: number) => +id) : null,
    fromPrice: fromPrice || 0,
    toPrice: toPrice || 9999999,
    page: page || 1,
    showOnlyInStock: showOnlyInStock ? JSON.parse(showOnlyInStock) : false,
    showListings: showListings ? JSON.parse(showListings) : false,
    orderBy: orderBy,
    color: null,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/articles/search`,
    {
      method: "post",
      cache: "no-store",
      body: JSON.stringify(body),
    },
  );
  const data = await response.json();

  const categoriesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/categories`,
  );
  const categoriesData = (await categoriesResponse.json()).content;

  const brandsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/brands`,
  );
  const brandsData = (await brandsResponse.json()).content;

  const countResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/articles/count`,
  );
  const countData = await countResponse.json();
  const count = countData.content[0].value;

  return (
    <Container>
      <Content
        articleCount={count}
        initialContent={data}
        categoriesData={categoriesData}
        brandsData={brandsData}
      ></Content>
    </Container>
  );
}
