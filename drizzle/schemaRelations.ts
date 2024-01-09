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
  brands: one(articles, {
    fields: [articles.brandId],
    references: [brands.id], //idk what's wrong here tbh
  }),
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
  }),
);

export const brandsRelations = relations(brands, ({ many }) => ({
  articles: many(articles),
}));

// export const brandsRelations = relations(brands, ({ one }) => ({
//   articles: one(articles, {
//     fields: [articleProperties.articleId], // foreign key in articleImages
//     references: [articles.id], // primary key in articles
//   }),
// }));
