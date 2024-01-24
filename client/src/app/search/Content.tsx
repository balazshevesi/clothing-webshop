"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import ArticleCard from "@/components/ArticleCard";
import { Input } from "@/components/ui/input";

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
  articleCount: number;
}

export default function Content({ initialContent, articleCount }: Content) {
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

  const [selectedCategories, setSelectedCategories] = useQueryState(
    "categories",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );

  const [orderBy, setOrderBy] = useQueryState("orderBy");
  const [page, setPage] = useQueryState("page", parseAsInteger);

  const [realData, setRealData] = useState(initialContent);
  const [searchWords, setSearchWords] = useQueryState("searchWords");
  const [debouncedSearchWords, setDebouncedSearchWords] = useState(searchWords);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchWords(searchWords);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchWords]);

  //^the caching is buggy asf, idk why, but it also kinda works
  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "search",
      fromPrice,
      toPrice,
      selectedBrands,
      onlyInStock,
      orderBy,
      page,
      selectedCategories,
      debouncedSearchWords,
    ],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/articles/search`,
        {
          method: "post",
          cache: "no-store",
          body: JSON.stringify({
            searchWords: debouncedSearchWords || "",
            categoryIds: selectedCategories || null,
            brandIds: selectedBrands || null,
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
      <Input
        className="mb-5"
        placeholder={`Sök bland ${articleCount} artiklar`}
        value={searchWords || ""}
        onInput={(e: any) => setSearchWords(e.target.value)}
      />
      <Filter />
      <PaginationComponent />
      {/* 200iq code right here. if realData is not holding a pointer to initialContent it means that the data has been fetched by react query */}
      {isLoading && realData !== initialContent && (
        <Loader2 className="size-4 animate-spin" />
      )}
      <div className="mx-auto my-10 grid max-w-5xl grid-cols-3 gap-4">
        {realData.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <PaginationComponent />
    </>
  );
}
