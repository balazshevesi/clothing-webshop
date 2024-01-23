"use client";

import { useEffect, useState } from "react";

import ArticleCard from "@/components/ArticleCard";

import Filter from "../category/[name]/Filter";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  useQueryState,
} from "nuqs";

interface Content {
  initalContent: any;
}
export default function Content({ initalContent }: Content) {
  const [fromPrice, setFromPrice] = useQueryState("fromPrice");
  const [toPrice, setToPrice] = useQueryState("toPrice");
  const [onlyInStock, setOnlyInStock] = useQueryState(
    "showOnlyInStock",
    parseAsBoolean,
  );

  const [selectedBrands, setSelectedBrands] = useQueryState(
    "brands",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );

  const [realData, setRealData] = useState(initalContent);
  //^the caching is buggy asf, idk why, but it also kinda works
  const { data, isLoading } = useQuery({
    queryKey: ["search", fromPrice, toPrice, selectedBrands, onlyInStock],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/articles/search`,
        {
          method: "post",
          cache: "no-store",
          body: JSON.stringify({
            searchWords: "",
            categoryId: null,
            brandIds: selectedBrands,
            fromPrice: fromPrice || 0,
            toPrice: toPrice || 9999999,
            color: null,
            page: 1,
            showOnlyInStock: onlyInStock || false,
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
      {/* 200iq code right here. if realData is not holding a pointer to initalContent it means that the data has been fetched by react query */}
      {isLoading && realData !== initalContent && (
        <Loader2 className="size-4 animate-spin" />
      )}
      <div className="grid grid-cols-3 gap-4">
        {realData.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </>
  );
}
