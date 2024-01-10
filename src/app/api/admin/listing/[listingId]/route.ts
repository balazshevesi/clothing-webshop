import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import {
  articleListingRelations,
  brands,
  categories,
  listings,
  users,
} from "../../../../../../drizzle/schema";
import { articleImagesRelations } from "../../../../../../drizzle/schemaRelations";
import getDatabase from "@/app/api/utils/getDatabase";
import getIsAdmin from "@/app/api/utils/getIsAdmin";
import { GenericInputSchema } from "@/inputValidation/schema";
import { eq } from "drizzle-orm";
import { parse, string } from "valibot";

export interface Body {
  title: string;
  includedArticles: any[];
  defaultArticle: any;
  image: string;
  description: string;
}

export async function PUT(
  request: Request,
  { params }: { params: { listingId: string } },
) {
  const listingId = +params.listingId;

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
    await db
      .update(listings)
      .set({
        title,
        description,
        imagePath: image,
        articleIdDefault: defaultArticle.id,
      })
      .where(eq(listings.id, listingId));

    //^ should be a transation
    //delete
    await db
      .delete(articleListingRelations)
      .where(eq(articleListingRelations.listingId, listingId));
    //insert
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
  return NextResponse.json({}, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { listingId: string } },
) {
  const listingId = +params.listingId;

  const db = await getDatabase();
  const headersList = headers();
  const isAdmin = getIsAdmin(db, headersList);
  if (!isAdmin) {
    db.disconnect();
    return NextResponse.json({}, { status: 401 });
  }

  try {
    await db.delete(listings).where(eq(listings.id, listingId));
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }

  return NextResponse.json({}, { status: 200 });
}
