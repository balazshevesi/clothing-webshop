import ArticleCard from "@/components/ArticleCard";
import ViewingAllItemsCard from "@/components/ViewingAllItemsCard";
import Container from "@/components/general/Container";
import Title1 from "@/components/general/Title1";

import Filter from "../category/[name]/Filter";
import Content from "./Content";

export default async function Page({ searchParams }: { searchParams?: any }) {
  // { fromPrice: '0', toPrice: '4000', brands: '3' }
  const { fromPrice, toPrice, brands, showOnlyInStock } = searchParams;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/articles/search`,
    {
      method: "post",
      cache: "no-store",
      body: JSON.stringify({
        searchWords: "",
        categoryId: null,
        brandIds: brands ? brands.split(",") : null,
        fromPrice: fromPrice,
        toPrice: toPrice,
        color: null,
        page: 1,
        showOnlyInStock: showOnlyInStock,
      }),
    },
  );
  const data = await response.json();
  const content = data.content;

  return (
    <Container>
      <Title1>Search for items</Title1>
      <Content initalContent={content}></Content>
    </Container>
  );
}
