import ListingForm from "../../ListingForm";

export default async function Page({
  params,
}: {
  params: { listingId: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/listing/${params.listingId}`,
    { cache: "no-store" },
  );
  const data = await response.json();

  if (JSON.stringify(data) === "{}") return;

  return <ListingForm listingContent={data.content} />;
}
