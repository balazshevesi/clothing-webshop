import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import { brands, categories } from "../../../../../drizzle/schema";
import getDatabase from "../../utils/getDatabase";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { articleId: string } },
) {
  console.log("getting articlee");
  const db = await getDatabase();
  const articleId = +params.articleId;

  let articleSelect;
  try {
    [articleSelect] = await db.query.articles.findMany({
      with: {
        articleImages: true,
        articleProperties: true,
      },
      where: (articles: { id: any; }, { eq }: any) => eq(articles.id, articleId),
    });
    const brandName = (
      await db
        .select({ name: brands.name })
        .from(brands)
        .where(eq(brands.id, +articleSelect.brandId!))
    )[0].name;
    const categoryName = (
      await db
        .select({ name: categories.name })
        .from(categories)
        .where(eq(categories.id, +articleSelect.categoryId!))
    )[0].name;
    articleSelect.category = categoryName;
    articleSelect.brand = brandName;
    articleSelect.images = articleSelect.articleImages.map(
      (image: any) => image.imagePath,
    );
    articleSelect.size = articleSelect.articleProperties[0].size;
    articleSelect.color = articleSelect.articleProperties[0].color;
    console.log("brandNamebrandName", brandName);
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
    return NextResponse.json({ content: articleSelect }, { status: 200 });
  }
}
