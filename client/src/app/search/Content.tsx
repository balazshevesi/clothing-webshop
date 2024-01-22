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
  // const [category, setCategory] = useQueryState("category");
  const [fromPrice, setFromPrice] = useQueryState("fromPrice");
  const [toPrice, setToPrice] = useQueryState("toPrice");

  const { data, isLoading } = useQuery({
    queryKey: ["search", fromPrice, toPrice],
    initialData: initalContent,
    queryFn: async () => {
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
      return data.content;
    },
  });
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Filter />
      <div className="grid grid-cols-3 gap-4">
        {data.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </>
  );
}
