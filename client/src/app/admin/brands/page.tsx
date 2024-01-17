"use client";

import Link from "next/link";

import { useEffect } from "react";

import Title1 from "@/components/general/Title1";
import Title2 from "@/components/general/Title2";
import { Button } from "@/components/ui/button";

import { PencilIcon } from "@heroicons/react/24/outline";

import { useAdminPanel } from "@/state/useAdminPanel";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { fetchAndSetBrands, brands } = useAdminPanel();
  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchAndSetBrands(),
  });
  if (brands.length === 0) return <div>loading...</div>;

  return (
    <div>
      <Title1>brands</Title1>
      <div className="flex flex-col justify-between gap-4">
        {/* <Title2>list of brands</Title2> */}
        <Link href="/admin/brands/add">Add Brand</Link>
        {brands.map((brand: any) => {
          return (
            <div
              key={brand.id}
              className="flex items-center justify-between gap-4 rounded bg-slate-800 px-4 py-2"
            >
              {brand.name}
              <Link
                href={`/admin/brands/edit/${brand.id}`}
                className="rounded bg-slate-700 p-2"
              >
                <PencilIcon className=" size-5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
