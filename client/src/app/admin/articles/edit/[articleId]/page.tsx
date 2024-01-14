import ArticleForm from "../../ArticleForm";

export default async function Page({
  params,
}: {
  params: { articleId: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/article/${params.articleId}`,
    { cache: "no-store" },
  );
  const data = await response.json();

  if (JSON.stringify(data) === "{}") return;

  const articleData = data.content;
  return <ArticleForm ArticleData={articleData} />;
}
