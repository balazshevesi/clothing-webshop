"use client";

import { useState } from "react";

import ArticleCard from "@/components/ArticleCard";

import Filter from "../category/[name]/Filter";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

interface Content {
  initalContent: any;
}
export default function Content({ initalContent }: Content) {
  const [fromPrice, setFromPrice] = useQueryState("fromPrice");
  const [toPrice, setToPrice] = useQueryState("toPrice");

  const [realData, setRealData] = useState(initalContent);
  const { data } = useQuery({
    queryKey: ["search", fromPrice, toPrice],
    queryFn: async () => {
      // setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/articles/search`,
        {
          method: "post",
          cache: "no-store",
          body: JSON.stringify({
            searchWords: "",
            categoryId: null,
            brandId: null,
            fromPrice: fromPrice || 0,
            toPrice: toPrice || 9999999,
            color: null,
            page: 1,
            showOnlyInStock: true,
          }),
        },
      );
      const data = await response.json();
      const content = data.content;
      setRealData(content);
      return content;
    },
  });

  return (
    <>
      <Filter />
      <div className="grid grid-cols-3 gap-4">
        {realData.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}{" "}
      </div>
    </>
  );
}