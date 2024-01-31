import {
  articleListingRelations,
  articlePlannedSalesRelations,
  cartItems,
  carts,
  categories,
  guestUsers,
  listings,
  plannedSales,
  users,
} from "./schema";
//! NOTE TO FUTURE SELF: THIS FILE IS NOT GENERATED (UNLIKE schema.ts) BY DRIZZLE, SO DON'T DELTE IT PLS
// https://www.youtube.com/watch?v=PmCHk-ADJq8
// https://orm.drizzle.team/docs/rqb
//
import { articleProperties, brands } from "./schema";
import { articleImages, articles } from "./schema";
import { relations } from "drizzle-orm";

export const articlesRelations = relations(articles, ({ one, many }) => ({
  articleImages: many(articleImages),
  articleProperties: many(articleProperties),
  cartItems: many(cartItems),
  articlePlannedSalesRelations: many(articlePlannedSalesRelations),
  brands: one(brands, {
    fields: [articles.brandId],
    references: [brands.id],
  }),
  categories: one(categories, {
    fields: [articles.categoryId],
    references: [categories.id],
  }),
  articleListingRelations: many(articleListingRelations),
  listings: many(listings),
}));

export const articleImagesRelations = relations(articleImages, ({ one }) => ({
  articles: one(articles, {
    fields: [articleImages.articleId], // foreign key in articleImages
    references: [articles.id], // primary key in articles
  }),
}));

export const articlePropertiesRelations = relations(
  articleProperties,
  ({ one }) => ({
    articles: one(articles, {
      fields: [articleProperties.articleId],
      references: [articles.id],
    }),
  })
);

export const brandsRelations = relations(brands, ({ many }) => ({
  articles: many(articles),
}));

export const listingsRelations = relations(listings, ({ many, one }) => ({
  articleListingRelations: many(articleListingRelations),
  articles: one(articles, {
    fields: [listings.articleIdDefault],
    references: [articles.id],
  }),
}));

export const articleListingRelationsRelations = relations(
  articleListingRelations,
  ({ one }) => ({
    articles: one(articles, {
      fields: [articleListingRelations.articleId],
      references: [articles.id],
    }),
    listings: one(listings, {
      fields: [articleListingRelations.listingId],
      references: [listings.id],
    }),
  })
);

export const cartsRelations = relations(carts, ({ one, many }) => ({
  // users: one(users, {
  //   fields: [carts.userId],
  //   references: [users.id],
  // }),
  // guestUsers: one(guestUsers, {
  //   fields: [carts.guestUserId],
  //   references: [guestUsers.id],
  // }),
  cartItems: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  carts: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  articles: one(articles, {
    fields: [cartItems.articleId],
    references: [articles.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  articles: many(articles),
}));

export const plannedSalesRelationsSchema = relations(
  plannedSales,
  ({ one, many }) => ({
    articlePlannedSalesRelations: many(articlePlannedSalesRelations),
  })
);

export const plannedSalesRelationsRelations = relations(
  articlePlannedSalesRelations,
  ({ one, many }) => ({
    plannedSales: one(plannedSales, {
      fields: [articlePlannedSalesRelations.plannedSaleId],
      references: [plannedSales.id],
    }),
    articles: one(articles, {
      fields: [articlePlannedSalesRelations.articleId],
      references: [articles.id],
    }),
  })
);
