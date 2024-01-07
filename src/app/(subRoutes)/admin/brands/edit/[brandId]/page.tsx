import BrandForm from "../../BrandForm";

export default async function Page({
  params,
}: {
  params: { brandId: string };
}) {
  const response = await fetch(
    `${process.env.HOST}/api/brand/${params.brandId}`,
  );
  const data = await response.json();

  return <BrandForm data={data.content} />;
}
