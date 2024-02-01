import {
  articleImagesRelations,
  articlesRelations,
} from "./../drizzle/schemaRelations";
import {
  articleImages,
  articleProperties,
  articles,
} from "./../drizzle/schema";
import bcrypt from "bcrypt";

import { Hono } from "hono";
import { cors } from "hono/cors";
import * as jose from "jose";

import {
  articleImages as articleImagesTbl,
  articleListingRelations as articleListingRelationsTbl,
  articleProperties as articlePropertiesTbl,
  articles as articlesTbl,
  brands as brandsTbl,
  carts as cartsTbl,
  categories as categoriesTbl,
  guestUsers as guestUsersTbl,
  listings as listingsTbl,
  users as usersTbl,
  cartItems as cartItemsTbl,
  favItems as favItemsTbl,
  plannedSales as plannedSalesTbl,
  articlePlannedSalesRelations as articlePlannedSalesRelationsTbl,
} from "../drizzle/schema";

import {
  and,
  asc,
  count,
  desc,
  eq,
  exists,
  gte,
  like,
  lt,
  lte,
  or,
} from "drizzle-orm";
import getDatabase from "./utils/getDatabase";
import getTimeStamp from "./utils/getTimestamp";
import getAndValidateUser from "./utils/getAndValidateUser";
import getAndValidateGuestUser from "./utils/getAndValidateGuestUser";
import convertToTimestamp from "./utils/convertToTimestamp";

const app = new Hono();

app.use("*", cors({ origin: "*" }));
// app.options("*", (c) => {
//   return c.text("", 204);
// });

//~ define routes

//admin stuffs
const adminRoutes = new Hono();
adminRoutes.use(async (c, next) => {
  const authHeader = c.req.header("userAuth");
  if (!authHeader) {
    c.status(401);
    return c.json({});
  }

  const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
  const { payload } = JSON.parse(
    JSON.stringify(await jose.jwtVerify(authHeader, encodedKey))
  );
  const db = await getDatabase();
  const [userInfo] = await db
    .select({
      isAdmin: usersTbl.isAdmin,
    })
    .from(usersTbl)
    .where(eq(usersTbl.id, payload.userId));

  if (!userInfo || !userInfo.isAdmin) {
    c.status(401);
    return c.json({});
  }
  await next();
});

// admin articles
interface ArticleBody {
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
adminRoutes.post("/article", async (c) => {
  const db = await getDatabase();
  const body: ArticleBody = await c.req.json();

  const [brandSelect] = await db
    .select({ id: brandsTbl.id })
    .from(brandsTbl)
    .where(eq(brandsTbl.name, body.brand));
  const brandId = brandSelect.id;

  // find category id from brand name
  const [categorySelect] = await db
    .select({ id: categoriesTbl.id })
    .from(categoriesTbl)
    .where(eq(categoriesTbl.name, body.category));
  const categoryId = categorySelect.id;

  // insert article
  const [articleInsert] = await db.insert(articlesTbl).values({
    name: body.name,
    price: body.price,
    quantityInStock: body.quantityInStock,
    description: body.description,
    garmentCare: body.garmentCare,
    brandId: brandId,
    categoryId: categoryId,
  });
  const articleId = articleInsert.insertId;

  // insert article props
  const [articlePropsInsert] = await db
    .insert(articlePropertiesTbl)
    .values({ size: body.size, color: body.color, articleId });

  // insert article images
  const values = body.images.map((image) => {
    return { imagePath: image, articleId };
  });
  await db.insert(articleImagesTbl).values(values);

  return c.json({});
});

adminRoutes.put("/article/:articleId", async (c) => {
  const db = await getDatabase();
  const body: ArticleBody = await c.req.json();
  const { articleId } = c.req.param();

  // find brand id from brand name
  const [brandSelect] = await db
    .select({ id: brandsTbl.id })
    .from(brandsTbl)
    .where(eq(brandsTbl.name, body.brand));
  const brandId = brandSelect.id;

  // find category id from brand name
  const [categorySelect] = await db
    .select({ id: categoriesTbl.id })
    .from(categoriesTbl)
    .where(eq(categoriesTbl.name, body.category));
  const categoryId = categorySelect.id;

  // update article
  const [updatedArticle] = await db
    .update(articlesTbl)
    .set({
      name: body.name,
      price: body.price,
      quantityInStock: body.quantityInStock,
      description: body.description,
      garmentCare: body.garmentCare,
      brandId: brandId,
      categoryId: categoryId,
    })
    .where(eq(articlesTbl.id, +articleId));

  // update article props
  const [articlePropsUpdate] = await db
    .update(articlePropertiesTbl)
    .set({
      size: body.size,
      color: body.color,
    })
    .where(eq(articlePropertiesTbl.articleId, +articleId));

  // should actually be a transaction
  // delete article images
  await db
    .delete(articleImagesTbl)
    .where(eq(articleImagesTbl.articleId, +articleId));

  // insert article images
  const values = body.images.map((image) => {
    return { imagePath: image, articleId: +articleId };
  });
  await db.insert(articleImagesTbl).values(values);

  return c.json({});
});

adminRoutes.delete("/article/:articleId", async (c) => {
  const db = await getDatabase();
  const { articleId } = c.req.param();
  await db.delete(articlesTbl).where(eq(articlesTbl.id, +articleId));
  return c.json({});
});

// admin brands
interface BrandBody {
  name: string;
  image: string;
  description: string;
}
adminRoutes.post("/brand", async (c) => {
  const db = await getDatabase();
  const body: BrandBody = await c.req.json();
  await db.insert(brandsTbl).values({
    name: body.name,
    image: body.image,
    description: body.description,
  });
  return c.json({});
});
adminRoutes.put("/brand/:brandId", async (c) => {
  const db = await getDatabase();
  const { brandId } = c.req.param();
  const body: BrandBody = await c.req.json();
  const [brandsUpdate] = await db
    .update(brandsTbl)
    .set({
      name: body.name,
      description: body.description,
      image: body.image,
    })
    .where(eq(brandsTbl.id, +brandId));
  return c.json({});
});
adminRoutes.delete("/brand/:brandId", async (c) => {
  const db = await getDatabase();
  const { brandId } = c.req.param();
  await db.delete(brandsTbl).where(eq(brandsTbl.id, +brandId));
  return c.json({});
});

// admin categories
interface CategoryBody {
  name: string;
  image: string;
  description: string;
}
adminRoutes.post("/category", async (c) => {
  const db = await getDatabase();
  const body: CategoryBody = await c.req.json();
  await db.insert(categoriesTbl).values({
    name: body.name,
    image: body.image,
    description: body.description,
  });
  return c.json({});
});
adminRoutes.put("/category/:categoryId", async (c) => {
  const db = await getDatabase();
  const { categoryId } = c.req.param();
  const body: CategoryBody = await c.req.json();
  await db
    .update(categoriesTbl)
    .set({ name: body.name, description: body.description, image: body.image })
    .where(eq(categoriesTbl.id, +categoryId));
  return c.json({});
});
adminRoutes.delete("/category/:categoryId", async (c) => {
  const db = await getDatabase();
  const { categoryId } = c.req.param();
  await db.delete(categoriesTbl).where(eq(categoriesTbl.id, +categoryId));
  return c.json({});
});

// admin listings
interface ListingBody {
  title: string;
  includedArticles: any[];
  defaultArticle: any;
  image: string;
  description: string;
}
adminRoutes.post("/listing", async (c) => {
  const db = await getDatabase();
  const body: ListingBody = await c.req.json();

  const [listingInsert] = await db.insert(listingsTbl).values({
    title: body.title,
    description: body.description,
    articleIdDefault: body.defaultArticle.id,
    imagePath: body.image,
  });
  const listingId = listingInsert.insertId;

  const listingRelations = body.includedArticles.map((article) => ({
    listingId,
    articleId: article.id,
  }));
  await db.insert(articleListingRelationsTbl).values(listingRelations);

  return c.json({});
});
adminRoutes.put("/listing/:listingId", async (c) => {
  const db = await getDatabase();
  const { listingId } = c.req.param();
  const body: ListingBody = await c.req.json();

  await db
    .update(listingsTbl)
    .set({
      title: body.title,
      description: body.description,
      imagePath: body.image,
      articleIdDefault: body.defaultArticle.id,
    })
    .where(eq(listingsTbl.id, +listingId));

  //^ should be a transation
  //delete
  await db
    .delete(articleListingRelationsTbl)
    .where(eq(articleListingRelationsTbl.listingId, +listingId));
  //insert
  const listingRelations = body.includedArticles.map((article) => ({
    listingId: +listingId,
    articleId: article.id,
  }));
  await db.insert(articleListingRelationsTbl).values(listingRelations);
  return c.json({});
});
adminRoutes.delete("/listing/:listingId", async (c) => {
  const db = await getDatabase();
  const { listingId } = c.req.param();
  await db.delete(listingsTbl).where(eq(listingsTbl.id, +listingId));
  return c.json({});
});

interface plannedSaleArticle {
  articleId: number;
  newPrice: number;
}
interface PlannedSales {
  startTime: Date;
  endTime: Date;
  name: string;
  announcementTitle: string;
  includedArticleIds: plannedSaleArticle[];
}
adminRoutes.post("/planned-sale", async (c) => {
  const db = await getDatabase();
  const body: PlannedSales = await c.req.json();
  console.log("bodybodybody", body);

  const [insertedPlannedSale] = await db.insert(plannedSalesTbl).values({
    startTime: convertToTimestamp(body.startTime),
    endTime: convertToTimestamp(body.endTime),
    name: body.name,
    announcementTitle: body.announcementTitle,
  });
  console.log("insertedPlannedSale.insertId", insertedPlannedSale.insertId);
  const plannedSalesRelations = body.includedArticleIds.map((article) => ({
    plannedSaleId: +insertedPlannedSale.insertId,
    newPrice: "" + article.newPrice,
    articleId: +article.articleId,
  }));
  await db
    .insert(articlePlannedSalesRelationsTbl)
    .values(plannedSalesRelations);
  return c.json({});
});
adminRoutes.put("/planned-sale/:plannedSaleId", async (c) => {
  const db = await getDatabase();
  const body: PlannedSales = await c.req.json();
  const { plannedSaleId } = c.req.param();

  const [updatedPlannedSale] = await db
    .update(plannedSalesTbl)
    .set({
      startTime: convertToTimestamp(body.startTime),
      endTime: convertToTimestamp(body.endTime),
      name: body.name,
      announcementTitle: body.announcementTitle,
    })
    .where(eq(plannedSalesTbl.id, +plannedSaleId));

  if (body.includedArticleIds.length > 0) {
    const plannedSalesRelations = body.includedArticleIds.map((article) => ({
      plannedSaleId: +plannedSaleId,
      newPrice: "" + article.newPrice,
      articleId: +article.articleId,
    }));
    await db
      .delete(articlePlannedSalesRelationsTbl)
      .where(eq(articlePlannedSalesRelationsTbl.plannedSaleId, +plannedSaleId));
    await db
      .insert(articlePlannedSalesRelationsTbl)
      .values(plannedSalesRelations);
  }

  return c.json({});
});
adminRoutes.delete("/planned-sale/:plannedSaleId", async (c) => {
  const db = await getDatabase();
  const { plannedSaleId } = c.req.param();
  await db
    .delete(plannedSalesTbl)
    .where(eq(plannedSalesTbl.id, +plannedSaleId));
  return c.json({});
});

adminRoutes.get("/", (c) => c.json({}));

app.route("/admin", adminRoutes);

//articles
app.get("/article/:articleId", async (c) => {
  const db = await getDatabase();
  const { articleId } = c.req.param();

  const [articleSelect]: any = await db.query.articles.findMany({
    with: {
      articleImages: true,
      articleProperties: true,
    },
    where: (articles, { eq }) => eq(articles.id, +articleId),
  });
  const brandName = (
    await db
      .select({ name: brandsTbl.name })
      .from(brandsTbl)
      .where(eq(brandsTbl.id, +articleSelect.brandId!))
  )[0].name;

  const categoryName = (
    await db
      .select({ name: categoriesTbl.name })
      .from(categoriesTbl)
      .where(eq(categoriesTbl.id, +articleSelect.categoryId!))
  )[0].name;

  //asign more stuffs
  articleSelect.category = categoryName;
  articleSelect.brand = brandName;
  articleSelect.images = articleSelect.articleImages.map(
    (image: any) => image.imagePath
  );
  articleSelect.size = articleSelect.articleProperties[0].size;
  articleSelect.color = articleSelect.articleProperties[0].color;

  return c.json({ content: articleSelect });
});
app.get("/articles", async (c) => {
  const db = await getDatabase();

  // const articlesSelect = await db.select().from(articles);
  const articlesSelect = await db.query.articles.findMany({
    with: {
      articleImages: true,
    },
  });
  const articleSelectImagesMapped = articlesSelect.map((article: any) => {
    const frozenArticle = { ...article };
    frozenArticle.images = article.articleImages.map(
      (imageObject: any) => imageObject.imagePath
    );
    return frozenArticle;
  });

  return c.json({ content: articleSelectImagesMapped });
});

//brands
app.get("/brand/:brandId", async (c) => {
  const db = await getDatabase();
  const { brandId } = c.req.param();
  const [brandsSelect] = await db
    .select()
    .from(brandsTbl)
    .where(eq(brandsTbl.id, +brandId));
  return c.json({ content: brandsSelect });
});
app.get("/brands", async (c) => {
  const db = await getDatabase();
  const brandsSelect = await db.select().from(brandsTbl);
  return c.json({ content: brandsSelect });
});

//categories
app.get("/category/:categoryId", async (c) => {
  const db = await getDatabase();
  const { categoryId } = c.req.param();
  const [categorySelect] = await db
    .select()
    .from(categoriesTbl)
    .where(eq(categoriesTbl.id, +categoryId));
  return c.json({ content: categorySelect });
});
app.get("/categories", async (c) => {
  const db = await getDatabase();
  const caregoriesSelect = await db.select().from(categoriesTbl);
  return c.json({ content: caregoriesSelect });
});

//listings
app.get("/listing/:listingId", async (c) => {
  const db = await getDatabase();
  const { listingId } = c.req.param();
  const now = new Date();

  const content = await db.query.listings.findFirst({
    where: (listings, { eq }) => eq(listings.id, +listingId),
    with: {
      articles: {
        with: {
          articleImages: true,
          articleListingRelations: {
            with: {
              articles: {
                with: {
                  brands: true,
                  categories: true,
                  articleImages: true,
                  articleProperties: true,
                  articlePlannedSalesRelations: {
                    //! BUG , fix this
                    with: {
                      plannedSales: {
                        //@ts-ignore ts gives error, but it actually works just fine, dunno
                        where: and(
                          lte(
                            plannedSalesTbl.startTime,
                            convertToTimestamp(now)
                          ),
                          gte(plannedSalesTbl.endTime, convertToTimestamp(now))
                        ),
                        // where: ((users, { eq }) => eq(users.id, 1)),
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      articleListingRelations: {
        with: {
          articles: {
            with: {
              brands: true,
              categories: true,
              articleImages: true,
              articleProperties: true,
              articlePlannedSalesRelations: {
                with: {
                  plannedSales: {
                    //@ts-ignore ts gives error, but it actually works just fine, dunno
                    where: and(
                      lte(plannedSalesTbl.startTime, convertToTimestamp(now)),
                      gte(plannedSalesTbl.endTime, convertToTimestamp(now))
                    ),
                    // where: ((users, { eq }) => eq(users.id, 1)),
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  // const listOfArticleIds = content?.articleListingRelations.map(
  //   (listingRelation: any) => listingRelation.articleId
  // );

  // //^not a preformant soulution, this could've been one query, but whatever
  // const listOfArticlesPromises = listOfArticleIds!.map(
  //   async (articleId: number) =>
  //     // (await db.select().from(articles).where(eq(articles.id, articleId)))[0],
  //     await db.query.articles.findFirst({
  //       where: eq(articlesTbl.id, articleId),
  //       with: {
  //         articleImages: true,
  //         articleProperties: true,
  //       },
  //     })
  // );
  // const listOfArticles = await Promise.all(listOfArticlesPromises);
  // //@ts-ignore
  // content.articles = listOfArticles;

  return c.json({ content });
});

//article search
interface listingsSearch {
  searchWords: string;
  categoryIds: number[] | null;
  brandIds: number[] | null;
  fromPrice: number | null;
  toPrice: number | null;
  page: number;
  showOnlyInStock: boolean | null;
  orderBy: null | "name" | "priceLowToHigh" | "priceHighToLow";
  showListings: boolean | null;
  color: string | null;

  // brand: string;
  // category: string;
}

app.post("/articles/search", async (c) => {
  const db = await getDatabase();
  const body: listingsSearch = await c.req.json();

  const itemsPerPage = 9;
  const articleSelect =
    !body.showListings &&
    (await db.query.articles.findMany({
      limit: itemsPerPage,
      offset: (body.page - 1) * itemsPerPage,
      where: and(
        // makes sure only listed articles are returned
        exists(
          db
            .select()
            .from(articleListingRelationsTbl)
            .where(eq(articleListingRelationsTbl.articleId, articlesTbl.id))
        ),
        or(
          // searches namn of the article
          and(
            ...body.searchWords
              .split(" ")
              .map((searchWord: string) =>
                like(articlesTbl.name, `%${searchWord}%`)
              )
          ),
          // searches description of the article
          and(
            ...body.searchWords
              .split(" ")
              .map((searchWord: string) =>
                like(articlesTbl.description, `%${searchWord}%`)
              )
          ),
          // searches garment care of the article
          and(
            ...body.searchWords
              .split(" ")
              .map((searchWord: string) =>
                like(articlesTbl.garmentCare, `%${searchWord}%`)
              )
          ),
          // searches brand name of the article
          exists(
            db
              .select()
              .from(brandsTbl)
              .where(
                and(
                  ...body.searchWords
                    .split(" ")
                    .map((searchWord: string) =>
                      like(brandsTbl.name, `%${searchWord}%`)
                    )
                )
              )
          ),
          // searches brand description of the article
          exists(
            db
              .select()
              .from(brandsTbl)
              .where(
                and(
                  ...body.searchWords
                    .split(" ")
                    .map((searchWord: string) =>
                      like(brandsTbl.description, `%${searchWord}%`)
                    )
                )
              )
          )
        ),
        body.categoryIds
          ? or(
              ...body.categoryIds.map((categoryId) =>
                eq(articlesTbl.categoryId, +categoryId)
              )
            )
          : undefined,

        body.brandIds
          ? or(
              ...body.brandIds.map((brandId) =>
                eq(articlesTbl.brandId, +brandId)
              )
            )
          : undefined,

        body.color
          ? exists(
              db
                .select()
                .from(articlePropertiesTbl)
                .where(
                  and(
                    eq(articlePropertiesTbl.id, articlesTbl.id),
                    eq(articleProperties.color, body.color)
                  )
                )
            )
          : undefined,

        gte(articlesTbl.price, "" + body.fromPrice),
        body.toPrice ? lte(articlesTbl.price, "" + body.toPrice) : undefined,
        gte(articlesTbl.quantityInStock, !!body.showOnlyInStock ? 1 : 0)
      ),
      orderBy:
        body.orderBy === "name"
          ? asc(articlesTbl.name)
          : body.orderBy === "priceLowToHigh"
          ? asc(articlesTbl.price)
          : body.orderBy === "priceHighToLow"
          ? desc(articlesTbl.price)
          : undefined,
      with: {
        articleImages: true,
        articleProperties: true,
        brands: true,
        categories: true,
        articleListingRelations: { with: { listings: true } },
        articlePlannedSalesRelations: { with: { plannedSales: true } },
      },
    }));

  //^ not very pretty, it would slow down as the database grows, but whatever
  const initialListingsSelect =
    !!body.showListings &&
    (await db.query.listings.findMany({
      with: {
        articles: {
          with: {
            articlePlannedSalesRelations: { with: { plannedSales: true } },
          },
        },

        // where: (articles) => articles.categoryId.in(body.categoryIds),
      },
      where: and(
        // If you need to search by listings' title or description
        or(
          ...body.searchWords
            .split(" ")
            .map((searchWord: string) =>
              like(listingsTbl.title, `%${searchWord}%`)
            ),
          ...body.searchWords
            .split(" ")
            .map((searchWord: string) =>
              like(listingsTbl.description, `%${searchWord}%`)
            )
        )
      ),
    }));
  const listingSelectFilteredForBrands =
    !!body.showListings &&
    //@ts-ignore
    initialListingsSelect.filter((listing: any) => {
      if (body.brandIds && body.brandIds.length > 0)
        return body.brandIds?.includes(listing.articles?.brandId!);
      return true;
    });
  const listingSelectFilteredForBrandsAndCategory =
    !!body.showListings &&
    listingSelectFilteredForBrands
      .filter((listing: any) => {
        if (body.categoryIds && body.categoryIds.length > 0)
          return body.categoryIds?.includes(listing.articles?.categoryId!);
        return true;
      })
      .filter(
        (listing: any) =>
          +listing.articles!.price >= (body.fromPrice || 0) &&
          +listing.articles!.price <= (body.toPrice || 99999999)
      )
      //@ts-ignore
      .sort((a, b) => {
        if (body.orderBy === "priceLowToHigh")
          return +a.articles!.price - +b.articles!.price;
        else if (body.orderBy === "priceHighToLow")
          return +b.articles!.price - +a.articles!.price;
        else if (body.orderBy === "name" || !body.orderBy)
          a.title > b.title ? 1 : -1;
      })
      .slice(body.page * itemsPerPage - itemsPerPage, body.page * itemsPerPage);

  return c.json({
    content: body.showListings
      ? listingSelectFilteredForBrandsAndCategory
      : articleSelect,
    showingListings: body.showListings,
  });
});

app.get("/articles/count", async (c) => {
  const db = await getDatabase();
  const articlesSelect = await db.select({ value: count() }).from(articlesTbl);
  return c.json({ content: articlesSelect });
});

app.get("/listings", async (c) => {
  const db = await getDatabase();
  const listingsSelect = await db.select().from(listingsTbl);
  return c.json({ content: listingsSelect });
});

app.get("/listings/most-popular", async (c) => {
  const db = await getDatabase();
  const now = new Date();

  const content = await db.query.listings.findMany({
    limit: 5,
    with: {
      articles: {
        with: {
          articleImages: true,
          articlePlannedSalesRelations: {
            with: {
              plannedSales: {
                // @ts-ignore ts gives error, but it actually works just fine, dunno
                where: and(
                  lte(plannedSalesTbl.startTime, convertToTimestamp(now)),
                  gte(plannedSalesTbl.endTime, convertToTimestamp(now))
                ),
              },
            },
          },
        },
      },
      articleListingRelations: {
        with: { articles: { with: { articleImages: true } } },
      },
    },
  });

  return c.json({ content });
});

//planned-sales

app.get("/planned-sales", async (c) => {
  const db = await getDatabase();
  const plannedSalesSelect = await db.select().from(plannedSalesTbl);
  return c.json({ content: plannedSalesSelect });
});
app.get("/planned-sale/:plannedSaleId", async (c) => {
  const db = await getDatabase();
  const { plannedSaleId } = c.req.param();
  const plannedSalesSelect = await db.query.plannedSales.findFirst({
    where: eq(plannedSalesTbl.id, +plannedSaleId),
    with: {
      articlePlannedSalesRelations: {
        with: { articles: { with: { articleImages: true } } },
      },
    },
  });
  return c.json({ content: plannedSalesSelect });
});
app.get("/running-sales", async (c) => {
  const db = await getDatabase();
  const now = new Date();
  const runningsSalesSelect = await db
    .select()
    .from(plannedSalesTbl)
    .where(
      and(
        lte(plannedSalesTbl.startTime, convertToTimestamp(now)),
        gte(plannedSalesTbl.endTime, convertToTimestamp(now))
      )
    );
  return c.json({ content: runningsSalesSelect });
});

//users
app.get("/user/:userId", async (c) => {
  const db = await getDatabase();
  const { userId } = c.req.param();
  const authHeader = c.req.header("userAuth");
  if (!authHeader) return c.status(401);

  const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
  const { payload } = JSON.parse(
    JSON.stringify(await jose.jwtVerify(authHeader, encodedKey))
  );

  const [userInfo] = await db
    .select({
      id: usersTbl.id,
      firstName: usersTbl.firstName,
      lastName: usersTbl.lastName,
      email: usersTbl.email,
      phoneNumber: usersTbl.phoneNumber,
      isAdmin: usersTbl.isAdmin,
    })
    .from(usersTbl)
    .where(eq(usersTbl.id, +userId));

  if (payload.userId !== userInfo.id) return c.status(401);

  return c.json({ userInfo });
});

//cart
interface CartBody {
  articleId: string;
}
interface UpdateCount extends CartBody {
  newCount: string;
}
app.post("/user/:userId/cart/update-count", async (c) => {
  const db = await getDatabase();
  const body: UpdateCount = await c.req.json();
  const { userId } = c.req.param();
  const userAuth = c.req.header("userAuth");
  if (!userAuth) {
    c.status(401);
    return c.json({});
  }
  const user = await getAndValidateUser(userId, userAuth, db);
  const [cart] = await db
    .select()
    .from(cartsTbl)
    .where(eq(cartsTbl.userId, +userId));

  const itemAlredyExists =
    (
      await db
        .select()
        .from(cartItemsTbl)
        .where(
          and(
            eq(cartItemsTbl.cartId, cart.id),
            eq(cartItemsTbl.articleId, +body.articleId)
          )
        )
    ).length > 0;
  //handle adding new item
  if (!itemAlredyExists)
    await db.insert(cartItemsTbl).values({
      cartId: cart.id,
      articleId: +body.articleId,
      quantity: +body.newCount,
      addedAt: getTimeStamp(),
    });
  //handle updating count
  if (itemAlredyExists && +body.newCount !== 0) {
    await db
      .update(cartItemsTbl)
      .set({
        quantity: +body.newCount,
      })
      .where(
        and(
          eq(cartItemsTbl.cartId, cart.id),
          eq(cartItemsTbl.articleId, +body.articleId)
        )
      );
  }
  //handle delete
  if (+body.newCount === 0 && itemAlredyExists)
    await db
      .delete(cartItemsTbl)
      .where(
        and(
          eq(cartItemsTbl.cartId, cart.id),
          eq(cartItemsTbl.articleId, +body.articleId)
        )
      );
  return c.json({});
});
app.get("/user/:userId/cart", async (c) => {
  const db = await getDatabase();
  const { userId } = c.req.param();
  const userAuth = c.req.header("userAuth");
  if (!userAuth) {
    c.status(401);
    return c.json({});
  }
  const user = await getAndValidateUser(userId, userAuth, db);
  const cart = await db.query.carts.findFirst({
    where: (cart, { eq }) => eq(cart.userId, +userId),
    with: {
      cartItems: { with: { articles: { with: { articleImages: true } } } },
    },
  });
  return c.json({ content: cart });
});

app.post("/guest-user/:guestUserId/cart/update-count", async (c) => {
  const db = await getDatabase();
  const body: UpdateCount = await c.req.json();
  const { guestUserId } = c.req.param();
  const guestUserAuth = c.req.header("guestUserAuth");
  if (!guestUserAuth) {
    c.status(401);
    return c.json({});
  }
  const user = await getAndValidateGuestUser(guestUserId, guestUserAuth, db);
  const [cart] = await db
    .select()
    .from(cartsTbl)
    .where(eq(cartsTbl.guestUserId, +guestUserId));

  const itemAlredyExists =
    (
      await db
        .select()
        .from(cartItemsTbl)
        .where(
          and(
            eq(cartItemsTbl.cartId, cart.id),
            eq(cartItemsTbl.articleId, +body.articleId)
          )
        )
    ).length > 0;
  //handle adding new item
  if (!itemAlredyExists)
    await db.insert(cartItemsTbl).values({
      cartId: cart.id,
      articleId: +body.articleId,
      quantity: +body.newCount,
      addedAt: getTimeStamp(),
    });
  //handle updating count
  if (itemAlredyExists && +body.newCount !== 0) {
    await db
      .update(cartItemsTbl)
      .set({
        quantity: +body.newCount,
      })
      .where(
        and(
          eq(cartItemsTbl.cartId, cart.id),
          eq(cartItemsTbl.articleId, +body.articleId)
        )
      );
  }
  //handle delete
  if (+body.newCount === 0 && itemAlredyExists)
    await db
      .delete(cartItemsTbl)
      .where(
        and(
          eq(cartItemsTbl.cartId, cart.id),
          eq(cartItemsTbl.articleId, +body.articleId)
        )
      );
  return c.json({});
});
app.get("/guest-user/:guestUserId/cart", async (c) => {
  const db = await getDatabase();
  const { guestUserId } = c.req.param();
  const guestUserAuth = c.req.header("guestUserAuth");
  if (!guestUserAuth) {
    c.status(401);
    return c.json({});
  }
  const user = await getAndValidateUser(guestUserId, guestUserAuth, db);
  const cart = await db.query.carts.findFirst({
    where: (cart, { eq }) => eq(cart.guestUserId, +guestUserId),
    with: {
      cartItems: { with: { articles: { with: { articleImages: true } } } },
    },
  });
  return c.json({ content: cart });
});

//favs
interface FavBody {
  articleId: string;
}
app.get("/guest-user/:guestUserId/favs", async (c) => {
  const db = await getDatabase();
  const { guestUserId } = c.req.param();
  const guestUserAuth = c.req.header("guestUserAuth");
  if (!guestUserAuth) {
    c.status(401);
    return c.json({});
  }
  const [cart] = await db
    .select()
    .from(cartsTbl)
    .where(eq(cartsTbl.guestUserId, +guestUserId));
  const favs = await db
    .select()
    .from(favItemsTbl)
    .where(eq(favItemsTbl.cartId, cart.id));
  return c.json({ content: favs });
});
app.post("/guest-user/:guestUserId/favs", async (c) => {
  const db = await getDatabase();
  const body: FavBody = await c.req.json();
  const { guestUserId } = c.req.param();
  const guestUserAuth = c.req.header("guestUserAuth");
  if (!guestUserAuth) {
    c.status(401);
    return c.json({});
  }
  const [cart] = await db
    .select()
    .from(cartsTbl)
    .where(eq(cartsTbl.guestUserId, +guestUserId));
  const favAlredyExists =
    (
      await db
        .select()
        .from(favItemsTbl)
        .where(
          and(
            eq(favItemsTbl.cartId, cart.id),
            eq(favItemsTbl.articleId, +body.articleId)
          )
        )
    ).length > 0;
  if (favAlredyExists) return c.json({});
  await db.insert(favItemsTbl).values({
    articleId: +body.articleId,
    cartId: cart.id,
  });
  return c.json({});
});
app.delete("/guest-user/:guestUserId/favs", async (c) => {
  const db = await getDatabase();
  const body: FavBody = await c.req.json();
  const { guestUserId } = c.req.param();
  const guestUserAuth = c.req.header("guestUserAuth");
  if (!guestUserAuth) {
    c.status(401);
    return c.json({});
  }
  const [cart] = await db
    .select()
    .from(cartsTbl)
    .where(eq(cartsTbl.guestUserId, +guestUserId));
  await db
    .delete(favItemsTbl)
    .where(
      and(
        eq(favItemsTbl.cartId, cart.id),
        eq(favItemsTbl.articleId, +body.articleId)
      )
    );
  return c.json({});
});

app.get("/user/:userId/favs", async (c) => {
  console.log("getgetgetget");
  const db = await getDatabase();
  const { userId } = c.req.param();
  const userAuth = c.req.header("userAuth");
  if (!userAuth) {
    c.status(401);
    return c.json({});
  }
  const [cart] = await db
    .select()
    .from(cartsTbl)
    .where(eq(cartsTbl.userId, +userId));
  const favs = await db
    .select()
    .from(favItemsTbl)
    .where(eq(favItemsTbl.cartId, cart.id));
  return c.json({ content: favs });
});
app.post("/user/:userId/favs", async (c) => {
  const db = await getDatabase();
  const body: FavBody = await c.req.json();
  const { userId } = c.req.param();
  const userAuth = c.req.header("userAuth");
  if (!userAuth) {
    c.status(401);
    return c.json({});
  }
  const [cart] = await db
    .select()
    .from(cartsTbl)
    .where(eq(cartsTbl.userId, +userId));
  const favAlredyExists =
    (
      await db
        .select()
        .from(favItemsTbl)
        .where(
          and(
            eq(favItemsTbl.cartId, cart.id),
            eq(favItemsTbl.articleId, +body.articleId)
          )
        )
    ).length > 0;
  if (favAlredyExists) return c.json({});
  await db.insert(favItemsTbl).values({
    articleId: +body.articleId,
    cartId: cart.id,
  });
  return c.json({});
});
app.delete("/user/:userId/favs", async (c) => {
  const db = await getDatabase();
  const body: FavBody = await c.req.json();
  const { userId } = c.req.param();
  const userAuth = c.req.header("userAuth");
  if (!userAuth) {
    c.status(401);
    return c.json({});
  }
  const [cart] = await db
    .select()
    .from(cartsTbl)
    .where(eq(cartsTbl.userId, +userId));
  await db
    .delete(favItemsTbl)
    .where(
      and(
        eq(favItemsTbl.cartId, cart.id),
        eq(favItemsTbl.articleId, +body.articleId)
      )
    );
  return c.json({});
});

//logging
app.get("/log/guest-user/:guestUserId", async (c) => {
  const db = await getDatabase();
  const { guestUserId } = c.req.param();
  const guestUserAuth = c.req.header("guestUserAuth");
  if (!guestUserAuth) {
    c.status(401);
    return c.json({});
  }

  const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
  const { payload } = JSON.parse(
    JSON.stringify(await jose.jwtVerify(guestUserAuth, encodedKey))
  );
  if (+payload.guestUserId !== +guestUserId) {
    c.status(401);
    return c.json({});
  }
  await db
    .update(guestUsersTbl)
    .set({ loggedInAt: getTimeStamp() })
    .where(eq(guestUsersTbl.id, +guestUserId));
  return c.json({});
});
app.get("/log/user/:userId", async (c) => {
  const db = await getDatabase();
  const { userId } = c.req.param();
  const userAuth = c.req.header("userAuth");
  if (!userAuth) {
    c.status(401);
    return c.json({});
  }
  const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
  const { payload } = JSON.parse(
    JSON.stringify(await jose.jwtVerify(userAuth, encodedKey))
  );
  if (+payload.userId !== +userId) {
    c.status(401);
    return c.json({});
  }
  await db
    .update(usersTbl)
    .set({ loggedInAt: getTimeStamp() })
    .where(eq(usersTbl.id, +userId));
  return c.json({});
});

//auth
interface LoginBody {
  email: string;
  password: string;
}
interface SignupBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
interface UserInfo {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}
interface ResponseAuth {
  userIdJwt: string;
  userInfo: any;
}
app.get("/auth/create-guest", async (c) => {
  const db = await getDatabase();
  const [guestUser] = await db.insert(guestUsersTbl).values({
    createdAt: getTimeStamp(),
    loggedInAt: getTimeStamp(),
  });
  const guestUserId = guestUser.insertId;
  await db.insert(cartsTbl).values({
    guestUserId: guestUserId,
  });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const userIdJwt = await new jose.SignJWT({ guestUserId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("28d")
    .sign(secret);

  return c.json({ guestUserAuth: userIdJwt, guestUserId });
});

app.post("/auth/login", async (c) => {
  const db = await getDatabase();
  const body: LoginBody = await c.req.json();

  const userPassword = (
    await db
      .select({ password: usersTbl.password })
      .from(usersTbl)
      .where(eq(usersTbl.email, body.email))
  )[0].password;

  const passwordIsCorrect = await bcrypt.compare(body.password, userPassword);

  if (!passwordIsCorrect) {
    c.status(401);
    return c.json({ errorMessage: "unauthorized" });
  }

  const [userInfo] = await db
    .select({
      id: usersTbl.id,
      firstName: usersTbl.firstName,
      lastName: usersTbl.lastName,
      email: usersTbl.email,
      phoneNumber: usersTbl.phoneNumber,
    })
    .from(usersTbl)
    .where(eq(usersTbl.email, body.email));

  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const userIdJwt = await new jose.SignJWT({ userId: userInfo.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("28d")
    .sign(secret);

  return c.json({ userIdJwt, userInfo });
});
app.post("/auth/signup", async (c) => {
  const db = await getDatabase();
  const body: SignupBody = await c.req.json();

  const emailIsTaken =
    (await db.select().from(usersTbl).where(eq(usersTbl.email, body.email)))
      .length > 0;

  if (emailIsTaken) return c.json({ errorMessage: "email is taken" });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const [insertUser] = await db.insert(usersTbl).values({
    firstName: body.firstName,
    lastName: body.lastName,
    phoneNumber: body.phone,
    email: body.email,
    password: hashedPassword,
    createdAt: getTimeStamp(),
    loggedInAt: getTimeStamp(),
  });
  const userId = insertUser.insertId;

  const [userInfo] = await db
    .select({
      id: usersTbl.id,
      firstName: usersTbl.firstName,
      lastName: usersTbl.lastName,
      email: usersTbl.email,
      phoneNumber: usersTbl.phoneNumber,
    })
    .from(usersTbl)
    .where(eq(usersTbl.id, userId));

  await db.insert(cartsTbl).values({
    userId: userId,
  });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const userIdJwt = await new jose.SignJWT({ userId: userInfo.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("28d")
    .sign(secret);

  return c.json({ userIdJwt, userInfo });
});

export default {
  port: process.env.PORT,
  fetch: app.fetch,
};
