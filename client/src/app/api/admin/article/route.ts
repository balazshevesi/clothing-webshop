import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import getDatabase from "../../utils/getDatabase";
import getIsAdmin from "../../utils/getIsAdmin";
import {
  articleImages,
  articleProperties,
  articles,
  brands,
  categories,
  users,
} from "./../../../../../drizzle/schema";
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

export async function POST(request: Request) {
  const body: Body = await request.json();

  // parse(GenericInputSchema, body.name);
  // parse(GenericInputSchema, image);
  // parse(GenericInputSchema, description);

  const db = await getDatabase();
  const headersList = headers();
  const isAdmin = getIsAdmin(db, headersList);
  if (!isAdmin) {
    await db.disconnect();
    return NextResponse.json({}, { status: 401 });
  }

  try {
    // find brand id from brand name
    const [brandSelect] = await db
      .select({ id: brands.id })
      .from(brands)
      .where(eq(brands.name, body.brand));
    const brandId = brandSelect.id;

    // find category id from brand name
    const [categorySelect] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.name, body.category));
    const categoryId = categorySelect.id;

    // insert article
    const [articleInsert] = await db.insert(articles).values({
      name: body.name,
      price: body.price,
      quantityInStock: body.quantityInStock,
      description: body.description,
      garmentCare: body.garmentCare,
      brandId: body.brandId,
      categoryId: body.categoryId,
    });
    const articleId = articleInsert.insertId;

    // insert article props
    const [articlePropsInsert] = await db
      .insert(articleProperties)
      .values({ size, color, articleId });

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
}
