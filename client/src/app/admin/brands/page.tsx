"use client";

import Link from "next/link";

import Title1 from "@/components/general/Title1";

import { PencilIcon } from "@heroicons/react/24/outline";

import { fetchBrands } from "../utils/fetchFunctions";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchBrands(),
  });
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <Title1>brands</Title1>
      <div className="flex flex-col justify-between gap-4">
        {/* <Title2>list of brands</Title2> */}
        <Link href="/admin/brands/add">Add Brand</Link>
        {data.map((brand: any) => {
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
