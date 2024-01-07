import Link from "next/link";

import Title1 from "@/components/general/Title1";
import Title2 from "@/components/general/Title2";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <Title1>brands</Title1>
      <div className=" flex justify-between gap-4">
        {/* <Title2>list of brands</Title2> */}
        <Link href="/admin/brands/add">Add Brand</Link>
      </div>
    </div>
  );
}
