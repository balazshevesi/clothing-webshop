"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import ArticleCard from "@/components/ArticleCard";

import Filter from "../category/[name]/Filter";
import PaginationComponent from "./PaginationComponent";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  useQueryState,
} from "nuqs";

interface Content {
  initialContent: any;
}

export default function Content({ initialContent }: Content) {
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
  const [orderBy, setOrderBy] = useQueryState("orderBy");
  const [page, setPage] = useQueryState("page", parseAsInteger);

  const [realData, setRealData] = useState(initialContent);

  //^the caching is buggy asf, idk why, but it also kinda works
  const { data, isLoading } = useQuery({
    queryKey: [
      "search",
      fromPrice,
      toPrice,
      selectedBrands,
      onlyInStock,
      orderBy,
      page,
    ],
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
            page: page || 1,
            showOnlyInStock: onlyInStock || false,
            orderBy: orderBy,
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
      {/* 200iq code right here. if realData is not holding a pointer to initialContent it means that the data has been fetched by react query */}
      {isLoading && realData !== initialContent && (
        <Loader2 className="size-4 animate-spin" />
      )}
      <PaginationComponent />
      <div className="mx-auto my-10 grid max-w-5xl grid-cols-3 gap-4">
        {realData.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <PaginationComponent />
    </>
  );
}
