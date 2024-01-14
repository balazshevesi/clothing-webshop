import CategoryForm from "../../CategoryForm";

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/category/${params.categoryId}`,
    { cache: "no-store" },
  );
  const data = await response.json();

  if (JSON.stringify(data) === "{}") return;

  return <CategoryForm categoryData={data.content} />;
}