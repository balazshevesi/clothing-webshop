import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import {
  articleImages,
  articleProperties,
  articles,
  brands,
  categories,
  users,
} from "../../../../../../drizzle/schema";
import getDatabase from "@/app/api/utils/getDatabase";
import getIsAdmin from "@/app/api/utils/getIsAdmin";
import { GenericInputSchema } from "@/inputValidation/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { parse, string } from "valibot";

export interface Body {
  name: string;
  price: string;
  quantityInStock: number;
  brand: string;
  category: string;
  description: string;
  garmentCare: string;
  images: string[];
  size: "XS" | "S" | "M" | "L" | "XL";
  color: string;
}

export async function PUT(
  request: Request,
  { params }: { params: { articleId: string } },
) {
  const articleIdParam = +params.articleId;

  const {
    name,
    price,
    quantityInStock,
    brand,
    category,
    description,
    garmentCare,
    images,
    size,
    color,
  }: Body = await request.json();

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
    // find brand id from brand name
    const [brandSelect] = await db
      .select({ id: brands.id })
      .from(brands)
      .where(eq(brands.name, brand));
    const brandId = brandSelect.id;

    // find category id from brand name
    const [categorySelect] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.name, category));
    const categoryId = categorySelect.id;

    // update article
    const [updatedArticle] = await db
      .update(articles)
      .set({
        name,
        price,
        quantityInStock,
        description,
        garmentCare,
        brandId,
        categoryId,
      })
      .where(eq(articles.id, articleIdParam));

    // get article id
    const [articleSelect] = await db
      .select({ id: articles.id })
      .from(articles)
      .where(eq(articles.name, name));
    const articleId = categorySelect.id;

    // update article props
    const [articlePropsUpdate] = await db
      .update(articleProperties)
      .set({
        size,
        color,
      })
      .where(eq(articleProperties.id, articleId));

    // should actually be a transaction
    // delete article images
    await db.delete(articleImages).where(eq(articleImages.id, articleId));

    // insert article images
    const values = images.map((image) => {
      return { imagePath: image, articleId };
    });
    await db.insert(articleImages).values(values);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }
  return NextResponse.json({ status: 200 });
}
export async function DELETE(
  request: Request,
  { params }: { params: { articleId: string } },
) {
  const articleId = +params.articleId;

  const db = await getDatabase();
  const headersList = headers();
  const isAdmin = getIsAdmin(db, headersList);
  if (!isAdmin) {
    db.disconnect();
    return NextResponse.json({}, { status: 401 });
  }

  try {
    await db.delete(articles).where(eq(articles.id, articleId));
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }
  return NextResponse.json({}, { status: 200 });
}
