"use client";

import Title1 from "@/components/general/Title1";
import { Button } from "@/components/ui/button";

import { fetchPlannedSales } from "@/app/admin/utils/fetchFunctions";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["plannedSales"],
    queryFn: () => fetchPlannedSales(),
  });
  if (!data || data.length === 0) return <div>loading...</div>;

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
