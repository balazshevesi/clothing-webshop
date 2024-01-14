import Link from "next/link";

import Title1 from "@/components/general/Title1";

import { PencilIcon } from "@heroicons/react/24/outline";

export default async function Page() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/listings`,
    {
      cache: "no-store",
    },
  );
  const data = await response.json();
  const content = data.content;
  return (
    <div>
      <Title1>Listings</Title1>
      <div className="flex flex-col justify-between gap-4">
        {/* <Title2>list of brands</Title2> */}
        <Link href="/admin/listings/add">Add Listings</Link>
        {content.map((category: any) => {
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
