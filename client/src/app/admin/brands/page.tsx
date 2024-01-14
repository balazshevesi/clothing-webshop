import Link from "next/link";

import Title1 from "@/components/general/Title1";
import Title2 from "@/components/general/Title2";
import { Button } from "@/components/ui/button";

import { PencilIcon } from "@heroicons/react/24/outline";

export default async function Page() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/brands`,
    {
      cache: "no-store",
    },
  );
  const data = await response.json();
  const content = data.content;
  return (
    <div>
      <Title1>brands</Title1>
      <div className="flex flex-col justify-between gap-4">
        {/* <Title2>list of brands</Title2> */}
        <Link href="/admin/brands/add">Add Brand</Link>
        {content.map((brand: any) => {
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
