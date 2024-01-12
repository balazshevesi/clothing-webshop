import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import {
  articles,
  brands,
  categories,
  users,
} from "../../../../drizzle/schema";
import getDatabase from "../utils/getDatabase";
import { GenericInputSchema } from "@/inputValidation/schema";
import { eq } from "drizzle-orm";
import { parse, string } from "valibot";

export interface Body {
  name: string;
  image: string;
  description: string;
}

export async function GET(request: Request) {
  const db = await getDatabase();

  try {
    // const articlesSelect = await db.select().from(articles);
    const articlesSelect = await db.query.articles.findMany({
      with: {
        articleImages: true,
      },
    });
    const articleSelectImagesMapped = articlesSelect.map((article) => {
      const frozenArticle = { ...article };
      frozenArticle.images = article.articleImages.map(
        (imageObject: any) => imageObject.imagePath,
      );
      return frozenArticle;
    });
    return NextResponse.json(
      { content: articleSelectImagesMapped },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }
}
