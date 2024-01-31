"use client";

import { useEffect, useState } from "react";

import PlannedSaleForm from "../../PlannedSaleForm";
import {
  fetchCategory,
  fetchPlannedSale,
} from "@/app/admin/utils/fetchFunctions";
import { useQuery } from "@tanstack/react-query";

export default function Page({
  params,
}: {
  params: { plannedSaleId: string };
}) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["plannedSaleId" + params.plannedSaleId],
    queryFn: () => fetchPlannedSale(params.plannedSaleId),
  });

  if (isLoading || !data) return <div>Loading...</div>;
  console.log(data);
  return <PlannedSaleForm saleData={data} />;
}
