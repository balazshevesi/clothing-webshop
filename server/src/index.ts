import bcrypt from "bcrypt";

import { Hono } from "hono";
import * as jose from "jose";

import {
  articleImages,
  articleListingRelations,
  articleProperties,
  articles,
  brands,
  carts,
  categories,
  guestUsers,
  listings,
  users,
} from "../drizzle/schema";

import { eq } from "drizzle-orm";
import getDatabase from "./utils/getDatabase";

//~ define routes

//admin stuffs
const adminRoutes = new Hono();
adminRoutes.use(async (c, next) => {
  const authHeader = c.req.header("Authorization");
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
      isAdmin: users.isAdmin,
    })
    .from(users)
    .where(eq(users.id, payload.userId));

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
    brandId: brandId,
    categoryId: categoryId,
  });
  const articleId = articleInsert.insertId;

  // insert article props
  const [articlePropsInsert] = await db
    .insert(articleProperties)
    .values({ size: body.size, color: body.color, articleId });

  // insert article images
  const values = body.images.map((image) => {
    return { imagePath: image, articleId };
  });
  await db.insert(articleImages).values(values);

  return c.json({});
});

adminRoutes.put("/article/:articleId", async (c) => {
  const db = await getDatabase();
  const body: ArticleBody = await c.req.json();
  const { articleId } = c.req.param();

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

  // update article
  const [updatedArticle] = await db
    .update(articles)
    .set({
      name: body.name,
      price: body.price,
      quantityInStock: body.quantityInStock,
      description: body.description,
      garmentCare: body.garmentCare,
      brandId: brandId,
      categoryId: categoryId,
    })
    .where(eq(articles.id, +articleId));

  // update article props
  const [articlePropsUpdate] = await db
    .update(articleProperties)
    .set({
      size: body.size,
      color: body.color,
    })
    .where(eq(articleProperties.articleId, +articleId));

  // should actually be a transaction
  // delete article images
  await db.delete(articleImages).where(eq(articleImages.articleId, +articleId));

  // insert article images
  const values = body.images.map((image) => {
    return { imagePath: image, articleId: +articleId };
  });
  await db.insert(articleImages).values(values);

  return c.json({});
});

adminRoutes.delete("/article/:articleId", async (c) => {
  const db = await getDatabase();
  const { articleId } = c.req.param();
  await db.delete(articles).where(eq(articles.id, +articleId));
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
  await db.insert(brands).values({
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
    .update(brands)
    .set({
      name: body.name,
      description: body.description,
      image: body.image,
    })
    .where(eq(brands.id, +brandId));
  return c.json({});
});
adminRoutes.delete("/brand/:brandId", async (c) => {
  const db = await getDatabase();
  const { brandId } = c.req.param();
  await db.delete(brands).where(eq(brands.id, +brandId));
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
  await db.insert(categories).values({
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
    .update(categories)
    .set({ name: body.name, description: body.description, image: body.image })
    .where(eq(categories.id, +categoryId));
  return c.json({});
});
adminRoutes.delete("/category/:categoryId", async (c) => {
  const db = await getDatabase();
  const { categoryId } = c.req.param();
  await db.delete(categories).where(eq(categories.id, +categoryId));
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

  const [listingInsert] = await db.insert(listings).values({
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
  await db.insert(articleListingRelations).values(listingRelations);

  return c.json({});
});
adminRoutes.put("/listing/:listingId", async (c) => {
  const db = await getDatabase();
  const { listingId } = c.req.param();
  const body: ListingBody = await c.req.json();

  await db
    .update(listings)
    .set({
      title: body.title,
      description: body.description,
      imagePath: body.image,
      articleIdDefault: body.defaultArticle.id,
    })
    .where(eq(listings.id, +listingId));

  //^ should be a transation
  //delete
  await db
    .delete(articleListingRelations)
    .where(eq(articleListingRelations.listingId, +listingId));
  //insert
  const listingRelations = body.includedArticles.map((article) => ({
    listingId: +listingId,
    articleId: article.id,
  }));
  await db.insert(articleListingRelations).values(listingRelations);
  return c.json({});
});
adminRoutes.delete("/listing/:listingId", async (c) => {
  const db = await getDatabase();
  const { listingId } = c.req.param();
  await db.delete(listings).where(eq(listings.id, +listingId));
  return c.json({});
});

adminRoutes.get("/", (c) => c.json({}));
const app = new Hono();
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
    .from(brands)
    .where(eq(brands.id, +brandId));
  return c.json({ content: brandsSelect });
});
app.get("/brands", async (c) => {
  const db = await getDatabase();
  const brandsSelect = await db.select().from(brands);
  return c.json({ content: brandsSelect });
});

//categories
app.get("/category/:categoryId", async (c) => {
  const db = await getDatabase();
  const { categoryId } = c.req.param();
  const [categorySelect] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, +categoryId));
  return c.json({ content: categorySelect });
});
app.get("/categories", async (c) => {
  const db = await getDatabase();
  const caregoriesSelect = await db.select().from(categories);
  return c.json({ content: caregoriesSelect });
});

//listings
app.get("/listing/:listingId", async (c) => {
  const db = await getDatabase();
  const { listingId } = c.req.param();

  const content = await db.query.listings.findFirst({
    where: (listings, { eq }) => eq(listings.id, +listingId),
    with: {
      articleListingRelations: true,
    },
  });
  const listOfArticleIds = content?.articleListingRelations.map(
    (listingRelation: any) => listingRelation.articleId
  );

  //^not a preformant soulution, this could've been one query, but whatever
  const listOfArticlesPromises = listOfArticleIds!.map(
    async (articleId: number) =>
      // (await db.select().from(articles).where(eq(articles.id, articleId)))[0],
      await db.query.articles.findFirst({
        where: eq(articles.id, articleId),
        with: {
          articleImages: true,
          articleProperties: true,
        },
      })
  );
  const listOfArticles = await Promise.all(listOfArticlesPromises);
  //@ts-ignore
  content.articles = listOfArticles;

  return c.json({ content });
});
app.get("/listings", async (c) => {
  const db = await getDatabase();
  const listingssSelect = await db.select().from(listings);
  return c.json({ content: listingssSelect });
});
app.get("/listings/most-popular", async (c) => {
  const db = await getDatabase();
  const listingsContent = await db.select().from(listings).limit(5);

  const defaultArticlePromises = listingsContent.map(
    (listing) =>
      db
        .select()
        .from(articles)
        .where(eq(articles.id, +listing.articleIdDefault!))
        .then((articles) => articles[0]) // Assuming the database call returns an array
  );

  const defaultArticles = await Promise.all(defaultArticlePromises);

  const contentWithArticles = listingsContent.map((item, index) => ({
    ...item,
    defaultArticle: defaultArticles[index],
  }));

  return c.json({ content: contentWithArticles });
});

//users
app.get("/user/:userId", async (c) => {
  const db = await getDatabase();
  const { userId } = c.req.param();
  const authHeader = c.req.header("Authorization");

  if (!authHeader) return c.status(401);

  const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
  const { payload } = JSON.parse(
    JSON.stringify(await jose.jwtVerify(authHeader, encodedKey))
  );

  const [userInfo] = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phoneNumber: users.phoneNumber,
      isAdmin: users.isAdmin,
    })
    .from(users)
    .where(eq(users.id, +userId));

  if (payload.userId !== userInfo.id) return c.status(401);

  return c.json({ userInfo });
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
  const body: ResponseAuth = await c.req.json();

  const [guestUser] = await db.insert(guestUsers).values({
    createdAt: new Date().toISOString(),
    loggedInAt: new Date().toISOString(),
  });
  const guestUserId = guestUser.insertId;
  await db.insert(carts).values({
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
  const { email, password }: LoginBody = await c.req.json();

  const userPassword = (
    await db
      .select({ password: users.password })
      .from(users)
      .where(eq(users.email, email))
  )[0].password;

  const passwordIsCorrect = await bcrypt.compare(password, userPassword);

  if (!passwordIsCorrect) {
    c.status(401);
    return c.json({ errorMessage: "unauthorized" });
  }

  const [userInfo] = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phoneNumber: users.phoneNumber,
    })
    .from(users)
    .where(eq(users.email, email));

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
    (await db.select().from(users).where(eq(users.email, body.email))).length >
    0;

  if (emailIsTaken) return c.json({ errorMessage: "email is taken" });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const [insertUser] = await db.insert(users).values({
    firstName: body.firstName,
    lastName: body.lastName,
    phoneNumber: body.phone,
    email: body.email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    loggedInAt: new Date().toISOString(),
  });
  const userId = insertUser.insertId;

  const [userInfo] = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phoneNumber: users.phoneNumber,
    })
    .from(users)
    .where(eq(users.id, userId));

  await db.insert(carts).values({
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

//~ export
export default {
  port: 3002,
  fetch: app.fetch,
};
