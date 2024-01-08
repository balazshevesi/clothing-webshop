import ArticleForm from "../../ArticleForm";

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const response = await fetch(
    `${process.env.HOST}/api/article/${params.categoryId}`,
    { cache: "no-store" },
  );
  const data = await response.json();
  console.log("datadatadata", data);

  if (JSON.stringify(data) === "{}") return;

  return <ArticleForm categoryData={data.content} />;
}
