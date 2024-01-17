"use client";

import Link from "next/link";

import Title1 from "@/components/general/Title1";

import { PencilIcon } from "@heroicons/react/24/outline";

import { fetchCategories } from "@/app/admin/utils/fetchFunctions";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchCategories(),
  });
  if (!data || data.length === 0) return <div>loading...</div>;

  return (
    <div>
      <Title1>Categories</Title1>
      <div className="flex flex-col justify-between gap-4">
        {/* <Title2>list of brands</Title2> */}
        <Link href="/admin/categories/add">Add Category</Link>
        {data.map((category: any) => {
          return (
            <div
              key={category.id}
              className="flex items-center justify-between gap-4 rounded bg-slate-800 px-4 py-2"
            >
              {category.name}
              <Link
                href={`/admin/categories/edit/${category.id}`}
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
