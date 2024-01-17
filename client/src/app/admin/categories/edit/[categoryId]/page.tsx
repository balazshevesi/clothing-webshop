"use client";

import { useEffect, useState } from "react";

import CategoryForm from "../../CategoryForm";
import { useAdminPanel } from "@/app/admin/utils/fetchFunctions";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { categoryId: string } }) {
  const { fetchCategory } = useAdminPanel();
  const { data, isLoading } = useQuery({
    queryKey: ["categoryId" + params.categoryId],
    queryFn: () => fetchCategory(params.categoryId),
  });
  if (isLoading || !data) return <div>Loading...</div>;
  return <CategoryForm categoryData={data} />;
}
