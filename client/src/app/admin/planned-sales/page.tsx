"use client";

import { useEffect } from "react";

import Title1 from "@/components/general/Title1";
import Title2 from "@/components/general/Title2";
import { Button } from "@/components/ui/button";

import { useAdminPanel } from "@/state/useAdminPanel";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { fetchAndSetPlannedSales, plannedSales } = useAdminPanel();
  const { isLoading } = useQuery({
    queryKey: ["plannedSales"],
    queryFn: () => fetchAndSetPlannedSales(),
  });
  if (plannedSales.length === 0) return <div>loading...</div>;

  return (
    <div>
      <Title1>Planned Sales</Title1>
      <div className=" flex justify-between gap-4">
        {/* <Title2>list of brands</Title2> */}
        <Button>Add Planned Sales</Button>
      </div>
    </div>
  );
}
