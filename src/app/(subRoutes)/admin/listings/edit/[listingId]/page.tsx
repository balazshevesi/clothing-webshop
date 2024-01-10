import ListingForm from "../../ListingForm";

export default async function Page({
  params,
}: {
  params: { listingId: string };
}) {
  const response = await fetch(
    `${process.env.HOST}/api/listing/${params.listingId}`,
    { cache: "no-store" },
  );
  const data = await response.json();

  if (JSON.stringify(data) === "{}") return;

  console.log("datadata", data);

  return <ListingForm listingContent={data.content} />;
}
