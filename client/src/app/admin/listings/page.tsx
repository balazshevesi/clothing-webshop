"use client";

import Link from "next/link";

import { useEffect } from "react";

import Title1 from "@/components/general/Title1";

import { PencilIcon } from "@heroicons/react/24/outline";

import { useAdminPanel } from "@/state/useAdminPanel";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { fetchAndSetListings, listings } = useAdminPanel();
  const { isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetchAndSetListings(),
  });
  if (listings.length === 0) return <div>loading...</div>;
  return (
    <div>
      <Title1>Listings</Title1>
      <div className="flex flex-col justify-between gap-4">
        {/* <Title2>list of brands</Title2> */}
        <Link href="/admin/listings/add">Add Listings</Link>
        {listings.map((category: any) => {
          return (
            <div
              key={category.id}
              className="flex items-center justify-between gap-4 rounded bg-slate-800 px-4 py-2"
            >
              {category.title}
              <Link
                href={`/admin/listings/edit/${category.id}`}
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
