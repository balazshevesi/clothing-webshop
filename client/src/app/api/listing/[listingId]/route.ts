import { NextResponse, NextRequest } from "next/server";

import {
  articleImages,
  articles,
  categories,
  listings,
} from "../../../../../drizzle/schema";
import getDatabase from "../../utils/getDatabase";
import { articleListingRelations } from "./../../../../../drizzle/schema";
import { articleImagesRelations } from "./../../../../../drizzle/schemaRelations";
import { eq, sql } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { listingId: string } },
) {
  const db = await getDatabase();
  const listingId = +params.listingId;

  let content: any;
  try {
    // const [listingSelect] = await db
    //   .select()
    //   .from(listings)
    //   .where(eq(listings.id, listingId));
    content = await db.query.listings.findFirst({
      where: (listings, { eq }) => eq(listings.id, listingId),
      with: {
        articleListingRelations: true,
      },
    });
    const listOfArticleIds = content?.articleListingRelations.map(
      (listingRelation: any) => listingRelation.articleId,
    );

    //^not a preformant soulution, this could've been one query, but whatever
    const listOfArticlesPromises = listOfArticleIds.map(
      async (articleId: number) =>
        // (await db.select().from(articles).where(eq(articles.id, articleId)))[0],
        await db.query.articles.findFirst({
          where: eq(articles.id, articleId),
          with: {
            articleImages: true,
            articleProperties: true,
          },
        }),
    );
    const listOfArticles = await Promise.all(listOfArticlesPromises);
    content.articles = listOfArticles;
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
    return NextResponse.json({ content }, { status: 200 });
  }
}
