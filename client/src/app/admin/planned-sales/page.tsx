"use client";

import Link from "next/link";

import Title1 from "@/components/general/Title1";
import { Button } from "@/components/ui/button";

import { PencilIcon } from "@heroicons/react/24/outline";

import { fetchPlannedSales } from "@/app/admin/utils/fetchFunctions";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["plannedSales"],
    queryFn: () => fetchPlannedSales(),
  });
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <Title1>Planned Sales</Title1>
      <div className="flex flex-col justify-between gap-4">
        {/* <Title2>list of brands</Title2> */}
        <Link href="/admin/planned-sales/add">Add Planned sale</Link>
        {data.map((sale: any) => {
          return (
            <div
              key={sale.id}
              className="flex items-center justify-between gap-4 rounded bg-slate-800 px-4 py-2"
            >
              {sale.name}
              <Link
                href={`/admin/listings/edit/${sale.id}`}
                className="rounded bg-slate-700 p-2"
              >
                <PencilIcon className="size-5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
