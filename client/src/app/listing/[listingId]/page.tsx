import MostPopular from "@/components/MostPopular";

import Content from "./Content";

export default async function Page({
  params,
}: {
  params: { listingId: string };
}) {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/listing/${params.listingId}`,
    { cache: "no-store" },
  );
  const listing = (await response.json()).content;

  return (
    <>
      <Content listing={listing} />
      <MostPopular />
    </>
  );
}
