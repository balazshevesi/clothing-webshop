import BrandForm from "../../BrandForm";

export default async function Page({
  params,
}: {
  params: { brandId: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/brand/${params.brandId}`,
    { cache: "no-store" },
  );
  const data = await response.json();

  if (JSON.stringify(data) === "{}") return;

  return <BrandForm brandData={data.content} />;
}
