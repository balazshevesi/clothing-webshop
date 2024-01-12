import Link from "next/link";

import Title1 from "@/components/general/Title1";
import Title2 from "@/components/general/Title2";
import { Button } from "@/components/ui/button";

import { PencilIcon } from "@heroicons/react/24/outline";

export default async function Page() {
  const response = await fetch(`${process.env.HOST}/api/articles`, {
    cache: "no-store",
  });
  const data = await response.json();
  const content = data.content;
  return (
    <div>
      <Title1>Articles</Title1>
      <div className="flex flex-col justify-between gap-4">
        {/* <Title2>list of brands</Title2> */}
        <Link href="/admin/articles/add">Add Article</Link>
        {content.map((category: any) => {
          return (
            <div
              key={category.id}
              className="flex items-center justify-between gap-4 rounded bg-slate-800 px-4 py-2"
            >
              {category.name}
              <Link
                href={`/admin/articles/edit/${category.id}`}
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
