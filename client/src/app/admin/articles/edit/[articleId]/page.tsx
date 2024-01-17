"use client";

import React, { useState, useEffect } from "react";

import ArticleForm from "../../ArticleForm";
import { useAdminPanel } from "@/app/admin/utils/fetchFunctions";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { articleId: string } }) {
  const { fetchArticle } = useAdminPanel();
  const { data, isLoading } = useQuery({
    queryKey: ["articleId" + params.articleId],
    queryFn: () => fetchArticle(params.articleId),
  });
  if (isLoading || !data) return <div>Loading...</div>;
  return <ArticleForm ArticleData={data} />;
}
