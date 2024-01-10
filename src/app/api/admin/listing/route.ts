import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import {
  articleListingRelations,
  brands,
  categories,
  listings,
  users,
} from "../../../../../drizzle/schema";
import getDatabase from "../../utils/getDatabase";
import getIsAdmin from "../../utils/getIsAdmin";

export interface Body {
  title: string;
  includedArticles: any[];
  defaultArticle: any;
  image: string;
  description: string;
}

export async function POST(request: Request) {
  const { title, includedArticles, defaultArticle, image, description }: Body =
    await request.json();

  // parse(GenericInputSchema, name);
  // parse(GenericInputSchema, image);
  // parse(GenericInputSchema, description);

  const db = await getDatabase();
  const headersList = headers();
  const isAdmin = getIsAdmin(db, headersList);
  if (!isAdmin) {
    db.disconnect();
    return NextResponse.json({}, { status: 401 });
  }

  try {
    const [listingInsert] = await db.insert(listings).values({
      title,
      description,
      articleIdDefault: defaultArticle.id,
      imagePath: image,
    });
    const listingId = listingInsert.insertId;

    const listingRelations = includedArticles.map((article) => ({
      listingId,
      articleId: article.id,
    }));
    await db.insert(articleListingRelations).values(listingRelations);
    
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }

  return NextResponse.json({ status: 200 });
}
