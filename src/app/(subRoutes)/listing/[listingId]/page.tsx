import MostPopular from "@/components/MostPopular";

import Content from "./Content";

export default async function Page({
  params,
}: {
  params: { listingId: string };
}) {
  const response: any = await fetch(
    `${process.env.HOST}/api/listing/${params.listingId}`,
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
