"use client";

import { useEffect, useState } from "react";

import BrandForm from "../../BrandForm";
import { fetchBrand } from "@/app/admin/utils/fetchFunctions";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { brandId: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: ["brandId" + params.brandId],
    queryFn: () => fetchBrand(params.brandId),
  });
  if (isLoading || !data) return <div>Loading...</div>;
  return <BrandForm brandData={data} />;
}
