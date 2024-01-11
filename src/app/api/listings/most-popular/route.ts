//! doesn't work yet
import { NextResponse, NextRequest } from "next/server";

import { articles, listings } from "../../../../../drizzle/schema";
import getDatabase from "../../utils/getDatabase";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const db = await getDatabase();

  let content;
  try {
    content = await db.select().from(listings).limit(5);
    // articles = await db.query.listings.findMany({
    //   limit: 5,
    //   with: {
    //     articl
    //   }
    // });
    const defaultArticlePromises = content.map(
      async (listing) =>
        await db
          .select()
          .from(articles)
          .where(eq(articles.id, +listing.articleIdDefault!)),
    );
    const defaultArticles = await Promise.all(defaultArticlePromises);

    content = content.map((item, i) => {
      const frozenItem = { ...item };
      frozenItem.defaultArticle = defaultArticles[i][0];
      return frozenItem;
    });
  } catch {}
  db.disconnect();
  return NextResponse.json({ content: content }, { status: 200 });
}
